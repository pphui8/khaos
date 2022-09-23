import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import "./index.css";
import OrdersList from "./OrdersList";

type Props = {};

export default function index({}: Props) {
  return (
    <>
      <Breadcrumb className="setting-breadcrumb">
        <Breadcrumb.Item href="/home/mainpage">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>
      <div className="ant-layout-content site-layout-background my-setting-content">
        <OrdersList />
      </div>
    </>
  );
}
