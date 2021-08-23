import { Layout } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllEmployees } from "../redux/actions/employeesActions";
import './employees.scss';

const { Header, Content, Footer } = Layout;

const Employee = ({ data: { employee }, getAllEmployees }) => {
  console.log(employee);

  useEffect(() => {
    getAllEmployees();
  }, [getAllEmployees]);

  return (
    <>
      <h1>employee page</h1>
    </>
  );
};

const mapStatToProps = (state) => ({
  data: state,
});

const mapActionToProps = {
  getAllEmployees,
};

export default connect(mapStatToProps, mapActionToProps)(Employee);
