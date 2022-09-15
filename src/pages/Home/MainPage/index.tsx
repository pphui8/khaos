import React from "react";
import { Card, Col, Divider, Row } from "antd";
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
          </Card>
        </Col>
      </Row>
    </>
  );
}
