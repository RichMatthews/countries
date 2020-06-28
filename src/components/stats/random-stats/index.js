import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CountUp from 'react-countup'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import { getMostVisitedCountry } from 'redux/action-creators/user/get-most-visited-country'

const Container = styled.div`
    align-items: center;
    background: #041a24;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    padding-top: 70px;
    text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
`
const Section = styled.div`
    display: flex;
    color: #fff;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 14px;
    width: 20vw;

    @media (max-width: 700px) {
        width: 41vw;
    }
`

const MilesTravelled = styled(Section)`
    background-image: url(/images/stats/stats-background.jpg);
    background-size: 100%;
    background-repeat: no-repeat;
    color: #fff;
    font-size: 40px;
    height: 24vh;
    width: 100%;
    @media (max-width: 700px) {
        width: 100%;
    }
`

const PercentageOfTheWorld = styled(Section)``

const FurthestTrip = styled(Section)``

const CapitalCities = styled(Section)`
    color: #fff;
`
const GaugeContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
`

const Heading = styled.div`
    margin: 10px;
`

const styles = {
    pathColor: '#54ADA7',
    textColor: '#fff',
    textSize: '20px',
}

export const RandomStats = ({ userStats, userTrips }) => {
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
                    <Heading>Percentage of the world</Heading>
                    <CircularProgressbar
                        value={(userTrips.visitedCountries.length / 195) * 100}
                        text={`${((userTrips.visitedCountries.length / 195) * 100).toFixed(1)}%`}
                        styles={buildStyles(styles)}
                    />
                </PercentageOfTheWorld>
                <FurthestTrip>
                    <Heading>Furthest trip</Heading>
                    <CircularProgressbar value={17} text={'17'} styles={buildStyles(styles)} />
                </FurthestTrip>
                <CapitalCities>
                    <Heading>Capital Cities</Heading>
                    <CircularProgressbar
                        value={userStats.capitalCitiesVisited}
                        text={`${userStats.capitalCitiesVisited}`}
                        styles={buildStyles(styles)}
                    />
                </CapitalCities>
                <CapitalCities>
                    <Heading>Capital Cities</Heading>
                    <CircularProgressbar value={17} text={'17'} styles={buildStyles(styles)} />
                </CapitalCities>
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
