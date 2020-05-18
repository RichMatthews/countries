import { EMPTY, of } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

import { ACHIEVEMENTS_LIST } from 'constants/achievements-list'
import { ADD_USER_VISITED_COUNTRY } from 'redux/types'

const addNotification = (payload) => ({ type: 'ADD_NOTIFICATION', notification: payload })
const addAchievement = (payload) => ({ type: 'ADD_ACHIEVEMENT', achievement: payload })

export const listenToAddCountryEpic = (action$, store) =>
    action$.pipe(
        ofType(ADD_USER_VISITED_COUNTRY),
        mergeMap((action) => {
            const { details, userVisitedCountries } = store.value.user
            if (userVisitedCountries.length === 1 && userVisitedCountries[0].visits.length === 1) {
                const achievement = ACHIEVEMENTS_LIST[0]
                const notification = { title: achievement.title, message: 'You unlocked an achievement!' }
                const data = {
                    userId: details.uid,
                    achievement: { ...achievement, achieved: true },
                }

                return ajax
                    .post('https://eaq7kxyf7d.execute-api.us-east-1.amazonaws.com/countries/add-achievement', data, {
                        'Content-Type': 'application/json',
                    })
                    .pipe(
                        mergeMap((res) => {
                            return [addNotification(notification), addAchievement(data.achievement)]
                        }),
                        catchError((error) => {
                            console.log('error: ', error)
                            return of(error)
                        }),
                    )
            }
            if (action.country.name === 'France' && action.country.visits.length > 0) {
                const achievement = ACHIEVEMENTS_LIST[4]
                const notification = { title: achievement.title, message: 'You unlocked an achievement!' }
                const data = {
                    userId: details.uid,
                    achievement: { ...achievement, achieved: true },
                }
                return ajax
                    .post('https://eaq7kxyf7d.execute-api.us-east-1.amazonaws.com/countries/add-achievement', data, {
                        'Content-Type': 'application/json',
                    })
                    .pipe(
                        mergeMap((res) => {
                            return [addNotification(notification), addAchievement(data.achievement)]
                        }),
                        catchError((error) => {
                            console.log('error: ', error)
                            return of(error)
                        }),
                    )
            } else {
                return EMPTY
            }
            catchError((error) => console.log('e,e:', error))
        }),
    )
