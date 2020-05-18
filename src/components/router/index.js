import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { CONNECTED_Achievments } from 'components/achievements'
import { CONNECTED_Visited } from 'components/visited'
import { CONNECTED_Map } from 'components/map'
import { CONNECTED_Nav } from 'components/nav'
import { CONNECTED_Login } from 'components/login'
import { CONNECTED_Stats } from 'components/stats'
import { Home } from 'components/home'

import { fetchData, fetchRESTCountries } from 'redux/action-creators/countries/get-user-visited-countries'
import { setUser } from 'redux/action-creators/user/set-user'
import { logUserOut } from 'redux/action-creators/user/log-out'
import { firebaseApp } from '../../config.mjs'

export const MainRouter = ({ fetchData, fetchRESTCountries, logUserOut, setUser, user }) => {
    const [loaded, setLoaded] = useState(false)
    const [newUser, setNewUser] = useState(JSON.parse(localStorage.getItem('authUser')))

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                localStorage.setItem('authUser', JSON.stringify(user))
                setLoaded(true)
                setUser(user)
                fetchData(user.uid)
            } else {
                localStorage.removeItem('authUser')
                setLoaded(true)
                console.log(user, 'USER NOT LOGGED IN')
            }
        })
    }, [])

    useEffect(() => {
        fetchRESTCountries()
    }, [])

    // useEffect(() => {
    //     if (newUser) {
    //     }
    // }, [user.isLoggedIn])

    const logUserOutFirebaseAndRedux = async () => {
        try {
            await firebaseApp.auth().signOut()
            logUserOut()
            window.location.reload()
        } catch (e) {
            console.err(e)
        }
    }

    const ProtectedRoute = ({ component: Component, newUser }) => {
        return newUser ? <Component /> : <Redirect from="" to="/login" noThrow />
    }

    const PublicRoute = ({ component: Component, ...rest }) => <Component {...rest} />

    return (
        <Router>
            <CONNECTED_Nav logUserOut={logUserOutFirebaseAndRedux} newUser={newUser} />
            <Switch>
                <Route exact path="/:id/map" />
                <PublicRoute exact component={Home} path="/" />
                <PublicRoute exact component={CONNECTED_Login} path="/login" loaded={loaded} newUser={newUser} />
                <ProtectedRoute
                    exact
                    component={CONNECTED_Achievments}
                    path="/achievements"
                    newUser={newUser}
                    user={user}
                />
                <ProtectedRoute exact component={CONNECTED_Map} newUser={newUser} path="/map" user={user} />
                <ProtectedRoute exact component={CONNECTED_Visited} path="/visited" newUser={newUser} user={user} />
                <ProtectedRoute exact component={CONNECTED_Stats} newUser={newUser} path="/stats" user={user} />
            </Switch>
        </Router>
    )
}

const mapState = ({ countries, user }) => ({
    countries,
    user,
})

const mapDispatch = {
    fetchData,
    fetchRESTCountries,
    logUserOut,
    setUser,
}

export const CONNECTED_ROUTER = connect(mapState, mapDispatch)(MainRouter)
