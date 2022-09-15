import React from "react";
import { Breadcrumb, Button, Layout, Menu, MenuProps } from "antd";
import { Content } from "antd/lib/layout/layout";
import {
  LaptopOutlined,
  AreaChartOutlined,
  UserOutlined,
  HomeOutlined,
  ControlOutlined,
} from "@ant-design/icons";

import "./index.css";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";

const { Sider } = Layout;
let navigator: NavigateFunction | ((arg0: string) => void);
let GsetMyBreadcrumb: (arg0: string) => void;

type Props = {};
const sideNavItem: MenuProps["items"] = [
  AreaChartOutlined,
  UserOutlined,
  LaptopOutlined,
  ControlOutlined,
].map((icon, index) => {
  const key = ["MainPage", "Users", "Products", "Manage"][index];

  return {
    key: `${key}`,
    icon: React.createElement(icon),
    label: `${key}`,
    onClick: () => {
      GsetMyBreadcrumb(key);
      navigator(`/home/${key.toLowerCase()}`);
    },
  };
});

export default function index({}: Props) {
  navigator = useNavigate();
  const [myBreadcrumb, setMyBreadcrumb] = React.useState("MainPage");
  GsetMyBreadcrumb = setMyBreadcrumb;
  return (
    <>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["MainPage"]}
          defaultOpenKeys={["MainPage"]}
          style={{ height: "100%", borderRight: 0 }}
          items={sideNavItem}
        />
      </Sider>
      <Layout className="mainPageLayout">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          {myBreadcrumb.split(" ").map((item, index) => {
            return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </>
  );
}
