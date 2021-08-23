import { DeleteOutlined, EditOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Drawer, notification, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { deleteEmployee, getAllEmployees } from "../../redux/actions/employeesActions";
import { HIDE_ERROR } from '../../redux/types';
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import SendMailForm from '../SendMailForm/SendMailForm';
import './Employees.scss';




const Employees = ({ data: { employee: {loading, allEmployees, error} }, getAllEmployees, deleteEmployee }) => {

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [mailListForSend, setMailListForSend] = useState(null)
  const [isSendMail, setIsSendMail] = useState(false)
  const [isUpdateEmployee, setIsUpdateEmployee] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    getAllEmployees();
  }, [getAllEmployees]);


  useEffect(() => {
    if(!loading) {
      const data = []
      for(let i = 0; i < allEmployees.length; i++) {
        const element = allEmployees[i]
        data.push({
          key: element.uuid,
          first_name: element.first_name,
          last_name: element.last_name,
          email: element.email,
          sn: i + 1
        })
      }
      setEmployeeList(data)
    }
  }, [loading, allEmployees])

  useEffect(() => {
    if(error) {
      dispatch({
        type: HIDE_ERROR
      })
      return notification.error({message: 'Something went wrong!'})
    }
  }, [error, dispatch])

  const handleSendMail = () => {
    const mailList = []
    employeeList.forEach(employee => {
      for(let i = 0; i < selectedRowKeys.length; i++){
        if(selectedRowKeys[i] === employee.key){
          mailList.push(employee.email)
        }
      }
    })
    setMailListForSend(mailList)
    setIsSendMail(true)
  }

  const handleUpdateEmployee = (employee) => {
    setSelectedEmployee(employee)
    setIsUpdateEmployee(true)
  }

  const confirm = employeeId => {
    deleteEmployee(employeeId)
  }
  
  const cancel = (e) => {
    // console.log(e);
  }
  
  const columns = [
    {
      title: 'SN',
      key: 'sn',
      dataIndex: 'sn',
    },
    {
      title: 'First Name',
      key: 'first_name',
      dataIndex: 'first_name',
    },
    {
      title: 'Last Name',
      key: 'last_name',
      dataIndex: 'last_name',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (row) => {
        return (
          <div className='table_icon_container'>
            <span className='edit_icon' onClick={() =>handleUpdateEmployee(row)}><EditOutlined /></span>
            <Popconfirm
              title="Are you sure to delete this employee?"
              onConfirm={() => confirm(row.key)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <span className='delete_icon'><DeleteOutlined /></span>
            </Popconfirm>
          </div>
        )
      }
    }
  ];

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys)
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys)
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys)
        },
      },
    ],
  };

  if(loading) {
    return <LoadingComponent />
  }

  return (
    <>
      <div className='employee_top_container'>
        <div />
        <div className='employee_content'>
          <p>All Employees List</p>
          <Button 
            className='send_mail_btn' 
            size='small' 
            disabled={selectedRowKeys.length < 1}
            onClick={handleSendMail}
          >
            <MailOutlined />Send Mail
          </Button>
        </div>
        <div />
      </div>
      <div className='table_container'>
      <Table 
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={employeeList} 
        loading={loading} 
        bordered
      />
      </div>
      <Drawer
        title="Send Mail"
        placement="right"
        closable
        onClose={() => setIsSendMail(false)}
        visible={isSendMail}
        width='50%'
      >
        <SendMailForm 
          mailList={mailListForSend} 
          setIsSendMail={setIsSendMail}
        />
      </Drawer>
      <Drawer
        title="Update Employ"
        placement="right"
        closable
        onClose={() => setIsUpdateEmployee(false)}
        visible={isUpdateEmployee}
        width='50%'
        destroyOnClose
      >
        <EmployeeForm employee={selectedEmployee} />
      </Drawer>
    </>
  );
};

const mapStatToProps = (state) => ({
  data: state,
});

const mapActionToProps = {
  getAllEmployees,
  deleteEmployee
};

export default connect(mapStatToProps, mapActionToProps)(Employees);
