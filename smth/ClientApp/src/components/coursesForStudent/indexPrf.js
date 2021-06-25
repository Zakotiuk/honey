import { connect } from 'react-redux'
import { getProfile, unsubCourse } from './action'
import Profile from './profile'

const mapState = (stateRedux) => {
    return {
        loading: stateRedux.courses.loading,
        errors: stateRedux.courses.errors,
        name: stateRedux.courses.name,
        lastname: stateRedux.courses.lastname,
        age: stateRedux.courses.age,
        email: stateRedux.courses.email,
        courses: stateRedux.courses.courses,
    }
}

const ProfilePage = Profile;
export default connect(mapState, { getProfile, unsubCourse })(ProfilePage)