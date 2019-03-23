import * as productService from '../services/products';
import { GET_PRODUCT_SUCCESSFUL, GET_PRODUCT_FAILED, GET_PRODUCT_BY_ID_SUCCESSFUL, GET_PRODUCT_BY_ID_FAILED } from '../reducer/product';

export const getProduct = () => {    
    return (dispatch) => {
        productService.getProduct()
            .then((res) => {                
                if (res.status === 200) {
                    var image = [];
                    res.data.map((item, i) => {                        
                        image[i] = JSON.parse(item.image);
                        res.data[i].image = image[i];
                        return item.image;
                    })

                    dispatch({
                        type: GET_PRODUCT_SUCCESSFUL,
                        product_list: res.data
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_PRODUCT_FAILED,
                    error_msg: err
                })
            })
    }
};

export const getProductById = (id) => {
    return (dispatch) => {
        productService.getProductById(id)
            .then((res) => {
                if (res.status === 200) {
                    var image = [];
                    res.data.map((item, i) => {
                        image[i] = JSON.parse(item.image);
                        res.data[i].image = image[i];
                        return item.image;
                    })
                    dispatch({
                        type: GET_PRODUCT_BY_ID_SUCCESSFUL,
                        productById: res.data
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_PRODUCT_BY_ID_FAILED,
                    error_msg: err
                })
            })
    }
}
