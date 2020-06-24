import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { sortBy } from 'underscore'

import {
    COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS,
    GET_USER_DATA,
    GET_USER_VISITED_COUNTRIES_SUCCESS,
} from 'redux/types'
import { firebaseApp } from '../../../config.js'

const fetchCountriesFulfilled = (payload) => ({ type: GET_USER_VISITED_COUNTRIES_SUCCESS, payload })
const countriesConverted = (countries) => ({ type: COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS, countries })
const fetchUserInformationFulfilled = (payload) => ({ type: 'GET_USER_INFORMATION_SUCCESS', payload })

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
        ofType(GET_USER_DATA),
        mergeMap((action) => getUserCountries(action.id)),
        mergeMap((data) => {
            const sortedCountries = sortBy(data, 'name')
            const convertedMapCountries = convertCountriesForMapFormat(data)
            return of(fetchCountriesFulfilled(sortedCountries), countriesConverted(convertedMapCountries))
        }),

        catchError((e) =>
            of({
                type: 'FAILED_TO_FETCH_DATA',
                e,
            }),
        ),
    )

const getUserInformation = (id) =>
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
        ofType('GET_USER_INFORMATION'),
        mergeMap((action) => getUserInformation(action.id)),
        mergeMap((data) => {
            console.log('DATA:', data)
            return of(fetchUserInformationFulfilled(data))
        }),

        catchError((e) =>
            of({
                type: 'FAILED_TO_FETCH_DATA',
                e,
            }),
        ),
    )
