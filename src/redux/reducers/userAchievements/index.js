import { ADD_ACHIEVEMENT } from 'redux/types'

const initialState = {
    achievements: [],
}

export const userAchievements = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ACHIEVEMENT:
            return { ...state, achievements: state.achievements.concat(action.achievement) }
        case 'GET_USER_ACHIEVEMENTS_SUCCESS':
            return { ...state, achievements: action.achievements }
        default:
            return state
    }
}
