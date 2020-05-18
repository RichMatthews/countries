import React from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import { connect } from 'react-redux'

import { setUser } from 'redux/action-creators/user/set-user'
import { firebaseApp } from '../../config.mjs'
import { KIERAN_GREY } from 'styles'

const AccountContainer = styled.div`
    background: #f4f4f4;
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
    color: ${KIERAN_GREY};
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);
    display: flex;
    justify-content: stretch;
    margin: auto;
    margin-bottom: 10px;
    padding: 10px;
    width: 220px;

    & > img {
        margin-right: 15px;
    }
`

const LoadingContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 200px;
`

const SignInContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: 100px;
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
                console.log(error, 'the error is?')
            })
    }

    const facebookLogin = () => {}

    return loaded ? (
        <SignInContainer>
            {newUser ? (
                <>
                    <AccountContainer>Settings</AccountContainer>
                    <AccountContainer>Request new features</AccountContainer>
                </>
            ) : (
                <div>
                    <SignInButton onClick={() => selectProvider('google')}>
                        <img src={'/images/google.png'} width="30" />
                        <div>Sign in with Google</div>
                    </SignInButton>

                    <SignInButton onClick={() => selectProvider('facebook')}>
                        <img src={'/images/facebook.png'} width="30" />
                        <div>Sign in with Facebook</div>
                    </SignInButton>
                </div>
            )}
        </SignInContainer>
    ) : (
        <LoadingContainer>
            <img src="/images/loading.gif" width="30" style={{ margin: 'auto' }} />
        </LoadingContainer>
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
