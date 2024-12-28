import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../components/parents/Footer";
import Navbar from "../components/parents/Navbar";
import ProductImages from "../components/parents/ProductImages";
import baseAPI from "../config/api";
import { addItem } from "../redux/cart/reducer";
import AddReviews from "../components/parents/AddReviews";
import Review from "../components/parents/Review";

const ProductDetail = () => {
  const param = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  console.log('reviews: ', reviews);

  const handleAddToCart = async () => {
    const item = {
      id: product.id,
      quantity: quantity,
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

  useEffect(() => {
    window.scroll(0,0);
    const fetchProductDetail = async () => {
      const [productPromise, reviewsPromise] = await Promise.all([
        await baseAPI.get(`/products/${param.id}`),
        await baseAPI.get(`/comment/${param.id}`),
      ]);
      setProduct(productPromise.data);
      setReviews(reviewsPromise.data);
      setLoading(false);
    };
    fetchProductDetail();
  }, [param.id]);

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 mt-10">
        {loading ? (
          "loading..."
        ) : (
          <>
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
              <ProductImages images={product.images} />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <h1 className="text-4xl font-medium">{product.name}</h1>
              <p className="text-gray-500">{product.category}</p>
              <div className="h-[2px] bg-gray-100" />
              <div className="flex items-center gap-4">
                <h3 className="text-xl text-gray-500 line-through">
                  ${product.price * 2}
                </h3>
                <h2 className="font-medium text-2xl">${product.price}</h2>
              </div>
              <div className="h-[2px] bg-gray-100" />
              <h3>Choose quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-8 py-2 px-4 bg-gray-300 rounded-lg max-w-[150px]">
                  <div
                    onClick={() =>
                      setQuantity((pre) => (pre > 1 ? pre - 1 : 1))
                    }
                    className="cursor-pointer pr-2 hover:opacity-60"
                  >
                    -
                  </div>
                  <div className="w-[20px]">{quantity}</div>
                  <div
                    onClick={() => setQuantity((pre) => pre + 1)}
                    className="cursor-pointer pl-2 hover:opacity-60"
                  >
                    +
                  </div>
                </div>
                <div
                  className="py-2 px-4 rounded-lg border border-lama text-lama cursor-pointer hover:opacity-60"
                  onClick={handleAddToCart}
                >
                  <span className="font-medium">Add to cart</span>
                </div>
              </div>
              <div style={{ whiteSpace: "pre-line" }}>
                {product.description}
              </div>
            </div>
          </>
        )}
      </div>
      <AddReviews setReviews={setReviews}/>
      <div className="mt-16 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <h4 className="ant-typography css-dev-only-do-not-override-5wsri9 ">Reviews</h4>
        <div className="mt-16 flex flex-col gap-4">
          {reviews?.map(review => (
            <Review key={review.id} review={review}/>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
