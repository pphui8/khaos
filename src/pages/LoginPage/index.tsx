import React from 'react'
import { toast } from 'react-hot-toast';
import md5 from 'md5';
import config from '../../config';

type Props = {}

interface UserType {
  publickey: string,
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
    } else if (password?.value === '') {
      toast.error("请输入密码");
    }
    const result = md5(`${username?.value.trim()}${password?.value.trim()}`);
    
    console.log(`${username?.value.trim()}${password?.value.trim()}`);
    // let value: UserType = {
    //   publickey: 
    // }
    // fetch(config.baseURL + "/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: ""
    // });
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