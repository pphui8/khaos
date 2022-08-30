import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";

interface DataType {
  key: string;
  name: string;
  registerdate: string;
  phone: string;
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
    title: "用户名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "注册日期",
    dataIndex: "registerdate",
    key: "registerdate",
  },
  {
    title: "手机号",
    key: "phone",
    dataIndex: "phone",
    // render: (_, { tags }) => (
    //   <>
    //     {tags.map((tag) => {
    //       let color = tag.length > 5 ? "geekblue" : "green";
    //       if (tag === "loser") {
    //         color = "volcano";
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
    // ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    registerdate: "2022/2/2",
    phone: "12345567890",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    registerdate: "2022/2/2",
    phone: "12345567890",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    registerdate: "2022/2/2",
    phone: "12345567890",
    tags: ["cool", "teacher"],
  },
];

const App: React.FC = () => {
  return (
    <Table columns={columns} dataSource={data}  />
  );
}

export default App;
