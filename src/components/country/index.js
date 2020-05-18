import React, { useState } from 'react'
import styled from 'styled-components'

import { CountryInformation } from 'components/country-information'

const Container = styled.div`
    align-items: center;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 4px rgba(41,51,57,.5);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70px;
    margin: 10px;
}
`

const CountryName = styled.div`
    color: #b6b6b6;
    font-size: 32px;
    font-weight: 900;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 350px;
`

const CountryVisitsAndFlag = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 256px;
`

const InnerContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const ImageContainer = styled.div`
    display: flex;
    height: 80px;
    width: 106px;

    & > img {
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        width: 100%;
    }
`

export const Country = ({ country, selectedContinent }) => {
    const [showModal, setShowModal] = useState(false)

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
                    <ImageContainer>
                        <img
                            src={`/images/countries/${country.name}.jpg`}
                            loading="lazy"
                            onError={(e) => (e.target.src = '/images/generic.webp')}
                            alt=""
                        />
                    </ImageContainer>
                </InnerContainer>
            </Container>
            {showModal ? (
                <CountryInformation country={country} setShowModal={setShowModal} showModal={showModal} />
            ) : null}
        </>
    ) : null
}
