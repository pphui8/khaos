import React, { useState } from "react";
import { Layout } from "antd";
import "./App.css";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MyHeader from "./components/MyHeader";
import LoginPage from './pages/LoginPage';
import Home from "./pages/Home";
import MainPage from "./pages/Home/MainPage";
import Users from "./pages/Home/Users";
import Products from "./pages/Home/Products";
import Orders from "./pages/Orders";

const login = () => {
  console.log("login");
}

const isLogin = () => {
  const token = localStorage.getItem("token");
  if(!token) {
    return true;
  } else {
    return false;
  }
};

// 渲染主页面
export default function App() {
  if (!isLogin()) {
    return (
      <LoginPage />
    );
  } else {
    return (
      <Layout className="rootLayout">
        <MyHeader />
        <Layout>
          {/* 注册路由 */}
          <Routes>
            <Route path="/home" element={<Home />}>
              <Route path="/home/mainpage" element={<MainPage />} />
              <Route path="/home/users" element={<Users />} />
              <Route path="/home/Products" element={<Products />} />
              <Route
                path="/home/*"
                element={<Navigate to="/home/mainpage" />}
              />
            </Route>
            <Route path="/Orders" element={<Orders />} />
            <Route path="*" element={<Navigate to="/home/mainpage" />}></Route>
          </Routes>
          {/* <MainPage /> */}
        </Layout>
      </Layout>
    );
  }
}
