import Register from './registration';
import { connect } from 'react-redux';
import {registerUser} from './action';

const mapState = (stateRedux) => {
    return {
        loading: stateRedux.register.loading,
        errors: stateRedux.register.errors,
    }
}

const RegisterPage = Register;
export default connect(mapState, { registerUser })(RegisterPage);