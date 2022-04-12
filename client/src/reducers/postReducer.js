import actionTypes from "../actions/actionTypes"


const defaultState = {
    news: [],
    showEdit: false,
}


export default function postReducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.SET_POSTS:
            return {...state, news: action.payload}
        case actionTypes.DELETE:
            return {...state, news: [...state.news.filter(n => n.id !== action.payload)]}
        case actionTypes.ADD_POST:
            return {...state, news: [...state.news, action.payload]};
        case actionTypes.UPDATING_POST:
            return {...state, showEdit: true}
        case actionTypes.CLOSE_UPDATING_POST:
            return {...state, showEdit: false}
        case actionTypes.UPDATE_POST:
            return {...state, showEdit: false, news: [...state.news, action.payload]}
        default:
            return state
    }
}



export const setPosts = (data) => ({type: actionTypes.SET_POSTS, payload: data})
export const deletePostAction = (data) => ({type: actionTypes.DELETE, payload: data})
export const addPostAction = (data) => ({type: actionTypes.ADD_POST, payload: data})
export const updatePostAction = (data) => ({type: actionTypes.UPDATE_POST, payload: data})
export const updatingPostAction = () => ({type: actionTypes.UPDATING_POST})
export const closeUpdatingPostAction = () => ({type: actionTypes.CLOSE_UPDATING_POST})