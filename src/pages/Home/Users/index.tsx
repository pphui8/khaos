import { message, Modal, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import config from "../../../config";

interface DataType {
  Id: string;
  Username: string;
  Registerdate: string;
  Phone: string;
  Privilege: string;
}

interface UserDetail {
	Id: number;
	Username: string;
	Descript: string;
	Registerdate: string;
	Phone: string;
	Privilege: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id: string) => {
    getUserDetail(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getData = () => {
    fetch(config.baseURL + "userslist")
      .then((res) => res.json())
      .then((data) => {
        data.map((item: any) => {
          item.key = item.Id;
        });
        setUsers(data);
      });
  };

  const delUser = (id: string) => {
    users.filter((value) => {
      if(value.Id === id) {
        if(value.Privilege === 'manager') {
          toast.error("不能删除管理员");
          return false;
        } else {
          fetch(`${config.baseURL}` + "deluser/" + id)
            .then((res) => {
              toast.success("删除成功");
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
          return false;
        }
      }
    })
  };

  const getUserDetail = (id: string) => {
    fetch(`${config.baseURL}user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserDetail(data);
      })
      .catch((err) => {
        toast.error("获取用户信息失败");
      });
    return userDetail;
  };

  useEffect(() => {
    getData();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "编号",
      dataIndex: "Id",
      key: "Id",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => Number(a.Id) - Number(b.Id),
    },
    {
      title: "用户名",
      dataIndex: "Username",
      key: "name",
    },
    {
      title: "注册日期",
      dataIndex: "Registerdate",
      key: "registerdate",
    },
    {
      title: "手机号",
      key: "Phone",
      dataIndex: "Phone",
    },
    {
      title: "权限",
      key: "Phone",
      render: (_, record) => (
        <Space size="middle">
          <Tag color={record.Privilege === "manager" ? "red" : "blue"}>
            {record.Privilege === "manager" ? "管理员" : "普通用户"}
          </Tag>
        </Space>
      ),
      filters: [
        {
          value: "manager",
          text: "管理员",
        },
        {
          value: "user",
          text: "普通用户",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string | number | boolean, record: DataType) =>
        record.Privilege.includes(value.toString()),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={(event) => showModal(record.Id)}>查看详情</a>
          <Popconfirm
            title="删除用户会导致订单中的相关订单被删除，确定删除吗？"
            placement="topRight"
            onConfirm={() => delUser(record.Id)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  return (
    <>
      <Table columns={columns} dataSource={users} />
      <Modal
        title="用户详情"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p>id: {userDetail?.Id}</p>
        <p>用户名: {userDetail?.Username}</p>
        <p>描述: {userDetail?.Descript}</p>
        <p>注册日期: {userDetail?.Registerdate}</p>
        <p>手机号: {userDetail?.Phone}</p>
        <p>权限: {userDetail?.Privilege}</p>
      </Modal>
    </>
  );
}

export default App;
