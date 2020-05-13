import { USER_LOGGED_OUT_SUCCESS } from 'redux/types'

export const logUserOut = () => {
    return {
        type: USER_LOGGED_OUT_SUCCESS,
    }
}
