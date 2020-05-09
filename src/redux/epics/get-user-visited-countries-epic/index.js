import { combineEpics } from 'redux-observable'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { sortBy } from 'underscore'

const fetchUserFulfilled = (payload) => ({ type: 'GET_DATA_SUCCESS', payload })

export const getUserVisitedCountriesEpic = (action$) =>
    action$.pipe(
        ofType('GET_USER_DATA'),
        mergeMap((action) =>
            ajax.getJSON(`https://eaq7kxyf7d.execute-api.us-east-1.amazonaws.com/countries?userId=${action.id}`).pipe(
                map((response) => {
                    const sortedCountries = sortBy(response, 'name')
                    return fetchUserFulfilled(sortedCountries)
                }),
            ),
        ),
    )
