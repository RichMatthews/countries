import {
    GET_USER_PERSONAL_DETAILS_SUCCESS,
    SET_RAW_USER_DATA_FROM_FIREBASE,
    SET_NEW_USER_INFORMATION_SUCCESS,
} from 'redux/types'

const initialState = {
    displayName: '',
    email: '',
    name: '',
    profilePhoto: '',
    uid: '',
}

export const userPersonalDetails = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PERSONAL_DETAILS_SUCCESS:
            console.log(action, 'act')
            return { ...state, ...action.payload }
        case SET_NEW_USER_INFORMATION_SUCCESS:
            return { ...state, ...action.userInformation }
        case SET_RAW_USER_DATA_FROM_FIREBASE:
            return { ...state, uid: action.user.uid }
        default:
            return state
    }
}
