import * as registerService from '../services/register';
import { FAILED, ADD_REGISTER_DATA_SUCCESSFUL } from '../reducer/getRegisterData';

export const addRegisterData = (data) => {
    return (dispatch) => {
        registerService.addRegisterData(data)
            .then((response) => {
                if (response.status === 200) {                    
                    dispatch({
                        type: ADD_REGISTER_DATA_SUCCESSFUL,
                        data_list: response.data
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: FAILED,
                        error_msg: error
                    })
                }
            });
    }
}

