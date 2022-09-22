import { HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
} from "antd";
import React, { useState } from "react";
import "./index.css";
import Postlist from "./Postlist";
import config from "../../config";

type Props = {};

export default function index({}: Props) {
  return (
    <>
      <Breadcrumb className="setting-breadcrumb">
        <Breadcrumb.Item href="/home/mainpage">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Post</Breadcrumb.Item>
      </Breadcrumb>
      <div className="ant-layout-content site-layout-background my-setting-content">
        <Postlist />
      </div>
    </>
  );
}
