import { Modal, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import config from "../../../config";

interface DataType {
  key: number;
  id: number;
  productname: string;
  price: number;
  stock: string;
  sale: string;
  type: string;
  status: string;
}

const App: React.FC = () => {
  const [products, setProducts] = React.useState<DataType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id: string) => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  
const columns: ColumnsType<DataType> = [
  {
    title: "商品编号",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "商品名",
    dataIndex: "productname",
    key: "productname",
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "在库",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "销量",
    key: "sale",
    dataIndex: "sale",
  },
  {
    title: "商品种类",
    key: "type",
    dataIndex: "type",
  },
  {
    title: "状态",
    key: "status",
    render: (_, record) => (
      <Space size="middle">
        <Tag color={record.status === "在售" ? "blue" : "red"}>
          {record.status}
        </Tag>
      </Space>
    ),
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a onClick={(event) => showModal(String(record.id))}>查看详情</a>
        <a>删除</a>
      </Space>
    ),
  },
];

  const getData = () => {
    fetch(config.baseURL + "productlist")
      .then((res) => res.json())
      .then((data) => {
        data.map((item: any) => {
          item.key = item.id;
        });
        setProducts(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={products} />
      <Modal
        title="商品详情"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      ></Modal>
    </>
  );
};

export default App;
