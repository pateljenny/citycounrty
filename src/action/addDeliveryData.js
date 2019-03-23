import * as productService from '../services/products';
import { ADD_DELIVERY_DATA_FAILED, ADD_DELIVERY_DATA_SUCCESSFUL, GET_DELIVERY_DATA_BY_USER_FAILED, GET_DELIVERY_DATA_BY_USER_SUCCESSFUL } from '../reducer/product';

export const addDeliveryDetails = (data) => {
    return (dispatch) => {
        productService.addDeliveryDetails(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_DELIVERY_DATA_SUCCESSFUL,
                        delivery: response.data,
                        deliveryId:response.data.id
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: ADD_DELIVERY_DATA_FAILED,
                        error_msg: error
                    })
                }
            });
    }
}

export const getDeliveryByUser = (userid) => {
    return (dispatch) => {
        productService.getDeliveryByUser(userid)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: GET_DELIVERY_DATA_BY_USER_SUCCESSFUL,
                        delivery_data: res.data
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_DELIVERY_DATA_BY_USER_FAILED,
                    error_msg: err
                })
            })
    }
}

