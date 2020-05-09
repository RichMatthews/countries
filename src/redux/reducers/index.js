import { combineReducers } from 'redux'

import { countries } from './countries'
import { ui } from './ui'
import { user } from './user'

export const reducers = combineReducers({
    countries,
    ui,
    user,
})
