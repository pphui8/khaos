import React, { useEffect, useState } from "react";
import { Card, Col, Divider, Row } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ServerStatus from "./ServerStatus";
import SumData from "./SumData";
import "./index.css";
import { Line } from "react-chartjs-2";
import config from "../../../config";

type Props = {};

type Summary = {
  Usernumber: number;
  Ordernumber: number;
  PastOrderNumber: number[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    }
  },
};

export default function index({}: Props) {
  const [labels, setLabels] = useState<string[]>([]);
  const [summary, setSummary] = React.useState<Summary>({
    Usernumber: 0,
    Ordernumber: 0,
    PastOrderNumber: [],
  });
  const data = {
    labels,
    datasets: [
      {
        label: "最近七天下单数量",
        data: summary.PastOrderNumber,
        borderColor: "#8bdaff",
        backgroundColor: "#1890ff",
        yAxisID: "y",
      },
    ],
  };

  const getData = () => {
    fetch(config.baseURL + "summary")
      .then((res) => res.json())
      .then((data: Summary) => {
        data.PastOrderNumber = data.PastOrderNumber.reverse();
        setSummary(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let tmp: string[] = [];
    // get date of today
    const today = new Date().getMonth() + 1 + "月" + new Date().getDate() + "日";
    // insert date of past 7 days
    for (let i = 1; i < 8; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      tmp.unshift(date.getMonth() + 1 + "月" + date.getDate() + "日");
    }
    setLabels(tmp);
    getData();
  }, []);
  
  return (
    <>
      <Row align="middle">
        <Col flex={1}>
          <ServerStatus />
        </Col>
        <Col flex={1}>
          <SumData data={summary} />
        </Col>
      </Row>
      <Divider orientation="left">下单数量</Divider>
      <Row>
        <Col span={23}>
          <Card>
            <Line options={options} data={data} />
          </Card>
        </Col>
      </Row>
    </>
  );
}
