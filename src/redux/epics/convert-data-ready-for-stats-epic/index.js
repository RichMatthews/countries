import { catchError, map, mergeMap, tap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { sortBy } from 'underscore'

import {
    GET_USER_VISITED_COUNTRIES_SUCCESS,
    SET_TOP_THREE_COUNTRES_STAT,
    SET_FIRST_TRIP_STAT,
    SET_LAST_TRIP_STAT,
} from 'redux/types'

const setTopThreeCountries = (payload) => ({ type: SET_TOP_THREE_COUNTRES_STAT, data: payload })
const setCalculatedContinents = (payload) => ({ type: 'SET_CALCULATED_CONTINENTS', data: payload })
const setFirstTrip = (payload) => ({ type: SET_FIRST_TRIP_STAT, data: payload })
const setLastTrip = (payload) => ({ type: SET_LAST_TRIP_STAT, data: payload })
const setSomething = (payload) => ({ type: 'SET_SOMETHING', data: payload })

const calculateTopThreeCountries = (countries) => {
    const sortedCountries = sortBy(countries, (country) => {
        return country.visits.length
    })

    return sortedCountries.reverse().slice(0, 3)
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

const calculateFirstTrip = (countries) => {
    let num = 20000000000000
    let countryToReturn = null
    countries.forEach((country) => {
        country.visits.forEach((visit) => {
            if (visit.startDate < num) {
                num = visit.startDate
                countryToReturn = country
            }
        })
    })
    return {
        name: countryToReturn.name,
        startDate: countryToReturn.visits[0].startDate,
        visitName: countryToReturn.visits[0].visitName,
    }
}

const calculateLastTrip = (countries) => {
    let num = 0
    let countryToReturn = null
    countries.forEach((country) => {
        country.visits.forEach((visit) => {
            if (visit.startDate > num) {
                num = visit.startDate
                countryToReturn = country
            }
        })
    })
    return {
        name: countryToReturn.name,
        startDate: countryToReturn.visits[0].startDate,
        visitName: countryToReturn.visits[0].visitName,
    }
}

const calculateCountriesVisitedByContinent = (countries) => {
    let continents = {
        Africa: {
            visited: 0,
            total: 54,
        },
        Asia: {
            visited: 0,
            total: 47,
        },
        Europe: {
            visited: 0,
            total: 47,
        },
        'North America': {
            visited: 0,
            total: 47,
        },
        Oceania: {
            visited: 0,
            total: 47,
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

export const convertDataReadyForStatsEpic = (action$, state$) =>
    action$.pipe(
        ofType(GET_USER_VISITED_COUNTRIES_SUCCESS),
        mergeMap((action) => {
            const calculatedTop3 = calculateTopThreeCountries(action.payload)
            const calculateContinents = calculateContinentsVisits(action.payload)
            const firstTrip = calculateFirstTrip(action.payload)
            const lastTrip = calculateLastTrip(action.payload)
            const calcCountriesByContinent = calculateCountriesVisitedByContinent(action.payload)
            return [
                setTopThreeCountries(calculatedTop3),
                setCalculatedContinents(calculateContinents),
                setFirstTrip(firstTrip),
                setLastTrip(lastTrip),
                setSomething(calcCountriesByContinent),
            ]
        }),
    )
// catchError((err) => Promise.resolve({ type: 'CHANGE_THIS_AT_SOME_POINT', message: err.message }))
