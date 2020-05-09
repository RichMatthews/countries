import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Chart } from 'react-google-charts'
import { connect } from 'react-redux'

import { fadeIn } from 'components/react-modal-adapter'

const Container = styled.div`
    animation: ${fadeIn} 2s;
    display: flex;
    justify-content: center;
    margin: auto;
`

const LoadingContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 200px;
`

const StyledChart = styled(Chart)`
    & > * {
        stroke: red !important;
    }
`

export const Map = ({ user }) => {
    const [mapCountries, setCountriesInMapReadableForm] = useState([['country']])
    const [loaded, setLoaded] = useState()

    useEffect(() => {
        // setCountriesInMapReadableForm(mapCountries.concat(user.userVisitedCountries))
        setLoaded(true)
    }, [])

    if (!loaded) {
        return (
            <LoadingContainer>
                <img src="/images/loading.gif" width="30" style={{ margin: 'auto' }} />
            </LoadingContainer>
        )
    }

    const testCountries = [['Country'], ['Australia'], ['Belgium'], ['India'], ['Ukraine']]

    return (
        <Container>
            <StyledChart
                width={'1000px'}
                height={'575px'}
                chartType="GeoChart"
                data={testCountries}
                mapsApiKey="YAIzaSyBe80OhcYpEiTJ7xcYPySebKTUS30OW28M"
                rootProps={{ 'data-testid': '1' }}
                options={{
                    backgroundColor: 'transparent',
                    defaultColor: '#55aac2',
                    animation: {
                        startup: true,
                        duration: 2500,
                    },
                }}
            />
        </Container>
    )
}

const mapState = ({ user }) => ({
    user,
})

export const CONNECTED_Map = connect(mapState)(Map)
