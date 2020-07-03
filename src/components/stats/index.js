import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Chart } from 'react-google-charts'
import moment from 'moment'
import { fadeIn } from 'components/react-modal-adapter'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Select from 'react-select'
import { Link } from 'react-router-dom'

import { CHART_OPTIONS } from 'components/stats/charts/options'
import { KIERAN_GREY } from 'styles'

// animation: ${fadeIn} 1s;
const Container = styled.div`
    background: #fff;
    height: 100%;
    width: 100%;
    @media (max-width: 700px) {
        padding-top: 80px;
    }
`

// animation: ${fadeIn} 1s;
const InnerContainer = styled.div`
    background: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 700px) {
        width: 100%;
    }
`

const StyledLink = styled(Link)`
    align-items: center;
    color: #fff;
    display: flex;
    font-weight: bold;
    flex-direction: column;
    font-size: 22px;
    justify-content: center;
    height: 100%;
    text-decoration: none;

    & div:first-child {
        font-size: 60px;
    }
`

const StatComponent = styled.div`
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #fff;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    justify-content: center;
    height: 150px;
    padding: 5px;
    width: 150px;
`

const TopStats = styled(StatComponent)`
    background-image: url(/images/stats/volcano.jpg);
    background-size: 500px;
    background-repeat: no-repeat;
    background-position: right;
`

const Top = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 250px;
    margin: 15px;

    @media (max-width: 700px) {
        flex-direction: row;
        flex-wrap: wrap;
        height: 100%;
        & > div {
            height: 175px;
            width: 175px;
        }
    }
`

const Continents = styled(StatComponent)``

const FirstAndLast = styled(StatComponent)`
    background-image: url(/images/stats/sunset.jpg);
    background-size: 300px;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const MainHeading = styled.div`
    color: #4a4947;
    font-size: 32px;
    margin: 15px 15px 0 15px;
`

const ByYear = styled(Continents)``

const Spinner = styled.img`
    width: 30px;
`

const SpinnerContainer = styled.div`
    margin: auto;
`

const Gauge = styled(StatComponent)`
    background-image: url(/images/stats/earth.jpg);
    background-size: 100%;
    background-repeat: no-repeat;
    color: #fff;
`

const TotalCountries = styled(StatComponent)`
    background-image: url(/images/stats/beach.jpg);
    background-size: 280px;
    background-repeat: no-repeat;
    background-position: center;
`

const NoStats = styled.div`
    display: flex;
    justify-content: center;
`

const TripNameAndDate = styled.div`
    align-items: flex-end;
    display: flex;
    font-size: 13px;
    justify-content: space-between;

    & > p {
        margin: 0;
    }
`

const AWorldWithFriends = styled(StatComponent)`
    background-image: url(/images/stats/explorer.jpg);
    background-size: 100%;
    background-repeat: no-repeat;
`

const continent$ = [
    { value: 'Africa', label: 'Africa' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'North America', label: 'North America' },
    { value: 'South America', label: 'South America' },
    { value: 'Oceania', label: 'Oceania' },
]

const customStyles = {
    control: (base, state) => ({
        ...base,
        background: 'transparent',
        marginTop: 20,
    }),
    menuList: (base) => ({
        ...base,
        background: 'transparent',
    }),
}

export const Stats = ({ userTrips, userStats }) => {
    const [continent, setContinent] = useState('Africa')

    const { countriesByContinent, continentVisits, mostVisitedCountry } = userStats

    return userTrips.visitedCountries.length > 0 ? (
        <Container>
            <InnerContainer>
                <MainHeading>Your trips in numbers</MainHeading>
                <Top>
                    <TotalCountries>
                        <StyledLink to="/stats/total-countries">
                            <div>{userTrips.visitedCountries.length}</div>
                            <div>countries</div>
                        </StyledLink>
                    </TotalCountries>
                    <FirstAndLast>
                        <StyledLink to="/stats/random-stats">Other fun stats</StyledLink>
                    </FirstAndLast>

                    <TopStats>
                        <StyledLink to="/stats/top">Top Stats</StyledLink>
                    </TopStats>

                    <Gauge>
                        {countriesByContinent ? (
                            <StyledLink to="/stats/random-stats">Other fun stats</StyledLink>
                        ) : (
                            <SpinnerContainer>
                                <Spinner src={'/images/loading.gif'} />
                            </SpinnerContainer>
                        )}
                    </Gauge>
                    <AWorldWithFriends>
                        <div>A world with friends</div>
                    </AWorldWithFriends>
                    <StatComponent></StatComponent>
                </Top>
            </InnerContainer>
        </Container>
    ) : (
        <NoStats>Stats will appear here once you add your first country</NoStats>
    )
}

const mapState = ({ userStats, userTrips }) => ({
    userStats,
    userTrips,
})

export const CONNECTED_Stats = connect(mapState)(Stats)
