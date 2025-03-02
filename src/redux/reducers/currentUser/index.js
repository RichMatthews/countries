import { USER_LOGGED_OUT_SUCCESS, SET_RAW_USER_DATA_FROM_FIREBASE } from 'redux/types'

const initialState = {
    isLoggedIn: false,
}

export const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case SET_RAW_USER_DATA_FROM_FIREBASE:
            return { ...state, isLoggedIn: true }
        case USER_LOGGED_OUT_SUCCESS:
            return { ...state, isLoggedIn: false }
        default:
            return state
    }
}
