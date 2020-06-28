import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { mergeMap } from 'rxjs/operators'

import { GET_USER_VISITED_COUNTRIES_AND_TRIPS, GET_USER_ACHIEVEMENTS_SUCCESS } from 'redux/types'

const userAchievementsFulfilled = (payload) => ({ type: GET_USER_ACHIEVEMENTS_SUCCESS, achievements: payload })

export const getUserAchievementsEpic = (action$) =>
    action$.pipe(
        ofType(GET_USER_VISITED_COUNTRIES_AND_TRIPS),
        mergeMap((action) =>
            ajax
                .getJSON(`${process.env.REACT_APP_API_GATEWAY_URL}/countries/get-achievements?userId=${action.id}`)
                .pipe(
                    mergeMap((response) => {
                        return [userAchievementsFulfilled(response)]
                    }),
                ),
        ),
    )
