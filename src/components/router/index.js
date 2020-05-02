import React, { useEffect, useState } from 'react'
import { Location, Redirect, Router } from '@reach/router'
import { createGlobalStyle } from 'styled-components'

import { Visited } from 'components/visited'
import { Map } from 'components/map'
import { Nav } from 'components/nav'
import { AllCountries } from 'components/countries'
import { Login } from 'components/login'
import { Home } from 'components/home'

import { firebaseApp } from '../../config.mjs'
import { createHttpObservable } from 'utils/'

const GlobalStyle = createGlobalStyle`
  html {
    background-image: url(/images/world.svg);
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 1200px;
  }
`

export const MainRouter = () => {
    const [countries, setCountries] = useState([])
    const [options, setOptions] = useState([{}])
    const [user, setUser] = useState(null)
    useEffect(() => {
        const http$ = createHttpObservable('/api/countries')
        http$.subscribe((countries) => setCountries(countries))

        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                console.log(user, 'user not loggedin')
            }
        })
    }, [])

    useEffect(() => {
        const countriesToShow = []
        countries.forEach((country) => countriesToShow.push({ label: country.name, value: country.name }))
        setOptions(countriesToShow)
    }, [countries])

    // const setCountriesHelper = (value) => {
    //     if (value.length > 0) {
    //         return countries$
    //             .pipe(map((data) => data.filter((country) => country.name.toLowerCase().startsWith(value))))
    //             .subscribe((data) => setCountries(data))
    //     }
    //     return setCountries([])
    // }

    const logUserOut = async () => {
        try {
            await firebaseApp.auth().signOut()
            window.location.reload()
        } catch (e) {
            console.err(e)
            // an error
        }
    }

    return (
        <>
            <GlobalStyle />
            <Location>
                {({ location }) => (
                    <>
                        <Nav countries={countries} location={location} logUserOut={logUserOut} />
                        <Router>
                            <AllCountries path="all" />
                            <Home path="/" countries={countries} user={user} />
                            <Map path="map" />
                            <Login path="login" setUser={setUser} user={user} />
                            <Redirect from="visited" to="page/1" />
                            <Visited path="visited/page/:id" options={options} user={user} />
                        </Router>
                    </>
                )}
            </Location>
        </>
    )
}
