import { Space, Table, Button, Popconfirm, notification } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import UpdateProductModal from "./UpdateProductModal";
import baseAPI from "../../config/api";

const ProductTable = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [categories, setCategories] = useState();
  useEffect(() => {
    const fetchCatories = async () => {
      try {
        const res = await baseAPI.get("/categories");
        setCategories(res.data);
        console.log("res: ", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCatories();
  }, []);

  const handleOpenUpdateModal = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await baseAPI.delete(`/product/${productId}`);
      notification.success({
        message: "Notification",
        description: "Product deleted successfully!",
      });
    } catch (e) {
      notification.error({
        message: "Notification",
        description: "Product deleted unsuccessfully!",
      });
    } finally {
      fetchProducts();
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 100,
    },
    {
      title: "Image",
      key: "image",
      width: 120,
      render: (record) => (
        <img
          alt={record.name}
          src={record.images[0]}
          className="w-[80px] h-auto object-cover"
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: 300,
      ellipsis: true,
      render: (text) => <span title={text}>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: 200,
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
              title="Delete this product"
              description="Are you sure to delete this product?"
              okText="Delete"
              okType="danger"
              onConfirm={() => handleDeleteProduct(record.id)}
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

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await baseAPI.get("/products");
      console.log("data: ", data);
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      notification.error({
        message: "Error",
        description: "Failed to load products.",
      });
    }
  }, []);

  const paginationConfig = {
    pageSize: 5,
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


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
      <Table columns={columns} dataSource={products} pagination={paginationConfig}/>
      {showCreateModal && (
        <UpdateProductModal
          categories={categories}
          isOpen={showCreateModal}
          setIsOpen={setShowCreateModal}
          fetchProducts={fetchProducts}
        />
      )}
      {showUpdateModal && (
        <UpdateProductModal
          categories={categories}
          selectedProduct={selectedProduct}
          isOpen={showUpdateModal}
          setIsOpen={setShowUpdateModal}
          fetchProducts={fetchProducts}
        />
      )}
    </>
  );
};

export default ProductTable;
