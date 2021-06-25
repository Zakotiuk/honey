import jwt from 'jsonwebtoken';

export default class NavbarService {

    static isRole() {
      var token = localStorage.getItem('authToken');
      if(token) {
        var decode = jwt.decode(token);
        console.log(decode.roles);
        return decode.roles;
      }
    }

}