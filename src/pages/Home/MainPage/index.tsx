import React from "react";
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

type Props = {};

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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default function index({}: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: "最近七天下单数量",
        data: labels.map((_, index) => {
          return index * 100;
        }),
        borderColor: "#8bdaff",
        backgroundColor: "#1890ff",
        yAxisID: "y",
      },
    ],
  };
  
  return (
    <>
      <Row align="middle">
        <Col flex={1}>
          <ServerStatus />
        </Col>
        <Col flex={1}>
          <SumData />
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
