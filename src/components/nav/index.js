import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from 'styled-components'
import { Link, useHistory, withRouter } from 'react-router-dom'

import { fadeIn } from 'components/react-modal-adapter'
import { clearNotifications } from 'redux/action-creators/user/clear-notifications'
import { BRAND_COLOR, KIERAN_GREY } from 'styles'

const Container = styled.div`
    align-items:  ${({ user }) => (user ? 'flex-start' : 'center')};
    background:  ${({ location }) => (location.pathname === '/' ? '' : KIERAN_GREY)};
    box-sizing: border-box;
    box-shadow:  ${({ location }) => (location.pathname === '/' ? 'none' : '0 2px 6px 0 rgba(0,0,0,0.5)')}; 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 75px;
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

const StyledLoginLink = styled(StyledLink)`
    border-bottom: none;
    display: flex;
    justify-content: flex-end;
    min-width: 150px;
`

const Title = styled.div`
    align-items: center;
`

const RightHandSide = styled.div`
    align-items: flex-end;
    color: #ccc2c9;
    display: flex;
    justify-content: space-between;
    min-width: 500px;

    & > div {
        display: flex;
        justify-content: space-evenly;
    }
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
    font-size: 10px;
    padding: 5px 5px 1px 5px;
`

const Dropdown = styled.div`
    background: #fff;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #000;
    display: none;
    padding: 5px 5px 0 5px;
    position: absolute;
    width: 144px;
    top: 49px;

    > * {
        margin: 10px;
    }
`

const AccountAndWelcomeLink = styled.div`
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    color: #fff;
    min-width: 150px;
    padding: 2px 2px 0 2px;

    &:hover {
        background: #fff;
        color: ${KIERAN_GREY};
    }

    &:hover :nth-child(2) {
        display: flex;
        flex-direction: column;
    }
`

const NotificationHandler = styled.div`
    animation: ${fadeIn} 2s;
    background: ${KIERAN_GREY};
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    width: 220px;
    padding: 15px;
    position: absolute;
    right: 20px;
    top: 100px;

    & div:first-child {
        border-bottom: 1px solid #ccc;
        padding-top: 10px;
        margin-bottom: 10px;
    }

    & div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

const ProfilePhoto = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const ImageContainer = styled.div`
    width: 30px;
    height: 30px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;

    & > img {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: -webkit-fill-available;
    }
`
export const Nav = ({ clearNotifications, location, logUserOut, newUser, user }) => {
    const history = useHistory()
    const isSelected = (path) => {
        if (location.pathname.includes(path)) {
            return 'true'
        }
        return 'false'
    }

    const clearNotificationsAndRedirectToAchievementsPage = () => {
        clearNotifications()
        history.push('/achievements')
    }

    return (
        <Container location={location} user={newUser}>
            <Title>
                <img src={'/images/globe.svg'} width="30" />
                <MAPPALink to="/">MAPPA MUNDI</MAPPALink>
            </Title>
            <RightHandSide loggedIn={newUser} user={newUser}>
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
                        <ProfilePhoto>
                            <ImageContainer>
                                <img src={newUser.photoURL} onError={(e) => (e.target.src = '/images/account.svg')} />
                            </ImageContainer>
                            <Welcome>
                                <div>Welcome, {newUser.displayName.split(' ')[0]}</div>
                                <div>Account & settings</div>
                            </Welcome>
                        </ProfilePhoto>
                        <Dropdown>
                            <StyledAccountLink to="/account">Account</StyledAccountLink>
                            <LogOutBtn onClick={logUserOut}>Logout</LogOutBtn>
                        </Dropdown>
                    </AccountAndWelcomeLink>
                ) : (
                    <StyledLoginLink isselected={isSelected('login')} to="/login">
                        <div>Login</div>
                    </StyledLoginLink>
                )}
            </RightHandSide>
            {user.notifications.length > 0 ? (
                <NotificationHandler onClick={clearNotificationsAndRedirectToAchievementsPage}>
                    <div>{user.notifications[0].message}</div>
                    <div>
                        {user.notifications[0].title}
                        <img src="/images/trophy.png" width="20" alt="" />
                    </div>
                </NotificationHandler>
            ) : null}
        </Container>
    )
}

const mapState = ({ user }) => ({
    user,
})

const mapDispatch = {
    clearNotifications,
}

export const CONNECTED_Nav = compose(withRouter, connect(mapState, mapDispatch))(Nav)
