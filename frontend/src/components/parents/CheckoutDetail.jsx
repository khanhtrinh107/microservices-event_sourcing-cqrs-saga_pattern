import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import baseAPI from "../../config/api";
import { List, notification, Spin } from "antd";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { clearCart } from "../../redux/cart/reducer";

const CheckoutDetail = () => {
  const currentUser = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart);
  const [address, setAddress] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [isLoading, setIsloading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const isValid = useMemo(() => {
    if (cart.item.length !== 0 && selectedAddress) {
      return true;
    }
    return false;
  }, [selectedAddress, cart]);

  const handleCheckout = async () => {
    setIsloading(true);
    const items = cart.item.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantity,
      };
    });
    const payload = {
      userId: currentUser.id,
      orderItems: items,
      address: selectedAddress,
      totalPrice: cart.totalAmount,
      shipmentFee: 10,
    };
    try {
      const res = await baseAPI.post("/orders", payload);
      await baseAPI.delete(`/cart/${currentUser.id}`);
      dispatch(clearCart());
      if (res) {
        notification.success({
          message: "Notification",
          description: "Create order successfully!",
          placement: "topLeft",
        });
      }
    } catch (err) {
      notification.error({
        message: "Notification",
        description: "Create order failed!",
        placement: "topLeft",
      });
    } finally {
      setTimeout(() => {
        history.push("/orders");
      }, 2000);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await baseAPI.get(`/address/${currentUser.id}`);
        setAddress(res.data);
        setSelectedAddress(res.data[0].addressId);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAddress();
  }, [currentUser.id]);

  return (
    <div className="w-6/12 p-6">
      <h3 className="text-2xl font-semibold mb-6">Checkout Details</h3>
      <div className="flex flex-col gap-8">
        <div className="mt-2">First name: {currentUser?.firstName}</div>
        <div className="mt-2">Last name: {currentUser?.lastName}</div>
        <div className="mt-2">Email: {currentUser?.email}</div>
        <div className="mt-2">Delivery Address: </div>
        <List
          itemLayout="horizontal"
          dataSource={address}
          renderItem={(item) => {
            return (
              <div
                className={`cursor-pointer ${
                  item.addressId === selectedAddress
                    ? "border-lama p-2 border"
                    : ""
                }`}
                onClick={() => setSelectedAddress(item.addressId)}
              >
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <img
                        className="h-[22px] w-[22px] object-contain"
                        src={`https://cdn-icons-png.flaticon.com/512/25/25694.png`}
                        alt=""
                      />
                    }
                    title={
                      <div className="flex items-center justify-between">
                        <div>{`${item.city},${item.province}`}</div>
                        {item.addressId === selectedAddress && (
                          <CheckOutlined className="text-lama" />
                        )}
                      </div>
                    }
                    description={`${item.detailAddress}, Phone: ${item.phoneNumber}`}
                  />
                </List.Item>
              </div>
            );
          }}
        />
        <button
          onClick={handleCheckout}
          disabled={!isValid}
          className={`bg-lama px-4 py-2 text-white ${
            !isValid ? "opacity-60" : ""
          }`}
        >
          {isLoading ? (
            <Spin indicator={<LoadingOutlined className="text-white" spin />} />
          ) : (
            "CHECK OUT"
          )}
        </button>
      </div>
    </div>
  );
};

export default CheckoutDetail;
