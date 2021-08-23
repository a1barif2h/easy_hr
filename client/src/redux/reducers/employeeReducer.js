import { DELETE_EMPLOYEE, ERROR, GET_ALL_EMPLOYEES, HIDE_ERROR, HIDE_SUCCESS_MESSAGE, LOADING, MAIL_SENDING, MAIL_SEND_SUCCESS, UPDATE_EMPLOYEE } from "../types";

const initialState = {
    loading: false,
    error: null,
    mailSending: false,
    isUpdateEmploy: false,
    allEmployees: [],
    successMessage: ''
}

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEES:
            return {
                ...state,
                loading: false,
                error: null,
                isUpdateEmploy: false,
                allEmployees: action.payload
            }

        case DELETE_EMPLOYEE:
            return {
                ...state,
                loading: false,
                error: null,
                isUpdateEmploy: false,
            }

        case MAIL_SENDING: 
        return {
            ...state,
            mailSending: true
        }

        case MAIL_SEND_SUCCESS:
            return {
                ...state,
                mailSending: false,
                successMessage: action.payload
            }

        case HIDE_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: ''
            }

        case UPDATE_EMPLOYEE:
            return {
                ...state,
                isUpdateEmploy: true
            }

        case HIDE_ERROR:
            return {
                ...state,
                error: null,
                loading: false,
            }

        case ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        case LOADING:
            return {
                ...state,
                loading: true
            }
        
    
        default:
            return state;
    }
}

export default employeeReducer