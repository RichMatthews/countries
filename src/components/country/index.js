import React, { useState } from 'react'
import styled from 'styled-components'

import { CountryInformation } from 'components/country-information'

const Container = styled.div`
    align-items: center;
    background: #323C46;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 107px;
    margin: 10px;
    width: 198px;
}
`

const CountryName = styled.div`
    color: #b6b6b6;
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
                <img src={country.flag} width="50" alt="flag" />
                <CountryName>{country.name}</CountryName>
                <CountryVisits>
                    {country.visits.length === 1 ? `${country.visits.length} trip` : `${country.visits.length} trips`}
                </CountryVisits>
            </Container>
            {showModal ? (
                <CountryInformation country={country} setShowModal={setShowModal} showModal={showModal} />
            ) : null}
        </>
    ) : null
}
