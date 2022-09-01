import React from "react";
import { Card, Col, Divider, Row } from "antd";
import { LineChartOutlined } from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import ServerStatus from "./ServerStatus";
import SumData from "./SumData";
import "./index.css";

type Props = {};

export default function index({}: Props) {
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
            <ReactECharts
              option={{
                xAxis: {
                  type: "category",
                  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
                yAxis: {
                  type: "value",
                },
                series: [
                  {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: "line",
                  },
                ],
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
