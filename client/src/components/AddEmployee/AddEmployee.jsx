import React from "react";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import './AddEmployee.scss';

const AddEmployee = () => {
  return (
    <>
      <div className="employee_top_container">
        <div />
        <div className="employee_content">
          <p>Add Employee</p>
        </div>
        <div />
      </div>
      <div className='add_employee_form_container'>
          <EmployeeForm />
      </div>
    </>
  );
};

export default AddEmployee;
