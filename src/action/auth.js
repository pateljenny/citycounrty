import * as authService from '../services/auth';
import { INVALID_USER, LOGIN_SUCCESSFUL, LOGOUT, REGISTER_SUCCESSFUL, REGISTER_FAILED, GET_USER_SUCCESSFUL, GET_USER_FAILED } from '../reducer/auth.js';

export const loginUser = (credentials) => {

    return (dispatch) => {
        authService.login(credentials)
            .then((response) => {                
                if (response.status === 200) {

                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("role", response.data.role)
                    localStorage.setItem("userId", response.data.id)
                    dispatch({
                        type: LOGIN_SUCCESSFUL,
                        data: { token: response.data.token, role: response.data.role, userId: response.data.id }
                    });
                }
            })
            .catch((error) => {                
                if (error.response) {
                    dispatch({ type: INVALID_USER, data: { error_msg: error.response.data.message } });
                }
            });
    }
};

export const RegisterUser = (credentials) => {
    return (dispatch) => {
        authService.register(credentials)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: REGISTER_SUCCESSFUL,
                        users: response.data,
                    });
                }
            })
            .catch((err) => {
                if (err) {
                    dispatch({
                        type: REGISTER_FAILED,
                        error_msg: err
                    })
                }
            })
    }
}

export const GetUser = () => {

    return (dispatch) => {
        authService.getUser()
            .then((response) => {

                if (response.status === 200) {

                    dispatch({
                        type: GET_USER_SUCCESSFUL,
                        users: response.data
                    });
                }
            })
            .catch((err) => {
                if (err) {
                    dispatch({
                        type: GET_USER_FAILED,
                        error_msg: err
                    })
                }
            })
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId")
    }
};


