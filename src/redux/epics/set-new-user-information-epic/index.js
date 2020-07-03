import { of, from } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'

import { firebaseApp } from '../../../config.js'

const updatedUserInformationSuccess = (userInformation) => ({
    type: 'SET_NEW_USER_INFORMATION_SUCCESS',
    userInformation,
})
const updatedUserInformationFailure = (error) => ({ type: 'SET_NEW_USER_INFORMATION_FAILURE', error })

export const setNewUserInformationEpic = (action$, store) => {
    return action$.pipe(
        ofType('SET_NEW_USER_INFORMATION'),
        mergeMap((action) => {
            const { email, name, photo, userId } = action.userDetails

            const userInformation = {
                displayName: name,
                name,
                email,
                profilePhoto: photo,
                homeLocation: {
                    lat: 51.509865,
                    lng: 0.118092,
                    city: 'London',
                },
            }
            return from(firebaseApp.database().ref(`users/${userId}/userInformation`).update(userInformation)).pipe(
                mergeMap(() => {
                    return [updatedUserInformationSuccess(userInformation)]
                }),
                catchError((error) => of(updatedUserInformationFailure(error))),
            )
        }),
    )
}
