import { HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./index.css";
import AnnouncementList from "./AnnouncementList";
import toast from "react-hot-toast";
import { RcFile } from "antd/lib/upload";
import config from "../../config";
import TextArea from "antd/lib/input/TextArea";

type Props = {};

export default function index({}: Props) {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    newFileList = newFileList.slice(-1);
    console.log(newFileList);
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = () => {
    const title = document.getElementById("title") as HTMLInputElement;
    const content = document.getElementById("content") as HTMLInputElement;
    const img = "";
    fetch(config.baseURL + "addannouncement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.value,
          content: content.value,
          date: new Date().toLocaleDateString(),
          img: img,
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("????????????");
        }).catch((err) => {
          toast.error("????????????");
        });
    setIsModalVisible(false);
    // delay 1s to refresh
    setTimeout(() => {
       window.location.reload();
    }, 1000);   
  };
  
  return (
    <>
      <Breadcrumb className="setting-breadcrumb">
        <Breadcrumb.Item href="/home/mainpage">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Announcement</Breadcrumb.Item>
      </Breadcrumb>
      <Button
        type="default"
        className="addAncmtBtn"
        onClick={() => showModal()}
      >
        ??????????????????
      </Button>
      <div className="ant-layout-content site-layout-background my-setting-content">
        <AnnouncementList />
      </div>
      <Modal
        title="??????????????????"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="????????????"
            name="title"
            rules={[{ required: true, message: "?????????????????????" }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="????????????"
            name="content"
            rules={[{ required: true, message: "?????????????????????" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="???????????????????????????"
            name="img"
            rules={[{ required: false, message: "?????????????????????" }]}
          >
            <Upload
              action="https://www.imgtp.com/api/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              ??????
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
