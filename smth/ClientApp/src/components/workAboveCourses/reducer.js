import * as types from './types';
const initialState = {
    courses: [],
    totalCount: 0,
    sizeOfPage: 15,
    currentPage: 1
}

export const workAboveCourseReducer = (state = initialState, action) => {
    console.log("Reducer working", action);
    switch (action.type) {
        case types.GETCOURSESTARTED:
            return {
                ...state,
                loading: true,
                errors: ""
            }

        case types.GETCOURSESUCCESS:
            return {
                ...state,
                loading: false,
                errors: "",
                courses: action.payload.courses,
                totalCount: action.payload.totalCount,
                sizeOfPage: action.payload.sizeOfPage
            }

        case types.GETCOURSEFAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors
            }

        case types.SETCURRENTPAGE: {
            return {
                ...state,
                loading: true,
                currentPage: action.payload
            };
        }

        case types.ADDCOURSESSTARTED: {
            return {
                ...state,
                loading: true,
                errors: ""
            }
        }
        case types.ADDCOURSESSUCCESS: {
            return {
                ...state,
                loading: false,
                errors: ""
            }
        }
        case types.ADDCOURSESFAILED: {
            return {
                ...state,
                loading: false,
                errors: action.errors
            }
        }
        default:
            break;
    }
    return state;
}