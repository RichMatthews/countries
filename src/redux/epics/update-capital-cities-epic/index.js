import { of, from } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'

import {
    UPDATE_PLACES_VISITED_AND_MILES_TRAVELLED,
    UPDATE_PLACES_VISITED_AND_MILES_TRAVELLED_SUCCESS,
    UPDATE_PLACES_VISITED_AND_MILES_TRAVELLED_FAILURE,
} from 'redux/types'

import { firebaseApp } from '../../../config.js'

const updatedCountrySuccess = (payload) => ({
    type: UPDATE_PLACES_VISITED_AND_MILES_TRAVELLED_SUCCESS,
    details: payload,
})
const updatedCountryFailure = (payload) => ({
    type: UPDATE_PLACES_VISITED_AND_MILES_TRAVELLED_FAILURE,
    updatedVisitDetails: payload,
})

export const updateCapitalCitiesAndMilesTravelledEpic = (action$, store) => {
    return action$.pipe(
        ofType(UPDATE_PLACES_VISITED_AND_MILES_TRAVELLED),
        mergeMap((action) => {
            const { uid } = store.value.userPersonalDetails
            const places = `users/${uid}/userStats/places/${action.place.name}`

            const updates = {
                [places]: action.place,
            }

            return from(firebaseApp.database().ref().update(updates)).pipe(
                mergeMap((response) => {
                    console.log(response, 'RESPONSO:')
                    return [updatedCountrySuccess(response)]
                }),
                catchError((error) => of(updatedCountryFailure(error))),
            )
        }),
    )
}
