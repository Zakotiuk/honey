import * as types from './types';
const initialState = {
    courses: [],
    totalCount: 0,
    sizeOfPage: 15,
    currentPage: 1,
    lastname: "",
    email: "",
    age: "",
    name: ""
}

export const courseForStudentReducer = (state = initialState, action) => {
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

        case types.SUBCOURSESSTARTED: {
            return {
                ...state,
                loading: true,
                errors: ""
            }
        }
        case types.SUBCOURSESSUCCESS: {
            return {
                ...state,
                loading: false,
                errors: "",
                courses: action.payload.courses
            }
        }
        case types.SUBCOURSESFAILED: {
            return {
                ...state,
                loading: false,
                errors: action.errors
            }
        }

        case types.UNSUBCOURSESSTARTED: {
            return {
                ...state,
                loading: true,
                errors: ""
            }
        }
        case types.UNSUBCOURSESSUCCESS: {
            return {
                ...state,
                loading: false,
                errors: "",
                courses: action.payload.courses
            }
        }
        case types.UNSUBCOURSESFAILED: {
            return {
                ...state,
                loading: false,
                errors: action.errors
            }
        }

        case types.GETPROFILESTARTED: {
            return {
                ...state,
                loading: true,
                errors: ""
            }
        }
        case types.GETPROFILESUCCESS: {
            return {
                ...state,
                loading: false,
                errors: "",
                lastname: action.payload.lastname,
                email: action.payload.email,
                age: action.payload.age,
                name: action.payload.name,
                courses: action.payload.courses
            }
        }
        case types.GETPROFILEFAILED: {
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