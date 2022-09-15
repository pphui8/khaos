import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "antd/dist/antd.min.css";
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
