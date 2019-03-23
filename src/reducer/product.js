const INITIAL_STATE = {
    products: [],
    error_msg: null,
    add_product_list: [],
    get_product_by_id: [],
    cart_list: [],
    add_delivery_data: [],
    cart_fruit_list: [],
    delivery_data: [],
    order: [],
    deliveryId: "",
}

export const GET_PRODUCT_SUCCESSFUL = 'GET_PRODUCT_SUCCESSFUL';
export const GET_PRODUCT_FAILED = 'GET_PRODUCT_FAILED';

export const ADD_PRODUCT_SUCCESSFUL = 'ADD_PRODUCT_SUCCESSFUL';
export const ADD_PRODUCT_FAILED = 'ADD_PRODUCT_FAILED';

export const DELETE_PRODUCT_SUCCESSFUL = "DELETE_PRODUCT_SUCCESSFUL";
export const DELETE_PRODUCT_FAILED = "DELETE_PRODUCT_FAILED";

export const UPDATE_PRODUCT_SUCCESSFUL = 'UPDATE_PRODUCT_SUCCESSFUL';
export const UPDATE_PRODUCT_FAILED = 'UPDATE_PRODUCT_FAILED';

export const GET_PRODUCT_BY_ID_SUCCESSFUL = 'GET_PRODUCT_BY_ID_SUCCESSFUL';
export const GET_PRODUCT_BY_ID_FAILED = 'GET_PRODUCT_BY_ID_FAILED';

export const ADD_TO_CART_SUCCESSFUL = 'ADD_TO_CART_SUCCESSFUL';
export const ADD_TO_CART_FAILED = 'ADD_TO_CART_FAILED';

export const GET_CART_BY_USER_SUCCESSFUL = 'GET_CART_BY_USER_SUCCESSFUL';
export const GET_CART_BY_USER_FAILED = 'GET_CART_BY_USER_FAILED';

export const DELETE_CART_SUCCESSFUL = 'DELETE_CART_SUCCESSFUL';
export const DELETE_CART_FAILED = 'DELETE_CART_FAILED';

export const ADD_DELIVERY_DATA_SUCCESSFUL = 'ADD_DELIVERY_DATA_SUCCESSFUL';
export const ADD_DELIVERY_DATA_FAILED = 'ADD_DELIVERY_DATA_FAILED';

export const GET_DELIVERY_DATA_BY_USER_SUCCESSFUL = 'GET_DELIVERY_DATA_BY_USER_SUCCESSFUL';
export const GET_DELIVERY_DATA_BY_USER_FAILED = 'GET_DELIVERY_DATA_BY_USER_FAILED';

export const GET_CART_BY_FRUIT_SUCCESSFUL = 'GET_CART_BY_FRUIT_SUCCESSFUL';
export const GET_CART_BY_FRUIT_FAILED = 'GET_CART_BY_FRUIT_FAILED';

export const ADD_ORDER_SUCCESSFUL = 'ADD_ORDER_SUCCESSFUL';
export const ADD_ORDER_FAILED = 'ADD_ORDER_FAILED';

export const UPDATE_ORDERED_CART_SUCCESSFUL = 'UPDATE_ORDERED_CART_SUCCESSFUL';
export const UPDATE_ORDERED_CART_FAILED = 'UPDATE_ORDERED_CART_FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCT_SUCCESSFUL: {
            return {
                ...state,
                products: action.product_list
            }
        }
        case GET_PRODUCT_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case ADD_PRODUCT_SUCCESSFUL: {
            return Object.assign({}, state);
        }
        case ADD_PRODUCT_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case DELETE_PRODUCT_SUCCESSFUL: {
            return Object.assign({}, state, {
                products: [...state.products.filter(product => product.id !== action.id)],
            });
        }
        case DELETE_PRODUCT_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case UPDATE_PRODUCT_SUCCESSFUL: {
            let index = state.products.findIndex((product) => product.id === parseInt(action.id));
            state.products[index] = action.data;
            return state;
        }
        case UPDATE_PRODUCT_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case GET_PRODUCT_BY_ID_SUCCESSFUL: {
            return Object.assign({}, state, { get_product_by_id: action.productById });
        }
        case GET_PRODUCT_BY_ID_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case ADD_TO_CART_SUCCESSFUL: {
            return Object.assign({}, state, { cart_list: action.cart_list });
        }
        case ADD_TO_CART_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case GET_CART_BY_USER_SUCCESSFUL: {
            return Object.assign({}, state, { cart_list: action.cart_list });
        }
        case GET_CART_BY_USER_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case GET_CART_BY_FRUIT_SUCCESSFUL: {
            return Object.assign({}, state, { cart_fruit_list: action.cart_fruit_list });
        }
        case GET_CART_BY_FRUIT_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case DELETE_CART_SUCCESSFUL: {
            return Object.assign({}, state, {
                cart_list: [...state.cart_list.filter(cart => cart.fruitId !== action.fruitid)],
            });
        }
        case DELETE_CART_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case ADD_DELIVERY_DATA_SUCCESSFUL: {
            return Object.assign({}, state, { add_delivery_data: action.delivery, deliveryId: action.deliveryId });
        }
        case ADD_DELIVERY_DATA_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case GET_DELIVERY_DATA_BY_USER_SUCCESSFUL: {
            return Object.assign({}, state, { delivery_data: action.delivery_data });
        }
        case GET_DELIVERY_DATA_BY_USER_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case ADD_ORDER_SUCCESSFUL: {
            return Object.assign({}, state, { order: action.order });
        }
        case ADD_ORDER_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        case UPDATE_ORDERED_CART_SUCCESSFUL: {
            return Object.assign({}, state);
        }
        case UPDATE_ORDERED_CART_FAILED: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state;
    }
}