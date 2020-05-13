import { USER_LOGGED_OUT_SUCCESS } from 'redux/types'

const initialState = {
    selectOptions: [],
    restAPICountries: [],
}

export function countries(state = initialState, action) {
    switch (action.type) {
        case 'GET_REST_API_COUNTRIES':
            return { ...state, restAPICountries: action.restAPICountries }
        case 'REST_COUNTRIES_RECEIVED_SUCCESS':
            return { ...state, restAPICountries: action.data }
        case 'REST_COUNTRIES_OPTIONS_GENERATED':
            return { ...state, selectOptions: action.data }
        case USER_LOGGED_OUT_SUCCESS:
        default:
            return state
    }
}
