import { notification } from "antd";
import axios from "axios";
import { DELETE_EMPLOYEE, ERROR, GET_ALL_EMPLOYEES, LOADING } from "../types";

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

export const deleteEmployee = (employeeId) => async dispatch => {
    try {
        const {data} = await axios.delete(`/employees/delete/${employeeId}`)
        dispatch({
            type: DELETE_EMPLOYEE
        })
        
        if(data.message) {
            const {data: updateData} = await axios.get('/employees')
            dispatch({
                type: GET_ALL_EMPLOYEES,
                payload: updateData
            })
            if(updateData) {
                return notification.success({message: data.message})
            }
            
        } else {
            return notification.error({message: data.error})
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error
        })
    }
    console.log(employeeId)
}