import React, { useState } from "react";
import Navbar from "../components/parents/Navbar";
import Footer from "../components/parents/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import baseAPI from "../config/api";
import { Space, Table, Tag } from "antd";

const columns = [
  {
    title: "Order id",
    dataIndex: "orderId",
    key: "orderId",
    render: (text) => <>{text}</>,
    width: 350,
  },
  {
    title: "Total amount",
    dataIndex: "totalAmount",
    key: "totalAmount",
    render: (_, order) => {
      return <>{order.totalAmount + order.shipmentFee}</>;
    },
  },
  {
    title: "Order date",
    dataIndex: "orderDate",
    key: "orderDate",
    render: (text) => <>{format(text)}</>,
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, order) => {
      let color;
      switch (order.status) {
        case "REJECTED": {
          color = "red";
          break;
        }
        case "ORDER_CANCELLED": {
          color = "orange";
          break;
        }
        default: {
          color = "green";
          break;
        }
      }
      return <Tag color={color}>{order.status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, order) => (
      <Space size="middle">
        <Link to={`/orders/${order.orderId}`}>
          <Tag color={"blue"}>Detail</Tag>
        </Link>
      </Space>
    ),
  },
];

const format = (dateString) => {
  return new Date(dateString).toLocaleString("vn-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const Orders = () => {
  const currentUser = useSelector((state) => state.user.value);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState();

  useState(() => {
    const fetchOrders = async () => {
      try {
        const res = await baseAPI.get(`/order/${currentUser.id}`);
        if (res) {
          setOrders(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="w-full ">
          <h1 className="text-2xl mt-10">Your orders </h1>
          <div className="mt-5">
            <Table loading={isLoading} columns={columns} dataSource={orders} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
