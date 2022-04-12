import axios from 'axios'
import {setUser, logout} from "../reducers/userReducer";
import {MAIN_URL} from '../config'

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${MAIN_URL}api/registration`, {
            email,
            password
        }) 
        if (response){alert("Аккаунт зарегистрирован")}
    } catch (e) {
        alert(e.response?.data?.message)
    }
}

export const login =  (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${MAIN_URL}api/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)

        } catch (e) {
            alert(e.response?.data?.message)
        }
    }
}

export const check = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${MAIN_URL}api/check`,
            {headers:{authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)

        } catch (e) {
            console.log(e.message)
            localStorage.removeItem('token')
        }
    }
}

export const logoutAction =  () => {
    return async dispatch => {
        try {
            dispatch(logout())
            localStorage.removeItem('token')
            
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}