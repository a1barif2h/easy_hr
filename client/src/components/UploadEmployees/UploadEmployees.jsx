import { FundOutlined, InboxOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Drawer, notification, Table, Upload } from "antd";
import axios from "axios";
import React, { useState } from "react";
import "./UploadEmployees.scss";

const { Dragger } = Upload;

const columns = [
  {
    title: "First Name",
    key: "first_name",
    dataIndex: "first_name",
  },
  {
    title: "Last Name",
    key: "last_name",
    dataIndex: "last_name",
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "Message",
    key: "message",
    dataIndex: "message",
  },
];

const UploadEmployees = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [summaryReport, setSummaryReport] = useState(null);
  const [isSummaryReport, setIsSummaryReport] = useState(false);

  const props = {
    name: "file",
    multiple: false,
    onChange(e) {
      const files = e.fileList;
      let item = [];
      if (files) {
        for (let i = 0; i < files.length; i++) {
          item.push({ file: files[i].originFileObj });
        }
      }
      setSelectedFile(item);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleUpload = async () => {
    setIsUploading(true);
    const data = new FormData();

    data.append(`file`, selectedFile[0].file);

    const { data: uploadData } = await axios.post(
      "/employees/upload-csv",
      data
    );

    if (uploadData) {
      setIsUploading(false);
      const { errorCount, errorEmployees, successCount, successEmployees } =
        uploadData;

      const tempSummaryData = [];

      if (successEmployees.length > 0) {
        successEmployees.forEach((se, index) => {
          tempSummaryData.push({
            key: index + 1,
            first_name: se.first_name,
            last_name: se.last_name,
            email: se.email,
            status: "success",
            message: "This employee add successfully",
          });
        });
      }

      if (errorEmployees.length > 0) {
        errorEmployees.forEach((se, index) => {
          tempSummaryData.push({
            key: index + 1,
            first_name: se.first_name,
            last_name: se.last_name,
            email: se.email,
            status: "error",
            message:
              "Please check maybe first name or last name or valid email is missing",
          });
        });
      }

      setSummaryReport(tempSummaryData);
      setIsSummaryReport(true);

      return notification.info({
        message: "Upload summary notification",
        description: `${successCount} rows are added successfully and ${errorCount} rows are failed to add!  See the upload summary report for more information.`,
      });
    }
  };

  return (
    <>
      <div className="employee_top_container">
        <div />
        <div className="employee_content">
          <p>
            <UsergroupAddOutlined style={{ marginRight: 10 }} />
            Upload CSV file to add Employees
          </p>
        </div>
        <div>
            <Button 
                type='primary' 
                htmlType='button' 
                size='small'
                style={{marginRight: 15, borderRadius: 5}}
                onClick={() => setIsSummaryReport(true)}
            >
                <FundOutlined />
                Summary Report
            </Button>
        </div>
      </div>
      <div className="add_employee_form_container">
        <Dragger {...props} accept=".csv">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
        <div style={{ marginTop: 25, textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="button"
            style={{ width: 120, borderRadius: 7 }}
            loading={isUploading}
            disabled={!selectedFile}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
      </div>
      <Drawer
        title="Upload Summary Report"
        placement="right"
        closable
        onClose={() => setIsSummaryReport(false)}
        visible={isSummaryReport}
        width="70%"
        // destroyOnClose
      >
        <Table
          rowClassName={(record) =>
            record.status === "success"
              ? "table_row_success"
              : "table_row_error"
          }
          columns={columns}
          dataSource={summaryReport}
          bordered
        />
      </Drawer>
    </>
  );
};

export default UploadEmployees;
