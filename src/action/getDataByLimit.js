import * as registerService from '../services/register';
import { GET_LIMIT_DATA, FAILED } from '../reducer/getRegisterData';

export const getDataByLimit = (limitno, page) => {
    return (dispatch) => {
        registerService.getDataByLimit(limitno, page)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: GET_LIMIT_DATA,
                        data_list: res.data.users,
                        pages: res.data.pages,
                        count: res.data.count
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