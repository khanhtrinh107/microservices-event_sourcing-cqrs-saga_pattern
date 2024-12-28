import { Form, Input, Modal, notification } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import baseAPI from "../../config/api";

const AddressModal = ({
  setOpenAddressModal,
  openAddressModal,
  setAddress,
}) => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user.value);

  const handleCancel = () => {
    setOpenAddressModal(false);
  };

  const handleCreateAddress = async (values) => {
    const payload = { ...values, userId: user.id };
    try {
      const res = await baseAPI.post("/address", payload);
      notification.success({
        message: "Notification",
        description: "Add address successfully!",
        placement: "topLeft",
      });
      setAddress((pre) => [...pre, res.data]);
    } catch (err) {
      notification.error({
        message: "Notification",
        description: "Add address successfully!",
        placement: "topLeft",
      });
      console.log(err);
    } finally {
      setOpenAddressModal(false);
    }
  };

  return (
    <Modal
      footer={null}
      title="Address Update"
      open={openAddressModal}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateAddress}>
        <Form.Item
          name={"city"}
          label="City"
          rules={[
            {
              required: true,
              message: "Please enter a city",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"province"}
          label="Province"
          rules={[
            {
              required: true,
              message: "Please enter a province",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"detailAddress"}
          label="Detail Addess"
          rules={[
            {
              required: true,
              message: "Please enter a detail address",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"phoneNumber"}
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please enter a phone number",
            },
            {
              pattern: /^\d{10}$/,
              message: "Phone number must be 10 digits",
            },
          ]}
        >
          <Input maxLength={10} />
        </Form.Item>
        <div className=" flex justify-end">
          <button className="ml-4 px-4 py-1 text-white bg-lama" type="submit">
            Create
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddressModal;
