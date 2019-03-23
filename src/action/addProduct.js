import * as productService from '../services/products';
import { ADD_PRODUCT_FAILED, ADD_PRODUCT_SUCCESSFUL } from '../reducer/product';

export const addProduct = (data) => {
    return (dispatch) => {
        productService.addProduct(data)
            .then((response) => {
                if (response.status === 200) {
                    response.data.image = JSON.parse(response.data.image);
                    dispatch({
                        type: ADD_PRODUCT_SUCCESSFUL
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: ADD_PRODUCT_FAILED,
                        error_msg: error
                    })
                }
            });
    }
}