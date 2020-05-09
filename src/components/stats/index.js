import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { sortBy } from 'underscore'
import google, { Chart } from 'react-google-charts'

import { fadeIn } from 'components/react-modal-adapter'

const Container = styled.div`
    animation: ${fadeIn} 1s;
    margin: auto;
    width: 1000px;
`

const StatComponent = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);
`

const Top = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
`

const Top3 = styled(StatComponent)`
    padding: 30px;
    width: 210px;

    & > div {
        margin: 10px;
    }
`

const Continents = styled(StatComponent)`
    padding: 0;

    & > div {
        margin: 10px;
    }
`

const FirstAndLast = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 200px;
`

const First = styled(StatComponent)``

const Last = styled(StatComponent)``

const ByYear = styled(StatComponent)`
    padding: 0;
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

export const Stats = ({ user }) => {
    const [topThreeCountries, setTopThree] = useState([])
    const [continents, setContinents] = useState([['Continents', 'Visits']])

    useEffect(() => {
        const calculatedTop3 = calculateTopThreeCountries(user.userVisitedCountries)
        setTopThree(calculatedTop3)
        const calculateContinents = calculateContinentsVisits(user.userVisitedCountries)
        setContinents(continents.concat(calculateContinents))
    }, [])

    return (
        <Container>
            <Top>
                <Top3>
                    <h4>Top 3 Most Visited Countries</h4>
                    {topThreeCountries.map((country, index) => (
                        <div>
                            {index + 1}.{country.name} ({country.visits.length} visits)
                        </div>
                    ))}
                </Top3>

                <FirstAndLast>
                    <First>First Trip</First>
                    <Last>Last Trip</Last>
                </FirstAndLast>
                <div>placeholder</div>
            </Top>
            <Bottom>
                <Continents>
                    <Chart
                        width={'450px'}
                        height={'300px'}
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
                            chartArea: { width: '60%' },
                            hAxis: {
                                minValue: 0,
                            },
                            legend: { position: 'none' },
                            title: 'Continents by visits',
                            vAxis: {},
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '1' }}
                    />
                </Continents>
                <ByYear>
                    <Chart
                        width={'450px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Task', 'Something'],
                            ['2010', 4],
                            ['2011', 6],
                            ['2012', 8],
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
                            title: 'Countries by year',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </ByYear>
            </Bottom>
        </Container>
    )
}

const mapState = ({ user }) => ({
    user,
})

export const CONNECTED_Stats = connect(mapState)(Stats)
