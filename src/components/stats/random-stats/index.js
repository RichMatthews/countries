import React, { useEffect } from 'react'
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
    width: 100%;
    font-size: 14px;
`

const MilesTravelled = styled(Section)`
    background-image: url(/images/stats/old-map.jpg);
    background-size: 100%;
    background-repeat: no-repeat;
    color: #fff;
    font-size: 40px;
    height: 24vh;
`

const PercentageOfTheWorld = styled(Section)`
    width: 41vw;
`

const FurthestTrip = styled(Section)`
    width: 41vw;
`

const CapitalCities = styled(Section)`
    color: #fff;
    width: 41vw;
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
export const RandomStats = ({ user }) => {
    useEffect(() => {}, [user])

    return (
        <Container>
            <MilesTravelled>
                <div>
                    <CountUp end={10240} duration={3} />
                </div>
                <div>miles travelled</div>
            </MilesTravelled>
            <GaugeContainer>
                <PercentageOfTheWorld>
                    <Heading>Percentage of the world</Heading>
                    <CircularProgressbar
                        value={17}
                        text={'17%'}
                        styles={buildStyles({ textSize: '20px', textColor: '#fff', pathColor: '#54ADA7' })}
                    />
                </PercentageOfTheWorld>
                <FurthestTrip>
                    <Heading>Furthest trip</Heading>
                    <CircularProgressbar
                        value={17}
                        text={'17'}
                        styles={buildStyles({ textSize: '20px', textColor: '#fff', pathColor: '#54ADA7' })}
                    />
                </FurthestTrip>
                <CapitalCities>
                    <Heading>Capital Cities</Heading>
                    <CircularProgressbar
                        value={17}
                        text={'17'}
                        styles={buildStyles({ textSize: '20px', textColor: '#fff', pathColor: '#54ADA7' })}
                    />
                </CapitalCities>
                <CapitalCities>
                    <Heading>Capital Cities</Heading>
                    <CircularProgressbar
                        value={17}
                        text={'17'}
                        styles={buildStyles({ textSize: '20px', textColor: '#fff', pathColor: '#54ADA7' })}
                    />
                </CapitalCities>
            </GaugeContainer>
        </Container>
    )
}

const mapState = ({ user }) => ({
    user,
})

const mapDispatch = {
    getMostVisitedCountry,
}

export const ConnectedRandomStats = connect(mapState, mapDispatch)(RandomStats)
