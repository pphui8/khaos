import { Button, Form, Input, InputNumber, Radio, Select, Upload, UploadFile, UploadProps } from 'antd';
import { Typography } from "antd";
import React, { useState } from 'react'
import { UploadOutlined } from "@ant-design/icons";
import { toast } from 'react-hot-toast';
import config from '../../../config';
import { RcFile } from 'antd/lib/upload';

type Props = {}
const { Title } = Typography;

interface DataType {
  productname: string;
  price: string;
  descript: string;
  img: string;
  stock: number;
  type: string;
  status: string;
}

export default function index({}: Props) {
  const onFinish = (values: DataType) => {
    if (values.status === "onsale") {
      values.status = "在售";
    } else {
      values.status = "停售";
    }
    if (values.type === "electron") {
      values.type = "硬件设备";
    } else {
      values.type = "游戏账号";
    }
    // set img value
    values.img = "https://img1.imgtp.com/2022/09/14/36exsfOL.jpg";
    fetch(config.baseURL + "addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("添加成功");
      }).catch((err) => {
        toast.error("添加失败");
      });
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinishFailed = () => {
    toast.error("请填写完整信息");
  };

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

  return (
    <>
      <Title level={4}>添加商品</Title>
      <br />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="商品名称"
          name="productname"
          rules={[{ required: true, message: "请输入商品名称" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="商品描述"
          name="descript"
          rules={[{ required: true, message: "请输入商品描述" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="商品价格"
          name="price"
          rules={[{ required: true, message: "请输入商品价格" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="商品图片"
          name="img"
          rules={[{ required: false, message: "请输入商品图片" }]}
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

        <Form.Item
          label="商品库存"
          name="stock"
          rules={[{ required: true, message: "请输入商品库存" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="商品分类"
          name="type"
          rules={[{ required: true, message: "请输入商品分类" }]}
          initialValue="electron"
        >
          <Select>
            <Select.Option value="electron">硬件设备</Select.Option>
            <Select.Option value="medicine">游戏账号</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="商品状态"
          name="status"
          rules={[{ required: true, message: "请选择商品状态" }]}
          initialValue="onsale"
        >
          <Radio.Group>
            <Radio.Button value="onsale">上架</Radio.Button>
            <Radio.Button value="nosale">下架</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}