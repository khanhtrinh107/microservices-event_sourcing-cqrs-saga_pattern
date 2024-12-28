import React, { useEffect, useState } from "react";
import Navbar from "../components/parents/Navbar";
import Footer from "../components/parents/Footer";
import baseAPI from "../config/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { notification, Popconfirm } from "antd";
import { useHistory } from "react-router-dom";

const OrderDetail = () => {
  const param = useParams();
  const [order, setOrder] = useState();
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [address, setAddress] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const handleCancelOrder = async () => {
    const payload = order;
    delete payload.views;
    try {
      await baseAPI.post("/orders/delete", payload);
      notification.success({
        message: "Notification",
        description: "Cancel order successfully!",
        placement: "topLeft",
      });
      setTimeout(() => {
        history.push("/orders");
      }, 2000);
    } catch (err) {
      console.log(err);
      notification.error({
        message: "Notification",
        description: "Cancel order failed!",
        placement: "topLeft",
      });
    }
  };

  useEffect(() => {
    const fetchDetailOrder = async () => {
      try {
        const res = await baseAPI.get(`/order/detail/${param.id}`);
        setOrder(res.data);
        setOrderHistory(res.data.views);
        const payload = res.data?.orderItems?.map((detail) => detail.productId);
        const [productPromise, addressPromise] = await Promise.all([
          baseAPI.post(`/products`, payload),
          baseAPI.get(`/address/detail/${res.data.shippingAddress}`),
        ]);
        setAddress(addressPromise.data);
        const details = productPromise.data.map((product, index) => {
          return { ...product, quantity: res.data.orderItems[index].quantity };
        });
        setOrderDetails(details);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetailOrder();
  }, [param.id]);

  if (isLoading) return <></>;

  return (
    <>
      <Navbar />
      <div className="flex w-[80%] mx-auto justify-between gap-8">
        <div className="w-full lg:w-6/12 p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
            Order Summary
          </h3>
          <div className="flex flex-col gap-6">
            <div className="p-4 border rounded-md bg-gray-50">
              <h4 className="font-semibold text-gray-800 mb-2">
                Delivery Address
              </h4>
              <div className="text-sm text-gray-600">
                <div>
                  <span className="font-medium">City:</span> {address?.city}
                </div>
                <div>
                  <span className="font-medium">Province:</span>{" "}
                  {address?.province}
                </div>
                <div>
                  <span className="font-medium">Detail:</span>{" "}
                  {address?.detailAddress}
                </div>
                <div>
                  <span className="font-medium">Phone:</span>{" "}
                  {address?.phoneNumber}
                </div>
              </div>
            </div>
            {orderDetails.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-6 w-full p-4 border rounded-md hover:shadow-md"
              >
                <div className="w-[90px] h-[108px]">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="object-cover rounded-md w-full h-full border"
                  />
                </div>
                <div className="flex flex-col justify-between w-full">
                  <Link
                    to={`/product/${item.id}`}
                    className="flex items-center justify-between"
                  >
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <div className="px-2 py-1 bg-gray-100 text-gray-700 rounded-sm">
                      ${item.price}
                    </div>
                  </Link>
                  <div className="text-sm text-gray-500 mt-1">Available</div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-500">Qty: {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-gray-700">
            <div className="flex justify-between text-lg font-medium">
              <span>Total:</span>
              <span>${order.totalAmount}</span>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span>Shipping fee:</span>
              <span>$10</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2 border-t pt-4">
              <span>Total fee:</span>
              <span>${order.totalAmount + 10}</span>
            </div>
          </div>
          <div
            className={`${
              order.status !== "REJECTED" ? "bg-lama" : "bg-red-500"
            } px-4 py-2 text-white w-full text-center mt-4`}
          >
            {order.status}
          </div>
          <Popconfirm
            title="Cancel the order"
            description="Are you sure to cancel the order?"
            onConfirm={handleCancelOrder}
            okText="Yes"
            cancelText="No"
          >
            <button
              disabled={order.status !== "CONFIRMED"}
              className={`${
                order.status !== "CONFIRMED" && "opacity-60"
              } px-4 py-2 text-white w-full text-center mt-4 bg-red-500`}
            >
              Cancel Order
            </button>
          </Popconfirm>
        </div>
        <div className="w-full lg:w-6/12 p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
            Order History
          </h3>
          <ul className="flex flex-col gap-4">
            {orderHistory.map((history, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 border rounded-md bg-gray-50 hover:bg-gray-100 shadow-sm"
              >
                <div>
                  <div className="text-gray-800 font-medium">
                    {history.status.replace(/_/g, " ")}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(history.updatedAt).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetail;
