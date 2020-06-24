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
        padding-top: 70px;
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
    padding-top: 100px;
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

export const Stats = ({ user }) => {
    const [continent, setContinent] = useState('Africa')

    const { countriesByContinent, continentVisits, firstTrip, lastTrip, mostVisitedCountry, tripsByYear } = user.stats

    return user.userVisitedCountries.length > 0 ? (
        <Container>
            <InnerContainer>
                <MainHeading>Your trips in numbers</MainHeading>
                <Top>
                    <TotalCountries>
                        <StyledLink to="/stats/total-countries">
                            <div>{user.userVisitedCountries.length}</div>
                            <div>countries</div>
                        </StyledLink>
                    </TotalCountries>
                    <FirstAndLast>
                        <StyledLink to="/stats/random-stats">Other fun stats</StyledLink>
                        {/* {firstTrip && (
                            <>
                                <div>
                                    {firstTrip.visitName}
                                    <img src={firstTrip.flag} width="50" alt="" />
                                </div>
                                <TripNameAndDate>
                                    <p>First Trip</p>
                                    <div>{moment.unix(firstTrip.startDate).format('MMM YYYY')}</div>
                                </TripNameAndDate>
                            </>
                        )}
                        {lastTrip && (
                            <>
                                <div>
                                    {lastTrip.visitName}
                                    <img src={lastTrip.flag} width="50" alt="" />
                                </div>
                                <TripNameAndDate>
                                    <p>Latest Trip</p>
                                    <div>{moment.unix(lastTrip.startDate).format('MMM YYYY')}</div>
                                </TripNameAndDate>
                            </>
                        )} */}
                    </FirstAndLast>

                    <TopStats>
                        <StyledLink to="/stats/top">Top Stats</StyledLink>
                    </TopStats>

                    <Gauge>
                        {countriesByContinent ? (
                            <StyledLink to="/stats/random-stats">Other fun stats</StyledLink>
                        ) : (
                            /* <CircularProgressbar
                                    value={
                                        (countriesByContinent[continent].visited /
                                            countriesByContinent[continent].total) *
                                        100
                                    }
                                    text={`${countriesByContinent[continent].visited}/${countriesByContinent[continent].total}`}
                                    styles={buildStyles({ textColor: KIERAN_GREY, pathColor: KIERAN_GREY })}
                                />

                                <Select
                                    onChange={(continent) => setContinent(continent.value)}
                                    options={continent$}
                                    defaultValue={{ label: continent, value: continent }}
                                    styles={customStyles}
                                /> */

                            <SpinnerContainer>
                                <Spinner src={'/images/loading.gif'} />
                            </SpinnerContainer>
                        )}
                    </Gauge>
                    <AWorldWithFriends>
                        <div>A world with friends</div>
                        {/* {continentVisits.length > 1 && (
                            <Chart
                                width={'150px'}
                                height={'150px'}
                                chartType="BarChart"
                                mapsApiKey="YAIzaSyBe80OhcYpEiTJ7xcYPySebKTUS30OW28M"
                                data={continentVisits}
                                options={CHART_OPTIONS}
                            />
                        )} */}
                    </AWorldWithFriends>
                    <StatComponent>
                        {/* {tripsByYear.length > 1 && (
                            <Chart
                                width={'150px'}
                                height={'150px'}
                                chartType="ColumnChart"
                                data={tripsByYear}
                                options={{ ...CHART_OPTIONS, title: 'Trips By Year' }}
                            />
                        )} */}
                    </StatComponent>
                </Top>
            </InnerContainer>
        </Container>
    ) : (
        <NoStats>Stats will appear here once you add your first country</NoStats>
    )
}

const mapState = ({ user }) => ({
    user,
})

export const CONNECTED_Stats = connect(mapState)(Stats)
