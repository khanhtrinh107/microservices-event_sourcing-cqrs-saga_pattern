import React, { useEffect, useState } from "react";
import { Space, Table, Button, Popconfirm, notification } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import baseAPI from "../../config/api";
import UpdateCategoryModal from "./UpdateCategoryModal";

const Category = () => {
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [showCreateModal, setShowCreateModal] = useState();
  const [showUpdateModal, setShowUpdateModal] = useState();

  const handleOpenUpdateModal = (category) => {
    setShowUpdateModal(true);
    setSelectedCategory(category);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await baseAPI.delete(`/category/${categoryId}`);
      notification.success({
        message: "Notification",
        description: "Category deleted successfully!",
      });
      fetchCategories();
    } catch (err) {
      notification.error({
        message: "Information",
        description: "Failed to delete category!",
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Description",
      dataIndex: "categoryDescription",
      key: "categoryDescription",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Image",
      dataIndex: "categoryImage",
      key: "categoryImage",
      render: (text) => (
        <img className="w-[80px] h-auto object-cover" alt="" src={text} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              className="cursor-pointer"
              onClick={() => handleOpenUpdateModal(record)}
            >
              Update
            </Button>
            <Popconfirm
              title="Delete this category"
              description="Are you sure to delete this category?"
              okText="Delete"
              okType="danger"
              onConfirm={() => handleDeleteCategory(record.id)}
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const fetchCategories = async () => {
    const res = await baseAPI.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <Button
          onClick={() => setShowCreateModal(true)}
          color="danger"
          variant="filled"
        >
          Create
        </Button>
      </div>
      <Table columns={columns} dataSource={categories} />
      {showCreateModal && (
        <UpdateCategoryModal
          isOpen={showCreateModal}
          setIsOpen={setShowCreateModal}
          fetchCategories={fetchCategories}
        />
      )}
      {showUpdateModal && (
        <UpdateCategoryModal
          selectedCategory={selectedCategory}
          isOpen={showUpdateModal}
          setIsOpen={setShowUpdateModal}
          fetchCategories={fetchCategories}
        />
      )}
    </>
  );
};

export default Category;
