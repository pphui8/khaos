import { Layout, Menu, MenuProps } from "antd";
import React from 'react'
import { NavigateFunction, useNavigate } from "react-router-dom";

type Props = {}

const { Header } = Layout;
let navigator: NavigateFunction | ((arg0: string) => void);

const headNavItem: MenuProps["items"] = ["Home", "Settings", "My Profile"].map(
  (key) => ({
    key: key,
    label: `${key}`,
    onClick: () => {
      navigator(`/${key.toLowerCase()}`);
    },
  })
);

export default function index({}: Props) {
  navigator = useNavigate();
  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={headNavItem}
      />
    </Header>
  );
}