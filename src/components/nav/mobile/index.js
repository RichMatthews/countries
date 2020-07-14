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
    padding: 15px;
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

    & > :first-child {
        display: flex;
    }
    & > :not(:first-child) {
        display: none;
    }
`

const MAPPALink = styled(Link)`
    align-items: center;
    color: #fff;
    display: flex;
    justify-content: center;
    text-align: center;
    text-decoration: none;

    @media (min-width: 700px) {
        font-size: 15px;
    }
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
    font-size: 20px;
    height: 100%;
    position: absolute;
    width: 100%;
    opacity: 0.4;
`

const ImageContainer = styled.div`
    width: 60px;
    height: 60px;
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

const MobileImageContainer = styled(ImageContainer)`
    height: 50px;
    width: 50px;
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
    margin-left: 10px;
    font-size: 13px;
    text-align: center;
    & > div:first-child {
        font-size: 20px;
        color: #fff;
    }
`

const Image = styled.img`
    width: 30px;
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
                {/* <img src={'/images/globe.svg'} width="30" alt="" /> */}
                <MAPPALink to="/">Travel Toucan</MAPPALink>
            </Title>
            <RightHandSide loggedIn={userPersonalDetails} user={userPersonalDetails}>
                <div>
                    <div onClick={() => setShowMobileMenu(!showMobileMenu)}>
                        <img src="/images/menu.svg" width="30px" />
                    </div>
                    <MobileMenu showMenu={showMobileMenu}>
                        {userPersonalDetails ? (
                            <MobileProfile user={currentUser.isLoggedIn}>
                                <Close onClick={() => setShowMobileMenu(false)}>close</Close>
                            </MobileProfile>
                        ) : null}

                        <UserName>
                            {currentUser.isLoggedIn ? (
                                <>
                                    <MobileImageContainer>
                                        <img
                                            src={userPersonalDetails.profilePhoto}
                                            onError={(e) => (e.target.src = '/images/account.svg')}
                                            alt=""
                                        />
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
                                {/* <Image src="/images/broke.png" alt="" /> */}
                                <div>Visited</div>
                            </StyledLink>
                            <StyledLink onClick={() => setShowMobileMenu(false)} to="/map">
                                {/* <Image src="/images/broke.png" alt="" /> */}
                                <div>Your Map</div>
                            </StyledLink>
                            <StyledLink onClick={() => setShowMobileMenu(false)} to="/stats">
                                {/* <Image src="/images/broke.png" alt="" /> */}
                                <div>Stats</div>
                            </StyledLink>
                            <StyledLink onClick={() => setShowMobileMenu(false)} to="/achievements">
                                {/* <Image src="/images/broke.png" alt="" /> */}
                                <div>Achievements</div>
                            </StyledLink>
                            <StyledLink onClick={() => setShowMobileMenu(false)} to="/account">
                                {/* <Image src="/images/broke.png" alt="" /> */}
                                <div>Account & Settings</div>
                            </StyledLink>
                            {currentUser.isLoggedIn ? (
                                <StyledLink onClick={logUserOut} to="/">
                                    {/* <Image src="/images/logout.png" alt="" /> */}
                                    <div>Logout</div>
                                </StyledLink>
                            ) : (
                                <StyledLink to="/login" onClick={() => setShowMobileMenu(false)}>
                                    <Image src="/images/logout.png" alt="" />
                                    <div>Login</div>
                                </StyledLink>
                            )}
                        </StyledLinks>
                    </MobileMenu>
                </div>
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
