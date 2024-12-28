import React from "react";
import Product from "../elements/Product";

const Products = ({ products }) => {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 flex-wrap">
      {products?.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Products;
