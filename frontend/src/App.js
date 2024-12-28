import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { useDispatch } from "react-redux";
import baseAPI from "./config/api";
import { setUserDetail } from "./redux/user/reducer";
import { useEffect, useState } from "react";
import { fetchCart } from "./redux/cart/reducer";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const user = await baseAPI.get("/users/my-info");
        dispatch(setUserDetail(user.data.result));
        const cart = await baseAPI.get(`/cart/${user.data.result.id}`);
        dispatch(fetchCart(cart.data));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetail();
  }, [dispatch]);
  if (isLoading) {
    return <></>;
  }
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
