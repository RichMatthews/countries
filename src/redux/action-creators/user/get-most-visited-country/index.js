import { GET_MOST_VISITED_COUNTRY } from 'redux/types'

export const getMostVisitedCountry = (country) => {
    return {
        type: GET_MOST_VISITED_COUNTRY,
        country,
    }
}
