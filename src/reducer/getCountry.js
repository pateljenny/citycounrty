const INITIAL_STATE = {
    country: [],    
    error_msg: ""
}

export const GET_COUNTRY_SUCCESSFUL = 'GET_COUNTRY_SUCCESSFUL';
export const GET_COUNTRY_FAILED = 'GET_COUNTRY_FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_COUNTRY_SUCCESSFUL: {
            return {
                ...state,
                country: action.counrty_list
            }
        }
        case GET_COUNTRY_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state;
    }
}