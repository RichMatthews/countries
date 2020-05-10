import React, { useEffect, useState } from 'react'
import { Location, Redirect, Router } from '@reach/router'
import { createGlobalStyle } from 'styled-components'
import { connect } from 'react-redux'

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
// background-image: ${({ location }) => (location.pathname === '/' ? 'url(/images/world.svg)' : 'none')};
const GlobalStyle = createGlobalStyle`
  html {
    background-color: #283039};
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 1200px;
  }
`

export const MainRouter = ({ fetchData, fetchRESTCountries, logUserOut, setUser, user }) => {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
                setLoaded(true)
            } else {
                setLoaded(true)
                console.log(user, 'USER NOT LOGGED IN')
            }
        })
    }, [])

    useEffect(() => {
        fetchRESTCountries()
    }, [])

    useEffect(() => {
        if (user.isLoggedIn) {
            fetchData(user.details.uid)
        }
    }, [user.isLoggedIn])

    const logUserOutFirebaseAndRedux = async () => {
        try {
            await firebaseApp.auth().signOut()
            logUserOut()
            window.location.reload()
        } catch (e) {
            console.err(e)
        }
    }

    const ProtectedRoute = ({ component: Component, user }) => {
        return user.isLoggedIn ? <Component /> : <Redirect from="visited" to="/login" noThrow />
    }

    const PublicRoute = ({ component: Component, ...rest }) => <Component {...rest} />

    return (
        <Location>
            {({ location }) => (
                <>
                    <GlobalStyle location={location} />
                    <CONNECTED_Nav location={location} logUserOut={logUserOutFirebaseAndRedux} />
                    <div>
                        <Router>
                            <PublicRoute component={Home} path="/" />
                            <PublicRoute component={CONNECTED_Login} path="login" loaded={loaded} />
                            <ProtectedRoute component={CONNECTED_Map} path="map" user={user} />
                            <ProtectedRoute component={CONNECTED_Visited} path="visited" user={user} />
                            <ProtectedRoute component={CONNECTED_Stats} path="stats" user={user} />
                        </Router>
                    </div>
                </>
            )}
        </Location>
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

export const CONNECTED_Router = connect(mapState, mapDispatch)(MainRouter)
