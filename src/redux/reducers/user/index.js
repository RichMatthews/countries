import {
    ADD_USER_VISITED_COUNTRY,
    COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS,
    GET_USER_VISITED_COUNTRIES_SUCCESS,
    SET_CALCULATED_CONTINENTS_STAT,
    SET_COUNTRIES_AGGREGATED_BY_CONTINENT_STAT,
    SET_FIRST_TRIP_STAT,
    SET_LAST_TRIP_STAT,
    SET_TOP_THREE_COUNTRES_STAT,
    SET_USER_DATA,
    USER_LOGGED_OUT_SUCCESS,
} from 'redux/types'

const initialState = {
    details: {},
    mapDetails: [['country']],
    isLoggedIn: false,
    userVisitedCountries: [],
    stats: {
        top3Countries: null,
        continentVisits: [['Continents', 'Visits']],
        firstTrip: null,
        lastTrip: null,
        countriesByContinent: null,
        tripsByYear: [['Year', 'Trip Total']],
    },
}

export function user(state = initialState, action) {
    switch (action.type) {
        case ADD_USER_VISITED_COUNTRY:
            return { ...state, userVisitedCountries: [...state.userVisitedCountries, action.country] }
        case SET_USER_DATA:
            return { ...state, details: action.user, isLoggedIn: true }
        case GET_USER_VISITED_COUNTRIES_SUCCESS:
            return { ...state, userVisitedCountries: action.payload }
        case COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS:
            return { ...state, mapDetails: state.mapDetails.concat(action.countries) }
        case SET_TOP_THREE_COUNTRES_STAT:
            return { ...state, stats: { ...state.stats, top3Countries: action.countries } }
        case SET_CALCULATED_CONTINENTS_STAT:
            return {
                ...state,
                stats: { ...state.stats, continentVisits: state.stats.continentVisits.concat(action.continentVisits) },
            }
        case 'SET_TRIPS_BY_YEAR_STAT':
            return {
                ...state,
                stats: { ...state.stats, tripsByYear: state.stats.tripsByYear.concat(action.trips) },
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
