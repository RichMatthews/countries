import {
    GET_USER_VISITED_COUNTRIES_AND_TRIPS_SUCCESS,
    SET_CALCULATED_CONTINENTS_STAT,
    SET_COUNTRIES_AGGREGATED_BY_CONTINENT_STAT,
    SET_MOST_VISITED_COUNTRY,
    UPDATE_VISIT_SUCCESS,
} from 'redux/types'

const initialState = {
    capitalCitiesVisited: 0,
    continentVisits: [],
    countriesByContinent: {},
    milesTravelled: 0,
    mostVisitedCountry: {},
}

const calculateMilesTravelled = (countries) => {
    let totalMiles = 0
    countries.forEach((country) => {
        if (country.visits) {
            country.visits.forEach((visit) => {
                return (totalMiles = totalMiles + visit.totalDistanceTravelledForTrip)
            })
        }
    })

    return totalMiles
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

        case GET_USER_VISITED_COUNTRIES_AND_TRIPS_SUCCESS:
            return {
                ...state,
                milesTravelled: calculateMilesTravelled(action.payload),
                capitalCitiesVisited: action.payload.filter((ctry) => ctry.hasVisitedCapital).length,
            }

        case UPDATE_VISIT_SUCCESS:
            return {
                ...state,
                milesTravelled: state.milesTravelled + action.details.distanceInMiles,
                capitalCitiesVisited: state.capitalCitiesVisited + action.details.capitalCitiesTotal,
            }
        default:
            return state
    }
}
