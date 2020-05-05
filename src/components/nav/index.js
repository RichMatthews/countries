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
    border-bottom: ${({ isselected }) => (isselected === 'true' ? '2px solid #3baba4' : 'none')};
    color: #000;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        color: #3baba4;
    }
`

const Title = styled.div`
    align-items: center;
`

const RightHandSide = styled.div`
    align-items: center;
    color: #ccc2c9;
    display: flex;
    justify-content: space-between;
    width: 300px;
`

const MAPPALink = styled(Link)`
    align-items: center;
    border: 1px solid #55aac2;
    border-radius: 40px;
    color: #55aac2;
    display: flex;
    height: 70px;
    text-align: center;
    text-decoration: none;
    width: 70px;
`

export const Nav = ({ location, logUserOut, user }) => {
    const isSelected = (path) => {
        if (location.pathname.includes(path)) {
            return 'true'
        }
        return 'false'
    }

    return (
        <Container>
            <Title>
                <MAPPALink to="/">MAPPA MUNDI</MAPPALink>
            </Title>
            <RightHandSide>
                <StyledLink isselected={isSelected('visited')} to="/visited">
                    Visited
                </StyledLink>
                <StyledLink isselected={isSelected('map')} to="/map">
                    Your Map
                </StyledLink>
                <StyledLink isselected={isSelected('login')} to="/login">
                    Account
                </StyledLink>
                {user ? <div onClick={logUserOut}>Logout</div> : null}
            </RightHandSide>
        </Container>
    )
}
