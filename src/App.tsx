import { Layout } from "antd";
import "./App.css";
import { Routes, Route, Navigate, useNavigate, NavigateFunction } from "react-router-dom";

import MyHeader from "./components/MyHeader";
import Home from "./pages/Home";
import MainPage from "./pages/Home/MainPage";
import Settings from './pages/Settings';

let navigator: NavigateFunction | ((arg0: string) => void);

const isLogin = () => {
  return true;
}

// 渲染主页面
export default function App() {
  navigator = useNavigate();
  if(!isLogin()) {
    return (
      <div className="myContainer">
          <div className="login-wrapper">
             <div className="header">Login</div>
              <div className="form-wrapper">
                  <input type="text" name="username" placeholder="username" className="input-item" />
                  <input type="password" name="password" placeholder="password" className="input-item" />
                  <div className="btn">Login</div>
              </div>
              <div className="msg">
                  Don't have account?
                  <a href="#">Sign up</a>
              </div>
          </div>
      </div>
    )
  } else {
    return (
      <Layout className="rootLayout">
        <MyHeader />
        <Layout>
          {/* 注册路由 */}
          <Routes>
            <Route path="/home" element={<Home />}>
              <Route path="/home/mainpage" element={<MainPage />} />
              <Route path="/home/*" element={<MainPage />} />
            </Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/home/mainpage" />}></Route>
          </Routes>
          {/* <MainPage /> */}
        </Layout>
      </Layout>
    );
  }
};
