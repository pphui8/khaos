import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import "./index.css";

type Props = {};

export default function index({}: Props) {
  return (
    <>
      <Breadcrumb className="setting-breadcrumb">
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Application</Breadcrumb.Item>
      </Breadcrumb>
      <div className="ant-layout-content site-layout-background my-setting-content"></div>
    </>
  );
}
