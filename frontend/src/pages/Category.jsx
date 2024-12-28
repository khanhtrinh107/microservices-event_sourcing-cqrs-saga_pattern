import React, { useEffect, useState } from "react";
import Navbar from "../components/parents/Navbar";
import Products from "../components/parents/Products";
import Footer from "../components/parents/Footer";
import { useParams } from "react-router-dom";
import baseAPI from "../config/api";

const Category = () => {
  const param = useParams();
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await baseAPI(`/products/category/${param.id}`);
        if (res) {
          setProducts(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductsByCategory();
  }, [param.id]);

  if (isLoading) return <>Loading...</>;

  return (
    <>
      <Navbar />
      <div className="">
        <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <h1 className="text-2xl">Products of the category </h1>
          <Products products={products} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
