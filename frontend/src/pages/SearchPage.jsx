/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../components/parents/Navbar";
import Products from "../components/parents/Products";
import Footer from "../components/parents/Footer";
import baseAPI from "../config/api";

const SearchPage = () => {
  const [keyword, setKeyWord] = useState();
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const searchProducts = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      setKeyWord(urlParams.get("keyword"));
      try {
        const res = await baseAPI.get(
          `/products/search?keyword=${urlParams.get("keyword")}`
        );
        if (res) {
          setProducts(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    searchProducts();
  }, [window.location.search]);

  if (isLoading) return <>Loading...</>;

  return (
    <>
      <Navbar />
      <div className="">
        <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <h1 className="text-2xl">Result for {keyword}: </h1>
          <Products products={products} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
