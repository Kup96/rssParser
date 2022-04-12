import actionTypes from "../actions/actionTypes"

const defaultState = {
    currentUser: {},
    isAuth: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        default:
            return state
    }
}


export const setUser = user => ({type: actionTypes.SET_USER, payload: user})
export const logout = () => ({type: actionTypes.LOGOUT})