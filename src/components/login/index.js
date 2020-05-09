import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import { connect } from 'react-redux'

import { setUser } from 'redux/action-creators/user/set-user'
import { firebaseApp } from '../../config.mjs'

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
    background: #323c46;
    color: #ccc;
    cursor: pointer;
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

export const Login = ({ loaded, setUser, user }) => {
    const provider = new firebase.auth.GoogleAuthProvider()

    const login = () => {
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

    return loaded ? (
        <div>
            {user.isLoggedIn ? (
                <>
                    {/* <AccountContainer>Welcome {user.displayName.split(' ')[0]}</AccountContainer> */}
                    <AccountContainer>Settings</AccountContainer>
                    <AccountContainer>Request new features</AccountContainer>
                </>
            ) : (
                <>
                    <SignInButton onClick={login}>
                        <img src={'/images/google.png'} width="30" /> <div>Sign in with Google</div>
                    </SignInButton>
                    <SignInButton onClick={login}>
                        <img src={'/images/google.png'} width="30" /> <div>Sign in with Facebook</div>
                    </SignInButton>
                    <SignInButton onClick={login}>
                        <img src={'/images/google.png'} width="30" /> <div>Sign in with LinkedIn</div>
                    </SignInButton>
                </>
            )}
        </div>
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
