import React from "react";
import { theme } from "antd";
import DashboardLayout from "../layout/DashboardLayout";
import ProductTable from "../components/parents/ProductTable";

const ProductDashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <DashboardLayout>
      <div
        style={{
          padding: 24,
          height: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <ProductTable />
      </div>
    </DashboardLayout>
  );
};

export default ProductDashboard;
