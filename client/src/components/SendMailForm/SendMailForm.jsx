import { SendOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Tag } from "antd";
import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { sendEmail } from '../../redux/actions/employeesActions';
import { HIDE_ERROR, HIDE_SUCCESS_MESSAGE } from '../../redux/types';

const SendMailForm = (props) => {
    const dispatch = useDispatch()
    const {
        mailList, 
        setIsSendMail,
        sendEmail,
        data: {
            employee: {
                mailSending,
                error,
                successMessage
            }
            
        }
    } = props

    useEffect(() => {
        if(error) {
          dispatch({
            type: HIDE_ERROR
          })
          return notification.error({message: 'Something went wrong!'})
        }
    }, [error, dispatch])

    useEffect(() => {
      if(successMessage) {
        dispatch({
          type: HIDE_SUCCESS_MESSAGE
        })

        setIsSendMail(false)
      }
    },[dispatch, successMessage, setIsSendMail])
     
  const onFinish = ({message, subject}) => {
    sendEmail(subject, mailList, message)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ marginRight: 40 }}>
        
      <Form
        name="sendMail"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
          <Form.Item label="To">
            {
                mailList.map(mail => (
                    <span key={mail}><Tag style={{marginTop: 5}} color="green">{mail}</Tag></span>
                ))
            }
          </Form.Item>
        <Form.Item
          label="Subject"
          name="subject"
          rules={[
            {
              required: true,
              message: "Please input email subject!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[
            {
              required: true,
              message: "Please input email message!",
            },
          ]}
        >
          <Input.TextArea />
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
            loading={mailSending}
          >
            Send <SendOutlined />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStatToProps = (state) => ({
    data: state,
});

const mapActionToProps = {
    sendEmail
}

export default connect(mapStatToProps, mapActionToProps)(SendMailForm);
