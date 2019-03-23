import * as productService from '../services/products';
import { UPDATE_PRODUCT_SUCCESSFUL, UPDATE_PRODUCT_FAILED } from '../reducer/product';

export const updateProduct = (id, data) => {
    return (dispatch) => {

        productService.updateProduct(id, data)
            .then((response) => {

                if (response.status === 200) {
                    dispatch({
                        type: UPDATE_PRODUCT_SUCCESSFUL,
                        data: data,
                        id: id
                    })
                }
            }).catch((error) => {
                if (error) {
                    dispatch({
                        type: UPDATE_PRODUCT_FAILED,
                        error_msg: error
                    })
                }
            });
    }
}