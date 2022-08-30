
import { Avatar, Card, Col, Divider, Row } from 'antd';
import { CheckSquareOutlined } from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import './index.css';

type Props = {};

export default function index({}: Props) {
  return (
    <>
      <Row align="middle">
        <Col flex={1}>
          <Card className='main-card-small' hoverable>
            <h3>服务器状态</h3>
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<CheckSquareOutlined />}
            />
            <p>正常</p>
          </Card>
        </Col>
        <Col flex={1}>
          <Card style={{ width: 300, height: 200, margin: 15 }} hoverable>
            <h3>数据总览</h3>
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<CheckSquareOutlined />}
            />
            <p>正常</p>
          </Card>
        </Col>
      </Row>
      <Divider orientation="left">用户数据</Divider>
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