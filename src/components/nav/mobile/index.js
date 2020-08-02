import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled, { keyframes } from 'styled-components'
import { Link, useHistory, withRouter } from 'react-router-dom'

import { fadeInNout } from 'components/react-modal-adapter'
import { clearNotifications } from 'redux/action-creators/user/clear-notifications'
import { BRAND_COLOR, KIERAN_GREY } from 'styles'

const Container = styled.div`
    align-items:  center;
    background: ${({ location }) => (location.pathname === '/' ? '' : KIERAN_GREY)};
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    position: ${({ location }) => (location.pathname === '/' ? 'fixed' : 'fixed')};
    z-index: 1;
    width: 100%;
}
`

const StyledLinks = styled.div`
    margin-top: 150px;
    z-index: 999;
`

const StyledLink = styled(Link)`
    align-items: center;
    color: #fff;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-size: 22px;
    text-decoration: none;
    padding: 20px;

    & > img {
        margin-right: 15px;
    }
`

const Title = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;

    & > div {
        display: flex;
        align-items: center;
    }
`

const RightHandSide = styled.div`
    align-items: center;
    color: #ccc2c9;
    display: flex;
    justify-content: space-between;
    min-width: 500px;

    align-items: center;
    color: #fff;
    justify-content: center;
    height: 100%;
    min-width: 0;
`

const NotificationHandler = styled.div`
    animation: ${fadeInNout} 6.5s linear forwards;
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
        padding-top: 10px;
        margin-bottom: 10px;
    }

    & div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

const MobileProfile = styled.div`
    background-image: url(/images/nav-bg.jpg);
    box-sizing: border-box;
    color: #fff;
    height: 100%;
    position: absolute;
    width: 100%;
    opacity: 0.4;
`

const MobileImageContainer = styled.div`
    & > img {
        align-items: center;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        height: 100%;
        width: -webkit-fill-available;
    }

    & > div {
        align-items: center;
        background: red;
        border-radius: 50%;
        display: flex;
        font-size: 24px;
        height: 50px;
        justify-content: center;
        overflow: hidden;
        text-align: center;
        width: 50px;
    }
`

const MobileMenu = styled.div`
    background: #000;
    display: flex;
    flex-direction: column;
    position: absolute;
    flex-direction: column;
    height: 100vh;
    left: ${({ showMenu }) => (showMenu ? 0 : '-2500px')};

    top: 0;
    transition: 0.5s;
    width: 100%;

    & > a {
        color: #fff;
        font-size: 20px;
        padding: 20px;
    }
`

const MobileUserDetails = styled.div`
    color: #ccc;
    font-size: 13px;
    text-align: center;
    & > div:first-child {
        font-size: 20px;
        color: #fff;
    }
`

const MenuHeading = styled.div`
    font-size: 30px;
    text-transform: uppercase;
`

const UserName = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    z-index: 999;
`

const Close = styled.div`
    color: #fff;
    position: absolute;
    top: 20px;
    right: 20px;
`

const ImageLogo = styled.img`
    margin-right: 5px;
    width: 30px;
`

const TextLogo = styled.img`
    width: 100px;
`

export const Mobile = ({
    currentUser,
    clearNotifications,
    location,
    logUserOut,
    userNotifications,
    userPersonalDetails,
}) => {
    const history = useHistory()
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    if (location.pathname.includes('trips/')) {
        return null
    }

    const clearNotificationsAndRedirectToAchievementsPage = () => {
        clearNotifications()
        history.push('/achievements')
    }

    return (
        <Container location={location} user={userPersonalDetails}>
            <Title>
                <div>
                    <ImageLogo src={'/images/toucan-image-logo.svg'} alt="" />
                    <TextLogo src={'/images/toucan-text-logo.svg'} alt="" />
                </div>
                <img src="/images/menu.svg" width="25px" onClick={() => setShowMobileMenu(!showMobileMenu)} />
            </Title>
            <RightHandSide loggedIn={userPersonalDetails} user={userPersonalDetails}>
                <MobileMenu showMenu={showMobileMenu}>
                    {userPersonalDetails ? <MobileProfile user={currentUser.isLoggedIn}></MobileProfile> : null}

                    <UserName>
                        {currentUser.isLoggedIn ? (
                            <>
                                <MobileImageContainer>
                                    {userPersonalDetails.profilePhoto ? (
                                        <img
                                            src={userPersonalDetails.profilePhoto}
                                            onError={(e) => (e.target.src = '/images/account.svg')}
                                            alt=""
                                        />
                                    ) : (
                                        <div>
                                            {userPersonalDetails.displayName &&
                                                userPersonalDetails.displayName
                                                    .split(' ')[0][0]
                                                    .concat(userPersonalDetails.displayName.split(' ')[1][0])}
                                        </div>
                                    )}
                                </MobileImageContainer>
                                <MobileUserDetails>
                                    <div>{userPersonalDetails.displayName}</div>
                                    <div>Standard user</div>
                                </MobileUserDetails>
                            </>
                        ) : (
                            <MenuHeading>Menu</MenuHeading>
                        )}
                    </UserName>
                    <StyledLinks>
                        <StyledLink onClick={() => setShowMobileMenu(false)} to="/visited">
                            <div>Visited</div>
                        </StyledLink>
                        <StyledLink onClick={() => setShowMobileMenu(false)} to="/map">
                            <div>Your Map</div>
                        </StyledLink>
                        <StyledLink onClick={() => setShowMobileMenu(false)} to="/stats">
                            <div>Stats</div>
                        </StyledLink>
                        <StyledLink onClick={() => setShowMobileMenu(false)} to="/achievements">
                            <div>Achievements</div>
                        </StyledLink>
                        <StyledLink onClick={() => setShowMobileMenu(false)} to="/account">
                            <div>Account & Settings</div>
                        </StyledLink>
                        <StyledLink
                            onClick={currentUser.isLoggedIn ? () => logUserOut() : () => setShowMobileMenu(false)}
                            to={currentUser.isLoggedIn ? '/' : '/login'}
                        >
                            <div>{currentUser.isLoggedIn ? 'Logout' : 'Login'}</div>
                        </StyledLink>
                        <Close onClick={() => setShowMobileMenu(false)}>
                            <img src="/images/close.svg" width="25" />
                        </Close>
                    </StyledLinks>
                </MobileMenu>
            </RightHandSide>
            {userNotifications.length > 0 ? (
                <NotificationHandler onClick={clearNotificationsAndRedirectToAchievementsPage}>
                    <div>{userNotifications[0].message}</div>
                    <div>
                        {userNotifications[0].title}
                        <img src="/images/trophy.png" width="20" alt="" />
                    </div>
                </NotificationHandler>
            ) : null}
        </Container>
    )
}

const mapState = ({ currentUser, userNotifications, userPersonalDetails }) => ({
    currentUser,
    userPersonalDetails,
    userNotifications,
})

const mapDispatch = {
    clearNotifications,
}

export const MobileNavContainer = compose(withRouter, connect(mapState, mapDispatch))(Mobile)
