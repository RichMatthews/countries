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
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    margin: auto;
    box-shadow: 1px 3px #ccc;
    padding: 10px;
    width: 180px;
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
            })
            .catch((error) => {
                console.err(error, 'the error is?')
            })
    }

    return loaded ? (
        <div>
            {user.isLoggedIn ? (
                <>
                    {/* <AccountContainer>Welcome {user.displayName.split(' ')[0]}</AccountContainer> */}
                    {console.log(user, 'usa')}
                    <AccountContainer>Settings</AccountContainer>
                    <AccountContainer>Request new features</AccountContainer>
                </>
            ) : (
                <SignInButton onClick={login}>
                    <img src={'/images/google.png'} width="30" /> Sign in with Google
                </SignInButton>
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
