import axios from 'axios';
import { deletePostAction, setPosts, updatePostAction, addPostAction, updatingPostAction, closeUpdatingPostAction } from '../reducers/postReducer';
import {MAIN_URL} from '../config'



export function deletePost(data){
    return async dispatch => {
        try {
            await axios.delete(`${MAIN_URL}api/posts/${data.id}`,
            {headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})
            dispatch(deletePostAction(data.id))
        } catch (e) {
            console.log(e)
        }
    }
}
export function updatingPost(){
    return async dispatch => {
    try {
        dispatch(updatingPostAction())
    } catch (e) {
        console.log(e)
    }
}}

export function closeUpdatingPost(){
    return async dispatch => {
    try {
        dispatch(closeUpdatingPostAction())
    } catch (e) {
        console.log(e)
    }
}}

export function updatePost(id, title, link, image){
    return async dispatch => {
    try {
        const response = await axios.put(`${MAIN_URL}api/posts/${id}`, {
            title,
            link,
            image
        })
        dispatch(updatePostAction(response.data))
    } catch (e) {
        console.log(e)
    }
}
}
   

export function getPosts(pageId, sort, title) {
    return async dispatch => {

        try {
            let url = `${MAIN_URL}api/posts/?pageId=${pageId}&sort=${sort}`
            if (title){
                url = `${MAIN_URL}api/posts/?pageId=${pageId}&sort=${sort}&title=${title}`
            }
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(setPosts(response.data))
        } catch (e) {
            alert(e)
        } 
    }
}


export function addPost(title, link, image) {
    return async dispatch => {
        try {
            let url = `${MAIN_URL}api/posts/`
            const response = await axios.post(url, {
                title,
                link,
                image
            });
            dispatch(addPostAction(response.data))
        } catch (e) {
            alert(e)
        } 
    }
}



export function searchFiles(title, pageId, sort) {
    return async dispatch => {
        try {
            const response = await axios.get(`${MAIN_URL}api/posts/search/?title=${title}&pageId=${pageId}&sort=${sort}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setPosts(response.data))
        } catch (e) {
            alert(e?.response?.data?.message)
        } 
    }
}
