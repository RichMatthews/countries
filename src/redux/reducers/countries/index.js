const initialState = {
    selectOptions: [],
    restAPICountries: [],
}

export function countries(state = initialState, action) {
    switch (action.type) {
        case 'SET_REST_API_COUNTRIES':
            return { ...state, restAPICountries: action.restAPICountries }
        case 'USER_LOGGED_OUT':
            return initialState
        case 'REST_COUNTRIES_RECEIVED_SUCCESS':
            return { ...state, restAPICountries: action.data }
        case 'REST_COUNTRIES_OPTIONS_GENERATED':
            return { ...state, selectOptions: action.data }
        default:
            return state
    }
}
