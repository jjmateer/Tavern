import axios from "axios";
import { returnErrors } from "./error-actions"

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    const token = getState().auth.token;
    const config = {
        header: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        const body = { user: getState().auth.user }
        axios.post("http://localhost:3001/api/auth/user", body, config)
            .then(res =>
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
            )
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: AUTH_ERROR
                })
            });
    }
}
export const registerUser = (newUser) => dispatch => {
    // console.log(newUser)
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post("http://localhost:3001/api/auth/register", newUser, config)
        .then(res =>
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}


export const loginUser = (userData) => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post("http://localhost:3001/api/auth/login", userData, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}


export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}
