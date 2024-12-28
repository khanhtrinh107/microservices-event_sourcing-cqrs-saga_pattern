import React, { useEffect, useState } from "react";
import Navbar from "../components/parents/Navbar";
import Slider from "../components/parents/Slider";
import Categories from "../components/parents/Categories";
import Footer from "../components/parents/Footer";
import Products from "../components/parents/Products";
import baseAPI from "../config/api";

const Home = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await baseAPI.get("/products");
      setProducts(res.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <></>;

  return (
    <>
      <Navbar />
      <div className="">
        <Slider />
        <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <h1 className="text-2xl">Featured Products</h1>
          <Products products={products} />
        </div>
        <div className="mt-24">
          <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
            Categories
          </h1>
          <Categories />
        </div>
        <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <h1 className="text-2xl">New Products</h1>
          <Products products={products} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
