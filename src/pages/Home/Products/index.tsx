import { Modal, Space, Table, Tag, Image, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import config from "../../../config";

interface DataType {
  key: number;
  id: number;
  productname: string;
  price: number;
  descript: string;
  stock: string;
  sale: string;
  img: string;
  type: string;
  status: string;
}

const App: React.FC = () => {
  const [products, setProducts] = React.useState<DataType[]>([]);
  const [product, setProduct] = React.useState<DataType>({
    key: 0,
    id: 0,
    productname: "",
    price: 0,
    descript: "",
    stock: "",
    sale: "",
    img: "",
    type: "",
    status: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id: number) => {
    products.map((product) => {
      if (product.id === id) {
        setProduct(product);
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

  const delproduct = (id: number) => {
    let result = fetch(config.baseURL + "delproduct/" + id);
    return result;
  }

  const confirm = (id: number) => {
    toast.promise(delproduct(id), {
      loading: "删除中...",
      success: "删除成功",
      error: "删除失败",
    })
      .then(() => {
        window.location.reload();
      })
    ;
  }

  
const columns: ColumnsType<DataType> = [
  {
    title: "商品编号",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
    defaultSortOrder: "descend",
    sorter: (a, b) => a.id - b.id,
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
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "在库",
    dataIndex: "stock",
    key: "stock",
    defaultSortOrder: "descend",
    sorter: (a, b) => Number(a.stock) - Number(b.stock),
  },
  {
    title: "销量",
    key: "sale",
    dataIndex: "sale",
    defaultSortOrder: "descend",
    sorter: (a, b) => Number(a.sale) - Number(b.sale),
  },
  {
    title: "商品种类",
    key: "type",
    dataIndex: "type",
    filters: [
      {
        value: "硬件设备",
        text: "硬件设备",
      },
      {
        value: "游戏账号",
        text: "游戏账号",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value: string | number | boolean, record: DataType) =>
      record.type.includes(value.toString()),
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
    filters: [
      {
        value: "在售",
        text: "在售",
      },
      {
        value: "停售",
        text: "停售",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value: string | number | boolean, record: DataType) =>
      record.status.includes(value.toString()),
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a onClick={(event) => showModal(record.id)}>查看详情</a>
        <Popconfirm
          title="删除商品会导致订单中的相关订单被删除，确定删除吗？"
          placement="topRight"
          onConfirm={() => confirm(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">删除</a>
        </Popconfirm>
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
      >
        <Image
          width={200}
          src={product.img}
          placeholder={<Image preview={false} src={product.img} width={200} />}
        ></Image>
        <p>商品编号：{product.id}</p>
        <p>商品名：{product.productname}</p>
        <p>价格：{product.price}</p>
        <p>在库：{product.stock}</p>
        <p>销量：{product.sale}</p>
        <p>商品种类：{product.type}</p>
        <p>状态：{product.status}</p>
        <p>描述：{product.descript}</p>
      </Modal>
    </>
  );
};

export default App;
