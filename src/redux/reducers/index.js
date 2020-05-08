import { combineReducers } from 'redux'

import { countries } from './countries'
import { user } from './user'

export const reducers = combineReducers({
    countries,
    user,
})
