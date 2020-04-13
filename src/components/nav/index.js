import React from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'

const Container = styled.div`
    align-items: center;    
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    max-height: 63px;
    padding: 15px;
}
`

const Search = styled.input`
    width: 250px;
    height: 20px;
    border-radius: 6px;
    background: transparent;
    border: 1px solid #68e7d8;
    color: #68e7d8;
    padding: 5px;

    ::placeholder {
        color: #68e7d8;
    }
`

const Country = styled.div`
    padding: 5px;
`

const CountriesList = styled.div`
    background: transparent;
    border: 1px solid;
    border-top: none;
    color: #68e7d8;
    position: absolute;
    width: 260px;
`

const VisitedLink = styled(Link)`
    color: #68e7d8;
    cursor: pointer;
    text-decoration: none;
`

const Title = styled.div`
    align-items: center;
    width: 180px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
`
const RightHandSide = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 500px;
`

const MAPPA = styled.div`
    align-items: center;
    background: #68e7d8;
    border-radius: 40px;
    color: #000;
    display: flex;
    height: 70px;
    text-align: center;
    width: 70px;
`

export const Nav = ({ countries, setCountriesHelper, setSelectedCountryHelper }) => {
    return (
        <Container>
            <Title>
                <MAPPA>MAPPA MUNDI</MAPPA>
            </Title>
            <RightHandSide>
                <div>
                    <Search onChange={(e) => setCountriesHelper(e.target.value)} placeholder="search for a country" />
                    <CountriesList>
                        {countries.map((country) => (
                            <Country onClick={() => setSelectedCountryHelper(country)}>{country.name}</Country>
                        ))}
                    </CountriesList>
                </div>
                <div>
                    <VisitedLink to="/visited">Visited</VisitedLink>
                </div>
                <div style={{ color: '#68e7d8' }}>Map</div>
            </RightHandSide>
        </Container>
    )
}
