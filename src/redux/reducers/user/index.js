import {
    ADD_USER_VISITED_COUNTRY,
    COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS,
    GET_USER_VISITED_COUNTRIES_SUCCESS,
    SET_CALCULATED_CONTINENTS_STAT,
    SET_COUNTRIES_AGGREGATED_BY_CONTINENT_STAT,
    SET_FIRST_TRIP_STAT,
    SET_LAST_TRIP_STAT,
    SET_TOP_THREE_COUNTRES_STAT,
    SET_TRIPS_BY_YEAR_STAT,
    SET_USER_DATA,
    USER_LOGGED_OUT_SUCCESS,
} from 'redux/types'

const initialState = {
    achievements: [],
    details: {},
    mapDetails: [],
    isLoggedIn: false,
    notifications: [],
    userVisitedCountries: [],
    stats: {
        top3Countries: null,
        continentVisits: [],
        firstTrip: null,
        lastTrip: null,
        countriesByContinent: null,
        tripsByYear: [],
    },
}

export function user(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ACHIEVEMENT':
            return { ...state, achievements: state.achievements.concat(action.achievement) }
        case 'CLEAR_NOTIFICATIONS':
            return { ...state, notifications: [] }
        case 'ADD_NOTIFICATION':
            return { ...state, notifications: state.notifications.concat(action.notification) }
        case 'UPDATE_VISIT_SUCCESS':
            return {
                ...state,
                userVisitedCountries: state.userVisitedCountries.map((country) =>
                    country.name === action.details.country
                        ? {
                              ...country,
                              visits: country.visits.map((visit) =>
                                  visit.visitName === action.details.current
                                      ? (visit = action.details.newVisitDetails)
                                      : visit,
                              ),
                          }
                        : country,
                ),
            }
        case ADD_USER_VISITED_COUNTRY:
            const foundUserCountry = state.userVisitedCountries.filter(
                (country) => country.name === action.country.name,
            )
            if (foundUserCountry.length) {
                return {
                    ...state,
                    userVisitedCountries: state.userVisitedCountries.map((country) =>
                        country.name === action.country.name
                            ? { ...country, visits: country.visits.concat(action.country.visits) }
                            : country,
                    ),
                }
            }
            return { ...state, userVisitedCountries: state.userVisitedCountries.concat(action.country) }
        case SET_USER_DATA:
            return { ...state, details: action.user, isLoggedIn: true }
        case 'GET_USER_ACHIEVEMENTS_SUCCESS':
            return { ...state, achievements: action.achievements }
        case GET_USER_VISITED_COUNTRIES_SUCCESS:
            return { ...state, userVisitedCountries: action.payload }
        case COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS:
            const newMapDetails = [['Country']].concat(action.countries)
            return { ...state, mapDetails: newMapDetails }
        case SET_TOP_THREE_COUNTRES_STAT:
            return { ...state, stats: { ...state.stats, top3Countries: action.countries } }
        case SET_CALCULATED_CONTINENTS_STAT:
            const newContinentVisits = [['Continents', 'Visits']].concat(action.continentVisits)
            return {
                ...state,
                stats: {
                    ...state.stats,
                    continentVisits: newContinentVisits,
                },
            }
        case SET_TRIPS_BY_YEAR_STAT:
            const newTripsByYear = [['Year', 'Trip Total']].concat(action.trips)
            return {
                ...state,
                stats: { ...state.stats, tripsByYear: newTripsByYear },
            }
        case SET_FIRST_TRIP_STAT:
            return { ...state, stats: { ...state.stats, firstTrip: action.firstTrip } }
        case SET_LAST_TRIP_STAT:
            return { ...state, stats: { ...state.stats, lastTrip: action.lastTrip } }
        case SET_COUNTRIES_AGGREGATED_BY_CONTINENT_STAT:
            return { ...state, stats: { ...state.stats, countriesByContinent: action.data } }
        case USER_LOGGED_OUT_SUCCESS:
        default:
            return state
    }
}
