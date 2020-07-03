import React from 'react'
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
    height: 65px;
    margin: 5px;
    width: 65px;

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
                    <img src={country.smallFlag} alt="" />
                    {/* <span>{country.visits ? `${country.visits.length} visits` : `1 visit`}</span> */}
                </FlagContainer>
            ))}
        </Inner>
    </Container>
)

const mapState = ({ userTrips }) => ({
    userTrips,
})

export const ConnectedTotalCountries = connect(mapState)(TotalCountries)
