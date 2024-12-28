import { Breadcrumb, theme } from "antd";
import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import Category from "../components/parents/Category";

const CategoryDashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <DashboardLayout>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Category</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Category />
      </div>
    </DashboardLayout>
  );
};

export default CategoryDashboard;
