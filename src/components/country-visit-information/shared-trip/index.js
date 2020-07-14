import React, { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { animateScroll as scroll } from 'react-scroll'

import {
    Container,
    CountryBackground,
    CountryDetailsSection,
    CountryHeading,
    Description,
    TripsSection,
} from 'components/country-visit-information'
import { firebaseApp } from '../../../config.js'

import { TopBar } from '../top-bar'
import { VisitTravellers } from '../visit-travellers'
import { VisitMap } from '../visit-map'
import { VisitNameAndDate } from '../visit-name-and-date'
import { VisitPhotos } from '../visit-photos'

export const SharedTrip = ({ countries, userPersonalDetails, userTrips }) => {
    const [tripDetails, setTripDetails] = useState(null)
    const [photos, setPhotos] = useState([])

    const history = useHistory()
    useEffect(() => {
        getDetails()
    }, [])

    const getDetails = () => {
        const id = window.location.pathname.split('/')[1]
        const country = window.location.pathname.split('/')[2]
        const visitName = window.location.pathname.split('/')[4]

        firebaseApp
            .database()
            .ref(`users/${id}/countries/${country}/visits`)
            .once('value')
            .then((snapshot) => {
                if (snapshot.val()) {
                    const trips = snapshot.val()
                    const findTrip = trips.find((trip) => trip.visitName.toLowerCase() === visitName.replace(/-/g, ' '))
                    setTripDetails(findTrip)
                }
                return {}
            })
    }

    const scrollTo = () => {
        scroll.scrollTo(670)
    }

    const getPhotos = async () => {
        const storage = firebaseApp.storage()
        let gsReference
        if (process.env.NODE_ENV === 'development') {
            gsReference = storage.refFromURL('gs://countries-development.appspot.com/')
        } else {
            gsReference = storage.refFromURL('gs://countries-5e1e5.appspot.com/')
        }
        // gsReference = gsReference.child(`${userPersonalDetails.uid}/${country.countryCode}`)
        gsReference = gsReference.child(`${userPersonalDetails.uid}/es`)

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

    return tripDetails ? (
        <div>
            <TopBar history={history} inEditMode={false} setEditMode={null} updateTripDetailsHelper={null} />
            <Container>
                <CountryBackground country={null}>
                    <CountryDetailsSection>
                        <div>1 trip</div>
                        <CountryHeading>{null}</CountryHeading>
                        <img src="/images/down-arrow.svg" height="60" width="60" onClick={scrollTo} alt="" />
                    </CountryDetailsSection>
                </CountryBackground>
                <TripsSection>
                    <VisitNameAndDate
                        handleDate={null}
                        inEditMode={false}
                        setEditMode={null}
                        updateVisitDetailsStateHelper={null}
                        userPersonalDetails={userPersonalDetails}
                        visitDetails={tripDetails}
                    />
                </TripsSection>
                <div>
                    <VisitPhotos
                        country={null}
                        deletePhoto={null}
                        getPhotos={getPhotos}
                        inEditMode={false}
                        index={0}
                        photos={photos}
                        setUploadingPhotos={null}
                        uploadingPhotos={null}
                        userPersonalDetails={userPersonalDetails}
                    />

                    <Description>{tripDetails.Description}</Description>
                    <VisitTravellers inEditMode={false} removeTraveller={null} travellers={tripDetails.travellers} />
                </div>

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
