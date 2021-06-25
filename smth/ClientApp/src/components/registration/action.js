import * as types from './types';
import RegisterService from './service';
import { push } from 'connected-react-router';
import "react-notifications/lib/notifications.css";
import {NotificationManager} from "react-notifications";

export const registerUser = (model) =>{
    return(dispatch)=>{
        dispatch({type: types.REGISTRATIONSTARTED});
        RegisterService.registerUser(model)
        .then((response)=>
        {
            console.log("Success");
            dispatch({type : types.REGISTRATIONSUCCESS});
            NotificationManager.info("Check please your email for ending registration", "", 15000);
            dispatch(push('/login'));
        },error=>{
            console.log("error: ", error.response);
            dispatch({
                type: types.REGISTRATIONSFAILED,
                errors: error.response.data
            });
        })
        .catch(err=>{
            console.log("Server error", err);
        });
    }
}