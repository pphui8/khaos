import { Card, Divider } from 'antd';
import { LineChartOutlined } from "@ant-design/icons";
import React from 'react'
import "./index.css";

type Summary = {
  Usernumber: number;
  Ordernumber: number;
  PastOrderNumber: number[];
};

type Props = {
  data: Summary;
};

export default function index({ data }: Props) {
  return (
    <Card className="main-card-small" hoverable>
      <LineChartOutlined />
      <span className="main-card-small-title">数据总览</span>
      <Divider />
      <span className="main-card-small-hint">用户总数</span>
      <span className="main-card-small-data">{data.Usernumber}</span>
      <br />
      <span className="main-card-small-hint">订单总数</span>
      <span className="main-card-small-data">{data.Ordernumber}</span>
    </Card>
  );
}