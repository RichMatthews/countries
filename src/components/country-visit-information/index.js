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
import uid from 'uid'

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
import { VisitPhotos } from './visit-photos'

export const Container = styled.div`
    opacity: ${({ uploadingPhotos }) => (uploadingPhotos ? 0.2 : 1)};
    padding-bottom: 25px;
    @media (max-width: 700px) {
        width: auto;
    }
`

export const CountryBackground = styled.div`
    background-image: ${({ country }) =>
        `url(https://dl6ghv8ryvhmk.cloudfront.net/countries/landscape/${country}.jpg),  url(https://dl6ghv8ryvhmk.cloudfront.net/countries/landscape/generic.jpg)`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;

    @media (max-width: 700px) {
        background-image: ${({ country }) =>
            `url(https://dl6ghv8ryvhmk.cloudfront.net/countries/portrait/${country}.jpg),  url(https://dl6ghv8ryvhmk.cloudfront.net/countries/portrait/generic.jpg)`};
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

export const CountryDetailsSection = styled.div`
    color: #fff;
    font-weight: 500;
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
        padding-top: 550px;
    }
`

export const CountryHeading = styled.div`
    font-size: 42px;
    font-weight: 500;
    margin: 0;
    overflow: hidden;
    text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
    text-overflow: ellipsis;
    width: 330px;
`

export const TripsSection = styled.div`
    color: #757474;
    display: flex;
    flex-direction: column;
    margin: 55px 0 55px 0;
    text-align: center;
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

export const Description = styled.div`
    color: #979eb0;
    font-size: 20px;
    margin: 10px 0 10px 0;
    padding: 0 0 20px 0;
    border-bottom: 1px solid #ccc;
`

const EditModeInstructions = styled.div`
    height: 250px;
    margin: 0 20px 20px;
`

const EditModeWarning = styled.div`
    font-size: 20px;
    padding-top: 70px;
`

const EditModeListOfInstructions = styled.ul``

const SectionDivider = styled.div`
    border-top: 1px solid #ccc;
    margin: 30px 0;
    padding: 30px 0;
`

const StyledTextareaAutosize = styled(TextareaAutosize)`
    border: none !important;
    outline: none !important;
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
    const [visitDetails, setVisitDetails] = useState({})

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const urlCountry = location.pathname.split('/')[1]
        const visitId = location.pathname.split('/')[3]
        const foundCountry = userTrips.visitedCountries.find((ctry) => ctry.countryCode === urlCountry)

        if (foundCountry && foundCountry.visits) {
            const foundVisit = Object.values(foundCountry.visits).find((visit) => visit.visitId === visitId)
            setVisitDetails(foundVisit)
            setEditMode(false)
        } else {
            setVisitDetails({ ...visitDetails, visitId })
            setEditMode(true)
        }
        setCountry(foundCountry)
    }, [userTrips.visitedCountries])

    useEffect(() => {
        if (visitDetails && Object.keys(visitDetails).length) {
            if (visitDetails) {
                if (visitDetails.places) {
                    setMapMarkers(Object.values(visitDetails.places))
                }
                if (visitDetails.people) {
                    if (typeof visitDetails.people === 'string') {
                        setTraveller(visitDetails.people.split(','))
                    } else {
                        setTraveller(Object.values(visitDetails.people))
                    }
                }
                setOriginalVisitDetails(visitDetails)
            } else {
                setVisitDetails({ endDate: '', startDate: '', people: [], visitName: '', description: '' })
                setOriginalVisitDetails({ endDate: '', startDate: '', people: [], visitName: '', description: '' })
            }
        }
    }, [visitDetails])

    useEffect(() => {
        const countryCode = location.pathname.split('/')[1]
        const foundCountry = userTrips.visitedCountries.find((ctry) => ctry.countryCode === countryCode)

        if (foundCountry) {
            getPhotos(countryCode)
        }
    }, [])

    const getPhotos = async (countryCode) => {
        const storage = firebaseApp.storage()
        let gsReference
        if (process.env.NODE_ENV === 'development') {
            gsReference = storage.refFromURL('gs://countries-development.appspot.com/')
        } else {
            gsReference = storage.refFromURL('gs://countries-5e1e5.appspot.com/')
        }
        gsReference = gsReference.child(`${userPersonalDetails.uid}/${countryCode}`)

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

    const scrollTo = () => {
        scroll.scrollTo(670)
    }

    const updateTripDetailsHelper = () => {
        if (!visitDetails.visitName || !visitDetails.startDate) {
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
                {inEditMode ? (
                    <EditModeInstructions>
                        <EditModeWarning>Welcome to Trip Tracker!</EditModeWarning>
                        <EditModeListOfInstructions>
                            <li>On this page you can add more detailed information to your trips</li>
                            <li>Add your favourite photos, memorable destinations & fellow travellers </li>
                            <li>Click save to see how others will view your trip</li>
                            <li>Oh and don't forget to click share so your friends can relive your trip too!</li>
                        </EditModeListOfInstructions>
                    </EditModeInstructions>
                ) : null}
                <CountryBackground country={country.countryCode}>
                    <CountryDetailsSection>
                        <VisitNameAndDate
                            handleDate={handleDate}
                            inEditMode={inEditMode}
                            setEditMode={setEditMode}
                            updateVisitDetailsStateHelper={updateVisitDetailsStateHelper}
                            userPersonalDetails={userPersonalDetails}
                            visitDetails={visitDetails}
                        />
                        <img src="/images/down-arrow.svg" height="60" width="60" onClick={scrollTo} alt="" />
                    </CountryDetailsSection>
                </CountryBackground>
                {inEditMode ? (
                    <div style={{ margin: '20px' }}>
                        <VisitPhotos
                            country={country}
                            deletePhoto={deletePhoto}
                            getPhotos={getPhotos}
                            inEditMode={inEditMode}
                            index={0}
                            photos={photos}
                            setUploadingPhotos={setUploadingPhotos}
                            uploadingPhotos={uploadingPhotos}
                            userPersonalDetails={userPersonalDetails}
                        />
                        <SectionDivider>
                            <StyledTextareaAutosize
                                onChange={(e) => updateVisitDetailsStateHelper(e, 0, 'description')}
                                placeholder="Say a few words to describe the trip"
                                rows={3}
                                style={{ border: '1px solid #ccc', fontSize: '20px', width: '94%' }}
                                value={visitDetails.description}
                            />
                        </SectionDivider>
                        <SectionDivider>
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
                            <VisitTravellers
                                inEditMode={inEditMode}
                                removeTraveller={removeTraveller}
                                travellers={travellers}
                            />
                        </SectionDivider>
                        <SectionDivider>
                            <PlacesSearch
                                country={country}
                                countries={countries}
                                mapMarkers={mapMarkers}
                                setHasVisitedCapital={setHasVisitedCapital}
                                setMapMarkers={setMapMarkers}
                            />
                            <VisitMap country={country} mapMarkers={mapMarkers} />
                        </SectionDivider>
                    </div>
                ) : (
                    <div style={{ margin: '20px' }}>
                        {[1, 2, 3].map((photo, index) => {
                            return (
                                <>
                                    <VisitPhotos
                                        country={country}
                                        deletePhoto={deletePhoto}
                                        getPhotos={getPhotos}
                                        inEditMode={inEditMode}
                                        index={index}
                                        photos={photos}
                                        setUploadingPhotos={setUploadingPhotos}
                                        uploadingPhotos={uploadingPhotos}
                                        userPersonalDetails={userPersonalDetails}
                                    />

                                    <div>
                                        {index === 0 && visitDetails && (
                                            <Description>{visitDetails.description}</Description>
                                        )}

                                        {index === 1 && (
                                            <div>
                                                <VisitTravellers
                                                    inEditMode={inEditMode}
                                                    removeTraveller={removeTraveller}
                                                    travellers={travellers}
                                                />
                                                <VisitMap country={country} mapMarkers={mapMarkers} />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )
                        })}
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
