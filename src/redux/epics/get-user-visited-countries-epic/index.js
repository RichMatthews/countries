import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { catchError, mergeMap } from 'rxjs/operators'
import { sortBy } from 'underscore'
import { of } from 'rxjs'

import {
    COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS,
    GET_USER_DATA,
    GET_USER_VISITED_COUNTRIES_SUCCESS,
} from 'redux/types'

const fetchUserFulfilled = (payload) => ({ type: GET_USER_VISITED_COUNTRIES_SUCCESS, payload })
const countriesConverted = (countries) => ({ type: COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS, countries })

const convertCountriesForMapFormat = (countries) => {
    let newArr = []
    countries.forEach((country) => newArr.push([country['name']]))
    return newArr
}

export const getUserVisitedCountriesEpic = (action$) =>
    action$.pipe(
        ofType(GET_USER_DATA),
        mergeMap((action) =>
            ajax.getJSON(`https://eaq7kxyf7d.execute-api.us-east-1.amazonaws.com/countries?userId=${action.id}`).pipe(
                mergeMap((response) => {
                    const sortedCountries = sortBy(response, 'name')
                    const convertedMapCountries = convertCountriesForMapFormat(response)
                    return [fetchUserFulfilled(sortedCountries), countriesConverted(convertedMapCountries)]
                }),
                catchError((e) =>
                    of({
                        type: 'FAILED_TO_FETCH_DATA',
                        e,
                    }),
                ),
            ),
        ),
    )
