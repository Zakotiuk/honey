import { connect } from 'react-redux'
import { getStudent, editStudent, getCourses } from './action'
import Students from './panel';


const mapState = (stateRedux) => {
    return {
        loading: stateRedux.panelSt.loading,
        errors: stateRedux.panelSt.errors,
        students: stateRedux.panelSt.students,
        currentPage: stateRedux.panelSt.currentPage,
        totalCount: stateRedux.panelSt.totalCount,
        sizePage: stateRedux.panelSt.sizePage,
        courses : stateRedux.panelSt.courses
    }
}

const PanelPage = Students;
export default connect(mapState, { getStudent, editStudent, getCourses })(PanelPage)