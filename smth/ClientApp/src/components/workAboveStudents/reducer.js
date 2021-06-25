import * as types from './types';
const initialState = {
    students: [],
    courses: [],
    totalCount: 0,
    sizeOfPage: 15,
    currentPage: 1
}

export const workAboveStudentreducer = (state = initialState, action) => {
    console.log("Reducer working", action);
    switch (action.type) {
        case types.GETSTUDENTSTARTED:
            return {
                ...state,
                loading: true,
                errors: ""
            }

        case types.GETSTUDENTSUCCESS:
            return {
                ...state,
                loading: false,
                errors: "",
                students: action.payload.students,
                totalCount: action.payload.totalCount,
                sizeOfPage: action.payload.sizeOfPage
            }
        case types.GETSTUDENTFAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors
            }
        case types.GETCOURSESTARTED:
            return {
                ...state,
                loading: true,
                errors: ""
            }
        case types.GETSTUDENTSUCCESS:
            return {
                ...state,
                loading: false,
                errors: "",
                courses: action.payload
            }

        case types.SETCURRENTPAGE: {
            return {
                ...state,
                loading: true,
                currentPage: action.payload
            };
        }

        case types.EDITSTUDENTSTARTED: {
            return {
                ...state,
                loading: true,
                errors: ""
            }
        }
        case types.EDITSTUDENTSUCCESS: {
            return {
                ...state,
                loading: false,
                errors: ""
            }
        }
        case types.EDITSTUDENTFAILED: {
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