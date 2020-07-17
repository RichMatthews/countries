import React, { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { animateScroll as scroll } from 'react-scroll'

import { countryCodes, findCountryFromCountryCode } from 'utils/findCountryCode'

import {
    Container,
    CountryBackground,
    CountryDetailsSection,
    CountryHeading,
    Description,
    TripsSection,
} from 'components/country-visit-information'

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

    useEffect(() => {
        getDetails()
    }, [])

    const getDetails = () => {
        const id = window.location.pathname.split('/')[1]

        const visitId = window.location.pathname.split('/')[4]

        console.log(country, 'ttttttt')

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
        <div>
            <Container>
                <CountryBackground country={countryCode}>
                    <CountryDetailsSection>
                        <CountryHeading>{tripDetails.visitName}</CountryHeading>
                        <img src="/images/down-arrow.svg" height="60" width="60" onClick={scrollTo} alt="" />
                    </CountryDetailsSection>
                </CountryBackground>
                <TripsSection>
                    <VisitNameAndDate
                        handleDate={null}
                        inEditMode={false}
                        setEditMode={null}
                        percentageDone={null}
                        updateVisitDetailsStateHelper={null}
                        userPersonalDetails={userPersonalDetails}
                        visitDetails={tripDetails}
                    />
                </TripsSection>

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
                <VisitMap country={null} mapMarkers={tripDetails.places} />
            </Container>
        </div>
    ) : (
        <div>Loading trip</div>
    )
}

const mapState = ({ countries, userPersonalDetails, userTrips }) => ({
    countries,
    userPersonalDetails,
    userTrips,
})

export const CONNECTED_SHARED_TRIP = compose(withRouter, connect(mapState, null))(SharedTrip)
