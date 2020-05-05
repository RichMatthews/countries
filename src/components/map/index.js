import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Chart } from 'react-google-charts'
import { shuffle } from 'underscore'

import { createHttpObservable } from 'utils/'

const Container = styled.div`
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

export const Map = ({ userVisitedCountries }) => {
    const [countries, setCountries] = useState([[]])
    const [loaded, setLoaded] = useState()

    useEffect(() => {
        setCountries(userVisitedCountries)
        setLoaded(true)
    }, [])

    if (!loaded) {
        return (
            <LoadingContainer>
                <img src="/images/loading.gif" width="30" style={{ margin: 'auto' }} />
            </LoadingContainer>
        )
    }

    return (
        <Container>
            Feature coming soon!
            {/* <Chart
                width={'1000px'}
                height={'600px'}
                chartType="GeoChart"
                data={countries}
                mapsApiKey="YAIzaSyBe80OhcYpEiTJ7xcYPySebKTUS30OW28M"
                rootProps={{ 'data-testid': '1' }}
                options={{
                    defaultColor: '#55aac2',
                    animation: {
                        startup: true,
                        duration: 2500,
                    },
                }}
            /> */}
        </Container>
    )
}
