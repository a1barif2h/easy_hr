import { notification } from "antd";
import axios from "axios";
import { DELETE_EMPLOYEE, ERROR, GET_ALL_EMPLOYEES, LOADING, MAIL_SENDING, MAIL_SEND_SUCCESS, UPDATE_EMPLOYEE } from "../types";

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
}

export const sendEmail = (subject, mailList, message) => async dispatch => {
    dispatch({
        type: MAIL_SENDING
    })

    try {
        const {data} = await axios.post('/employees/send-email', {
            subject,
            mailList,
            message
        })
        if(data.success) {
            dispatch({
                type: MAIL_SEND_SUCCESS,
                payload: data.success
            })

            return notification.success({message: data.success})
        } else {
            return notification.error({message: data.error})
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error
        })
    }
}

export const updateEmployee = (employeeId, first_name, last_name, email) => async dispatch => {
    dispatch({
        type: UPDATE_EMPLOYEE
    })

    try {
        const {data} = await axios.put(`/employees/update/${employeeId}`, {
            first_name,
            last_name,
            email
        })

        if(data.uuid) {
            const {data: updateData} = await axios.get('/employees')
            dispatch({
                type: GET_ALL_EMPLOYEES,
                payload: updateData
            })
            if(updateData) {
                return notification.success({message: 'Employee Update successful'})
            }
        } else {
            return notification.error({message: 'Something went wrong'})
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error
        })
    }
}