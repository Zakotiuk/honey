import { connect } from 'react-redux'
import { getCourse, subCourse } from './action'
import CoursesForStudent from './panel'

const mapState = (stateRedux) => {
    return {
        loading: stateRedux.panel.loading,
        errors: stateRedux.panel.errors,
        courses: stateRedux.panel.courses,
        currentPage: stateRedux.panel.currentPage,
        totalCount: stateRedux.panel.totalCount,
        sizePage: stateRedux.panel.sizePage,
    }
}

const CoursePage = CoursesForStudent;
export default connect(mapState, { getCourse, subCourse })(CoursePage)