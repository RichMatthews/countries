import React, { useEffect } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'

import { firebaseApp } from '../../config.mjs'

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

export const Login = ({ setUser, user }) => {
    const provider = new firebase.auth.GoogleAuthProvider()

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                console.log(user, 'user not loggedin')
            }
        })
    }, [])

    const login = () => {
        firebaseApp
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken
                // The signed-in user info.
                var user = result.user

                setUser(user)
                // ...
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code
                var errorMessage = error.message
                // The email of the user's account used.
                var email = error.email
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential
                // ...
            })
    }

    return (
        <div>
            {user ? (
                <div> You are logged in</div>
            ) : (
                <div>
                    <SignInButton onClick={login}>
                        <img src={'/images/google.png'} width="30" /> Sign in with Google{' '}
                    </SignInButton>
                </div>
            )}
        </div>
    )
}
