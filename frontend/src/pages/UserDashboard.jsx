import React from 'react'
import { Breadcrumb, theme } from 'antd';
import DashboardLayout from '../layout/DashboardLayout';

const UserDashboard = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return (
        <DashboardLayout >
            <Breadcrumb
                style={{
                margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                }}
            >
                user management
            </div>
        </DashboardLayout>
    )
}

export default UserDashboard;
