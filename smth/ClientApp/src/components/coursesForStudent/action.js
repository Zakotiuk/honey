import * as types from './types';
import CourseForStudentService from './service'
export const getCourse = (page = 1, que = "") => {
    return (dispatch) => {
        dispatch({ type: types.GETCOURSESTARTED });
        dispatch({ type: types.SETCURRENTPAGE, payload: page });
        if (que !== "") {
            dispatch({ type: types.SETCURRENTPAGE, payload: 1 });
        }
        CourseForStudentService.getCourse(page, que)
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
                console.log("Server error", err)
            });
    }
}

export const getProfile = (id) => {
    return (dispatch) => {
        dispatch({ type: types.GETPROFILESTARTED });
        CourseForStudentService.getProfile(id)
            .then((response) => {
                console.log("Success", response.data.name);
                dispatch({ type: types.GETPROFILESUCCESS, payload: response.data });
            }, error => {
                console.log("error: ", error.response);
                dispatch({
                    type: types.GETPROFILEFAILED,
                    errors: error.response.data
                });
            })
            .catch(err => {
                console.log("Server error", err)
            });
    }
}


export const subCourse = (model) =>{
    return(dispatch)=>{
        dispatch({type: types.SUBCOURSESSTARTED});
        CourseForStudentService.sub(model)
        .then((response)=>{
            console.log("Success", response.data);
            dispatch({type : types.SUBCOURSESSUCCESS, payload : response.data});
        },error=>{
            console.log("error: ", error.response);
            dispatch({
                type: types.SUBCOURSESFAILED,
                errors: error.response.data
            });
        })
        .catch(err=> {
            console.log("Server error", err);
        });
    }
}

export const unsubCourse = (model) =>{
    return(dispatch)=>{
        dispatch({type: types.UNSUBCOURSESSTARTED});
        CourseForStudentService.unsub(model)
        .then((response)=>{
            console.log("Success", response.data);
            dispatch({type : types.UNSUBCOURSESSUCCESS, payload : response.data});
        },error=>{
            console.log("error: ", error.response);
            dispatch({
                type: types.UNSUBCOURSESFAILED,
                errors: error.response.data
            });
        })
        .catch(err=> {
            console.log("Server error", err);
        });
    }
}