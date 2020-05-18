import { GET_USER_DATA, GET_USER_VISITED_COUNTRIES_SUCCESS } from 'redux/types'

const initialState = {
    loading: true,
}

export function ui(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA:
            return { ...state, loading: true }
        case GET_USER_VISITED_COUNTRIES_SUCCESS:
        case 'GET_DATA_FAILURE':
            return { ...state, loading: false }
        case 'FAILED_TO_FETCH_DATA':
            console.log(action, 'ac')
        default:
            return state
    }
}
