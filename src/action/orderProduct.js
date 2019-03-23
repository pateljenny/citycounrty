import * as productService from '../services/products';
import { ADD_ORDER_FAILED, ADD_ORDER_SUCCESSFUL } from '../reducer/product';

export const addOrder = (data) => {
    return (dispatch) => {
        productService.addOrder(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_ORDER_SUCCESSFUL,
                        order: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: ADD_ORDER_FAILED,
                        error_msg: error
                    })
                }
            });
    }
}