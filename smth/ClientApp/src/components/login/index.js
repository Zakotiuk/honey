import Login from './Login';
import { connect } from 'react-redux';
import { loginUser, loginFacebook } from './action';

const mapState = (stateRedux) => {
    return {
        loading: stateRedux.login.loading,
        errors: stateRedux.login.errors,
    }
}

const LoginPage = Login;
export default connect( mapState, { loginUser, loginFacebook })(LoginPage);