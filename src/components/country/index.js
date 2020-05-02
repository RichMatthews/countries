import React, { useState } from 'react'
import styled from 'styled-components'

import { CountryInformation } from 'components/country-information'

const Container = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;
    margin: 20px;
    width: 125px;
`

const CountryName = styled.div`
    font-size: 18px;
    font-weight: 900;
    margin-top: 10px;
`

const CountryVisits = styled.div`
    color: #b6b6b6;
    font-size: 14px;
`
export const Country = ({ country, selectedContinent }) => {
    const [showModal, setShowModal] = useState(false)

    return country ? (
        <>
            <Container onClick={() => setShowModal(true)} selectedContinent={selectedContinent === country.continent}>
                <img src={country.flag} width="50" />
                <CountryName>{country.name}</CountryName>
                <CountryVisits>{country.visits.length} trips</CountryVisits>
            </Container>
            {showModal ? (
                <CountryInformation country={country} setShowModal={setShowModal} showModal={showModal} />
            ) : null}
        </>
    ) : null
}
