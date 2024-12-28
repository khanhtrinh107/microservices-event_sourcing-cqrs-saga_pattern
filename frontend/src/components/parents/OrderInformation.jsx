import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderInformation = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="w-full lg:w-6/12 p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
        Order Summary
      </h3>
      <div className="flex flex-col gap-6">
        {/* Item */}
        {cart.item.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 w-full p-4 border rounded-md hover:shadow-md"
          >
            <div className="w-[90px] h-[108px]">
              <img
                src={item.imgUrl}
                alt={item.name}
                className="object-cover rounded-md w-full h-full border"
              />
            </div>
            <div className="flex flex-col justify-between w-full">
              {/* Top */}
              <Link
                to={`/product/${item.id}`}
                className="flex items-center justify-between"
              >
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <div className="px-2 py-1 bg-gray-100 text-gray-700 rounded-sm">
                  ${item.price}
                </div>
              </Link>
              {/* Description */}
              <div className="text-sm text-gray-500 mt-1">Available</div>
              {/* Bottom */}
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-500">Qty: {item.quantity}</span>
                <button className="text-red-500 hover:text-red-600">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-gray-700">
        <div className="flex justify-between text-lg font-medium">
          <span>Total:</span>
          <span>${cart.totalAmount}</span>
        </div>
        <div className="flex justify-between text-lg font-medium">
          <span>Shipping fee:</span>
          <span>$10</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-2 border-t pt-4">
          <span>Total fee:</span>
          <span>${cart.totalAmount + 10}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
