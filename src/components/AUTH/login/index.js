import React from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'

import { setUser } from 'redux/action-creators/user/set-user'
import { firebaseApp } from '../../../config.js'
import { KIERAN_GREY } from 'styles'

const AccountContainer = styled.div`
    background: #f4f4f4;
    color: ${KIERAN_GREY};
    border-radius: 10px;
    margin-bottom: 25px;
    margin-left: 200px;
    min-height: 100px;
    padding: 10px;
    width: 250px;
`

const SignInButton = styled.div`
    align-items: center;
    background: #fff;
    border: 1px solid #ccc;
    color: ${KIERAN_GREY};
    cursor: pointer;
    border-radius: 30px;
    display: flex;
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

    @media (max-width: 700px) {
        padding-top: 100px;
    }
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

export const Login = ({ loaded, newUser, setUser }) => {
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
            .signInWithPopup(provider)
            .then((result) => {
                const { user } = result
                setUser(user)
                window.location.href = 'visited'
            })
            .catch((error) => {
                console.log('ERROR:', error)
            })
    }

    return (
        <SignInContainer>
            {newUser ? (
                <>
                    <AccountContainer>Settings</AccountContainer>
                    <AccountContainer>Request new features</AccountContainer>
                </>
            ) : (
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
            )}
        </SignInContainer>
    )
}

const mapState = ({ countries, user }) => ({
    countries,
    user,
})

const mapDispatch = {
    setUser,
}

export const CONNECTED_Login = connect(mapState, mapDispatch)(Login)
