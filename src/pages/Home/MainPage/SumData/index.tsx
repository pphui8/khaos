import { Card, Divider } from 'antd';
import { LineChartOutlined } from "@ant-design/icons";
import React, { useEffect } from 'react'
import config from '../../../../config';
import "./index.css";

type Props = {}

export default function index({}: Props) {
  const [userNumber, setUserNumber] = React.useState(0);
  const [orderNumber, setOrderNumber] = React.useState(0);
  
  const getData = () => {
    fetch(config.baseURL + "usernumber")
        .then((res) => res.json())
        .then((data) => {
            setUserNumber(data.usernumber);
        });
  }

  useEffect(() => {
    getData();
  }, []) 
    
  return (
    <Card className="main-card-small" hoverable>
      <LineChartOutlined />
      <span className="main-card-small-title">数据总览</span>
      <Divider />
      <span className="main-card-small-hint">用户总数</span>
      <span className="main-card-small-data">{userNumber}</span>
      <br />
      <span className="main-card-small-hint">订单总数</span>
      <span className="main-card-small-data">{orderNumber}</span>
    </Card>
  );
}