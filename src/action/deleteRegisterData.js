import * as registerService from '../services/register';
import { DELETE_REGISTER_DATA_SUCCESSFUL, FAILED } from '../reducer/getRegisterData';

export const deleteRegister = (id) => {
    return (dispatch) => {        
        registerService.deleteRegisterData(id)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: DELETE_REGISTER_DATA_SUCCESSFUL,
                        regId: id,
                        data:response.data
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: FAILED,
                    error_msg: error
                })
            });
    }
}