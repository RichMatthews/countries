import { COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS } from 'redux/types'

const initialState = []

export const userMapDetails = (state = initialState, action) => {
    switch (action.type) {
        case COUNTRIES_CONVERTED_TO_CHART_FORMAT_SUCCESS:
            return [['Country']].concat(action.countries)
        default:
            return state
    }
}
