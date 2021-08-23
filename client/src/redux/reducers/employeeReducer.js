import { DELETE_EMPLOYEE, ERROR, GET_ALL_EMPLOYEES, HIDE_ERROR, LOADING } from "../types";

const initialState = {
    loading: false,
    error: null,
    allEmployees: []
}

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEES:
            return {
                ...state,
                loading: false,
                error: null,
                allEmployees: action.payload
            }

        case DELETE_EMPLOYEE:
            return {
                ...state,
                loading: false,
                error: null
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