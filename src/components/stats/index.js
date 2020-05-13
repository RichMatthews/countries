import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import google, { Chart } from 'react-google-charts'
import moment from 'moment'
import { fadeIn } from 'components/react-modal-adapter'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Select from 'react-select'

import { TopThreeCountries } from './top-three-countries'
import { CHART_OPTIONS } from 'components/stats/charts/options'
import { KIERAN_GREY } from 'styles'

// animation: ${fadeIn} 1s;
const Container = styled.div`
    background: #e1e3e3;
    height: 100%;
    padding-top: 50px;
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
    height: 265px;
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
    height: 110px;
    padding: 5px;
    justify-content: space-between;
    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 22px;
    }

    & > div > p {
        font-size: 10px;
    }
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
    const [continents, setContinents] = useState([['Continents', 'Visits']])
    const [continent, setContinent] = useState('Africa')

    const { countriesByContinent, continentVisits, firstTrip, lastTrip, top3Countries } = user.stats

    return (
        <Container>
            <InnerContainer>
                <Top>
                    <Top3AndFirstAndLast>
                        <TopThreeCountries top3Countries={top3Countries} />
                        <FirstAndLast>
                            <FirstOrLast>
                                {firstTrip ? (
                                    <>
                                        <div>
                                            {firstTrip.visitName}
                                            <img src="/images/passport.svg" width="35" />
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
                                            <img src="/images/passport.svg" width="35" />
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
                        {user.userVisitedCountries ? (
                            <>
                                {user.userVisitedCountries.length} <p>countries visited</p>
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
                        {continentVisits ? (
                            <Chart
                                width={'450px'}
                                height={'270px'}
                                chartType="BarChart"
                                loader={<div>Loading Chart</div>}
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
                        {continents.length > 1 ? (
                            <Chart
                                width={'450px'}
                                height={'270px'}
                                chartType="LineChart"
                                data={[
                                    ['Task', 'Something'],
                                    ['2013', 9],
                                    ['2014', 10],
                                    ['2015', 2],
                                    ['2016', 3],
                                    ['2017', 5],
                                    ['2018', 6],
                                    ['2019', 9],
                                    ['2020', 10],
                                ]}
                                options={CHART_OPTIONS}
                                rootProps={{ 'data-testid': '1' }}
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
