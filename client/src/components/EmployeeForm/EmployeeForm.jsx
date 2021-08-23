import { Button, Form, Input, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../../redux/actions/employeesActions';
import { HIDE_ERROR } from '../../redux/types';



const EmployeeForm = ({ employee, updateEmployee, addEmployee, data: {isUpdateEmploy, error, successMessage} }) => {
    // console.log(employee)
    const dispatch = useDispatch()
    const [form] = useForm()

    useEffect(() => {
        if(error) {
          dispatch({
            type: HIDE_ERROR
          })
          return notification.error({message: 'Something went wrong!'})
        }
    }, [error, dispatch])

    const onFinish = ({first_name, last_name, email}) => {
      employee ?
        updateEmployee(employee.key, first_name, last_name, email)
        :
        addEmployee(first_name, last_name, email)

        !employee && form.resetFields(['first_name', 'last_name', 'email'])
    };
    
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

  return (
    <>
      <Form
      name="employee form"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
        first_name: employee && employee.first_name,
        last_name: employee && employee.last_name,
        email: employee && employee.email
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="First Name"
        name="first_name"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input placeholder='Enter first name' />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input placeholder='Enter last name' />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
            type: 'email'
          },
        ]}
      >
        <Input placeholder='Enter email' />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button 
            type="primary" 
            htmlType="submit" 
            style={{ width: 120, borderRadius: 7 }}
            loading={isUpdateEmploy}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

const mapStatToProps = state => ({
    data: state.employee
})

const mapActionToProps = {
    updateEmployee,
    addEmployee
}

export default connect(mapStatToProps, mapActionToProps)(EmployeeForm);
