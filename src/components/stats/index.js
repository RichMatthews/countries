import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { sortBy } from 'underscore'
import google, { Chart } from 'react-google-charts'
import moment from 'moment'
import { fadeIn } from 'components/react-modal-adapter'

const Container = styled.div`
    animation: ${fadeIn} 1s;
    margin: auto;
    width: 1000px;
`

const StatComponent = styled.div`
    background: #323c46;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);
    color: #ccc;
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const Top = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 470px;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
`

const Top3 = styled(StatComponent)`
    display: flex;
    height: 240px;
    padding: 10px;
    width: 210px;
`

const Continents = styled(StatComponent)`
    height: 200px;
    min-width: 470px;
    padding: 0;
`

const FirstAndLast = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 220px;
`

const First = styled(StatComponent)`
    display: flex;
    height: 80px;
    padding: 10px;
`

const Last = styled(StatComponent)`
    display: flex;
    height: 80px;
    padding: 10px;
`

const ByYear = styled(Continents)``

const Spinner = styled.img`
    width: 30px;
`

const SpinnerContainer = styled.div`
    margin: auto;
`

const calculateTopThreeCountries = (countries) => {
    const sortedCountries = sortBy(countries, (country) => {
        return country.visits.length
    })

    return sortedCountries.reverse().slice(0, 3)
}

const calculateContinentsVisits = (countries) => {
    let continents = {
        Africa: 0,
        Asia: 0,
        Europe: 0,
        'North America': 0,
        Oceania: 0,
        'South America': 0,
    }
    countries.forEach((country) => {
        continents[country.continent] += 1
    })

    return Object.entries(continents)
}

const calculateFirstTrip = (countries) => {
    let num = 20000000000000
    let countryToReturn = null
    countries.forEach((country) => {
        country.visits.forEach((visit) => {
            if (visit.startDate < num) {
                num = visit.startDate
                countryToReturn = country
            }
        })
    })
    return { name: countryToReturn.name, startDate: countryToReturn.visits[0].startDate }
}

const calculateLastTrip = (countries) => {
    let num = 0
    let countryToReturn = null
    countries.forEach((country) => {
        country.visits.forEach((visit) => {
            if (visit.startDate > num) {
                num = visit.startDate
                countryToReturn = country
            }
        })
    })
    return { name: countryToReturn.name, startDate: countryToReturn.visits[0].startDate }
}

export const Stats = ({ user }) => {
    const [topThreeCountries, setTopThree] = useState(null)
    const [continents, setContinents] = useState([['Continents', 'Visits']])
    const [firstCountry, setFirstCountry] = useState(null)
    const [lastCountry, setLastCountry] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            const calculatedTop3 = calculateTopThreeCountries(user.userVisitedCountries)
            setTopThree(calculatedTop3)
            const calculateContinents = calculateContinentsVisits(user.userVisitedCountries)
            setContinents(continents.concat(calculateContinents))
            const calcFirstTrip = calculateFirstTrip(user.userVisitedCountries)
            setFirstCountry(calcFirstTrip)
            const calcLastTrip = calculateLastTrip(user.userVisitedCountries)
            setLastCountry(calcLastTrip)
        }, 3000)
    }, [])

    return (
        <Container>
            <Top>
                <Top3>
                    {topThreeCountries ? (
                        <>
                            <h4>Top 3 Most Visited Countries</h4>
                            {topThreeCountries.map((country, index) => (
                                <div>
                                    {index + 1}.{country.name} ({country.visits.length} visits)
                                </div>
                            ))}
                        </>
                    ) : (
                        <SpinnerContainer>
                            <Spinner src={'/images/loading.gif'} />
                        </SpinnerContainer>
                    )}
                </Top3>

                <FirstAndLast>
                    <First>
                        {firstCountry ? (
                            <>
                                <h4>First Trip</h4>
                                <div>
                                    {firstCountry.name} - {moment.unix(firstCountry.startDate).format('MMM YYYY')}
                                </div>
                            </>
                        ) : (
                            <SpinnerContainer>
                                <Spinner src={'/images/loading.gif'} />
                            </SpinnerContainer>
                        )}
                    </First>
                    <Last>
                        {lastCountry ? (
                            <>
                                <h4>Last Trip</h4>
                                <div>
                                    {lastCountry.name} - {moment.unix(lastCountry.startDate).format('MMM YYYY')}
                                </div>
                            </>
                        ) : (
                            <SpinnerContainer>
                                <Spinner src={'/images/loading.gif'} />
                            </SpinnerContainer>
                        )}
                    </Last>
                </FirstAndLast>
            </Top>
            <Bottom>
                <Continents>
                    {continents.length > 1 ? (
                        <Chart
                            width={'450px'}
                            height={'180px'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            mapsApiKey="YAIzaSyBe80OhcYpEiTJ7xcYPySebKTUS30OW28M"
                            data={continents}
                            options={{
                                animation: {
                                    startup: true,
                                    easing: 'linear',
                                    duration: 1000,
                                },
                                backgroundColor: '#323c46',
                                colors: ['#54e1e8'],
                                chartArea: {
                                    backgroundColor: {
                                        fill: '#323c46',
                                        opacity: 0.8,
                                    },
                                },
                                chartArea: { width: '60%' },
                                hAxis: {
                                    textStyle: {
                                        color: '#ccc',
                                    },
                                    minValue: 0,
                                },
                                legend: { position: 'none' },
                                title: 'Continents by visits',
                                titleTextStyle: { color: '#ccc', fontSize: 20 },
                                vAxis: {
                                    textStyle: {
                                        color: '#ccc',
                                    },
                                },
                            }}
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
                            height={'180px'}
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
                            options={{
                                animation: {
                                    startup: true,
                                    easing: 'linear',
                                    duration: 1000,
                                },
                                backgroundColor: '#323c46',
                                colors: ['#54e1e8'],
                                chartArea: {
                                    backgroundColor: {
                                        fill: '#323c46',
                                        opacity: 1,
                                    },
                                },
                                legend: { position: 'none' },
                                title: 'Countries by year',
                                titleTextStyle: { color: '#ccc', fontSize: 20 },
                                hAxis: {
                                    textStyle: {
                                        color: '#ccc',
                                    },
                                },
                                vAxis: {
                                    textStyle: {
                                        color: '#ccc',
                                    },
                                },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    ) : (
                        <SpinnerContainer>
                            <Spinner src={'/images/loading.gif'} />
                        </SpinnerContainer>
                    )}
                </ByYear>
            </Bottom>
        </Container>
    )
}

const mapState = ({ user }) => ({
    user,
})

export const CONNECTED_Stats = connect(mapState)(Stats)
