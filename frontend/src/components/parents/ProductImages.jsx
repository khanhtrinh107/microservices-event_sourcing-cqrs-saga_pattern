/* eslint-disable jsx-a11y/alt-text */
import { Image } from "antd";
import React, { useState } from "react";

const ProductImages = ({ images }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col gap-[50px]">
      <div className="h-[500px] relative">
        <Image
          src={images[index]}
          className="object-cover rounded-md"
          style={{ width: "auto", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div className="flex gap-4 my-8">
        {images.map((item, index) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={index}
            onClick={() => setIndex(index)}
          >
            <img src={item} sizes="30vw" className="object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
