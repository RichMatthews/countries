import {
    GET_REST_API_COUNTRIES,
    REST_COUNTRIES_DROPDOWN_OPTIONS_GENERATED,
    REST_COUNTRIES_RECEIVED_SUCCESS,
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
        case REST_COUNTRIES_DROPDOWN_OPTIONS_GENERATED:
            return { ...state, selectOptions: action.options }
        case REST_COUNTRIES_RECEIVED_SUCCESS:
            return { ...state, restAPICountries: action.countries }
        case USER_LOGGED_OUT_SUCCESS:
        default:
            return state
    }
}
