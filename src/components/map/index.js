import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { createHttpObservable } from 'utils/'
import { Chart } from 'react-google-charts'

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
`

export const Map = () => {
    const [countries, setCountries] = useState([[]])

    useEffect(() => {
        getCountries()
    }, [])

    const getCountries = async () => {
        const http$ = createHttpObservable('/api/visited')
        return http$.subscribe((data) => updateCountriesOnMount(data))
    }

    const updateCountriesOnMount = (countriesList) => {
        const newArr = [['Country']]
        countriesList.forEach((country) => {
            newArr.push([country.name])
        })
        setCountries(newArr)
    }

    return (
        <Container>
            <Chart
                width={'1000px'}
                height={'600px'}
                chartType="GeoChart"
                data={countries}
                mapsApiKey="scrambled"
                rootProps={{ 'data-testid': '1' }}
                options={{
                    defaultColor: '#55aac2',
                }}
            />
        </Container>
    )
}
