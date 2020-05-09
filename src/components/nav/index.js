import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from '@reach/router'

import { BRAND_COLOR } from 'styles'

const Container = styled.div`
    align-items: center;    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-height: 63px;
    margin: auto;
    margin-bottom: 20px;
    padding: 15px;
    width: 1100px;
}
`
const StyledLink = styled(Link)`
    border-bottom: ${({ isselected }) => (isselected === 'true' ? `2px solid ${BRAND_COLOR}` : 'none')};
    color: #ccc2c9;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        color: ${BRAND_COLOR};
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
    width: 350px;
`

const MAPPALink = styled(Link)`
    align-items: center;
    border: 1px solid #ccc2c9;
    border-radius: 40px;
    color: #ccc2c9;
    display: flex;
    height: 70px;
    text-align: center;
    text-decoration: none;
    width: 70px;
`

const LogOutInBtn = styled.div`
    cursor: pointer;
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
                <StyledLink isselected={isSelected('stats')} to="/stats">
                    Stats
                </StyledLink>
                <StyledLink isselected={isSelected('login')} to="/login">
                    Account
                </StyledLink>
                {user.isLoggedIn ? (
                    <LogOutInBtn onClick={logUserOut}>Logout</LogOutInBtn>
                ) : (
                    <LogOutInBtn>Login</LogOutInBtn>
                )}
            </RightHandSide>
        </Container>
    )
}

const mapState = ({ user }) => ({
    user,
})

export const CONNECTED_Nav = connect(mapState)(Nav)
