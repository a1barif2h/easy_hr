import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllEmployees } from '../redux/actions/employeesActions';

const Employee = ({
    data: {
        employee
    } ,
    getAllEmployees
}) => {

    console.log(employee)

    useEffect(() => {
        getAllEmployees()
    },[getAllEmployees])

    return (
        <div>
            <h1>Employee</h1>
        </div>
    );
};

const mapStatToProps = state => ({
    data: state
})

const mapActionToProps = {
    getAllEmployees
}

export default connect(mapStatToProps, mapActionToProps)(Employee);