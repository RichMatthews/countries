import { EMPTY, of, from } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

import { firebaseApp } from '../../../config.mjs'

const updatedCountrySuccess = (payload) => ({ type: 'UPDATE_VISIT_SUCCESS', details: payload })
const updatedCountryFailure = (payload) => ({ type: 'UPDATE_VISIT_FAILURE', updatedVisitDetails: payload })

export const listenToCountryVisitsEpic = (action$, store) => {
    return action$.pipe(
        ofType('UPDATE_TRIP_DETAILS'),
        mergeMap((action) => {
            const { country, currentDetails, newDetails } = action
            const { people, places } = newDetails
            const userId = store.value.user.details.uid
            const findCountry = store.value.user.userVisitedCountries.find((ctry) => ctry.name === country)
            const index = findCountry.visits.findIndex((x) => x.visitName === currentDetails.visitName)

            const scheme = {
                ...newDetails,
            }

            return from(
                firebaseApp.database().ref(`users/${userId}/countries/${country}/visits/${index}`).update(scheme),
            ).pipe(
                mergeMap((response) => {
                    const payload = {
                        country,
                        current: findCountry.visits[index].visitName,
                        newVisitDetails: newDetails,
                    }
                    return [updatedCountrySuccess(payload)]
                }),
                catchError((error) => of(updatedCountryFailure('test'))),
            )
        }),
    )
}

// export const listenToCountryVisitsEpic = (action$, store) => {
//     return action$.pipe(
//         ofType('UPDATE_TRIP_DETAILS'),
//         mergeMap((action) => {
//             return ajax
//                 .post(
//                     `${process.env.REACT_APP_API_GATEWAY_URL}/countries/update-country-information`,
//                     {
//                         userId: store.value.user.details.uid,
//                         country: action.country,
//                         newDetails: action.newDetails,
//                     },
//                     {
//                         'Content-Type': 'application/json',
//                     },
//                 )
//                 .pipe(
//                     mergeMap((response) => {
//                         const payload = { ...JSON.parse(response.request.body), currentDetails: action.currentDetails }
//                         return [updatedCountrySuccess(payload)]
//                     }),
//                 )
//         }),
//     )
// }
