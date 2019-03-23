const INITIAL_STATE = {
    state: [],
    error_msg: ""
}

export const GET_STATE_BY_COUNTRY_SUCCESSFUL = 'GET_STATE_BY_COUNTRY_SUCCESSFUL';
export const GET_STATE_BY_COUNTRY_FAILED = 'GET_STATE_BY_COUNTRY_FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_STATE_BY_COUNTRY_SUCCESSFUL: {
            return {
                ...state,
                state: action.state_list
            }
        }
        case GET_STATE_BY_COUNTRY_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state;
    }
}