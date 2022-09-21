import { Modal, Popconfirm, Space, Table, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import config from "../../../config";

interface DataType {
  key: number;
  id: number;
  title: string;
  date: string;
  content: string;
  img: string;
}

const App: React.FC = () => {
  const [announcements, setAnnouncements] = React.useState<DataType[]>([]);
  const [announcement, setAnnouncement] = React.useState<DataType>({
    key: 0,
    id: 0,
    title: "",
    date: "",
    content: "",
    img: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id: number) => {
    announcements.map((announcement) => {
      if (announcement.id === id) {
        setAnnouncement(announcement);
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
    fetch(config.baseURL + `delannouncement/${id}`)
      .then((res) => res.json())
      .then((res) => {
        toast.success("订单已删除");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("删除失败");
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "公告编号",
      dataIndex: "key",
      key: "userid",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "发布时间",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record.id)}>查看详情页</a>
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
    fetch(config.baseURL + "announcementlist")
      .then((res) => res.json())
      .then((data) => {
        data.map((item: any) => {
          item.key = item.id;
        });
        setAnnouncements(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={announcements} />
      <Modal
        title="订单详情"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>公告编号: {announcement.id}</p>
        <p>标题: {announcement.title}</p>
        <p>发布时间: {announcement.date}</p>
        <p>内容: {announcement.content}</p>
        {announcement.img ? (
          <Image
            width={200}
            src={announcement.img}
            placeholder={
              <Image preview={false} src={announcement.img} width={200} />
            }
          ></Image>
        ) : (
          <p style={{color: "red"}}>该公告未上传图片</p>
        )}
      </Modal>
    </>
  );
};

export default App;
