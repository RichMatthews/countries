import { catchError, map, mergeMap, tap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { sortBy } from 'underscore'
import moment from 'moment'

import {
    GET_USER_VISITED_COUNTRIES_SUCCESS,
    SET_CALCULATED_CONTINENTS_STAT,
    SET_COUNTRIES_AGGREGATED_BY_CONTINENT_STAT,
    SET_FIRST_TRIP_STAT,
    SET_LAST_TRIP_STAT,
    SET_TOP_THREE_COUNTRES_STAT,
} from 'redux/types'

const setCountriesAggregatedByContinent = (payload) => ({
    type: SET_COUNTRIES_AGGREGATED_BY_CONTINENT_STAT,
    data: payload,
})
const setCalculatedContinents = (payload) => ({ type: SET_CALCULATED_CONTINENTS_STAT, continentVisits: payload })
const setFirstTrip = (payload) => ({ type: SET_FIRST_TRIP_STAT, firstTrip: payload })
const setLastTrip = (payload) => ({ type: SET_LAST_TRIP_STAT, lastTrip: payload })
const setTopThreeCountries = (payload) => ({ type: SET_TOP_THREE_COUNTRES_STAT, countries: payload })
const setTripsByYear = (payload) => ({ type: 'SET_TRIPS_BY_YEAR_STAT', trips: payload })

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
        country.visits.forEach((visit) => {
            const date = moment.unix(visit.startDate).format('YYYY')
            if (date in dates) {
                dates[date] = dates[date] + 1
            } else {
                dates[date] = 0
            }
        })
    })
    return Object.entries(dates)
}

export const convertDataReadyForStatsEpic = (action$, state$) =>
    action$.pipe(
        ofType(GET_USER_VISITED_COUNTRIES_SUCCESS),
        mergeMap((action) => {
            const calculatedTop3 = calculateTopThreeCountries(action.payload)
            const calculateContinents = calculateContinentsVisits(action.payload)
            const firstTrip = calculateFirstTrip(action.payload)
            const lastTrip = calculateLastTrip(action.payload)
            const calculateCountriesByContinent = calculateCountriesVisitedByContinent(action.payload)
            const tripsByYear = calculateTripsByYear(action.payload)

            return [
                setTopThreeCountries(calculatedTop3),
                setCalculatedContinents(calculateContinents),
                setFirstTrip(firstTrip),
                setLastTrip(lastTrip),
                setCountriesAggregatedByContinent(calculateCountriesByContinent),
                setTripsByYear(tripsByYear),
            ]
        }),
    )
// catchError((err) => Promise.resolve({ type: 'CHANGE_THIS_AT_SOME_POINT', message: err.message }))
