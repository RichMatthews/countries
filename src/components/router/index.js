import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

import { CONNECTED_Achievments } from 'components/achievements'
import { CONNECTED_Visited } from 'components/visited'
import { CONNECTED_Map } from 'components/MAPS/map'
import { SharedMap } from 'components/MAPS/shared-map'
import { CONNECTED_Nav } from 'components/nav'
import { CONNECTED_Login } from 'components/AUTH/login'
import { CONNECTED_Stats } from 'components/stats'
import { AccountContainer } from 'components/account'
import { ConnectedTotalCountries } from 'components/stats/total-countries'
import { ConnectedTopStats } from 'components/stats/top-stats'
import { ConnectedRandomStats } from 'components/stats/random-stats'
import { CONNECTED_NEW_TRIP } from 'components/country-visit-information'
import { CONNECTED_SHARED_TRIP } from 'components/country-visit-information/shared-trip'
import { CONNECTED_COUNTRY_VISITS } from 'components/country-visits'
import { Home } from 'components/home'

import {
    fetchUserCountriesAndTripsData,
    fetchRESTCountries,
    fetchUserPersonalDetails,
    fetchUserStats,
} from 'redux/action-creators/countries/get-user-visited-countries'
import { setRawUserFromFirebase } from 'redux/action-creators/user/set-user'
import { logUserOut } from 'redux/action-creators/user/log-out'
import { firebaseApp } from '../../config.js'

const comparator = (prevProps, nextProps) => {
    // console.log(prevProps, nextProps, 'ppnp....1')
    // if (nextProps.countries.restAPICountries.length === 250) {
    //     return true
    // }
    return false
}

export const MainRouter = React.memo(
    ({
        fetchUserCountriesAndTripsData,
        fetchRESTCountries,
        fetchUserPersonalDetails,
        fetchUserStats,
        logUserOut,
        setRawUserFromFirebase,
    }) => {
        const [loaded, setLoaded] = useState(false)
        const authenticatedUser = JSON.parse(localStorage.getItem('authUser'))

        useEffect(() => {
            firebaseApp.auth().onAuthStateChanged((recognisedFirebaseUser) => {
                if (recognisedFirebaseUser) {
                    localStorage.setItem('authUser', JSON.stringify(recognisedFirebaseUser))
                    setLoaded(true)
                    setRawUserFromFirebase(recognisedFirebaseUser)
                    fetchUserCountriesAndTripsData(recognisedFirebaseUser.uid)
                    fetchUserPersonalDetails(recognisedFirebaseUser.uid)
                    fetchUserStats(recognisedFirebaseUser.uid)
                } else {
                    localStorage.removeItem('authUser')
                    setLoaded(true)
                    console.log(recognisedFirebaseUser, 'USER NOT LOGGED IN')
                }
            })
        }, [])

        useEffect(() => {
            fetchRESTCountries()
        }, [])

        const logUserOutFirebaseAndRedux = async () => {
            try {
                await firebaseApp.auth().signOut()
                logUserOut()
                window.location.reload()
            } catch (e) {
                console.err(e)
            }
        }

        const ProtectedRoute = ({ component: Component, ...rest }) => {
            return authenticatedUser ? <Component {...rest} /> : <Redirect from="" to="/login" noThrow />
        }

        const PublicRoute = ({ component: Component, ...rest }) => <Component {...rest} />

        const notSharedMap = /^(?!.*(\/shared-map)).*$/
        const GlobalStyle = createGlobalStyle`
            html {
                overflow: ${({ location }) => (location.includes('visited') ? 'hidden' : 'auto')};
            }
        `

        return (
            <Router>
                <GlobalStyle location={window.location.pathname} />

                <PublicRoute
                    path={notSharedMap}
                    component={CONNECTED_Nav}
                    logUserOut={logUserOutFirebaseAndRedux}
                    location={window.location.pathname}
                />

                <Switch>
                    <Route exact component={SharedMap} path="/:id/shared-map" />
                    <ProtectedRoute exact component={AccountContainer} path="/account" />
                    <PublicRoute exact component={Home} path="/" />
                    <PublicRoute exact component={CONNECTED_Login} path="/login" loaded={loaded} />
                    <PublicRoute exact component={CONNECTED_COUNTRY_VISITS} path="/:country/trips" />
                    <PublicRoute exact component={CONNECTED_NEW_TRIP} path="/:country/trips/:visitId" />
                    <PublicRoute exact component={CONNECTED_SHARED_TRIP} path="/:uid/:country/trips/:visitId" />
                    <ProtectedRoute exact component={CONNECTED_Achievments} path="/achievements" />
                    <ProtectedRoute exact component={CONNECTED_Map} path="/map" />
                    <ProtectedRoute exact component={CONNECTED_Visited} path="/visited" />
                    <ProtectedRoute exact component={CONNECTED_Stats} path="/stats" />
                    <ProtectedRoute exact component={ConnectedTotalCountries} path="/stats/total-countries" />
                    <ProtectedRoute exact component={ConnectedTopStats} path="/stats/top" />
                    <ProtectedRoute exact component={ConnectedRandomStats} path="/stats/random-stats" />
                </Switch>
            </Router>
        )
    },
    comparator,
)

const mapState = ({ countries }) => ({
    countries,
})

const mapDispatch = {
    fetchUserCountriesAndTripsData,
    fetchRESTCountries,
    fetchUserPersonalDetails,
    fetchUserStats,
    logUserOut,
    setRawUserFromFirebase,
}

export const CONNECTED_ROUTER = connect(mapState, mapDispatch)(MainRouter)
