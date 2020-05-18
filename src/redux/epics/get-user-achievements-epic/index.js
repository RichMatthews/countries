import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { mergeMap } from 'rxjs/operators'

import { GET_USER_DATA, GET_USER_ACHIEVEMENTS_SUCCESS } from 'redux/types'

const userAchievementsFulfilled = (payload) => ({ type: GET_USER_ACHIEVEMENTS_SUCCESS, achievements: payload })

export const getUserAchievementsEpic = (action$) =>
    action$.pipe(
        ofType(GET_USER_DATA),
        mergeMap((action) =>
            ajax
                .getJSON(
                    `https://eaq7kxyf7d.execute-api.us-east-1.amazonaws.com/countries/get-achievements?userId=${action.id}`,
                )
                .pipe(
                    mergeMap((response) => {
                        return [userAchievementsFulfilled(response)]
                    }),
                ),
        ),
    )
