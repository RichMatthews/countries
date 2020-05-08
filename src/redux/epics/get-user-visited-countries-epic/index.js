import { combineEpics } from 'redux-observable'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { sortBy } from 'underscore'

const fetchUserFulfilled = (payload) => ({ type: 'GET_DATA_SUCCESS', data: payload })

export const getUserVisitedCountriesEpic = (action$) => {
    return ajax
        .getJSON(`https://eaq7kxyf7d.execute-api.us-east-1.amazonaws.com/countries?userId=2BnDBSvIhwfoYWKIwGH20rUzyKv1`)
        .pipe(
            map((response) => {
                const sortedCountries = sortBy(response, 'name')
                return fetchUserFulfilled(sortedCountries)
            }),
        )
}
