import { notification } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../../redux/cart/reducer";
import baseAPI from "../../config/api";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user.value);

  const handleAddToCart = async () => {
    const item = {
      id: product.id,
      quantity: 1,
      price: product.price,
      name: product.name,
      imgUrl: product.images[0],
    };
    try {
      await baseAPI.post(`/cart/${user.id}`, item);
      dispatch(addItem(item));
      notification.success({
        message: "Notification",
        description: "Add product to cart successfully!",
        placement: "topLeft",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
      <div className="relative w-full h-80">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt=""
            className="absolute object-contain rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 w-full h-full"
          />
          <img
            src={product.images[1]}
            alt=""
            className="absolute object-contain rounded-md w-full h-full"
          />
        </Link>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">{product.name}</span>
        <span className="font-semibold">${product.price}</span>
      </div>
      <button
        className="rounded-2xl ring-1 ring-noti text-noti w-max py-2 px-4 text-xs hover:opacity-60 hover:text-lama"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
