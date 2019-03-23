const INITIAL_STATE = {
    get_data_by_id: [],
    error_msg: ""
}

export const GET_DATA_BY_ID_SUCCESSFUL = 'GET_DATA_BY_ID_SUCCESSFUL';
export const GET_DATA_BY_ID_FAILED = 'GET_DATA_BY_ID_FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_DATA_BY_ID_SUCCESSFUL: {
            return { ...state, get_data_by_id: action.data_list }
        }
        case GET_DATA_BY_ID_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state;
    }
}
