import { getDistance } from 'geolib'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'
import styled, { keyframes } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import TextareaAutosize from 'react-autosize-textarea'
import 'react-google-places-autocomplete/dist/index.min.css'

import { updateCapitalCitiesInFirebase } from 'redux/action-creators/user/update-capital-cities-in-firebase'
import { updateTripDetails } from 'redux/action-creators/user/update-trip-details'
import { KIERAN_GREY } from 'styles'

import { firebaseApp } from '../../config.js'

import { PlacesSearch } from './places-search'
import { TopBar } from './top-bar'
import { TravellersSearch } from './travellers-search'
import { VisitTravellers } from './visit-travellers'
import { VisitMap } from './visit-map'
import { VisitNameAndDate } from './visit-name-and-date'

const Container = styled.div`
    opacity: ${({ uploadingPhotos }) => (uploadingPhotos ? 0.2 : 1)};
    padding-bottom: 25px;
    margin: auto;
    width: 700px;
    @media (max-width: 700px) {
        width: auto;
    }
`

const CountryBackground = styled.div`
    background-image: ${({ country }) =>
        `url(https://dl6ghv8ryvhmk.cloudfront.net/countries/landscape/${country}.jpg),  url(https://dl6ghv8ryvhmk.cloudfront.net/countries/landscape/generic.jpg)`};
    background-size: 700px;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;

    @media (max-width: 700px) {
        background-image: ${({ country }) =>
            `url(https://dl6ghv8ryvhmk.cloudfront.net/countries/portrait/${country}.jpg),  url(https://dl6ghv8ryvhmk.cloudfront.net/countries/portrait/generic.jpg)`};
        background-size: cover;
        background-position: center;
        height: 90vh;
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
    padding-top: 375px;
    padding-left: 50px;
    position: relative;

    & > img {
        animation: ${moveArrowDown} 1.5s;
        animation-fill-mode: forwards;
        position: absolute;
        right: 20px;
    }

    @media (max-width: 700px) {
        padding-top: 450px;
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
    const [newTraveller, setNewTraveller] = useState(null)
    const [originalVisitDetails, setOriginalVisitDetails] = useState(null)
    const [photos, setPhotos] = useState([])
    const [hasVisitedCapital, setHasVisitedCapital] = useState(false)
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
            alert('Error: You need to enter a Visit Name AND Trip Date')
            return
        }

        setEditMode(false)

        const { lat, lng } = userPersonalDetails.homeLocation
        let copyMarkers = [...mapMarkers]
        let distance = 0
        if (copyMarkers.length === 1) {
            const distanceFromHome = getDistance(
                { latitude: mapMarkers[0].lat, longitude: mapMarkers[0].lng },
                { latitude: lat, longitude: lng },
            )
            distance = distanceFromHome
        } else {
            copyMarkers.reverse().push({ lat, lng })
            while (copyMarkers.length > 1) {
                const distanceFromPreviousLocation = getDistance(
                    { latitude: copyMarkers[0].lat, longitude: copyMarkers[0].lng },
                    { latitude: copyMarkers[1].lat, longitude: copyMarkers[1].lng },
                )
                distance = distance + distanceFromPreviousLocation
                copyMarkers.shift()
            }
        }

        const distanceInMiles = Number((distance / 1609).toFixed(0))

        const convertedCountriesBackToFirebaseFormat = (markers, name) => {
            return Object.assign(...markers.map((marker) => ({ [marker[name]]: marker })))
        }

        let convertDataBackForFirebase = {
            ...visitDetails,
            people: travellers.length ? convertedCountriesBackToFirebaseFormat(travellers, 'username') : [],
            places: mapMarkers.length ? convertedCountriesBackToFirebaseFormat(mapMarkers, 'name') : [],
            distanceInMiles,
            hasVisitedCapital,
        }

        if (!visitDetails.description) {
            convertDataBackForFirebase = {
                ...convertDataBackForFirebase,
                description: '',
            }
        }

        updateTripDetails(country.name, originalVisitDetails, convertDataBackForFirebase)
        updateCapitalCitiesInFirebase(mapMarkers)
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

    return country ? (
        <div>
            <TopBar
                history={history}
                inEditMode={inEditMode}
                setEditMode={setEditMode}
                updateTripDetailsHelper={updateTripDetailsHelper}
            />
            <Container uploadingPhotos={uploadingPhotos}>
                <CountryBackground country={country.countryCode}>
                    <CountryDetailsSection>
                        <div>
                            {country.visits ? (
                                country.visits.length === 1 ? (
                                    `${country.visits.length} trip`
                                ) : (
                                    `${country.visits.length} trips`
                                )
                            ) : (
                                <div>1 trip</div>
                            )}
                        </div>
                        <CountryHeading>{country.name}</CountryHeading>
                        <img src="/images/down-arrow.svg" height="60" width="60" onClick={scrollTo} alt="" />
                    </CountryDetailsSection>
                </CountryBackground>
                <TripsSection>
                    <VisitNameAndDate
                        handleDate={handleDate}
                        inEditMode={inEditMode}
                        setEditMode={setEditMode}
                        updateVisitDetailsStateHelper={updateVisitDetailsStateHelper}
                        userPersonalDetails={userPersonalDetails}
                        visitDetails={visitDetails}
                    />
                </TripsSection>
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
                                                <TravellersSearch
                                                    addBy={addBy}
                                                    addTraveller={addTraveller}
                                                    newTraveller={newTraveller}
                                                    newPerson={newPerson}
                                                    setAddBy={setAddBy}
                                                    setNewPerson={setNewPerson}
                                                    setNewTraveller={setNewTraveller}
                                                    setTraveller={setTraveller}
                                                    travellers={travellers}
                                                />
                                            )}
                                            <div>
                                                <VisitTravellers
                                                    inEditMode={inEditMode}
                                                    removeTraveller={removeTraveller}
                                                    travellers={travellers}
                                                />
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
                    <PlacesSearch
                        country={country}
                        countries={countries}
                        mapMarkers={mapMarkers}
                        setHasVisitedCapital={setHasVisitedCapital}
                        setMapMarkers={setMapMarkers}
                    />
                )}
                <VisitMap country={country} mapMarkers={mapMarkers} />
            </Container>
        </div>
    ) : (
        <LoadingContainer>
            <img src="/images/loading.gif" width="30" alt="" />
            Retrieving country information..
        </LoadingContainer>
    )
}

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
