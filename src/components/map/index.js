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

const calculateCountriesVisitedTo = (countries) => {
    return countries.map((country) => country['name'])
}

export const Map = ({ user }) => {
    const [mapCountries, setCountriesInMapReadableForm] = useState([['country']])

    useEffect(() => {
        setTimeout(() => {
            const calculateCountries = calculateCountriesVisitedTo(user.userVisitedCountries)
            setCountriesInMapReadableForm(mapCountries.concat([calculateCountries]))
        }, 2000)
    }, [])

    return mapCountries.length > 1 ? (
        <Container>
            <StyledChart
                width={'1000px'}
                height={'575px'}
                chartType="GeoChart"
                data={mapCountries}
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
    ) : (
        <LoadingContainer>
            <img src="/images/loading.gif" width="30" style={{ margin: 'auto' }} />
        </LoadingContainer>
    )
}

const mapState = ({ user }) => ({
    user,
})

export const CONNECTED_Map = connect(mapState)(Map)
