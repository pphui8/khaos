import React from 'react'

type Props = {}

export default function index({}: Props) {
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
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input-item"
          />
          <div className="btn">Login</div>
        </div>
        <div className="msg">
          Don't have account?
          <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
}