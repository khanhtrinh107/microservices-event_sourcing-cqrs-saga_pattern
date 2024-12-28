import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../../redux/cart/reducer";
import { useHistory } from "react-router-dom";
import baseAPI from "../../config/api";

const CartModal = () => {
  const cart = useSelector((value) => value.cart);
  const currentUser = useSelector((value) => value.user.value);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemoveItem = async (item) => {
    try {
      const res = await baseAPI.delete(`/cart/${currentUser.id}/${item.id}`);
      if (res.data) {
        dispatch(removeItem(item));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearCart = async () => {
    try {
      const res = await baseAPI.delete(`/cart/${currentUser.id}`);
      if (res.data) {
        dispatch(clearCart());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckOut = () => {
    history.push("/checkout");
  };

  return (
    <div className="w-max absolute bg-white right-0 flex flex-col gap-6 z-20 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] top-12">
      {cart.item.length === 0 ? (
        <div className="text-xl">Cart is Empty!</div>
      ) : (
        <>
          <h2>Shopping Cart</h2>
          <div className="flex flex-col gap-8 items-center">
            {/* Item */}
            {cart.item.map((item) => (
              <div className="flex items-center gap-4 w-full">
                <div className="w-6/12">
                  <img
                    src={item.imgUrl}
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-md w-[90px]"
                  />
                </div>
                <div className="flex flex-col justify-between w-full h-[108px]">
                  {/* Top */}
                  <div className="">
                    {/* Title  */}
                    <div className="flex items-center justify-between gap-10">
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="p1 bg-gray-50 rounded-sm">
                        ${item.price}
                      </div>
                    </div>
                  </div>
                  {/* Description */}
                  <div className="text-sm text-gray-500">available</div>
                  {/* Bottom  */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Bottom  */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">${cart.totalAmount}</span>
            </div>
            <p className="text-gray-500 text-sm my-4">
              Shipping and taxes calculated at checkout
            </p>
            <div className="flex justify-between text text-sm">
              <button
                className="rounded-md py-3 px-4 ring-1 ring-gray-300"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white"
                onClick={handleCheckOut}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
