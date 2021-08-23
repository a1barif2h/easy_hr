import {
    SettingOutlined,
    TeamOutlined,
    UserAddOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./Header.scss";

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("employee");

  const handleChangeMenu = (e) => {
    setCurrent(e.key)
  };

  return (
    <>
      <div className="container">
        <div className="logo_container">
          <img src={logo} alt="easyHr" />
        </div>
        <div className="menu_container">
          <Menu
            onClick={handleChangeMenu}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item key="employee" icon={<TeamOutlined />}>
              <Link to='/'>Employees</Link>
            </Menu.Item>

            <SubMenu
              key="SubMenu"
              icon={<SettingOutlined />}
              title="Add Employee"
            >
              <Menu.Item key="addEmployee" icon={<UserAddOutlined />}>
                <Link to='/add-employee'>Add Employee</Link>
              </Menu.Item>
              <Menu.Item key="uploadEmployees" icon={<UsergroupAddOutlined />}>
                <Link to='/upload-employees'>Upload Employees csv</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Header;
