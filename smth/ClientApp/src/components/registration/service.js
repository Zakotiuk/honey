import axios from 'axios';

export default class RegisterService
{
    static registerUser(model){
        console.log("go to back");
        return axios.post('api/Account/register', model);
    }
}