import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
    margin: 0 10px 10px 10px;

    @media (max-width: 700px) {
        padding-top: 90px;
    }
`

const Inner = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`

const FlagContainer = styled.div`
    height: 50px;
    margin: 5px;
    width: 50px;

    & > img {
        height: 100%;
        width: 100%;
    }
`

const H3 = styled.h3`
    margin: 0;
`

export const TotalCountries = ({ userTrips }) => (
    <Container>
        <H3>Your Flag collection</H3>
        <Inner>
            {userTrips.visitedCountries.map((country) => (
                <FlagContainer key={country.name}>
                    <img
                        src={`https://lipis.github.io/flag-icon-css/flags/4x3/${country.countryCode.toLowerCase()}.svg`}
                        alt=""
                    />
                </FlagContainer>
            ))}
        </Inner>
    </Container>
)

const mapState = ({ userTrips }) => ({
    userTrips,
})

export const ConnectedTotalCountries = connect(mapState)(TotalCountries)
