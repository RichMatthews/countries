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

            let updates = {}

            action.places.forEach((place) => {
                updates[`users/${uid}/userStats/places/${place.name}`] = place
            })

            return from(firebaseApp.database().ref().update(updates)).pipe(
                mergeMap(() => {
                    return [updatedCountrySuccess(action.places)]
                }),
                catchError((error) => of(updatedCountryFailure(error))),
            )
        }),
    )
}
