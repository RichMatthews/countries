import {
    GET_REST_API_COUNTRIES,
    GENERATE_REST_COUNTRIES_DROPDOWN_OPTIONS,
    GET_REST_API_COUNTRIES_SUCCESS,
    USER_LOGGED_OUT_SUCCESS,
} from 'redux/types'

const initialState = {
    selectOptions: [],
    restAPICountries: [],
}

export function countries(state = initialState, action) {
    switch (action.type) {
        case GET_REST_API_COUNTRIES:
            return { ...state, restAPICountries: action.restAPICountries }
        case GENERATE_REST_COUNTRIES_DROPDOWN_OPTIONS:
            return { ...state, selectOptions: action.options }
        case GET_REST_API_COUNTRIES_SUCCESS:
            return { ...state, restAPICountries: action.countries }
        case USER_LOGGED_OUT_SUCCESS:
        default:
            return state
    }
}
