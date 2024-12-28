import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import UserDashboard from "../pages/UserDashboard";
import ProductDashboard from "../pages/ProductDashboard";
import OrderDashboard from "../pages/OrderDashboard";
import CategoryDashboard from "../pages/CategoryDashboard";
import SearchPage from "../pages/SearchPage";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrderDetail";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";
import Category from "../pages/Category";

export const routes = {
  home: {
    title: "home",
    router: "/",
    path: "/",
    isPrivate: true,
    component: <Home />,
  },
  productDetail: {
    title: "product detail",
    router: "/product/:id",
    path: "/product/:id",
    isPrivate: true,
    component: <ProductDetail />,
  },
  orderDetail: {
    title: "product deatail",
    router: "/orders/:id",
    path: "/orders/:id",
    isPrivate: true,
    component: <OrderDetail />,
  },
  list: {
    title: "list",
    router: "/list",
    path: "/list",
    isPrivate: true,
    component: <SearchPage />,
  },
  category: {
    title: "category",
    router: "/category/:id",
    path: "/category/:id",
    isPrivate: true,
    component: <Category />,
  },
  checkout: {
    title: "checkout",
    router: "/checkout",
    path: "/checkout",
    isPrivate: true,
    component: <Checkout />,
  },
  order: {
    title: "orders",
    router: "/orders",
    path: "/orders",
    isPrivate: true,
    component: <Orders />,
  },
  login: {
    title: "login",
    router: "/login",
    path: "/login",
    isPrivate: false,
    component: <Login />,
  },
  profile: {
    title: "profile",
    router: "/profile",
    path: "/profile",
    isPrivate: false,
    component: <Profile />,
  },
  dashboard: {
    title: "dashboard",
    router: "/dashboard",
    path: "/dashboard",
    isPrivate: true,
    component: <Dashboard />,
    isAdmin: true,
  },
  userDashboard: {
    title: "user Dashboard",
    router: "/dashboard/users",
    path: "/dashboard/users",
    isPrivate: true,
    component: <UserDashboard />,
    isAdmin: true,
  },
  productDashboard: {
    title: "product dashboard",
    router: "/dashboard/products",
    path: "/dashboard/products",
    isPrivate: true,
    component: <ProductDashboard />,
    isAdmin: true,
  },
  orderDashboard: {
    title: "order dashboard",
    router: "/dashboard/orders",
    path: "/dashboard/orders",
    isPrivate: true,
    component: <OrderDashboard />,
    isAdmin: true,
  },
  categoryDashboard: {
    title: "category dashboard",
    router: "/dashboard/categories",
    path: "/dashboard/categories",
    isPrivate: true,
    component: <CategoryDashboard />,
    isAdmin: true,
  },
};

const AppRouter = () => {
  const currentUser = useSelector((state) => state.user.value);
  const isAdmin = currentUser?.roles?.some((role) => role.name === "ADMIN");
  return (
    <Switch>
      {Object.entries(routes).map(([key, route]) => {
        if (route.isPrivate && !currentUser?.id) {
          return (
            <Route
              key={key}
              exact
              path={route.path}
              render={({ location }) => (
                <Redirect
                  to={{
                    pathname: routes.login.path,
                    state: { from: location },
                  }}
                />
              )}
            />
          );
        }

        if (route.isAdmin && !isAdmin) {
          return (
            <Route
              key={key}
              exact
              path={route.path}
              render={({ location }) => (
                <Redirect
                  to={{
                    pathname: routes.home.path,
                    state: { from: location },
                  }}
                />
              )}
            />
          );
        }

        return (
          <Route key={key} exact path={route.path}>
            {route.component}
          </Route>
        );
      })}

      <Route>
        <Redirect to={routes.home.path} />
      </Route>
    </Switch>
  );
};

export default AppRouter;
