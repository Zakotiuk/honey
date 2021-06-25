import * as types from './types';
import WorkingAboveStudentService from './service';

export const getStudent = (page = 1, que = "") => {
    return (dispatch) => {
        dispatch({ type: types.GETSTUDENTSTARTED });
        dispatch({ type: types.SETCURRENTPAGE, payload: page });
        if (que !== "") {
            dispatch({ type: types.SETCURRENTPAGE, payload: 1 });
        }

        WorkingAboveStudentService.getStudent(page, que)
            .then((response) => {
                console.log("Success here", response.data);
                var students = response.data.students;
                students.forEach(function(item, index, array){
                    WorkingAboveStudentService.getCourse(item.key)
                    .then((courses)=>{
                        console.log(courses);
                        item.courses = courses.data;
                    })

                    console.log("Item key" , item.key)
                });
                console.log("Look here", students);
                var data = {students : students, 
                            totalCount : response.data.totalCount,
                            sizeOfPage : response.data.sizeOfPage};
                dispatch({ type: types.GETSTUDENTSUCCESS, payload: data });
            }, error => {
                console.log("error: ", error.response);
                dispatch({
                    type: types.GETSTUDENTFAILED,
                    errors: error.response.data
                });
            })
            .catch(err => {
                console.log("Server error", err)
            });
    }
}

export const getCourses = (id) => {
    return (dispatch) => {
        dispatch({ type: types.GETCOURSESTARTED });
        WorkingAboveStudentService.getCourse(id)
            .then((response) => {
                console.log("Success", response.data.courses);
                dispatch({ type: types.GETCOURSESUCCESS, payload: response.data });
            }, error => {
                console.log("error: ", error.response);
                dispatch({
                    type: types.GETCOURSEFAILED,
                    errors: error.response.data
                });
            })
            .catch(err => {
                console.log("Server error", err);
            });
    }
}

export const editStudent = (model) => {
    return (dispatch) => {
        dispatch({ type: types.EDITSTUDENTSTARTED });
        WorkingAboveStudentService.editStudent(model)
            .then((response) => {
                console.log("Success", response.data);
                dispatch({ type: types.EDITSTUDENTSUCCESS, payload: response.data });
            }, error => {
                console.log("error: ", error.response);
                dispatch({
                    type: types.EDITSTUDENTFAILED,
                    errors: error.response.data
                });
            })
            .catch(err => {
                console.log("Server error", err);
            });
    }
}