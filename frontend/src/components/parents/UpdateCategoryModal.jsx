import { Modal } from "antd";
import React, { useState } from "react";
import UpdateCategoryForm from "../elements/UpdateCategoryForm";

const UpdateCategoryModal = ({
  isOpen,
  setIsOpen,
  selectedCategory,
  fetchCategories,
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
      <UpdateCategoryForm
        setIsOpen={setIsOpen}
        selectedCategory={selectedCategory}
        fetchCategories={fetchCategories}
      />
    </Modal>
  );
};

export default UpdateCategoryModal;
