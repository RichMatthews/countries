import { EMPTY } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { sortBy } from 'underscore'
import moment from 'moment'

import {
    ADD_USER_VISITED_COUNTRY,
    COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS,
    GET_MOST_VISITED_COUNTRY,
    GET_USER_VISITED_COUNTRIES_SUCCESS,
    SET_CALCULATED_CONTINENTS_STAT,
    SET_COUNTRIES_AGGREGATED_BY_CONTINENT_STAT,
    SET_MOST_VISITED_COUNTRY,
    SET_TRIPS_BY_YEAR_STAT,
} from 'redux/types'

const setCountriesAggregatedByContinent = (payload) => ({
    type: SET_COUNTRIES_AGGREGATED_BY_CONTINENT_STAT,
    data: payload,
})
const setCalculatedContinents = (payload) => ({ type: SET_CALCULATED_CONTINENTS_STAT, continentVisits: payload })
const setMostVisitedCountry = (payload) => ({ type: SET_MOST_VISITED_COUNTRY, country: payload })
const setTripsByYear = (payload) => ({ type: SET_TRIPS_BY_YEAR_STAT, trips: payload })
const countriesConverted = (countries) => ({ type: COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS, countries })

const calculateMostVisitedCountry = (countries) => {
    const sortedCountries = sortBy(countries, (country) => {
        if (country.visits) {
            return country.visits.length
        }
        return 1
    })

    return sortedCountries.reverse().slice(0, 1)
}

const calculateContinentsVisits = (countries) => {
    let continents = {
        Africa: 0,
        Asia: 0,
        Europe: 0,
        'North America': 0,
        Oceania: 0,
        'South America': 0,
    }
    countries.forEach((country) => {
        continents[country.continent] += 1
    })

    return Object.entries(continents)
}

const calculateCountriesVisitedByContinent = (countries) => {
    let continents = {
        Africa: {
            visited: 0,
            total: 54,
        },
        Asia: {
            visited: 0,
            total: 48,
        },
        Europe: {
            visited: 0,
            total: 44,
        },
        'North America': {
            visited: 0,
            total: 23,
        },
        Oceania: {
            visited: 0,
            total: 14,
        },
        'South America': {
            visited: 0,
            total: 13,
        },
    }
    countries.forEach((country) => {
        return (continents[country.continent].visited += 1)
    })
    return continents
}

const calculateTripsByYear = (countries) => {
    let dates = {}
    countries.forEach((country) => {
        if (country.visits) {
            country.visits.forEach((visit) => {
                const date = moment.unix(visit.startDate).format('YYYY')
                if (date in dates) {
                    dates[date] = dates[date] + 1
                } else {
                    dates[date] = 1
                }
            })
        }
    })
    return Object.entries(dates)
}

const convertCountriesForMapFormat = (countries) => {
    let newArr = []
    countries.forEach((country) => newArr.push([country['name']]))
    return newArr
}

export const convertDataReadyForStatsEpic = (action$, state$) =>
    action$.pipe(
        ofType(GET_USER_VISITED_COUNTRIES_SUCCESS),
        mergeMap((action) => {
            if (action.payload.length === 0) {
                return EMPTY
            }
            const calculatedMostVisitedCountry = calculateMostVisitedCountry(action.payload)
            const calculateContinents = calculateContinentsVisits(action.payload)
            const calculateCountriesByContinent = calculateCountriesVisitedByContinent(action.payload)
            const tripsByYear = calculateTripsByYear(action.payload)

            return [
                setMostVisitedCountry(calculatedMostVisitedCountry),
                setCalculatedContinents(calculateContinents),
                setCountriesAggregatedByContinent(calculateCountriesByContinent),
                setTripsByYear(tripsByYear),
            ]
        }),
    )
// catchError((err) => Promise.resolve({ type: 'CHANGE_THIS_AT_SOME_POINT', message: err.message }))

export const updateStatsEpic = (action$, store) =>
    action$.pipe(
        ofType(ADD_USER_VISITED_COUNTRY),
        mergeMap((action) => {
            const { userVisitedCountries } = store.value.user
            const calculatedMostVisitedCountry = calculateMostVisitedCountry(userVisitedCountries)
            const calculateContinents = calculateContinentsVisits(userVisitedCountries)
            const calculateCountriesByContinent = calculateCountriesVisitedByContinent(userVisitedCountries)
            const tripsByYear = calculateTripsByYear(userVisitedCountries)
            const convertedMapCountries = convertCountriesForMapFormat(userVisitedCountries)

            return [
                setMostVisitedCountry(calculatedMostVisitedCountry),
                setCalculatedContinents(calculateContinents),
                setCountriesAggregatedByContinent(calculateCountriesByContinent),
                setTripsByYear(tripsByYear),
                countriesConverted(convertedMapCountries),
            ]
        }),
    )

export const getMostVisitedCountryEpic = (action$, store) =>
    action$.pipe(
        ofType(GET_MOST_VISITED_COUNTRY),
        mergeMap((action) => {
            const { userVisitedCountries } = store.value.user
            const calculatedMostVisitedCountry = calculateMostVisitedCountry(userVisitedCountries)

            return [setMostVisitedCountry(calculatedMostVisitedCountry)]
        }),
    )
