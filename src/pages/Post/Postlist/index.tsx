import { Modal, Popconfirm, Space, Table, Image, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ColumnFilterItem } from "antd/lib/table/interface";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import config from "../../../config";

interface DataType {
  key: number;
  id: number;
  userid: number;
  username: string;
  title: string;
  content: string;
  browseNumber: number;
  date: string;
  legal: number;
  elite: number;
  img: string;
  tag: string;
}

interface CommentDataType {
  id: number;
  userid: number;
  username: string;
  postid: number;
  content: string;
  date: string;
  support: number;
  against: number;
}

const App: React.FC = () => {
  const [posts, setposts] = React.useState<DataType[]>([]);
  const [post, setpost] = React.useState<DataType>({
    id: 1,
    key: 1,
    userid: 1,
    username: "",
    title: "",
    content: "",
    browseNumber: 0,
    date: "",
    legal: 0,
    elite: 0,
    img: "",
    tag: "",
  });
  const [comments, setcomments] = React.useState<CommentDataType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [usernames, setUsernames] = useState<ColumnFilterItem[]>([]);

  const showModal = (id: number) => {
    posts.map((post) => {
      if (post.id === id) {
        setpost(post);
      }
    }),
    getCommentData(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const confirmDelPost = (id: number) => {
    fetch(config.baseURL + `delpost/${id}`)
      .then((res) => res.json())
      .then((res) => {
        toast.success("帖子已删除");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("删除失败");
      });
  };

  const confirmDelComment = (id: number) => {
    fetch(config.baseURL + `delcomment/${id}`)
      .then((res) => res.json())
      .then((res) => {
        toast.success("评论已删除");
      })
      .catch((err) => {
        toast.error("删除失败");
      });
  };

  const statusTagColor = (status: string) => {
    if (status === "日常") {
      return "blue";
    } else if (status === "同人") {
      return "yellow";
    } else if (status === "攻略") {
      return "green";
    } else {
      return "";
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "帖子编号",
      dataIndex: "key",
      key: "id",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "发帖用户",
      dataIndex: "username",
      key: "username",
      filters: usernames,
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string | number | boolean, record: DataType) =>
        record.username.includes(value.toString()),
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
      title: "浏览量",
      dataIndex: "browseNumber",
      key: "browseNumber",
    },
    {
      title: "标签",
      dataIndex: "tag",
      key: "tag",
      render: (_, record) => (
        <Space size="middle">
          <Tag color={statusTagColor(record.tag)}>{record.tag}</Tag>
        </Space>
      ),
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
            onConfirm={() => confirmDelPost(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const commentColumns: ColumnsType<CommentDataType> = [
    {
      title: "评论编号",
      dataIndex: "key",
      key: "id",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "评论用户",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "评论内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "发布时间",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "点赞数",
      dataIndex: "support",
      key: "support",
    },
    {
      title: "点踩数",
      dataIndex: "against",
      key: "against",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="确定要删除吗？"
            placement="topRight"
            onConfirm={() => confirmDelComment(record.id)}
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
    fetch(config.baseURL + "postlist")
      .then((res) => res.json())
      .then((data) => {
        let isFind = false;
        let usernames: ColumnFilterItem[] = [];
        data.map((item: DataType) => {
          item.key = item.id;
          isFind = false;
          usernames.map((value, _) => {
            if (value.text === item.username) {
              isFind = true;
              return;
            }
          });
          if (!isFind) {
            usernames.push({
              text: item.username,
              value: item.username,
            });
          }
        });
        setposts(data);
        setUsernames(usernames);
    });
  };

  const getCommentData = (id: number) => {
    fetch(config.baseURL + `commentlist/${id}`)
      .then((res) => res.json())
      .then((data) => {
        data.map((item: any) => {
          item.key = item.id;
        });
        setcomments(data);
      });
  };
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={posts} />
      <Modal
        title="帖子详情"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <p>编号: {post.id}</p>
        <p>标题: {post.title}</p>
        <p>发布时间: {post.date}</p>
        <p>内容: {post.content}</p>
        {post.img ? (
          <Image
            width={200}
            src={post.img}
            placeholder={<Image preview={false} src={post.img} width={200} />}
          ></Image>
        ) : (
          <p style={{ color: "red" }}>该帖子未上传图片</p>
        )}
        <Table columns={commentColumns} dataSource={comments} style={{marginTop: 10}} />
      </Modal>
    </>
  );
};

export default App;
