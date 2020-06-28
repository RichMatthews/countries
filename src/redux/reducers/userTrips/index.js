import {
    ADD_USER_VISITED_MULTI_COUNTRIES,
    ADD_USER_VISITED_COUNTRY,
    GET_USER_VISITED_COUNTRIES_AND_TRIPS_SUCCESS,
    SET_RAW_USER_DATA_FROM_FIREBASE,
    UPDATE_VISIT_SUCCESS,
} from 'redux/types'

const initialState = {
    visitedCountries: [],
}

export const userTrips = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_VISIT_SUCCESS:
            return {
                ...state,
                visitedCountries: state.visitedCountries.map((country) => {
                    if (country.visits) {
                        return country.name === action.details.country
                            ? {
                                  ...country,
                                  visits: country.visits.map((visit) =>
                                      visit.visitName === action.details.current
                                          ? (visit = action.details.newVisitDetails)
                                          : visit,
                                  ),
                              }
                            : country
                    } else {
                        return country.name === action.details.country
                            ? {
                                  ...country,
                                  visits: [action.details.newVisitDetails],
                              }
                            : country
                    }
                }),
            }
        case ADD_USER_VISITED_COUNTRY:
            const foundUserCountry = state.visitedCountries.filter((country) => country.name === action.country.name)
            if (foundUserCountry.length) {
                return {
                    ...state,
                    visitedCountries: state.visitedCountries.map((country) =>
                        country.name === action.country.name
                            ? { ...country, visits: country.visits.concat(action.country.visits) }
                            : country,
                    ),
                }
            }
            return { ...state, visitedCountries: state.visitedCountries.concat(action.country) }
        case ADD_USER_VISITED_MULTI_COUNTRIES:
            return { ...state, visitedCountries: state.visitedCountries.concat(action.countries) }
        case GET_USER_VISITED_COUNTRIES_AND_TRIPS_SUCCESS:
            return { ...state, visitedCountries: action.payload }
        default:
            return state
    }
}
