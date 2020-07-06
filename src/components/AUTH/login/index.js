import React, { useEffect } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'

import { setRawUserFromFirebase } from 'redux/action-creators/user/set-user'
import { setNewUserInformation } from 'redux/action-creators/user/set-new-user-information'
import { firebaseApp } from '../../../config.js'
import { KIERAN_GREY } from 'styles'

const SignInButton = styled.div`
    align-items: center;
    background: #fff;
    border: 1px solid #ccc;
    color: ${KIERAN_GREY};
    cursor: pointer;
    border-radius: 30px;
    box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);
    display: flex;
    font-size: 14px;
    justify-content: flex-start;
    margin: auto;
    margin-bottom: 10px;
    padding: 5px 30px 5px 40px;
    width: 210px;

    & > img {
        margin-right: 15px;
    }
`

const SignInContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
`

const SignInSection = styled.div`
    & > p {
        text-align: center;
        width: 280px;
    }

    @media (max-width: 700px) {
        padding-top: 100px;
    }
`

export const Login = ({ currentUser, setNewUserInformation, setRawUserFromFirebase, userPersonalDetails }) => {
    useEffect(() => {
        if (currentUser.isLoggedIn) {
            setTimeout(() => {
                window.location.href = 'visited'
            }, 2000)
        }
    }, [currentUser])

    const selectProvider = (provider) => {
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        const facebookProvider = new firebase.auth.FacebookAuthProvider()

        switch (provider) {
            case 'google':
                return loginToApp(googleProvider)
            case 'facebook':
                return loginToApp(facebookProvider)
        }
    }

    const loginToApp = (provider) => {
        firebaseApp
            .auth()
            .signInWithRedirect(provider)
            .then((result) => {
                if (result.additionalUserInfo.isNewUser) {
                    setNewUserInformation({
                        email: result.user.email,
                        name: result.user.displayName,
                        photo: result.user.photoURL,
                        userId: result.user.uid,
                    })
                }
                const { user } = result
                setRawUserFromFirebase(user)
            })
            .catch((error) => {
                console.log('ERROR:', error)
            })
    }

    return (
        <SignInContainer>
            <SignInSection>
                <p>Mappa Mundi requires you to log in to access all features</p>
                <SignInButton onClick={() => selectProvider('google')}>
                    <img src={'/images/google.png'} width="30" />
                    <div>Sign in with Google</div>
                </SignInButton>

                <SignInButton onClick={() => selectProvider('facebook')}>
                    <img src={'/images/facebook.png'} width="30" />
                    <div>Sign in with Facebook</div>
                </SignInButton>
            </SignInSection>
        </SignInContainer>
    )
}

const mapState = ({ countries, currentUser, userPersonalDetails }) => ({
    countries,
    currentUser,
    userPersonalDetails,
})

const mapDispatch = {
    setNewUserInformation,
    setRawUserFromFirebase,
}

export const CONNECTED_Login = connect(mapState, mapDispatch)(Login)
