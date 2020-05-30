import React, { useState } from 'react'
import styled from 'styled-components'

import { CONNECTED_COUNTRY_INFORMATION } from 'components/country-information'
import { KIERAN_GREY } from 'styles'

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

    @media (max-width: 700px) {
        height: 40px;
     }
}
`

const CountryName = styled.div`
    color: #b6b6b6;
    font-size: 32px;
    font-weight: 900;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 700px) {
        color: ${KIERAN_GREY};
        font-size: 24px;
    }
`

const CountryVisitsAndFlag = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 256px;

    & > img {
        width: 50px;
    }

    @media (max-width: 700px) {
        color: #b6b6b6;
        margin-top: 5px;
        & > div {
            margin-left: 10px;
        }
        & > img {
            width: 32px;
        }
        width: auto;
    }
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

    @media (max-width: 700px) {
        & > img {
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
        }
        height: 55px;
        width: 80px;
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
                            <img src={country.flag} alt="flag" />
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
                            src={`https://dl6ghv8ryvhmk.cloudfront.net/countries/${country.trimmed}.jpg`}
                            loading="lazy"
                            onError={(e) =>
                                (e.target.src = 'https://dl6ghv8ryvhmk.cloudfront.net/countries/generic.jpg')
                            }
                            alt=""
                        />
                    </ImageContainer>
                </InnerContainer>
            </Container>
            {showModal ? (
                <CONNECTED_COUNTRY_INFORMATION country={country} setShowModal={setShowModal} showModal={showModal} />
            ) : null}
        </>
    ) : null
}
