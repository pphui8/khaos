import React from "react";
import { Breadcrumb, Layout, Menu, MenuProps } from "antd";
import { Content } from "antd/lib/layout/layout";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./index.css";

const { Sider } = Layout;

type Props = {};
const sideNavItem: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = ["User", "Laptop", "Notification"][index];

  return {
    key: `${key}`,
    icon: React.createElement(icon),
    label: `${key}`,
  };
});

export default function index({}: Props) {
  return (
    <>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["0"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          items={sideNavItem}
        />
      </Sider>
      <Layout className="mainPageLayout">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </>
  );
}
