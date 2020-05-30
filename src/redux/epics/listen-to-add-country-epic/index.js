import { EMPTY, of } from 'rxjs'
import { ofType } from 'redux-observable'
import { catchError, mergeMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

import { ACHIEVEMENTS_LIST } from 'constants/achievements-list'
import { ADD_USER_VISITED_COUNTRY } from 'redux/types'

const addNotification = (payload) => ({ type: 'ADD_NOTIFICATION', notification: payload })
const addAchievement = (payload) => ({ type: 'ADD_ACHIEVEMENT', achievement: payload })

const addAchievementHelper = (achievement, details) => {
    const notification = { title: achievement.title, message: 'You unlocked an achievement!' }
    const data = {
        userId: details.uid,
        achievement: { ...achievement, achieved: true },
    }

    return ajax
        .post(`${process.env.REACT_APP_API_GATEWAY_URL}/countries/add-achievement`, data, {
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

export const listenToAddCountryEpic = (action$, store) =>
    action$.pipe(
        ofType(ADD_USER_VISITED_COUNTRY),
        mergeMap((action) => {
            const { details, userVisitedCountries } = store.value.user
            if (userVisitedCountries.length === 1 && userVisitedCountries[0].visits.length === 1) {
                const achievement = ACHIEVEMENTS_LIST.find((ach) => ach.id === 0)
                return addAchievementHelper(achievement, details)
            }
            if (action.country.name === 'France' && action.country.visits.length > 0) {
                const achievement = ACHIEVEMENTS_LIST.find((ach) => ach.id === 3)
                return addAchievementHelper(achievement, details)
            }
            if (userVisitedCountries.length === 10) {
                const achievement = ACHIEVEMENTS_LIST.find((ach) => ach.id === 4)
                return addAchievementHelper(achievement, details)
            }
            if (action.country.name === 'Italy') {
                const achievement = ACHIEVEMENTS_LIST.find((ach) => ach.id === 10)
                return addAchievementHelper(achievement, details)
            }
            if (action.country.name === 'Greece') {
                const achievement = ACHIEVEMENTS_LIST.find((ach) => ach.id === 12)
                return addAchievementHelper(achievement, details)
            }
            if (action.country.name === 'China') {
                const achievement = ACHIEVEMENTS_LIST.find((ach) => ach.id === 13)
                return addAchievementHelper(achievement, details)
            } else {
                return EMPTY
            }
        }),
    )
