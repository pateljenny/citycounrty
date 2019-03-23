import * as registerService from '../services/register';
import { GET_COUNTRY_SUCCESSFUL, GET_COUNTRY_FAILED } from '../reducer/getCountry';

export const getCountry = () => {
    return (dispatch) => {
        registerService.getCountry()
            .then((res) => {
                if (res.status === 200) {                  
                    dispatch({
                        type: GET_COUNTRY_SUCCESSFUL,
                        counrty_list: res.data
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_COUNTRY_FAILED,
                    error_msg: err
                })
            })
    }
};