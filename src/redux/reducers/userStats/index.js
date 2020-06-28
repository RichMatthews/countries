import {
    SET_CALCULATED_CONTINENTS_STAT,
    SET_COUNTRIES_AGGREGATED_BY_CONTINENT_STAT,
    SET_MOST_VISITED_COUNTRY,
} from 'redux/types'

const initialState = {
    capitalCitiesVisited: 0,
    continentVisits: [],
    countriesByContinent: {},
    milesTravelled: 0,
    mostVisitedCountry: {},
}

export const userStats = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOST_VISITED_COUNTRY:
            return { ...state, mostVisitedCountry: action.country[0] }
        case SET_CALCULATED_CONTINENTS_STAT:
            return {
                ...state,
                continentVisits: [['Continents', 'Visits']].concat(action.continentVisits),
            }
        case SET_COUNTRIES_AGGREGATED_BY_CONTINENT_STAT:
            return { ...state, countriesByContinent: action.data }
        // case UPDATE_PLACES_VISITED_AND_MILES_TRAVELLED_SUCCESS:
        //     return { ...state, milesTravelled: action.data }
        case 'SET_MILES_TRAVELLED':
            return { ...state, milesTravelled: action.milesTravelled }
        case 'SET_CAPITALS_VISITED':
            return { ...state, capitalCitiesVisited: action.capitalCitiesVisited }
        case 'UPDATE_PLACES_VISITED_AND_MILES_TRAVELLED_SUCCESS':
        default:
            return state
    }
}
