import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background: #000;
    border: 1px solid #68e7d8;
    color: #68e7d8;
    display: flex;
    justify-content: space-between;
    margin: 2px;
    padding: 10px;
    width: 600px;
`

const LeftHandSide = styled.div`
    padding: 4px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 150px;
`

const Country_ = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
`

export const Country = ({ country }) =>
    country ? (
        <Container>
            <LeftHandSide>
                <img src={country.flag} width="30" height="20" />
                <Country_>{country.name}</Country_>
            </LeftHandSide>
            <img src={'/images/dropdown.svg'} width="15" />
        </Container>
    ) : null
