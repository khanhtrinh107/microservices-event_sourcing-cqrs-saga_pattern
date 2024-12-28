import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Button, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import baseAPI from "../../config/api";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UpdateCategoryForm = ({
  isOpen,
  setIsOpen,
  selectedCategory,
  fetchCategories,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      const formattedImage = selectedCategory.categoryImage
        ? [
            {
              uid: "1",
              name: "image-1",
              url: selectedCategory.categoryImage,
            },
          ]
        : [];

      form.setFieldsValue({
        categoryName: selectedCategory.categoryName || "",
        categoryDescription: selectedCategory.categoryDescription || "",
        images: formattedImage,
      });
    }
  }, [form, selectedCategory]);

  const handleImageChange = ({ fileList }) => {
    const newFileList = fileList.slice(-1);
    form.setFieldsValue({ images: newFileList });
  };

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
    setLoading(true);
    try {
      const { images = [], ...categoryData } = values;

      let uploadedImageUrl = null;

      if (images[0] && !images[0].url) {
        try {
          uploadedImageUrl = await uploadImage(images[0].originFileObj);
        } catch (err) {
          console.error("Image upload failed:", err);
          throw new Error("Image upload failed");
        }
      }

      const existingImageUrl = images[0]?.url || null;

      const payload = {
        ...categoryData,
        categoryImage: uploadedImageUrl || existingImageUrl,
      };

      if (selectedCategory?.id) {
        await baseAPI.put(`/category/${selectedCategory.id}`, payload);
        notification.success({
          message: "Notification",
          description: "Category updated successfully!",
        });
      } else {
        await baseAPI.post("/category", payload);
        notification.success({
          message: "Notification",
          description: "Category created successfully!",
        });
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Error saving category:", error);
      notification.error({
        message: "Information",
        description: "Failed to save category!",
      });
    } finally {
      setLoading(false);
      fetchCategories();
    }
  };

  return (
    <Form
      form={form}
      name="update_category"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      disabled={loading}
    >
      <Form.Item
        label="Name"
        name="categoryName"
        rules={[{ required: true, message: "Please enter the category name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="categoryDescription"
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
        <Upload
          listType="picture-card"
          onChange={handleImageChange}
          maxCount={1} // Limit to one image
        >
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>

      <div className="flex gap-4 items-center justify-end">
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button danger htmlType="submit" loading={loading}>
          {selectedCategory ? "Update" : "Create"}
        </Button>
      </div>
    </Form>
  );
};

export default UpdateCategoryForm;
