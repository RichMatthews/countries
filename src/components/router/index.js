import React, { useEffect, useState } from 'react'
import { Location, Redirect, Router } from '@reach/router'
import { createGlobalStyle } from 'styled-components'

import { Visited } from 'components/visited'
import { Map } from 'components/map'
import { Nav } from 'components/nav'
import { Login } from 'components/login'
import { Home } from 'components/home'

import { firebaseApp } from '../../config.mjs'
import { createHttpObservable } from 'utils/'

const GlobalStyle = createGlobalStyle`
  html {
    background-image: ${({ location }) => (location.pathname === '/' ? 'url(/images/world.svg)' : 'none')};
    background-color: #f5f5f5;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 1200px;
  }
`

export const MainRouter = () => {
    const [userVisitedCountries, setUserVisitedCountries] = useState([])
    const [restAPICountries, setRESTAPICountries] = useState([])
    const [options, setOptions] = useState([{}])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const http$ = createHttpObservable('https://eaq7kxyf7d.execute-api.us-east-1.amazonaws.com/countries')
        http$.subscribe((countries) => setUserVisitedCountries(JSON.parse(countries.body)))

        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                console.log(user, 'user not loggedin')
            }
        })
    }, [])

    useEffect(() => {
        const http$ = createHttpObservable('https://restcountries.eu/rest/v2/all')
        http$.subscribe((countries) => setRESTAPICountries(countries))
    }, [])

    useEffect(() => {
        const countriesToShow = []
        restAPICountries.forEach((country) => countriesToShow.push({ label: country.name, value: country.name }))
        setOptions(countriesToShow)
    }, [restAPICountries])

    const logUserOut = async () => {
        try {
            await firebaseApp.auth().signOut()
            window.location.reload()
        } catch (e) {
            console.err(e)
        }
    }

    const ProtectedRoute = ({ component: Component, ...rest }) => {
        return rest.user ? <Component {...rest} /> : <Redirect from="visited" to="/login" noThrow />
    }

    const PublicRoute = ({ component: Component, ...rest }) => <Component {...rest} />

    return (
        <>
            <Location>
                {({ location }) => (
                    <>
                        <GlobalStyle location={location} />
                        <Nav
                            location={location}
                            logUserOut={logUserOut}
                            user={user}
                            userVisitedCountries={userVisitedCountries}
                        />
                        <div style={{ marginTop: '50px' }}>
                            <Router>
                                <PublicRoute
                                    component={Home}
                                    path="/"
                                    options={options}
                                    user={user}
                                    userVisitedCountries={userVisitedCountries}
                                />
                                <PublicRoute component={Login} path="login" setUser={setUser} user={user} />
                                <PublicRoute
                                    component={Map}
                                    path="map"
                                    options={options}
                                    user={user}
                                    userVisitedCountries={userVisitedCountries}
                                />
                                <ProtectedRoute
                                    component={Visited}
                                    path="visited"
                                    options={options}
                                    restAPICountries={restAPICountries}
                                    user={user}
                                    userVisitedCountries={userVisitedCountries}
                                />
                            </Router>
                        </div>
                    </>
                )}
            </Location>
        </>
    )
}
