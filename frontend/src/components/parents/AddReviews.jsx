import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Rate,
  Upload,
  Typography,
  Row,
  Col,
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import baseAPI from "../../config/api";
const { Title, Text } = Typography;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddReviews = ({setReviews}) => {
  const [form] = Form.useForm();
  const param = useParams();
  const currentUser = useSelector((state) => state.user.value);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "uyir4vic");
    data.append("cloud_name", "dskoc6e8s");
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dskoc6e8s/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    const { images = [], ...data } = values;

    const imageFiles = images
      .filter((file) => !file.url)
      .map((file) => file.originFileObj);
    const imagesValue = await Promise.all(
      imageFiles.map((file) =>
        uploadImage(file).catch((err) => {
          console.error("Image upload failed:", err);
          throw new Error("Image upload failed");
        })
      )
    );

    const payload = {
      images: imagesValue,
      productId: param.id,
      userId: currentUser.id,
      content: data.content,
      stars: data.stars,
      username: currentUser.username,
    };

    try {
      const res = await baseAPI.post("/comment", payload);
      if (res.data) {
        setReviews((pre) => [res.data, ...pre]);
        notification.success({
          message: "Notification",
          description: "Add review successfully!",
        });
      }
    } catch (err) {
      notification.error({
        message: "Notification",
        description: "Add review failed!",
      });
    }
    form.resetFields();
    setIsLoading(false);
  };

  return (
    <div className="mt-16 flex md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
      <Card
        title={<Title level={4}>Leave a Review</Title>}
        bordered={false}
        style={{
          padding: "16px",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
          onFinish={onFinish}
          disabled={isLoading}
        >
          <Row gutter={150}>
            <Col xs={50} md={50}>
              <Form.Item
                name="stars"
                label={<Text strong>Rating</Text>}
                rules={[
                  { required: true, message: "Please provide a rating!" },
                ]}
              >
                <Rate style={{ fontSize: "18px" }} />
              </Form.Item>
            </Col>

            <Col xs={50} md={50}>
              <Form.Item
                name="images"
                getValueFromEvent={normFile}
                label={<Text strong>Upload Images</Text>}
              >
                <Upload
                  listType="picture-card"
                  maxCount={3}
                  beforeUpload={() => false}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 4 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="content"
                label={<Text strong>Review Content</Text>}
                rules={[
                  { required: true, message: "Please write your review!" },
                ]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Write your review here..."
                  style={{
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                size="middle"
                loading={isLoading}
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  fontSize: "14px",
                  background: "#F35C7A"
                }}
              >
                Submit Review
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AddReviews;
