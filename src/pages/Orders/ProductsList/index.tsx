import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";

interface DataType {
  key: string;
  name: string;
  sales: number;
  stock: number;
  type: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "编号",
    dataIndex: "key",
    key: "userid",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "商品名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "销量",
    dataIndex: "sales",
    key: "sales",
  },
  {
    title: "在库",
    key: "stock",
    dataIndex: "stock",
  },
  {
    title: "商品种类",
    key: "type",
    dataIndex: "type",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag === "热销" ? "geekblue" : "green";
          if (tag === "售空") {
            color = "red";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>查看详情页</a>
        <a>删除</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "伸腿瞪眼丸",
    sales: 8,
    stock: 100,
    type: "美容",
    tags: ["在售", "热销"],
  },
  {
    key: "2",
    name: "伸腿瞪眼丸",
    sales: 8,
    stock: 100,
    type: "美容",
    tags: ["售空", "热销"],
  },
  {
    key: "3",
    name: "伸腿瞪眼丸",
    sales: 8,
    stock: 100,
    type: "美容",
    tags: ["在售", "热销"],
  },
];

const App: React.FC = () => {
  return <Table columns={columns} dataSource={data} />;
};

export default App;
