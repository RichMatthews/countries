import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

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

export const Login = ({ setUser, user }) => {
    const [loaded, setLoaded] = useState(false)
    const provider = new firebase.auth.GoogleAuthProvider()

    useEffect(() => {
        if (user) {
            setLoaded(true)
        }
    }, [user])

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                console.log(user, 'user not loggedin')
            }
        })
    }, [user])

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

    if (!loaded) {
        return (
            <LoadingContainer>
                <img src="/images/loading.gif" width="30" style={{ margin: 'auto' }} />
            </LoadingContainer>
        )
    }
    if (user) {
        return (
            <div>
                <AccountContainer>Welcome {user.displayName.split(' ')[0]}</AccountContainer>
                <AccountContainer>Settings</AccountContainer>
                <AccountContainer>Request new features</AccountContainer>
            </div>
        )
    } else {
        return (
            <SignInButton onClick={login}>
                <img src={'/images/google.png'} width="30" /> Sign in with Google
            </SignInButton>
        )
    }
}
