const initialState = {
    details: {},
    isLoggedIn: false,
    userVisitedCountries: [],
}

export function user(state = initialState, action) {
    switch (action.type) {
        case 'ADD_USER_VISITED_COUNTRY':
            return { ...state, userVisitedCountries: [...state.userVisitedCountries, action.country] }
        case 'FETCH_COUNTRIES_SUCCEEDED':
            return { ...state, userVisitedCountries: action.countries }
        case 'SET_USER':
            return { ...state, details: action.user, isLoggedIn: true }
        case 'GET_DATA_SUCCESS':
            return { ...state, userVisitedCountries: action.data }
        case 'GET_USER_DATA':
            console.log('called')
        default:
            return state
    }
}
