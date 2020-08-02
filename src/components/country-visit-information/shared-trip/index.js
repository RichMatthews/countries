import React, { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { animateScroll as scroll } from 'react-scroll'

import { countryCodes, findCountryFromCountryCode } from 'utils/findCountryCode'

import { Container, CountryBackground, CountryDetailsSection, Description } from 'components/country-visit-information'
import { getPhotos } from 'utils/getPhotos'

import { firebaseApp } from '../../../config.js'
import { VisitTravellers } from '../visit-travellers'
import { VisitMap } from '../visit-map'
import { VisitNameAndDate } from '../visit-name-and-date'
import { VisitPhotos } from '../visit-photos'

export const SharedTrip = ({ countries, userPersonalDetails, userTrips }) => {
    const [tripDetails, setTripDetails] = useState(null)
    const [displayPhotos, setDisplayPhotos] = useState([])
    const countryCode = window.location.pathname.split('/')[2]
    const country = findCountryFromCountryCode(countryCode, countryCodes)
    const PATHNAME = {
        COUNTRY_CODE: window.location.pathname.split('/')[2],
        VISIT_ID: window.location.pathname.split('/')[4],
        USER_ID: window.location.pathname.split('/')[1],
    }

    useEffect(() => {
        getDetails()
    }, [])

    useEffect(() => {
        getAndSetPhotos()
    }, [])

    const getAndSetPhotos = async () => {
        const photos = await getPhotos(PATHNAME.COUNTRY_CODE, PATHNAME.VISIT_ID, { uid: PATHNAME.USER_ID })
        setDisplayPhotos(photos)
    }

    const getDetails = () => {
        const id = window.location.pathname.split('/')[1]
        const visitId = window.location.pathname.split('/')[4]

        firebaseApp
            .database()
            .ref(`users/${id}/countries/${country}/visits/${visitId}`)
            .once('value')
            .then((snapshot) => {
                if (snapshot.val()) {
                    setTripDetails(snapshot.val())
                }
                return {}
            })
    }

    const scrollTo = () => {
        scroll.scrollTo(670)
    }

    return tripDetails ? (
        <Container>
            <CountryBackground country={countryCode}>
                <CountryDetailsSection>
                    <VisitNameAndDate
                        handleDate={null}
                        inEditMode={false}
                        setEditMode={null}
                        percentageDone={null}
                        updateVisitDetailsStateHelper={null}
                        userPersonalDetails={userPersonalDetails}
                        visitDetails={tripDetails}
                    />
                    <img src="/images/down-arrow.svg" height="60" width="60" onClick={scrollTo} alt="" />
                </CountryDetailsSection>
            </CountryBackground>

            <Description>{tripDetails.Description}</Description>
            <VisitPhotos
                deletePhoto={null}
                displayPhotos={displayPhotos}
                inEditMode={false}
                percentageDone={null}
                setDisplayPhotos={setDisplayPhotos}
                setUploadingPhotos={null}
                uploadingPhotos={null}
                userPersonalDetails={userPersonalDetails}
            />

            <VisitTravellers inEditMode={false} removeTraveller={null} travellers={tripDetails.travellers} />
            <VisitMap
                country={country}
                mapMarkers={Object.values(tripDetails.places)}
                setMapMarkers={null}
                inEditMode={false}
            />
        </Container>
    ) : (
        <Container>Loading trip</Container>
    )
}

const mapState = ({ countries, userPersonalDetails, userTrips }) => ({
    countries,
    userPersonalDetails,
    userTrips,
})

export const CONNECTED_SHARED_TRIP = compose(withRouter, connect(mapState, null))(SharedTrip)
