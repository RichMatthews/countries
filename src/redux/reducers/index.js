import { combineReducers } from 'redux'

import { countries } from './countries'
import { ui } from './ui'
import { currentUser } from './currentUser'
import { userAchievements } from './userAchievements'
import { userMapDetails } from './userMapDetails'
import { userNotifications } from './userNotifications'
import { userPersonalDetails } from './userPersonalDetails'
import { userStats } from './userStats'
import { userTrips } from './userTrips'

export const reducers = combineReducers({
    countries,
    currentUser,
    ui,
    userAchievements,
    userMapDetails,
    userNotifications,
    userPersonalDetails,
    userStats,
    userTrips,
})
