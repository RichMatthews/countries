import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import google, { Chart } from 'react-google-charts'
import moment from 'moment'
import { fadeIn } from 'components/react-modal-adapter'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Select from 'react-select'
import CountUp from 'react-countup'

import { TopThreeCountries } from './top-three-countries'
import { CHART_OPTIONS } from 'components/stats/charts/options'
import { KIERAN_GREY } from 'styles'

// animation: ${fadeIn} 1s;
const Container = styled.div`
    background: #e1e3e3;
    height: 100%;
    padding-top: 10px;
    width: 100%;
`

// animation: ${fadeIn} 1s;
const InnerContainer = styled.div`
    background: #e1e3e3;
    height: 100%;
    width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: auto;
`

const StatComponent = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #4a4947;
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const Top = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 250px;
    width: 100%;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
`

const Continents = styled(StatComponent)`
    height: 255px;
    padding: 5px;
    min-width: 470px;
`

const FirstAndLast = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 220px;
`

const FirstOrLast = styled(StatComponent)`
    display: flex;
    height: 100px;
    padding: 7px;
    justify-content: space-between;
    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 22px;
    }

    & > div > p {
        font-size: 13px;
    }
`

const MainHeading = styled.div`
    color: #4a4947;
    width: 100%;
    font-size: 48px;
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 20px;
`

const ByYear = styled(Continents)``

const Spinner = styled.img`
    width: 30px;
`

const SpinnerContainer = styled.div`
    margin: auto;
`

const Top3AndFirstAndLast = styled.div`
    display: flex;
    justify-content: space-between;
    width: 470px;
`

const Gauge = styled(StatComponent)`
    width: 200px;
`

const TotalCountries = styled(StatComponent)`
    color: ${KIERAN_GREY};
    font-size: 120px;
    text-align: center;
    width: 200px;
    & > p {
        font-size: 20px;
    }
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

    const { countriesByContinent, continentVisits, firstTrip, lastTrip, top3Countries, tripsByYear } = user.stats

    return (
        <Container>
            <InnerContainer>
                <MainHeading>Your stats</MainHeading>
                <Top>
                    <Top3AndFirstAndLast>
                        <TopThreeCountries top3Countries={top3Countries} />
                        <FirstAndLast>
                            <FirstOrLast>
                                {firstTrip ? (
                                    <>
                                        <div>
                                            {firstTrip.visitName}
                                            <img src="/images/passport.svg" width="50" />
                                        </div>
                                        <div>
                                            <p>First Trip</p>
                                            <p>
                                                {firstTrip.name}, {moment.unix(firstTrip.startDate).format('MMM YYYY')}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <SpinnerContainer>
                                        <Spinner src={'/images/loading.gif'} />
                                    </SpinnerContainer>
                                )}
                            </FirstOrLast>
                            <FirstOrLast>
                                {lastTrip ? (
                                    <>
                                        <div>
                                            {lastTrip.visitName}
                                            <img src="/images/passport.svg" width="50" />
                                        </div>
                                        <div>
                                            <p>Latest Trip</p>
                                            <p>
                                                {lastTrip.name}, {moment.unix(lastTrip.startDate).format('MMM YYYY')}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <SpinnerContainer>
                                        <Spinner src={'/images/loading.gif'} />
                                    </SpinnerContainer>
                                )}
                            </FirstOrLast>
                        </FirstAndLast>
                    </Top3AndFirstAndLast>
                    <TotalCountries>
                        {countriesByContinent ? (
                            <>
                                <CountUp end={user.userVisitedCountries.length} duration={3.5} />
                                <p>countries visited</p>
                            </>
                        ) : (
                            <SpinnerContainer>
                                <Spinner src={'/images/loading.gif'} />
                            </SpinnerContainer>
                        )}
                    </TotalCountries>
                    <Gauge>
                        {countriesByContinent ? (
                            <>
                                <CircularProgressbar
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
                                />
                            </>
                        ) : (
                            <SpinnerContainer>
                                <Spinner src={'/images/loading.gif'} />
                            </SpinnerContainer>
                        )}
                    </Gauge>
                </Top>
                <Bottom>
                    <Continents>
                        {continentVisits.length > 1 ? (
                            <Chart
                                width={'450px'}
                                height={'250px'}
                                chartType="BarChart"
                                mapsApiKey="YAIzaSyBe80OhcYpEiTJ7xcYPySebKTUS30OW28M"
                                data={continentVisits}
                                options={CHART_OPTIONS}
                            />
                        ) : (
                            <SpinnerContainer>
                                <Spinner src={'/images/loading.gif'} />
                            </SpinnerContainer>
                        )}
                    </Continents>
                    <ByYear>
                        {tripsByYear.length > 1 ? (
                            <Chart
                                width={'450px'}
                                height={'250px'}
                                chartType="Bar"
                                data={tripsByYear}
                                options={CHART_OPTIONS}
                            />
                        ) : (
                            <SpinnerContainer>
                                <Spinner src={'/images/loading.gif'} />
                            </SpinnerContainer>
                        )}
                    </ByYear>
                </Bottom>
            </InnerContainer>
        </Container>
    )
}

const mapState = ({ user }) => ({
    user,
})

export const CONNECTED_Stats = connect(mapState)(Stats)
