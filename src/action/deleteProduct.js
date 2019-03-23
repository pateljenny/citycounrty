import * as productService from '../services/products';
import { DELETE_PRODUCT_SUCCESSFUL, DELETE_PRODUCT_FAILED } from '../reducer/product';

export const deleteProduct = (id) => {
    return (dispatch) => {    
        //let fruitsdata = getState.product.
        productService.deleteProduct(id)
            .then((response) => {                
                if (response.status === 200) {                    
                    dispatch({
                        type: DELETE_PRODUCT_SUCCESSFUL,
                        id:id
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_PRODUCT_FAILED,
                    error_msg: error
                })
            }); 
    }
}