import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CountUp from 'react-countup'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'

import { getMostVisitedCountry } from 'redux/action-creators/user/get-most-visited-country'
import { KIERAN_GREY } from 'styles'

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    width: 100%;

    @media (max-width: 700px) {
        padding-top: 30px;
    }
`
const Section = styled.div`
    display: flex;
    color: ${KIERAN_GREY};
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 14px;

    @media (max-width: 700px) {
        width: 150px;
    }
`

const MilesTravelled = styled(Section)`
    background-size: 100%;
    background-repeat: no-repeat;
    color: ${KIERAN_GREY};
    font-size: 20px;
    height: 24vh;
    width: 100%;

    & div:first-child {
        font-size: 60px;
    }

    @media (max-width: 700px) {
        width: 100%;
    }
`

const PercentageOfTheWorld = styled(Section)``

const FurthestTrip = styled(Section)``

const CapitalCities = styled(Section)`
    color: ${KIERAN_GREY};
`
const GaugeContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
`

const Heading = styled.div`
    margin: 10px;
`

const styles = {
    pathColor: '#54ADA7',
    textColor: KIERAN_GREY,
    textSize: '12px',
    pathTransitionDuration: 1.5,
    width: 25,
}

export const RandomStats = ({ userStats, userTrips }) => {
    const percentageOfTheWorld = (userTrips.visitedCountries.length / 195) * 100
    return userStats ? (
        <Container>
            <MilesTravelled>
                <div>
                    <CountUp end={userStats.milesTravelled} duration={3} />
                </div>
                <div>miles travelled</div>
            </MilesTravelled>
            <GaugeContainer>
                <PercentageOfTheWorld>
                    <CircularProgressbarWithChildren
                        value={(userTrips.visitedCountries.length / 195) * 100}
                        styles={buildStyles(styles)}
                    >
                        <div style={{ fontSize: '38px' }}>{percentageOfTheWorld.toFixed(1)}%</div>
                        <div>of the world</div>
                    </CircularProgressbarWithChildren>
                </PercentageOfTheWorld>
                <CapitalCities>
                    <CircularProgressbarWithChildren
                        value={userStats.capitalCitiesVisited / 195}
                        styles={buildStyles(styles)}
                    >
                        <div style={{ fontSize: '38px' }}>{userStats.capitalCitiesVisited}</div>
                        <div>capital cities</div>
                    </CircularProgressbarWithChildren>
                </CapitalCities>
                {/* <FurthestTrip>
                    <Heading>Furthest trip</Heading>
                    <CircularProgressbar value={17} text={'17'} styles={buildStyles(styles)} />
                </FurthestTrip>
                <CapitalCities>
                    <Heading>Capital Cities</Heading>
                    <CircularProgressbar value={17} text={'17'} styles={buildStyles(styles)} />
                </CapitalCities> */}
            </GaugeContainer>
        </Container>
    ) : (
        <div>Loading Stats...</div>
    )
}

const mapState = ({ userStats, userTrips }) => ({
    userStats,
    userTrips,
})

const mapDispatch = {
    getMostVisitedCountry,
}

export const ConnectedRandomStats = connect(mapState, mapDispatch)(RandomStats)
