import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { sortBy } from 'underscore'

import {
    COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS,
    GET_USER_VISITED_COUNTRIES_AND_TRIPS,
    GET_USER_VISITED_COUNTRIES_AND_TRIPS_SUCCESS,
} from 'redux/types'
import { firebaseApp } from '../../../config.js'

const fetchCountriesFulfilled = (payload) => ({ type: GET_USER_VISITED_COUNTRIES_AND_TRIPS_SUCCESS, payload })
const countriesConverted = (countries) => ({ type: COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS, countries })
const fetchUserPersonalDetailsFulfilled = (payload) => ({ type: 'GET_USER_PERSONAL_DETAILS_SUCCESS', payload })
const getUserStatsFulfilled = (payload) => ({ type: 'GET_USER_STATS_SUCCESS', payload })

const convertCountriesForMapFormat = (countries) => {
    let newArr = []
    countries.forEach((country) => newArr.push([country['name']]))
    return newArr
}

const getUserCountries = (id) =>
    from(
        firebaseApp
            .database()
            .ref(`users/${id}/countries`)
            .once('value')
            .then((snapshot) => {
                if (snapshot.val()) {
                    return Object.keys(snapshot.val()).map((key) => snapshot.val()[key])
                }
                return []
            }),
    )

export const getUserVisitedCountriesEpic = (action$) =>
    action$.pipe(
        ofType(GET_USER_VISITED_COUNTRIES_AND_TRIPS),
        mergeMap((action) => {
            return getUserCountries(action.id)
        }),
        mergeMap((data) => {
            const sortedCountries = sortBy(data, 'name')
            const convertedMapCountries = convertCountriesForMapFormat(data)
            return of(fetchCountriesFulfilled(sortedCountries), countriesConverted(convertedMapCountries))
        }),

        catchError((e) =>
            of({
                type: 'FAILED_TO_FETCH_USER_VISITED_COUNTRIES',
                e,
            }),
        ),
    )

const getUserPersonalDetailsFromFirebase = (id) =>
    from(
        firebaseApp
            .database()
            .ref(`users/${id}/userInformation`)
            .once('value')
            .then((snapshot) => {
                if (snapshot.val()) {
                    return snapshot.val()
                }
                return {}
            }),
    )

export const getUserInformationEpic = (action$) =>
    action$.pipe(
        ofType('GET_USER_PERSONAL_DETAILS'),
        mergeMap((action) => {
            return getUserPersonalDetailsFromFirebase(action.id)
        }),
        mergeMap((data) => {
            return of(fetchUserPersonalDetailsFulfilled(data))
        }),

        catchError((e) =>
            of({
                type: 'FAILED_TO_FETCH_USER_PERSONAL_DETAILS',
                e,
            }),
        ),
    )

const getUserStatsFromFirebase = (id) =>
    from(
        firebaseApp
            .database()
            .ref(`users/${id}/userStats`)
            .once('value')
            .then((snapshot) => {
                if (snapshot.val()) {
                    return Object.keys(snapshot.val().places).map((key) => snapshot.val().places[key])
                }
                return []
            }),
    )

export const getUserStatsEpic = (action$) =>
    action$.pipe(
        ofType('GET_USER_STATS'),
        mergeMap((action) => {
            return getUserStatsFromFirebase(action.id)
        }),
        mergeMap((data) => {
            return of(getUserStatsFulfilled(data))
        }),

        catchError((e) =>
            of({
                type: 'FAILED_TO_FETCH_USER_STATS',
                e,
            }),
        ),
    )
