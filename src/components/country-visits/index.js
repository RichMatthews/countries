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
import { KIERAN_GREY } from 'styles'
import { Link } from 'react-router-dom'

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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CountryName = styled.div`
    font-size: 40px;
`

const TripContainer = styled.div`
    background-image: url(/images/test.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
    height: 30vh;
    position: relative;
    width: 80vw;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`

const TripTitle = styled.div`
    position: absolute;
    bottom: 20px;
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
    text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
`

export const CountryVisits = ({ userTrips }) => {
    const location = useLocation()
    const history = useHistory()
    const [trips, setTrips] = useState(null)
    const countryCodeFromUrl = location.pathname.split('/')[1]
    const foundCountry = userTrips.visitedCountries.find((ctry) => ctry.countryCode === countryCodeFromUrl)
    console.log(foundCountry, 'fc')
    useEffect(() => {
        if (foundCountry && foundCountry.visits) {
            setTrips(Object.values(foundCountry.visits))
        }
    }, [userTrips.visitedCountries])

    return foundCountry ? (
        trips ? (
            <Container>
                <div>Your trips to</div>
                <CountryName>{foundCountry.name}</CountryName>
                {trips.map((trip) => (
                    <StyledLink to={`/${countryCodeFromUrl}/trips/${trip.visitId}`}>
                        <TripContainer>
                            <TripTitle>{trip.visitName}</TripTitle>
                        </TripContainer>
                    </StyledLink>
                ))}
            </Container>
        ) : (
            <div>
                <div>Trips to</div>
                <CountryName>{foundCountry.name}</CountryName>
                <Link to={`/${countryCodeFromUrl}/trips/${uid()}`}>
                    <div>Click here to record a trip</div>
                </Link>
            </div>
        )
    ) : (
        <LoadingContainer>
            <img src="/images/loading.gif" width="30" alt="" />
            <div>Retrieving trips... </div>
        </LoadingContainer>
    )
}

const mapState = ({ countries, userPersonalDetails, userTrips }) => ({
    countries,
    userPersonalDetails,
    userTrips,
})

const mapDispatch = {
    // updateCapitalCitiesInFirebase,
    // updateTripDetails,
}

export const CONNECTED_COUNTRY_VISITS = compose(withRouter, connect(mapState, mapDispatch))(CountryVisits)
