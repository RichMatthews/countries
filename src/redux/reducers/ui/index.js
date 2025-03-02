import { GET_USER_VISITED_COUNTRIES_AND_TRIPS, GET_USER_VISITED_COUNTRIES_AND_TRIPS_SUCCESS } from 'redux/types'

const initialState = {
    loading: true,
}

export function ui(state = initialState, action) {
    switch (action.type) {
        case GET_USER_VISITED_COUNTRIES_AND_TRIPS:
            return { ...state, loading: true }
        case GET_USER_VISITED_COUNTRIES_AND_TRIPS_SUCCESS:
        case 'GET_DATA_FAILURE':
            return { ...state, loading: false }
        case 'FAILED_TO_FETCH_USER_PERSONAL_DETAILS':
            return { ...state, loading: false }
        default:
            return state
    }
}
