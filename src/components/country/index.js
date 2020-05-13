import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Unsplash, { toJson } from 'unsplash-js'

import { CountryInformation } from 'components/country-information'

const Container = styled.div`
    align-items: center;
    background: #fff;
    border: 1px solid #D1D8E2;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;
    margin: 10px;
    padding: 10px;
    width: 500px;
}
`

const CountryName = styled.div`
    color: #b6b6b6;
    font-size: 40px;
    font-weight: 900;
`

const CountryVisitsAndFlag = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 250px;
`

const InnerContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export const Country = ({ country, selectedContinent }) => {
    const [showModal, setShowModal] = useState(false)
    const [photo, setPhoto] = useState(null)

    const unsplash = new Unsplash({ accessKey: '5VWcfNZ9F0J2u0yi4Ll1LDAoxLHTJ2gEVAaZgh1bg94' })
    useEffect(() => {
        wait()
    }, [])

    const wait = async () => {
        const photo = await unsplash.search
            .photos(country.name, 1, 5, { orientation: 'landscape' })
            .then(toJson)
            .then((json) => {
                setPhoto(json['results'][0].urls.full)
            })
    }

    return country ? (
        <>
            <Container onClick={() => setShowModal(true)} selectedContinent={selectedContinent === country.continent}>
                <InnerContainer>
                    <div>
                        <CountryName>{country.name}</CountryName>
                        <CountryVisitsAndFlag>
                            <img src={country.flag} width="50" alt="flag" />
                            <div>
                                You've travelled here{' '}
                                {country.visits.length === 1
                                    ? `${country.visits.length} time`
                                    : `${country.visits.length} times`}
                            </div>
                        </CountryVisitsAndFlag>
                    </div>
                    <img src={photo} width="120" />
                </InnerContainer>
            </Container>
            {showModal ? (
                <CountryInformation country={country} setShowModal={setShowModal} showModal={showModal} />
            ) : null}
        </>
    ) : null
}
