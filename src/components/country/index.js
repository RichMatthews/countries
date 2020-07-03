import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
    align-items: center;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(41,51,57,.5);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
    height: 300px;
    width: 300px;

    @media (max-width: 700px) {
        height: 170px;
        width: 170px;
     }
}
`

const CountryName = styled.div`
    color: #fff;
    font-size: 23px;
    font-weight: 900;
    overflow: hidden;
    margin-top: 200px;
    margin-left: 20px;
    text-overflow: ellipsis;
    text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
    white-space: nowrap;
    width: 150px;

    & > img {
        margin-left: 5px;
        width: 30px;
    }

    @media (max-width: 700px) {
        font-size: 20px;
        margin-top: 100px;
        margin-left: 10px;
    }
`

const CountryNameAndFlag = styled.div`
    display: flex;
    padding-right: 10px;
    flex-direction: column;
    justify-content: space-around;
`

const CountryVisitsAndFlag = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

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
    background-image: ${({ country }) =>
        `url(https://dl6ghv8ryvhmk.cloudfront.net/countries/landscape/${country}.jpg), url(https://dl6ghv8ryvhmk.cloudfront.net/countries/landscape/generic.jpg)`};
    background-size: 450px;
    background-repeat: no-repeat;
    border-radius: 10px;
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 700px) {
        border-radius: 10px;
        background-position: center;
        background-size: 305px;
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
`

export const Country = ({ country }) => {
    return country ? (
        <StyledLink to={`/trips/${country.countryCode}`}>
            <Container>
                <InnerContainer country={country.countryCode}>
                    <CountryNameAndFlag>
                        <CountryName>{country.name}</CountryName>
                        <CountryVisitsAndFlag />
                    </CountryNameAndFlag>
                </InnerContainer>
            </Container>
        </StyledLink>
    ) : null
}
