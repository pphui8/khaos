import React from 'react'
import { toast } from 'react-hot-toast';
import md5 from 'md5';
import config from '../../config';

type Props = {}

interface UserType {
  Publickey: string,
}

interface UserData {
  Descript: string;
  Id: number;
  Phone: string;
  Privilege: string;
  Registerdate: string;
  Username: string;
  error: string;
}

export default function index({}: Props) {
  const login = () => {
    const username = document.getElementById(
      "username"
    ) as HTMLInputElement | null;
    const password = document.getElementById(
      "userpassword"
    ) as HTMLInputElement | null;
    if(username?.value === '') {
      toast.error("请输入用户名")
      return
    } else if (password?.value === '') {
      toast.error("请输入密码");
      return
    }
    let value: UserType = {
      Publickey: md5(`${username?.value.trim()}${password?.value.trim()}`),
    }
    fetch(config.baseURL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then((res) => {
        let data: UserData = res;
        if(data.error) {
          toast.error("用户不存在或用户无管理员权限");
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = "/home/mainpage";
        }
      })
  }
  return (
    <div className="myContainer">
      <div className="login-wrapper">
        <div className="header">Login</div>
        <div className="form-wrapper">
          <input
            type="text"
            name="username"
            placeholder="username"
            className="input-item"
            id='username'
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input-item"
            id='userpassword'
          />
          <div className="btn" onClick={login}>Login</div>
        </div>
      </div>
    </div>
  );
}