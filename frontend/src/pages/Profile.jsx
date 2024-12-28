import React, { useEffect, useState } from "react";
import Footer from "../components/parents/Footer";
import Navbar from "../components/parents/Navbar";
import { useSelector } from "react-redux";
import baseAPI from "../config/api";
import { Avatar, List, notification } from "antd";
import AddressModal from "../components/parents/AddressModal";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.value);
  const [currentBalance, setCurrentBalance] = useState();
  const [number, setNumber] = useState();
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [address, setAddress] = useState();

  const handleOpenAddressModal = () => {
    setOpenAddressModal(true);
  };

  const handleRecharge = async () => {
    if (!number) {
      notification.error({
        message: "Notification",
        description: "Please enter the number!",
        placement: "topRight",
      });
      return;
    }
    try {
      const payload = {
        userId: currentUser.id,
        balance: number,
      };
      const res = await baseAPI.post("/account", payload);
      if (res) {
        setNumber(0);
        notification.success({
          message: "Notification",
          description: "Recharge successfully!",
          placement: "topRight",
        });
      }
    } catch {
      notification.error({
        message: "Notification",
        description: "Recharge failed!",
        placement: "topRight",
      });
    }
  };

  useEffect(() => {
    const fetchCurrentBalance = async () => {
      try {
        const res = await baseAPI.get(`/account/${currentUser.id}`);
        setCurrentBalance(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentBalance();
  }, [currentUser.id]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await baseAPI.get(`/address/${currentUser.id}`);
        setAddress(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAddress();
  }, [currentUser.id]);

  return (
    <>
      <Navbar />
      <div className=" md:h-[calc(100vh-180px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="w-full ">
          <h1 className="text-2xl mt-10">Your profile</h1>
          <div className="mt-10 flex gap-20">
            <div>
              <div className="mt-2">User id: {currentUser?.id}</div>
              <div className="mt-2">First name: {currentUser?.firstName}</div>
              <div className="mt-2">Last name: {currentUser?.lastName}</div>
              <div className="mt-2">Date of birth: {currentUser?.dob}</div>
              <div className="mt-2">Email: {currentUser?.email}</div>
              <div className="mt-2">
                Current balance: ${currentBalance?.balance}
              </div>
              <div className="mt-2 flex justify-between">
                <div>Delivery address: </div>
                <button
                  className="ml-4 px-4 py-1 text-white bg-lama"
                  onClick={handleOpenAddressModal}
                >
                  Add
                </button>
              </div>
              <List
                itemLayout="horizontal"
                dataSource={address}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://cdn-icons-png.flaticon.com/512/25/25694.png`}
                        />
                      }
                      title={
                        <a href="https://ant.design">{`${item.city},${item.province}`}</a>
                      }
                      description={`${item.detailAddress}, Phone: ${item.phoneNumber}`}
                    />
                  </List.Item>
                )}
              />
            </div>
            <div>
              <span>Recharge</span>
              <input
                className="border-2 outline-none ml-4 py-1 px-2"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              ></input>
              <button
                onClick={handleRecharge}
                className="ml-4 px-4 py-1 text-white bg-lama"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      {openAddressModal && (
        <AddressModal
          openAddressModal={openAddressModal}
          setOpenAddressModal={setOpenAddressModal}
          setAddress={setAddress}
        />
      )}
      <Footer />
    </>
  );
};

export default Profile;
