import { getDistance } from 'geolib'
import moment from 'moment'
import GoogleMapReact from 'google-map-react'
import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'
import styled, { keyframes } from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AutosizeInput from 'react-input-autosize'
import TextareaAutosize from 'react-autosize-textarea'

import { updateCapitalCitiesInFirebase } from 'redux/action-creators/user/update-capital-cities-in-firebase'
import { updateTripDetails } from 'redux/action-creators/user/update-trip-details'
import { KIERAN_GREY } from 'styles'

import { firebaseApp } from '../../config.js'

const StyledAutoSizeInput = styled(AutosizeInput)`
    & > input {
        border: 1px solid #ff5a5f !important;
        border-radius: 5px !important;
        font-size: ${({ fontSize }) => fontSize} !important;
        margin: 15px; !important;
        padding: 10px !important;
        outline: none !important;
    }
`

const Container = styled.div`
    opacity: ${({ uploadingPhotos }) => (uploadingPhotos ? 0.2 : 1)};
    padding-bottom: 25px;
    @media (min-width: 700px) {
        margin: auto;
        width: 50%;
    }
`

const CountryBackground = styled.div`
    background-image: ${({ country }) =>
        `url(https://dl6ghv8ryvhmk.cloudfront.net/countries/portrait/${country}.jpg),  url(https://dl6ghv8ryvhmk.cloudfront.net/countries/portrait/generic.jpg)`};
    background-size: 1200px;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;

    @media (max-width: 700px) {
        background-size: 600px;
        height: 730px;
        flex-direction: column;
    }
`

export const moveArrowDown = keyframes`
    from {
       top: 580px;
    }
    to {
        top: 625px;
    }
`

const CountryDetailsSection = styled.div`
    color: #fff;
    font-weight: 900;
    padding-top: 450px;
    padding-left: 50px;
    position: relative;

    & > img {
        animation: ${moveArrowDown} 1.5s;
        animation-fill-mode: forwards;
        position: absolute;
        right: 20px;
    }

    @media (max-width: 700px) {
        & div:first-child {
            font-size: 20px;
            text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
        }
    }
`

const CountryHeading = styled.h3`
    font-size: 60px;
    margin: 0;
    overflow: hidden;
    text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
    text-overflow: ellipsis;
    width: 330px;
`

const TripsSection = styled.div`
    color: #757474;
    display: flex;
    flex-direction: column;
    margin: 55px 0 55px 0;
    text-align: center;
`

const TopBar = styled.div`
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 23px;
    opacity: 0.5;
    position: fixed;
    width: 100%;
    z-index: 999;

    @media (min-width: 700px) {
        left: 25%;
        margin: auto;
        width: 50%;
    }

    & > div {
        align-items: center;
        display: flex;
        height: 30px;
        padding: 15px;
    }

    & > img {
        padding: 15px;
    }
`

const UploadingState = styled.div`
    color: #000;
    right: 50%;
    bottom: 50%;
    font-size: 40px;
    font-style: italic;
    transform: translate(50%, 50%);
    position: absolute;
`

const DeleteSection = styled.div`
    position: relative;
    & > img {
        right: 15px;
        top: 30px;
        position: absolute;
    }
`

const VisitName = styled.div`
    color: ${KIERAN_GREY};
    font-size: 32px;
    font-style: italic;
    font-weight: bold;
`

const VisitDate = styled.div`
    color: #ccc;
    margin-top: 10px;
    margin-bottom: 5px;
`

const LoadingContainer = styled.div`
    align-items: center;
    color: ${KIERAN_GREY};
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 50px;
    width: 300px;

    @media (max-width: 700px) {
        margin-top: 80px;
    }
`

const Description = styled.div`
    color: #979eb0;
    font-size: 20px;
    margin: 10px 0 10px 0;
    padding: 10px;
`

const Label = styled.label`
    border: 1px solid ${KIERAN_GREY};
    border-radius: 5px;
    color: ${KIERAN_GREY};
    cursor: pointer;
    display: inline-block;
    height: 23px;
    padding: 6px 12px;
    & > input {
        display: none;
    }
`

const PhotoPlaceholder = styled.div`
    align-items: center;
    background: #f2f5f5;
    display: flex;
    flex-direction: column;
    height: 300px;
    justify-content: center;
    width: 100%;

    & > img {
        margin-bottom: 20px;
    }
`

const AddNewButton = styled.div`
    background: ${KIERAN_GREY};
    border: 1px solid #ccc;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    padding: 12px;
    margin: auto;
    width: 100px;
`

const StyledMarker = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 50% 0;
    background: #89849b;
    position: absolute;
    transform: rotate(-45deg);
    left: 50%;
    top: 50%;
    margin: -20px 0 0 -20px;
    &:after {
        content: '';
        width: 14px;
        height: 14px;
        margin: 8px 0 0 8px;
        background: #2f2f2f;
        position: absolute;
        border-radius: 50%;
    }
`

const Traveller = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    min-width: 80px;
    & > img {
        border-radius: 60px;
        height: 60px;
        margin-bottom: 10px;
        width: 60px;
    }
`

const RemoveTraveller = styled.div`
    background: #eb4d42;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    padding: 5px;
    margin-top: 5px;
`

const Travellers = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    overflow-x: scroll;
`

const SearchContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Search = styled.input`
    border: 1px solid #ccc;
    font-size: 15px;
    margin-bottom: 10px;

    ::placeholder {
        color: #9393a8;
        font-size: 14px;
    }
`

const Add = styled.div`
    background: ${KIERAN_GREY};
    border-radius: 3px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    padding: 5px;
`

const Author = styled.div`
    align-items: center;
    display: flex;
    font-style: italic;
    justify-content: center;

    & > img {
        border-radius: 15px;
        height: 20px;
        margin-left: 5px;
        width: 20px;
    }
`

const InstagramPlaceholder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;

    & > img {
        border-radius: 75px;
        height: 75px;
        width: 75px;
    }
`

const AddByButtons = styled.div`
    display: flex;
    flex-direction: row;
`

const AddByButton = styled.div`
    background: ${({ selected }) => (selected ? KIERAN_GREY : '#fff')};
    border: 1px solid ${KIERAN_GREY};
    border-radius: 3px;
    color: ${({ selected }) => (selected ? '#fff' : KIERAN_GREY)};
    font-size: 10px;
    padding: 5px;
    max-width: 100px;
    margin: 5px;
`

export const NewTrip = ({
    countries,
    updateTripDetails,
    updateCapitalCitiesInFirebase,
    userPersonalDetails,
    userTrips,
}) => {
    const location = useLocation()
    const history = useHistory()

    const [addBy, setAddBy] = useState('instagram')
    const [country, setCountry] = useState(null)
    const [inEditMode, setEditMode] = useState(false)
    const [mapMarkers, setMapMarkers] = useState([])
    const [newPerson, setNewPerson] = useState('')
    const [newPlace, setNewPlace] = useState(null)
    const [newTraveller, setNewTraveller] = useState(null)
    const [originalVisitDetails, setOriginalVisitDetails] = useState(null)
    const [photos, setPhotos] = useState([])
    const [travellers, setTraveller] = useState([])
    const [uploadingPhotos, setUploadingPhotos] = useState(false)
    const [visitDetails, setVisitDetails] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const urlCountry = location.pathname.split('/')[2]
        const foundCountry = userTrips.visitedCountries.find((ctry) => ctry.countryCode === urlCountry)
        setCountry(foundCountry)
    }, [userTrips.visitedCountries])

    useEffect(() => {
        if (country) {
            getPhotos()
            if (country.visits) {
                if (country.visits[0].places) {
                    setMapMarkers(Object.values(country.visits[0].places))
                }
                if (country.visits[0].people) {
                    if (typeof country.visits[0].people === 'string') {
                        setTraveller(country.visits[0].people.split(','))
                    } else {
                        setTraveller(Object.values(country.visits[0].people))
                    }
                }
                setVisitDetails({
                    ...country.visits[0],
                    // people: country.visits[0].people.split(','),
                })
                setOriginalVisitDetails(country.visits[0])
            } else {
                setVisitDetails({ endDate: '', startDate: '', people: [], visitName: '', description: '' })
                setOriginalVisitDetails({ endDate: '', startDate: '', people: [], visitName: '', description: '' })
            }
        }
    }, [country])

    const getPhotos = async () => {
        const storage = firebaseApp.storage()
        let gsReference
        if (process.env.NODE_ENV === 'development') {
            gsReference = storage.refFromURL('gs://countries-development.appspot.com/')
        } else {
            gsReference = storage.refFromURL('gs://countries-5e1e5.appspot.com/')
        }
        gsReference = gsReference.child(`${userPersonalDetails.uid}/${country.countryCode}`)

        const { items: references } = await gsReference.listAll()
        const result = references.map(async (reference) => {
            const url = await reference.getDownloadURL()
            let response = null
            try {
                response = await fetch(url)
            } catch (error) {
                console.log('ERROR GETTING PHOTOS:', error)
                response = error
            }

            return {
                response,
                url,
                reference: reference.fullPath,
            }
        })

        let referencesWithUrls = await Promise.all(result)
        referencesWithUrls = referencesWithUrls.filter((result) => !(result.response instanceof Error))
        const updatedPhotos = referencesWithUrls.map((pr) => {
            return pr
        })
        setPhotos(updatedPhotos)
    }

    const onDrop = (e, index) => {
        uploadPhotos(e.target.files)
    }

    const deletePhoto = (photo) => {
        const storage = firebaseApp.storage()
        var photoRef = storage.ref(photo.reference)
        const newPhotos = photos.filter((phto) => phto.reference !== photo.reference)
        if (window.confirm('Are you sure you want to delete this photo?')) {
            photoRef
                .delete()
                .then(() => {
                    setPhotos(newPhotos)
                    console.log('file successfully deleted')
                })
                .catch((error) => {
                    console.log('error in deleting file')
                })
        }
        return
    }

    const handleDate = (date) => {
        setVisitDetails({ ...visitDetails, startDate: moment(date).unix() })
    }

    const updateVisitDetailsStateHelper = (e, index, option) => {
        let newVisitDetails = { ...visitDetails }
        if (option === 'visitName' || option === 'description') {
            newVisitDetails[option] = e.target.value
        } else {
            newVisitDetails[option][index] = e.target.value
        }

        setVisitDetails({ ...visitDetails, [option]: newVisitDetails[option] })
    }

    const uploadPhotos = (uploadedPhotos) => {
        setUploadingPhotos(true)
        const uploadImageAsPromise = (imageFile) => {
            return new Promise((resolve, reject) => {
                const storage = firebaseApp
                    .storage()
                    .ref(`${userPersonalDetails.uid}/${country.countryCode}/${imageFile.name}`)
                var task = storage.put(imageFile)

                task.on(
                    'state_changed',
                    function progress(snapshot) {
                        // var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        // uploader.value = percentage
                    },
                    function error(err) {
                        setUploadingPhotos(false)
                        console.log('photo error:', err)
                    },
                    function complete() {
                        setUploadingPhotos(false)
                        var downloadURL = task.snapshot.downloadURL
                        getPhotos()
                    },
                )
            })
        }
        for (var i = 0; i < uploadedPhotos.length; i++) {
            var imageFile = uploadedPhotos[i]
            uploadImageAsPromise(imageFile)
        }
    }

    const scrollTo = () => {
        scroll.scrollTo(670)
    }

    const updateTripDetailsHelper = () => {
        if (visitDetails.visitName === '' || visitDetails.startDate === '') {
            alert('Error: You need to fill in Visit Name AND Trip Date')
            return
        }

        setEditMode(false)

        const convertedCountriesBackToFirebaseFormat = (markers, name) => {
            return Object.assign(...markers.map((marker) => ({ [marker[name]]: marker })))
        }

        let convertDataBackForFirebase = {
            ...visitDetails,
            people: travellers.length ? convertedCountriesBackToFirebaseFormat(travellers, 'username') : [],
            places: mapMarkers.length ? convertedCountriesBackToFirebaseFormat(mapMarkers, 'name') : [],
        }

        if (!visitDetails.description) {
            convertDataBackForFirebase = {
                ...convertDataBackForFirebase,
                description: '',
            }
        }

        updateTripDetails(country.name, originalVisitDetails, convertDataBackForFirebase)
        mapMarkers.forEach((mrkr) => {
            console.log(mrkr)
            updateCapitalCitiesInFirebase(mrkr)
        })
    }

    const isItACapital = (place) => {
        const foundCountry = countries.restAPICountries.find(
            (ctry) => ctry.name.toLowerCase() === country.name.toLowerCase(),
        )

        if (foundCountry) {
            if (foundCountry.capital.toLowerCase() === place.toLowerCase()) {
                return true
            }
            return false
        }
        return false
    }

    const getLatLngForSpecificPlace = (place) => {
        var geocoder = new window.google.maps.Geocoder()

        geocoder.geocode({ address: place }, function (results, status) {
            if (status == window.google.maps.GeocoderStatus.OK) {
                const cityLat = results[0].geometry.location.lat()
                const cityLng = results[0].geometry.location.lng()
                const { lat, lng } = userPersonalDetails.location
                const isCapitalCity = isItACapital(place)
                const distanceFromHome = getDistance(
                    { latitude: lat, longitude: lng },
                    { latitude: cityLat, longitude: cityLng },
                )
                const distanceInMiles = Number(distanceFromHome / 1609).toFixed(0)

                const cityInformation = {
                    name: place,
                    lng: cityLng,
                    lat: cityLat,
                    isCapitalCity,
                    distanceFromHome: distanceInMiles,
                }

                setMapMarkers([...mapMarkers, cityInformation])
            } else {
                alert('Place not recognized, please try searching again')
            }
        })
    }

    const initGeocoderFromNewPlace = (newMarker) => {
        const newMarkers = [...mapMarkers, newMarker]

        const latlngbounds = new window.google.maps.LatLngBounds()

        for (var i = 0; i < newMarkers.length; i++) {
            latlngbounds.extend(newMarkers[i])
        }
        window.google.map.fitBounds(latlngbounds)
        setMapMarkers([...mapMarkers, newMarker])
    }

    const initGeocoder = ({ map, maps }) => {
        var latlng = mapMarkers
        var latlngbounds = new maps.LatLngBounds()
        if (latlng.length) {
            for (var i = 0; i < latlng.length; i++) {
                latlngbounds.extend(latlng[i])
            }
            map.fitBounds(latlngbounds)
            map.setCenter(country.name)
            map.setZoom(map.getZoom() - 1)
            if (map.getZoom() > 15) {
                map.setZoom(5)
            }
        } else {
            const Geocoder = new maps.Geocoder()
            Geocoder.geocode({ address: country.name }, (results, status) => {
                if (status == maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location)
                    map.fitBounds(results[0].geometry.bounds)
                } else {
                    console.log('we could not find that address')
                }
            })
        }
    }

    const addPersonViaInstagramOrManually = () => {
        if (addBy === 'instagram') {
            fetch(`https://www.instagram.com/${newPerson}/?__a=1`)
                .then((res) => res.json())
                .then((res) => {
                    if (Object.keys(res).length) {
                        setNewTraveller({
                            username: res.graphql.user.username,
                            photo: res.graphql.user.profile_pic_url_hd,
                            name: res.graphql.user.full_name,
                        })
                    } else {
                        alert(
                            `User does exist OR you aren't authorized correctly with Instagram on this device. Please try another user or add manually`,
                        )
                    }
                })
        } else {
            setTraveller([
                ...travellers,
                {
                    username: newPerson,
                    photo: null,
                    name: newPerson,
                },
            ])
            setNewTraveller(null)
        }
    }

    const addTraveller = () => {
        setTraveller([
            ...travellers,
            {
                username: newTraveller.username,
                photo: newTraveller.photo,
                name: newTraveller.name,
            },
        ])
        setNewTraveller(null)
    }

    const removeTraveller = (traveller) => {
        const newTravellers = travellers.filter((trl) => trl.name !== traveller)
        setTraveller(newTravellers)
    }

    const renderVisitNameAndDate = () => {
        const isVisitNameAndDate = visitDetails && visitDetails.visitName && visitDetails.startDate
        if (inEditMode) {
            return (
                <>
                    <StyledAutoSizeInput
                        fontSize="20px"
                        placeholder={'Give the trip a memorable name'}
                        value={visitDetails.visitName}
                        onChange={(e) => updateVisitDetailsStateHelper(e, 0, 'visitName')}
                    />
                    <DatePicker
                        selected={visitDetails.startDate ? new Date(visitDetails.startDate * 1000) : new Date()}
                        onChange={(date) => handleDate(date)}
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                    />
                </>
            )
        } else if (isVisitNameAndDate && !inEditMode) {
            return (
                <>
                    <VisitName>{visitDetails.visitName}</VisitName>
                    <VisitDate>{moment.unix(visitDetails.startDate).format('MMM YYYY')}</VisitDate>
                    <Author>
                        <div>By Rich Matthews</div> <img src={userPersonalDetails.photoURL} alt="" />
                    </Author>
                </>
            )
        } else {
            return <AddNewButton onClick={() => setEditMode(true)}>Tap here to create a trip</AddNewButton>
        }
    }

    return country ? (
        <div>
            <TopBar>
                <img
                    onClick={() => history.push('/visited')}
                    src="/images/back-arrow.svg"
                    height="30"
                    width="30"
                    alt=""
                />
                {inEditMode ? (
                    <div style={{ fontSize: '13px', color: 'red', textAlign: 'center', width: '250px' }}>
                        You are in edit mode, remember to click SAVE once you've made changes!
                    </div>
                ) : null}

                <div>
                    {inEditMode ? (
                        <span onClick={updateTripDetailsHelper}>Save</span>
                    ) : (
                        <span onClick={() => setEditMode(true)}>
                            <img src="/images/edit.svg" height="30" width="30" alt="" />
                        </span>
                    )}
                </div>
            </TopBar>
            <Container uploadingPhotos={uploadingPhotos}>
                <CountryBackground country={country.countryCode}>
                    <CountryDetailsSection>
                        <div>
                            {country.visits
                                ? country.visits.length === 1
                                    ? `${country.visits.length} trip`
                                    : `${country.visits.length} trips`
                                : null}
                        </div>
                        <CountryHeading>{country.name}</CountryHeading>
                        <img src="/images/down-arrow.svg" height="60" width="60" onClick={scrollTo} alt="" />
                    </CountryDetailsSection>
                </CountryBackground>
                <TripsSection>{renderVisitNameAndDate()}</TripsSection>
                <div>
                    {[1, 2, 3].map((photo, index) => {
                        return (
                            <>
                                {photos[index] ? (
                                    <div>
                                        {inEditMode ? (
                                            <DeleteSection onClick={() => deletePhoto(photos[index])}>
                                                <img src="/images/delete.svg" width="30" height="30" alt="" />
                                            </DeleteSection>
                                        ) : null}

                                        <img src={photos[index].url} width="100%" alt="" />
                                    </div>
                                ) : (
                                    inEditMode && (
                                        <PhotoPlaceholder>
                                            <img src="/images/uploadPhoto.svg" height="50" width="50" alt="" />
                                            <div>
                                                {uploadingPhotos && <UploadingState>Uploading...</UploadingState>}
                                                <Label class="custom-file-upload">
                                                    <input type="file" onChange={(e) => onDrop(e, index)} />
                                                    Upload Photo
                                                </Label>
                                            </div>
                                        </PhotoPlaceholder>
                                    )
                                )}

                                <div style={{ margin: '20px' }}>
                                    {index === 0 ? (
                                        inEditMode ? (
                                            <TextareaAutosize
                                                onChange={(e) => updateVisitDetailsStateHelper(e, 0, 'description')}
                                                placeholder="Say a few words to describe the trip"
                                                rows={3}
                                                style={{ border: '1px solid #ccc', fontSize: '20px', width: '94%' }}
                                                value={visitDetails.description}
                                            />
                                        ) : (
                                            country &&
                                            country.visits &&
                                            country.visits[0].description && (
                                                <Description>{country.visits[0].description}</Description>
                                            )
                                        )
                                    ) : null}

                                    {index === 1 && (
                                        <div>
                                            {inEditMode && (
                                                <SearchContainer>
                                                    <AddByButtons>
                                                        <AddByButton
                                                            onClick={() => setAddBy('manual')}
                                                            selected={addBy === 'manual'}
                                                        >
                                                            Manually add person
                                                        </AddByButton>
                                                        <AddByButton
                                                            onClick={() => setAddBy('instagram')}
                                                            selected={addBy === 'instagram'}
                                                        >
                                                            Add via instagram
                                                        </AddByButton>
                                                    </AddByButtons>
                                                    <div>Add travellers</div>
                                                    <Search
                                                        onChange={(e) => setNewPerson(e.target.value)}
                                                        placeholder={
                                                            addBy === 'instagram'
                                                                ? 'Search for instagram user'
                                                                : "Add traveller's name"
                                                        }
                                                    />

                                                    <Add onClick={addPersonViaInstagramOrManually}>
                                                        {addBy === 'instagram' ? 'Search' : 'Add traveller'}
                                                    </Add>

                                                    {newTraveller ? (
                                                        <InstagramPlaceholder>
                                                            <img
                                                                src={newTraveller.photo}
                                                                width="75"
                                                                height="75"
                                                                alt=""
                                                            />
                                                            <div>{newTraveller.username}</div>
                                                            <div
                                                                onClick={addTraveller}
                                                                style={{
                                                                    background: KIERAN_GREY,
                                                                    borderRadius: '10px',
                                                                    color: '#fff',
                                                                    padding: '10px',
                                                                }}
                                                            >
                                                                Add person to trip
                                                            </div>
                                                        </InstagramPlaceholder>
                                                    ) : null}
                                                </SearchContainer>
                                            )}
                                            <div>
                                                <Travellers>
                                                    {travellers.map((traveller) => (
                                                        <Traveller>
                                                            {traveller.photo ? (
                                                                <img src={traveller.photo} alt="" />
                                                            ) : (
                                                                <img src={'/images/person-placeholder.svg'} alt="" />
                                                            )}
                                                            <div>
                                                                {traveller.name
                                                                    ? traveller.name.split(' ')[0]
                                                                    : traveller}
                                                            </div>
                                                            {inEditMode && (
                                                                <RemoveTraveller
                                                                    onClick={() => removeTraveller(traveller.name)}
                                                                >
                                                                    Remove
                                                                </RemoveTraveller>
                                                            )}
                                                        </Traveller>
                                                    ))}
                                                </Travellers>
                                            </div>
                                        </div>
                                    )}
                                    {index === 2 && null}
                                </div>
                            </>
                        )
                    })}
                </div>
                {inEditMode && (
                    <SearchContainer>
                        <div>Add specific destinations</div>
                        <Search onChange={(e) => setNewPlace(e.target.value)} placeholder="Search for destination" />
                        <Add onClick={() => getLatLngForSpecificPlace(newPlace)}>Add destination to map</Add>
                    </SearchContainer>
                )}
                {mapMarkers.length > 0 && (
                    <div style={{ width: '90%', height: '400px', margin: 'auto', paddingBottom: '50px' }}>
                        <GoogleMapReact
                            key={mapMarkers}
                            onGoogleApiLoaded={initGeocoder}
                            options={{
                                disableDefaultUI: true,
                                disableDoubleClickZoon: true,
                                draggable: true,
                                scrollwheel: false,
                                zoomControl: false,
                            }}
                            distanceToMouse={() => {}}
                            bootstrapURLKeys={{ key: 'AIzaSyBe80OhcYpEiTJ7xcYPySebKTUS30OW28M' }}
                            defaultZoom={5}
                            defaultCenter={{
                                lat: -27,
                                lng: 133,
                            }}
                            yesIWantToUseGoogleMapApiInternals
                        >
                            {mapMarkers.map((marker) => (
                                <Marker lat={marker.lat} lng={marker.lng} text={marker.name} />
                            ))}
                        </GoogleMapReact>
                    </div>
                )}
            </Container>
        </div>
    ) : (
        <LoadingContainer>
            <img src="/images/loading.gif" width="30" alt="" />
            Retrieving country information..
        </LoadingContainer>
    )
}

const Marker = ({ text }) => <StyledMarker></StyledMarker>

const mapState = ({ countries, userPersonalDetails, userTrips }) => ({
    countries,
    userPersonalDetails,
    userTrips,
})

const mapDispatch = {
    updateCapitalCitiesInFirebase,
    updateTripDetails,
}

export const CONNECTED_NEW_TRIP = compose(withRouter, connect(mapState, mapDispatch))(NewTrip)
