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
import Manage from "./pages/Home/Manage";
import Orders from "./pages/Orders";
import Announcement from "./pages/Announcement";
import Post from "./pages/Post";

const isLogin = () => {
  const token = localStorage.getItem("user");
  if(token) {
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
              <Route path="/home/manage" element={<Manage />} />
              <Route
                path="/home/*"
                element={<Navigate to="/home/mainpage" />}
              />
            </Route>
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Announcement" element={<Announcement />} />
            <Route path="/Post" element={<Post />} />
            {/* <MainPage /> */}
            <Route path="*" element={<Navigate to="/home/mainpage" />}></Route>
          </Routes>
        </Layout>
      </Layout>
    );
  }
}
