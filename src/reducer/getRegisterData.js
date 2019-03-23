const INITIAL_STATE = {
    error_msg: null,
    data: [],
    add_data: [],
    pages: "",
    count: ""
}
export const GET_REGISTER_DATA_SUCCESSFUL = 'GET_REGISTER_DATA_SUCCESSFUL';
export const DELETE_REGISTER_DATA_SUCCESSFUL = 'DELETE_REGISTER_DATA_SUCCESSFUL';
export const UPDATE_REGISTER_DATA_SUCCESSFUL = 'UPDATE_REGISTER_DATA_SUCCESSFUL';
export const ADD_REGISTER_DATA_SUCCESSFUL = 'ADD_REGISTER_DATA_SUCCESSFUL';
export const GET_LIMIT_DATA = 'GET_LIMIT_DATA';
export const FAILED = 'FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_REGISTER_DATA_SUCCESSFUL: {
            return { ...state, data: action.data_list }
        }
        case DELETE_REGISTER_DATA_SUCCESSFUL: {
            return Object.assign({}, state, { data: [...state.data.filter(data => data.regId !== action.regId)] });
        }
        case UPDATE_REGISTER_DATA_SUCCESSFUL: {
            var data = state.data.map(item => item.regId === action.id ? action.data : item)
            return Object.assign({}, state, { data: data });
        }
        case ADD_REGISTER_DATA_SUCCESSFUL: {
            return Object.assign({}, state, { data: state.data.concat(action.data_list) });
        }
        case GET_LIMIT_DATA: {
            return { ...state, data: action.data_list, pages: action.pages, count: action.count }
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state;
    }
}