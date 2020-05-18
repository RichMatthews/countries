import { ADD_USER_VISITED_COUNTRY } from 'redux/types'

export const addNewUserCountry = (country) => {
    return {
        type: ADD_USER_VISITED_COUNTRY,
        country,
    }
}
