import { Modal, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import config from "../../../config";

interface DataType {
  key: number;
  id: number;
  userid: number;
  username: string;
  productid: number;
  productname: string;
  price: number;
  number: number;
  date: string;
  location: string;
  status: string;
}



const App: React.FC = () => {
  const [orders, setOrders] = React.useState<DataType[]>([]);
  const [order, setOrder] = React.useState<DataType>({
    key: 0,
    id: 0,
    userid: 0,
    username: "",
    productid: 0,
    productname: "",
    price: 0,
    number: 0,
    date: "",
    location: "",
    status: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id: number) => {
    orders.map((order) => {
      if (order.id === id) {
        setOrder(order);
      }
    }),
      setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const confirm = (id: number) => {
    fetch(config.baseURL + `delorder/${id}`)
      .then((res) => res.json())
      .then((res) => {
        toast.success("订单已删除");
      })
      .catch((err) => {
        toast.error("删除失败");
      });
  }

  const statusTagColor = (status: string) => {
    if (status === "未付款") {
      return "yellow";
    } else if (status === "已发货") {
      return "green";
    } else if (status === "已收货") {
      return "blue";
    } else if (status === "已取消") {
      return "red";
    } else {
      return "";
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "订单编号",
      dataIndex: "key",
      key: "userid",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "商品名",
      dataIndex: "productname",
      key: "productname",
    },
    {
      title: "价格",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "数量",
      key: "number",
      dataIndex: "number",
    },
    {
      title: "下单日期",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "收货地址",
      key: "location",
      dataIndex: "location",
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: (_, record) => (
        <Space size="middle">
          <Tag color={statusTagColor(record.status)}>{record.status}</Tag>
        </Space>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={(event) => showModal(record.id)}>查看详情页</a>
          <Popconfirm
            title="确定要删除吗？"
            placement="topRight"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getData = () => {
    fetch(config.baseURL + "orderlist")
      .then((res) => res.json())
      .then((data) => {
        data.map((item: any) => {
          item.key = item.id;
        });
        setOrders(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>
      <Table columns={columns} dataSource={orders} />
      <Modal
        title="订单详情"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>订单编号: {order.id}</p>
        <p>用户id: {order.userid}</p>
        <p>用户名: {order.username}</p>
        <p>商品id: {order.productid}</p>
        <p>商品名: {order.productname}</p>
        <p>价格: {order.price}</p>
        <p>数量: {order.number}</p>
        <p>下单日期: {order.date}</p>
        <p>收货地址: {order.location}</p>
        <p>状态: {order.status}</p>
      </Modal>
    </>
  );
};

export default App;
