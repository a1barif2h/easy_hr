import axios from "axios";
import { ERROR, GET_ALL_EMPLOYEES, LOADING } from "../types";

export const getAllEmployees = () => async dispatch => {
    dispatch({
        type: LOADING
    });
    try {
        const {data} = await axios.get('/employees')
        dispatch({
            type: GET_ALL_EMPLOYEES,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error
        })
    }
}