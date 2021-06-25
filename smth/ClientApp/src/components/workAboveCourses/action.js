import * as types from './types';
import WorkingAboveCoursesService from './service';

export const getCourse = (page = 1, que = "") => {
    return (dispatch) => {
        dispatch({ type: types.GETCOURSESTARTED });
        dispatch({ type: types.SETCURRENTPAGE, payload: page });
        if (que !== "") {
            dispatch({ type: types.SETCURRENTPAGE, payload: 1 });
        }
        WorkingAboveCoursesService.getCourse(page, que)
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

export const addCourse = (model) =>{
    return(dispatch)=>{
        dispatch({type: types.ADDCOURSESSTARTED});
        WorkingAboveCoursesService.addCourse(model)
        .then((response)=>{
            console.log("Success", response.data);
            dispatch({type : types.ADDCOURSESSUCCESS, payload : response.data});
        },error=>{
            console.log("error: ", error.response);
            dispatch({
                type: types.ADDCOURSESFAILED,
                errors: error.response.data
            });
        })
        .catch(err=> {
            console.log("Server error", err);
        });
    }
}