import { SET_RAW_USER_DATA_FROM_FIREBASE } from 'redux/types'

export const setRawUserFromFirebase = (user) => {
    return {
        type: SET_RAW_USER_DATA_FROM_FIREBASE,
        user,
    }
}
