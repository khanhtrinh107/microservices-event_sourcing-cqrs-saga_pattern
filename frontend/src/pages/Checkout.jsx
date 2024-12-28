import React from "react";
import Navbar from "../components/parents/Navbar";
import Footer from "../components/parents/Footer";
import OrderInformation from "../components/parents/OrderInformation";
import CheckoutDetail from "../components/parents/CheckoutDetail";

const Checkout = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-[80%] mx-auto justify-center gap-10">
        <CheckoutDetail />
        <OrderInformation />
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
