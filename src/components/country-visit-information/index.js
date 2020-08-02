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
import { getPhotos } from 'utils/getPhotos'
import { uploadPhotos } from 'utils/uploadPhotos'

import { firebaseApp } from '../../config.js'

import { PlacesSearch } from './places-search'
import { TopBar } from './top-bar'
import { TravellersSearch } from './travellers-search'
import { VisitTravellers } from './visit-travellers'
import { VisitMap } from './visit-map'
import { VisitNameAndDate } from './visit-name-and-date'
import { VisitPhotos } from './visit-photos'
import { CountryVisitInformationDesktopView } from './desktop'

export const Container = styled.div`
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
    border-bottom: 1px solid #ccc;
    color: ${KIERAN_GREY};
    font-size: 20px;
    margin: 10px 0 10px 0;
    padding: 0 0 20px 0;
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
    margin: 15px 0;
    padding: 15px 0;
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
    const [photosToSendToServer, setPhotosToSendToServer] = useState([])
    const [displayPhotos, setDisplayPhotos] = useState([])
    const [hasVisitedCapital, setHasVisitedCapital] = useState(false)
    const [travellers, setTraveller] = useState([])
    const [uploadingPhotos, setUploadingPhotos] = useState(false)
    const [visitDetails, setVisitDetails] = useState({ description: '', visitName: '' })
    const [percentageDone, setPercentageDone] = useState(0)

    const PATHNAME = {
        COUNTRY_CODE: location.pathname.split('/')[1],
        VISIT_ID: location.pathname.split('/')[3],
    }
    const FOUND_COUNTRY_FROM_COUNTRY_CODE = userTrips.visitedCountries.find(
        (ctry) => ctry.countryCode === PATHNAME.COUNTRY_CODE,
    )

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (FOUND_COUNTRY_FROM_COUNTRY_CODE && FOUND_COUNTRY_FROM_COUNTRY_CODE.visits) {
            const foundVisit = Object.values(FOUND_COUNTRY_FROM_COUNTRY_CODE.visits).find(
                (visit) => visit.visitId === PATHNAME.VISIT_ID,
            )
            if (foundVisit) {
                setVisitDetails(foundVisit)
                setEditMode(false)
            } else {
                setVisitDetails({ ...visitDetails, visitId: PATHNAME.VISIT_ID })
                setEditMode(true)
            }
        } else {
            setVisitDetails({ ...visitDetails, visitId: PATHNAME.VISIT_ID })
            setEditMode(true)
        }
        setCountry(FOUND_COUNTRY_FROM_COUNTRY_CODE)
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
        if (visitDetails && visitDetails.visitId) {
            if (FOUND_COUNTRY_FROM_COUNTRY_CODE && visitDetails.visitId && userPersonalDetails) {
                getAndSetPhotos()
            }
        }
    }, [visitDetails])

    const getAndSetPhotos = async () => {
        const photos = await getPhotos(PATHNAME.COUNTRY_CODE, PATHNAME.VISIT_ID, userPersonalDetails)
        setDisplayPhotos(photos)
    }

    const deletePhoto = (photo, index, uid) => {
        const storage = firebaseApp.storage()
        let photoRef = storage.ref(photo.reference)
        const newPhotos = [...displayPhotos]
        const photosToSendToServerCopy = [...photosToSendToServer]
        if (window.confirm('Are you sure you want to delete this photo?')) {
            if (uid) {
                const filterByIndex = photosToSendToServerCopy.findIndex((photo) => photo.uid === uid)
                photosToSendToServerCopy.splice(filterByIndex, 1)
                setPhotosToSendToServer(photosToSendToServerCopy)
            }
            if (photo.reference) {
                const filterByIndex = newPhotos.findIndex((phto) => phto.reference === photo.reference)
                newPhotos.splice(filterByIndex, 1)
            } else {
                newPhotos.splice(index, 1)
            }
            setDisplayPhotos(newPhotos)
            photoRef
                .delete()
                .then(() => {
                    console.log('file successfully deleted')
                })
                .catch((error) => {
                    console.log(error)
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

    const updateTripDetailsHelper = async () => {
        if (!visitDetails.visitName || !visitDetails.startDate) {
            alert('Error: You need to enter a Visit Name AND Trip Date')
            return
        }

        if (photosToSendToServer.length) {
            await uploadPhotos(
                photosToSendToServer,
                userPersonalDetails.uid,
                PATHNAME.COUNTRY_CODE,
                PATHNAME.VISIT_ID,
                setPercentageDone,
                setUploadingPhotos,
            ).then(() => {
                console.log('i am done!')
            })

            const photos = await getPhotos(PATHNAME.COUNTRY_CODE, visitDetails.visitId, userPersonalDetails)
            setDisplayPhotos(photos)
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
                userPersonalDetails={userPersonalDetails}
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
                            percentageDone={percentageDone}
                            updateVisitDetailsStateHelper={updateVisitDetailsStateHelper}
                            userPersonalDetails={userPersonalDetails}
                            visitDetails={visitDetails}
                        />
                        <img src="/images/down-arrow.svg" height="60" width="60" onClick={scrollTo} alt="" />
                    </CountryDetailsSection>
                </CountryBackground>
                {inEditMode ? (
                    <div style={{ margin: '20px' }}>
                        <SectionDivider>
                            <StyledTextareaAutosize
                                onChange={(e) => updateVisitDetailsStateHelper(e, 0, 'description')}
                                placeholder="Say a few words to describe the trip"
                                rows={3}
                                style={{ border: '1px solid #ccc', fontSize: '20px', width: '94%' }}
                                value={visitDetails.description ? visitDetails.description : ''}
                            />
                        </SectionDivider>
                        <VisitPhotos
                            deletePhoto={deletePhoto}
                            displayPhotos={displayPhotos}
                            inEditMode={inEditMode}
                            percentageDone={percentageDone}
                            setDisplayPhotos={setDisplayPhotos}
                            setPhotosToSendToServer={setPhotosToSendToServer}
                            setUploadingPhotos={setUploadingPhotos}
                            uploadingPhotos={uploadingPhotos}
                            userPersonalDetails={userPersonalDetails}
                        />
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
                            <VisitMap
                                country={country}
                                mapMarkers={mapMarkers}
                                setMapMarkers={setMapMarkers}
                                inEditMode={true}
                            />
                        </SectionDivider>
                    </div>
                ) : (
                    <div style={{ margin: '20px' }}>
                        <>
                            {visitDetails && <Description>{visitDetails.description}</Description>}
                            <VisitPhotos
                                deletePhoto={deletePhoto}
                                displayPhotos={displayPhotos}
                                inEditMode={inEditMode}
                                percentageDone={percentageDone}
                                setDisplayPhotos={setDisplayPhotos}
                                setPhotosToSendToServer={setPhotosToSendToServer}
                                setUploadingPhotos={setUploadingPhotos}
                                uploadingPhotos={uploadingPhotos}
                            />

                            <div>
                                <VisitTravellers
                                    inEditMode={inEditMode}
                                    removeTraveller={removeTraveller}
                                    travellers={travellers}
                                />
                                <VisitMap
                                    country={country}
                                    mapMarkers={mapMarkers}
                                    setMapMarkers={setMapMarkers}
                                    inEditMode={false}
                                />
                            </div>
                        </>
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
