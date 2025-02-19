import { of, from } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'
import uid from 'uid'

import { firebaseApp } from '../../../config.js'

const updatedCountrySuccess = (payload) => ({ type: 'UPDATE_VISIT_SUCCESS', details: payload })
const updatedCountryFailure = (payload) => ({ type: 'UPDATE_VISIT_FAILURE', updatedVisitDetails: payload })

export const listenToCountryVisitsEpic = (action$, store) => {
    return action$.pipe(
        ofType('UPDATE_TRIP_DETAILS'),
        mergeMap((action) => {
            const { country, currentDetails, newDetails } = action
            const userId = store.value.userPersonalDetails.uid
            const findCountry = store.value.userTrips.visitedCountries.find((ctry) => ctry.name === country)
            const { visitId } = currentDetails
            const { description, startDate, visitName, places, people, distanceInMiles, hasVisitedCapital } = newDetails

            const updates = {
                [`users/${userId}/countries/${country}/visits/${visitId}`]: {
                    description,
                    startDate,
                    visitName,
                    places,
                    people,
                    visitId,
                    totalDistanceTravelledForTrip: distanceInMiles,
                },
                [`users/${userId}/countries/${country}/hasVisitedCapital`]: hasVisitedCapital,
            }

            let capitalCitiesTotal = store.value.userTrips.visitedCountries.filter((ctry) => ctry.hasVisitedCapital)
                .length
            if (hasVisitedCapital) {
                capitalCitiesTotal = capitalCitiesTotal + 1
            }

            return from(firebaseApp.database().ref().update(updates)).pipe(
                mergeMap((response) => {
                    const payload = {
                        country,
                        current: findCountry.visits ? visitId : '',
                        newVisitDetails: newDetails,
                        distanceInMiles,
                        capitalCitiesTotal,
                    }
                    return [updatedCountrySuccess(payload)]
                }),
                catchError((error) => of(updatedCountryFailure(error))),
            )
        }),
    )
}
