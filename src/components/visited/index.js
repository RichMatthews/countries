import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Country } from 'components/country'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Total = styled.div`
    align-items: center;
    display: flex;
    font-size: 25px;
    justify-content: center;
    color: #68e7d8;
    height: 55px;
    width: 55px;
`

export const Visited = () => {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        getCountries()
    }, [])

    const getCountries = async () => {
        await fetch('/api/visited')
            .then((data) => data.json())
            .then((data) => setCountries(data.payload))
    }

    return (
        <Container>
            <Total>{countries.length}/195</Total>
            <div>{countries && countries.map((country) => <Country country={country} />)}</div>
        </Container>
    )
}
