import React from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'

const Container = styled.div`
    align-items: center;    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-height: 63px;
    margin: auto;
    padding: 15px;
    width: 1100px;
}
`
const StyledLink = styled(Link)`
    border-bottom: ${({ isSelected }) => (isSelected ? '2px solid black' : 'none')};
    color: #000;
    cursor: pointer;
    text-decoration: none;
`

const Title = styled.div`
    align-items: center;
`

const MAPPA = styled.div`
    align-items: center;
    border: 1px solid #55aac2;
    border-radius: 40px;
    color: #55aac2;
    display: flex;
    height: 70px;
    text-align: center;
    width: 70px;
`

const RightHandSide = styled.div`
    align-items: center;
    color: #ccc2c9;
    display: flex;
    justify-content: space-between;
    width: 300px;
`

export const Nav = ({ location, logUserOut }) => {
    const isSelected = (path) => {
        return location.pathname.includes(path)
    }

    return (
        <Container>
            <Title>
                <MAPPA>MAPPA MUNDI</MAPPA>
            </Title>
            <RightHandSide>
                <StyledLink isSelected={isSelected('visited')} to="/visited">
                    Visited
                </StyledLink>
                <StyledLink isSelected={isSelected('map')} to="/map">
                    Your Map
                </StyledLink>
                <StyledLink isSelected={isSelected('login')} to="/login">
                    Account
                </StyledLink>
                <div onClick={logUserOut}>Logout</div>
            </RightHandSide>
        </Container>
    )
}
