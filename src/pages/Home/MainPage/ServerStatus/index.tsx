import { Avatar, Card, Divider } from 'antd';
import {
  CheckSquareOutlined,
  CloudOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect } from 'react'
import config from "../../../../config";

type Props = {}

export default function index({}: Props) {
  const [status, setStatus] = React.useState("异常");

  const ServerStatus = () => {
    fetch(config.baseURL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "200") {
          setStatus("正常");
        } else {
          setStatus("异常");
        }
      });
  };

  useEffect(() => {
    ServerStatus();
  }, []);
  
  return (
    <Card className="main-card-small" hoverable>
      <CloudOutlined />
      <span className="main-card-small-title">服务器状态</span>
      <Divider />
      <Avatar
        style={{ backgroundColor: status === "正常" ? "#87d068" : "red" }}
        icon={status === "正常" ? <CheckSquareOutlined /> : <CloseCircleOutlined />}
      />
      <span className="main-card-small-text">{status}</span>
    </Card>
  );
}