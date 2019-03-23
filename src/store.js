import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';

const composeEnhancer =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancer(
    applyMiddleware(thunk)
);

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const userId = localStorage.getItem("userId");

const INITIAL_STATE = {
    auth: {
        token: "",
        role: "",
        error_msg: "",
        userId: ""
    }
}
if (token && role && userId) {
    INITIAL_STATE.auth.token = token;
    INITIAL_STATE.auth.role = role;
    INITIAL_STATE.auth.userId = userId;
}

export default createStore(rootReducer, INITIAL_STATE, enhancer);