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
import { Home } from 'components/home'

import {
    fetchData,
    fetchRESTCountries,
    fetchUserInformation,
} from 'redux/action-creators/countries/get-user-visited-countries'
import { setUser } from 'redux/action-creators/user/set-user'
import { logUserOut } from 'redux/action-creators/user/log-out'
import { firebaseApp } from '../../config.js'

const comparator = (prevProps, nextProps) => {
    if (nextProps.countries.restAPICountries.length === 250) {
        return true
    }
    return false
}

export const MainRouter = React.memo(
    ({ fetchData, fetchRESTCountries, fetchUserInformation, logUserOut, setUser, user }) => {
        const [loaded, setLoaded] = useState(false)
        const [newUser, setNewUser] = useState(JSON.parse(localStorage.getItem('authUser')))

        useEffect(() => {
            console.log('callin?')
            firebaseApp.auth().onAuthStateChanged((user) => {
                if (user) {
                    localStorage.setItem('authUser', JSON.stringify(user))
                    setLoaded(true)
                    setUser(user)
                    fetchData(user.uid)
                    fetchUserInformation(user.uid)
                } else {
                    localStorage.removeItem('authUser')
                    setLoaded(true)
                    console.log(user, 'USER NOT LOGGED IN')
                }
            })
        }, [user])

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

        const ProtectedRoute = ({ component: Component, newUser, ...rest }) => {
            return newUser ? <Component /> : <Redirect from="" to="/login" noThrow />
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
                    newUser={newUser}
                />
                <Switch>
                    <Route exact component={SharedMap} path="/:id/shared-map" />
                    <ProtectedRoute exact component={AccountContainer} path="/account" newUser={newUser} />
                    <PublicRoute exact component={Home} path="/" />
                    <PublicRoute exact component={CONNECTED_Login} path="/login" loaded={loaded} newUser={newUser} />
                    <PublicRoute
                        exact
                        component={CONNECTED_NEW_TRIP}
                        newUser={newUser}
                        path="/trips/:country"
                        user={user}
                    />
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
                    <ProtectedRoute
                        exact
                        component={ConnectedTotalCountries}
                        newUser={newUser}
                        path="/stats/total-countries"
                        user={user}
                    />
                    <ProtectedRoute
                        exact
                        component={ConnectedTopStats}
                        newUser={newUser}
                        path="/stats/top"
                        user={user}
                    />
                    <ProtectedRoute
                        exact
                        component={ConnectedRandomStats}
                        newUser={newUser}
                        path="/stats/random-stats"
                        user={user}
                    />
                </Switch>
            </Router>
        )
    },
    comparator,
)

const mapState = ({ countries, user }) => ({
    countries,
    user,
})

const mapDispatch = {
    fetchData,
    fetchRESTCountries,
    fetchUserInformation,
    logUserOut,
    setUser,
}

export const CONNECTED_ROUTER = connect(mapState, mapDispatch)(MainRouter)
