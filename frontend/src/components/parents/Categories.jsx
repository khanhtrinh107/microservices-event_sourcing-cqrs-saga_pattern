import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseAPI from "../../config/api";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await baseAPI.get("/categories");
        if (res) {
          setCategories(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) return <>Loading...</>;

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {categories.map((item) => (
          <Link
            to={`/category/${item.id}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={item._id}
          >
            <div className="relative bg-slate-100 w-full">
              <img
                src={item?.categoryImage}
                alt=""
                fill
                sizes="20vw"
                className="object-cover w-auto h-full"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide text-center">
              {item.categoryName}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
