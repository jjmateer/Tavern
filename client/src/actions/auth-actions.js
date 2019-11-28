import axios from "axios";
import { returnErrors } from "./error-actions";
import jwt_decode from "jwt-decode";

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

export const loadUser = () => (dispatch) => {
    dispatch({ type: USER_LOADING });
    const body = {
        id: jwt_decode(localStorage.getItem("jwtToken")).id,
        token: localStorage.getItem("jwtToken")
    }
    axios
        .post('http://localhost:3001/api/auth/user', body)
        .then(res => {
                console.log(res.data)
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};
export const registerUser = newUser => dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post("http://localhost:3001/api/auth/register", newUser, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
        })
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
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// export const tokenConfig = () => {
//     const token = localStorage.getItem("jwtToken")

//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         }
//     };

//     if (token) {
//         config.headers['xauthtoken'] = token;
//     } else {
//         config.headers.xauthtoken = null;
//     }
//     const cheaders = config.headers.xauthtoken;
//     return cheaders;
// };

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}
