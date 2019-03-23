const INITIAL_STATE = {
    users_registered: [],
    token: "",
    role: "",
    error_msg: "",
    users: [],
    userId: ''
}
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const INVALID_USER = 'INVALID_USER';
export const LOGOUT = 'LOGOUT';

export const GET_USER_SUCCESSFUL = 'GET_USER_SUCCESSFUL';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const REGISTER_SUCCESSFUL = 'REGISTER_SUCCESSFUL';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESSFUL: {            
            return Object.assign({}, state, { token: action.data.token, role: action.data.role, userId: action.data.userId });
        }
        case INVALID_USER: {
            return Object.assign({}, state, { error_msg: action.data.error_msg });
        }
        case LOGOUT: {
            return Object.assign({}, state, { token: "", role: "", userId: "" });
        }
        case REGISTER_SUCCESSFUL: {
            return Object.assign({}, state, { users_registered: action.users });
        }
        case REGISTER_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case GET_USER_SUCCESSFUL: {
            return Object.assign({}, state, { users: action.users });
        }
        case GET_USER_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state;
    }
}