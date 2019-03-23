import * as registerService from '../services/register';
import { GET_REGISTER_DATA_SUCCESSFUL, FAILED } from '../reducer/getRegisterData';
import { GET_DATA_BY_ID_SUCCESSFUL, GET_DATA_BY_ID_FAILED } from '../reducer/getDataById';

export const getRegisterData = () => {
    return (dispatch) => {
        registerService.getRegisterData()
            .then((res) => {
                if (res.status === 200) {
                    // var image = [];
                    // res.data.map((item, i) => {
                    //     image[i] = JSON.parse(item.image);
                    //     res.data[i].image = image[i];
                    //     return item.image;
                    // })

                    dispatch({
                        type: GET_REGISTER_DATA_SUCCESSFUL,
                        data_list: res.data
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: FAILED,
                    error_msg: err
                })
            })
    }
};

export const getDataById = (id) => {
    return (dispatch) => {
        registerService.getRegisterDataById(id)
            .then((res) => {
                if (res.status === 200) {
                    // var image = [];
                    // res.data.map((item, i) => {
                    //     image[i] = JSON.parse(item.image);
                    //     res.data[i].image = image[i];
                    //     return item.image;
                    // })
                    dispatch({
                        type: GET_DATA_BY_ID_SUCCESSFUL,
                        data_list: res.data
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_DATA_BY_ID_FAILED,
                    error_msg: err
                })
            })
    }
}
