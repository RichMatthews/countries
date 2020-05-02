import React, { useEffect } from 'react'
import firebase from 'firebase'

import { firebaseApp } from '../../config.mjs'

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
                    Please sign in <p onClick={login}>here</p>
                </div>
            )}
        </div>
    )
}
