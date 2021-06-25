import * as types from './types';
import isEmpty from 'lodash/isEmpty';

console.log(localStorage.getItem('authToken'));

const intialState = {
    token: localStorage.getItem('authToken'),
    isAuthenticated: localStorage.getItem('authToken') ? true : false,
    loading: false,
    errors: {
    }
}

export const loginReducer = (state = intialState, action) => {
    console.log("Reducer working", action);
    switch (action.type) {
        case types.LOGINSTARTED:
            return {
                ...state,
                loading: true,
                errors: ""
            }
            
        case types.LOGINSUCCESS:
            return {
                ...state,
                loading: false,
                errors: ""
            }

        case types.LOGINFAILED:
                return {
                    ...state,
                    loading: false,
                    errors: action.errors
                }
    
        case types.LOGINSETCURRENTUSER:{
                return {
                    ...state, 
                    user: action.user,
                    isAuthenticated: !isEmpty(action.user),
                };
            }

            case types.LOGOUT:{
                return {
                    ...state, 
                    user: null,
                    isAuthenticated: false,
                };
            }
        default:
            break;
    }
    return state;
}