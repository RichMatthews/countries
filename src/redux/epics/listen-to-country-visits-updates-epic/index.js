import { of, from } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'

import { firebaseApp } from '../../../config.js'

const updatedCountrySuccess = (payload) => ({ type: 'UPDATE_VISIT_SUCCESS', details: payload })
const updatedCountryFailure = (payload) => ({ type: 'UPDATE_VISIT_FAILURE', updatedVisitDetails: payload })

export const listenToCountryVisitsEpic = (action$, store) => {
    return action$.pipe(
        ofType('UPDATE_TRIP_DETAILS'),
        mergeMap((action) => {
            const { country, currentDetails, newDetails } = action
            const userId = store.value.user.details.uid
            const findCountry = store.value.user.userVisitedCountries.find((ctry) => ctry.name === country)
            let index
            if (findCountry.visits) {
                index = findCountry.visits.findIndex((x) => x.visitName === currentDetails.visitName)
            } else {
                index = 0
            }

            const { description, startDate, visitName, places, people } = newDetails

            return from(
                firebaseApp.database().ref(`users/${userId}/countries/${country}/visits/${index}`).update({
                    description,
                    startDate,
                    visitName,
                    places,
                    people,
                }),
            ).pipe(
                mergeMap((response) => {
                    const payload = {
                        country,
                        current: findCountry.visits ? findCountry.visits[index].visitName : '',
                        newVisitDetails: newDetails,
                    }
                    return [updatedCountrySuccess(payload)]
                }),
                catchError((error) => of(updatedCountryFailure(error))),
            )
        }),
    )
}
