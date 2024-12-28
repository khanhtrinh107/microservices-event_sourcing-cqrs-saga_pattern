import React, { useState } from "react";
import { Modal } from "antd";
import UpdateProductForm from "../elements/UpdateProductForm";

const UpdateProductModal = ({
  isOpen,
  setIsOpen,
  selectedProduct,
  fetchProducts,
  categories,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title="Update product"
      open={isOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <UpdateProductForm
        categories={categories}
        setIsOpen={setIsOpen}
        selectedProduct={selectedProduct}
        fetchProducts={fetchProducts}
      />
    </Modal>
  );
};

export default UpdateProductModal;
