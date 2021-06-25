import { connect } from 'react-redux'
import {getCourse, addCourse} from './action'
import Courses from './panel';


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

const PanelCoursePage = Courses; 
export default connect(mapState, { getCourse, addCourse })(PanelCoursePage)