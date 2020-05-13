import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'

import { BRAND_COLOR, KIERAN_GREY } from 'styles'

const Container = styled.div`
    align-items:  ${({ user }) => (user.details.isLoggedIn ? 'flex-start' : 'center')};
    background:  ${({ location }) => (location.pathname === '/' ? '' : KIERAN_GREY)};
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 75px ;
    padding: 15px;
    position:  ${({ location }) => (location.pathname === '/' ? 'absolute' : 'relative')};
    z-index: 1;
    width: 100%;
}
`
const StyledLink = styled(Link)`
    border-bottom: ${({ isselected }) => (isselected === 'true' ? `2px solid ${BRAND_COLOR}` : 'none')};
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    text-decoration: none;

    &:hover {
        color: ${BRAND_COLOR};
    }
`

const StyledAccountLink = styled(StyledLink)`
    color: #000;
`

const Title = styled.div`
    align-items: center;
    height: 100%;
`

const RightHandSide = styled.div`
    align-items: flex-end;
    color: #ccc2c9;
    display: flex;
    justify-content: space-between;
    width: 450px;
`

const MAPPALink = styled(Link)`
    align-items: center;
    color: #fff;
    display: flex;
    justify-content: center;
    height: 100%;
    text-align: center;
    text-decoration: none;
`

const LogOutBtn = styled.div`
    cursor: pointer;
`

const Welcome = styled.div`
    color: #fff;
    font-size: 10px;
    padding: 5px 5px 1px 5px;
    width: 125px;
`

const Dropdown = styled.div`
    background: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #000;
    display: none;
    padding: 5px 5px 0 5px;
    position: absolute;
    width: 125px;

    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;

    > * {
        margin: 10px;
    }
`

const AccountAndWelcomeLink = styled.div`
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    &:hover {
        background: #fff;
        color: #000;
    }

    &:hover :nth-child(2) {
        display: flex;
        flex-direction: column;
    }
`

export const Nav = ({ location, logUserOut, newUser, user }) => {
    const isSelected = (path) => {
        if (location.pathname.includes(path)) {
            return 'true'
        }
        return 'false'
    }

    return (
        <Container location={location} user={user}>
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
                <StyledLink isselected={isSelected('achievements')} to="/achievements">
                    Achievements
                </StyledLink>

                {newUser ? (
                    <AccountAndWelcomeLink>
                        <Welcome>
                            <div>Welcome, {newUser.displayName.split(' ')[0]}</div>
                            <div style={{ fontSize: '13px' }}>Account & settings</div>
                        </Welcome>
                        <Dropdown>
                            <StyledAccountLink to="/account">Account</StyledAccountLink>
                            <LogOutBtn onClick={logUserOut}>Logout</LogOutBtn>
                        </Dropdown>
                    </AccountAndWelcomeLink>
                ) : (
                    <StyledLink isselected={isSelected('login')} to="/login">
                        Login
                    </StyledLink>
                )}
            </RightHandSide>
        </Container>
    )
}

const mapState = ({ user }) => ({
    user,
})

export const CONNECTED_Nav = compose(withRouter, connect(mapState))(Nav)
