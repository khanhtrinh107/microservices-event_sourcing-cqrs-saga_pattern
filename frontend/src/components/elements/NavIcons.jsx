import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartModal from "./CartModal";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import baseAPI from "../../config/api";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart);
  const handleProfile = () => {
    setIsProfileOpen((pre) => !pre);
  };

  const handleLogout = async () => {
    localStorage.removeItem("userSession");
    const token = Cookies.get("accessToken");
    Cookies.remove("accessToken");
    await baseAPI.post("/auth/logout", {
      token,
    });
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative z-9">
      <img
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-white">
          <Link to={"/orders"}>Orders</Link>
          <div className="mt-2">
            <Link to={"/profile"}>Profile</Link>
          </div>
          {currentUser.roles[0].name === "ADMIN" && (
            <div className="mt-2">
              <Link to={"/dashboard"}>Dashboard</Link>
            </div>
          )}
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
      <img
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((pre) => !pre)}
      >
        <img src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {cart.totalQuantity}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
