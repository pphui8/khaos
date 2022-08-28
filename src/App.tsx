import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate, NavigateFunction } from "react-router-dom";

import Home from "./pages/Home";
import Settings from './pages/Settings';

let navigator: NavigateFunction | ((arg0: string) => void);

const { Header } = Layout;

const headNavItem: MenuProps["items"] = ["Home", "Settings", "My Profile"].map((key) => ({
  key: key,
  label: `${key}`,
  onClick: () => {
    navigator(`/${key.toLowerCase()}`);
  }
}));

// 渲染主页面
const App: React.FC = () => {
  navigator = useNavigate();
  return (
    <Layout className="rootLayout">
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={headNavItem}
        />
      </Header>
      <Layout>
          {/* 注册路由 */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/home" />}></Route>
          </Routes>
          {/* <MainPage /> */}
      </Layout>
    </Layout>
  );
};

export default App;
