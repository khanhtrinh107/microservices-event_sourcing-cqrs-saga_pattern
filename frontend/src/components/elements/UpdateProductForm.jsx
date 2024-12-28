import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  notification,
} from "antd";
import React, { useState, useEffect } from "react";
import baseAPI from "../../config/api";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UpdateProductForm = ({
  setIsOpen,
  selectedProduct,
  fetchProducts,
  categories,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  console.log(categories);

  useEffect(() => {
    if (selectedProduct?.images) {
      const formattedImages = selectedProduct.images.map((url, index) => ({
        uid: `${index}`,
        name: `image-${index}`,
        url,
      }));
      form.setFieldsValue({
        ...selectedProduct,
        images: formattedImages,
        category: selectedProduct.categoryId,
      });
    }
  }, [selectedProduct, form]);

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
    console.log(values);
    setLoading(true);
    try {
      const { images = [], ...productData } = values;

      const imageFiles = images
        .filter((file) => !file.url)
        .map((file) => file.originFileObj);

      const uploadedImageUrls = await Promise.all(
        imageFiles.map((file) =>
          uploadImage(file).catch((err) => {
            console.error("Image upload failed:", err);
            throw new Error("Image upload failed");
          })
        )
      );

      const existingImageUrls = images
        .filter((file) => file.url)
        .map((file) => file.url);

      const payload = {
        ...productData,
        category: values.category,
        images: [...existingImageUrls, ...uploadedImageUrls],
      };

      if (selectedProduct?.id) {
        await baseAPI.put(`/product/${selectedProduct.id}`, payload);
        notification.success({
          message: "Notification",
          description: "Product updated successfully!",
        });
      } else {
        await baseAPI.post("/product", payload);
        notification.success({
          message: "Notification",
          description: "Product created successfully!",
        });
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      notification.error({
        message: "Information",
        description: "Failed to save product!",
      });
    } finally {
      setLoading(false);
      const timeout = setTimeout(() => fetchProducts(), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  };

  return (
    <Form
      form={form}
      name="update_product"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      disabled={loading}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter the product name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select>
          {categories.map((cate) => (
            <Select.Option value={cate.id}>{cate.categoryName}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter the price" }]}
      >
        <InputNumber type="number" min={0} />
      </Form.Item>

      <Form.Item
        label="Stock"
        name="stock"
        rules={[{ required: true, message: "Please enter the stock" }]}
      >
        <InputNumber type="number" min={0} />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter a description" }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Upload"
        name="images"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: "Please upload an image" }]}
      >
        <Upload listType="picture-card" multiple>
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>

      <div className="flex gap-4 items-center justify-end">
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button danger htmlType="submit" loading={loading}>
          {selectedProduct ? "Update" : "Create"}
        </Button>
      </div>
    </Form>
  );
};

export default UpdateProductForm;
