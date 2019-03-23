import * as registerService from '../services/register';
import { GET_STATE_BY_COUNTRY_SUCCESSFUL, GET_STATE_BY_COUNTRY_FAILED } from '../reducer/getState';

export const getState = (countryid) => {
    return (dispatch) => {
        registerService.getStateByCountryId(countryid)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: GET_STATE_BY_COUNTRY_SUCCESSFUL,
                        state_list: res.data
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_STATE_BY_COUNTRY_FAILED,
                    error_msg: err
                })
            })
    }
};