import { Card, Divider } from 'antd';
import { LineChartOutlined } from "@ant-design/icons";
import React, { useEffect } from 'react'
import config from '../../../../config';
import "./index.css";

type Props = {}

type Summary = {
  Usernumber: number,
  Ordernumber: number,
}

export default function index({}: Props) {
  const [summary, setSummary] = React.useState<Summary>({
    Usernumber: 0,
    Ordernumber: 0,
  });
  
  const getData = () => {
    fetch(config.baseURL + "summary")
        .then((res) => res.json())
        .then((data) => {
          setSummary(data);
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
      <span className="main-card-small-data">{summary.Usernumber}</span>
      <br />
      <span className="main-card-small-hint">订单总数</span>
      <span className="main-card-small-data">{summary.Ordernumber}</span>
    </Card>
  );
}