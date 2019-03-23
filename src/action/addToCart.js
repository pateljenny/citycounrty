import * as productService from '../services/products';
import { ADD_TO_CART_FAILED, ADD_TO_CART_SUCCESSFUL, GET_CART_BY_USER_SUCCESSFUL, GET_CART_BY_USER_FAILED, GET_CART_BY_FRUIT_FAILED, GET_CART_BY_FRUIT_SUCCESSFUL, DELETE_CART_FAILED, DELETE_CART_SUCCESSFUL, UPDATE_ORDERED_CART_SUCCESSFUL, UPDATE_ORDERED_CART_FAILED } from '../reducer/product';

export const addToCart = (data) => {
    return (dispatch) => {
        productService.addToCart(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_TO_CART_SUCCESSFUL,
                        cart_list: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: ADD_TO_CART_FAILED,
                        error_msg: error
                    })
                }
            });
    }
}

export const getCart = (id) => {
    return (dispatch) => {
        productService.getCartbyUser(id)
            .then((response) => {
                if (response.status === 200) {
                    var image = [];
                    response.data.map((item, i) => {
                        image[i] = JSON.parse(item.image);
                        response.data[i].image = image[i];
                        return item.image;
                    })
                    dispatch({
                        type: GET_CART_BY_USER_SUCCESSFUL,
                        cart_list: response.data
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_CART_BY_USER_FAILED,
                    error_msg: err
                })
            })
    }
}

export const getCartByFruit = (fruitid) => {
    return (dispatch) => {
        productService.getCartByFruit(fruitid)
            .then((response) => {
                if (response.status === 200) {
                    var image = [];
                    response.data.map((item, i) => {
                        image[i] = JSON.parse(item.image);
                        response.data[i].image = image[i];
                        return item.image;
                    })
                    dispatch({
                        type: GET_CART_BY_FRUIT_SUCCESSFUL,
                        cart_fruit_list: response.data
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_CART_BY_FRUIT_FAILED,
                    error_msg: err
                })
            })
    }
}


export const deleteCart = (fruitid) => {
    return (dispatch) => {
        //let fruitsdata = getState.product.
        productService.deleteCart(fruitid)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: DELETE_CART_SUCCESSFUL,
                        fruitid: fruitid
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_CART_FAILED,
                    error_msg: error
                })
            });
    }
}

export const UpdateOrderedCart = (fruitid, userid) => {
    return (dispatch) => {
        productService.updateOrderedCart(fruitid, userid)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: UPDATE_ORDERED_CART_SUCCESSFUL,
                    })
                }
            }).catch((error) => {
                if (error) {
                    dispatch({
                        type: UPDATE_ORDERED_CART_FAILED,
                        error_msg: error
                    })
                }
            });
    }
}