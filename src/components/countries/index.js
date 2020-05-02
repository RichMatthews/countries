import React, { useEffect, useState } from 'react'
import { map } from 'rxjs/operators'

import { createHttpObservable } from 'utils/'

export const AllCountries = () => {
    const [countries, setCountries] = useState([])
    useEffect(() => {
        const queryParams = window.location.search
        fetch(`/api/countries${queryParams}`)
            .then((data) => data.json())
            .then((data) => setCountries(data.payload))
    }, [])

    const setSelectedCountryHelper = ({ name }) => {
        const https2$ = createHttpObservable(`/api/countries/name/${name.toLowerCase()}`)
        const selectedCountry$ = https2$.pipe(map((res) => Object.values(res['payload'])))

        return (
            selectedCountry$
                // .pipe(map((data) => data.filter((country) => country.name.toLowerCase().startsWith(value))))
                .subscribe((data) => setCountries(data[0]))
        )
    }

    const updateSearchResults = (num) => {
        window.location.search = `?limit=4&offset=${num * 4}`
    }

    return (
        <div>
            {countries && countries.map((country) => <div>{country.name}</div>)}
            <div onClick={() => updateSearchResults(0)}>1</div>
            <div onClick={() => updateSearchResults(1)}>2</div>
            <div onClick={() => updateSearchResults(2)}>3</div>
            <div onClick={() => updateSearchResults(3)}>4</div>
            <div onClick={() => updateSearchResults(4)}>5</div>
        </div>
    )
}
