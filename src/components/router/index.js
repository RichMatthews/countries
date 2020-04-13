import React, { useState } from 'react'
import { Router, Link } from '@reach/router'
import { Visited } from 'components/visited'
import { Nav } from 'components/nav'
import { Selected } from 'components/selected'
import { from, Observable, of } from 'rxjs'
import { map, filter, mergeMap } from 'rxjs/operators'

export const createHttpObservable = (url) => {
    return Observable.create((observer) => {
        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((body) => {
                observer.next(body)
                observer.complete()
            })
            .catch((err) => {
                observer.error(err)
            })
    })
}

export const MainRouter = () => {
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const http$ = createHttpObservable('/api/countries')
    const countries$ = http$.pipe(map((res) => Object.values(res['payload'])))

    const setCountriesHelper = (value) => {
        if (value.length > 0) {
            return countries$
                .pipe(map((data) => data.filter((country) => country.name.toLowerCase().startsWith(value))))
                .subscribe((data) => setCountries(data))
        }
        return setCountries([])
    }

    const setSelectedCountryHelper = ({ name }) => {
        const https2$ = createHttpObservable(`/api/countries/name/${name.toLowerCase()}`)
        const selectedCountry$ = https2$.pipe(map((res) => Object.values(res['payload'])))

        return (
            selectedCountry$
                // .pipe(map((data) => data.filter((country) => country.name.toLowerCase().startsWith(value))))
                .subscribe((data) => setSelectedCountry(data[0]))
        )
    }

    return (
        <>
            <Nav
                countries={countries}
                setCountriesHelper={setCountriesHelper}
                setSelectedCountryHelper={setSelectedCountryHelper}
            />
            <Router>
                <Selected path="/" selectedCountry={selectedCountry} />
                <Visited path="visited" />
            </Router>
        </>
    )
}
