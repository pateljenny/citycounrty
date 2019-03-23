import * as registerService from '../services/register';
import { UPDATE_REGISTER_DATA_SUCCESSFUL, FAILED } from '../reducer/getRegisterData';

export const updateRegister = (id, data) => {
    return (dispatch) => {                
        registerService.updateRegisterById(id, data)
            .then((response) => {                
                if (response.status === 200) {                    
                    dispatch({
                        type: UPDATE_REGISTER_DATA_SUCCESSFUL,
                        data: response.data[0],
                        id: id
                    })
                }
            }).catch((error) => {                
                if (error) {
                    dispatch({
                        type: FAILED,
                        error_msg: error
                    })
                }
            });
    }
}