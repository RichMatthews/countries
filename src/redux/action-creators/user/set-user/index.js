import { SET_USER_DATA } from 'redux/types'

export const setUser = (user) => {
    return {
        type: SET_USER_DATA,
        user,
    }
}
