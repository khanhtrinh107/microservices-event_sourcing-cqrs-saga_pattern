import {
  ShoppingCartOutlined,
  MoneyCollectOutlined,
  TeamOutlined,
  ProductOutlined,
  LogoutOutlined,
  BlockOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, link, children) {
  return {
    key,
    icon,
    children,
    label,
    link
  };
}
const items = [
  getItem('Revenue', '/dashboard', <MoneyCollectOutlined />, '/dashboard'),
  getItem('Order',  '/dashboard/orders', <ShoppingCartOutlined />, '/dashboard/orders'),
  getItem('Product', '/dashboard/products', <ProductOutlined />, '/dashboard/products'),
  getItem('User', '/dashboard/users', <TeamOutlined />, '/dashboard/users'),
  getItem('Category','/dashboard/categories', <BlockOutlined />, '/dashboard/cateogries')
];
const DashboardLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const location = useLocation();
  return (
    <Layout
      style={{
        maxHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className='bg-white h-screen'>
        <div className='flex flex-col items-centers h-[calc(100vh-80px)]'>
            <div className="bg-white text-center flex center justify-center my-[32px] ">
                <Link to="/" className="flex items-center gap-3">
                    {!collapsed && <img src="/logo.png" alt="" width={24} height={24} />}
                    <div className="text-2xl tracking-wide">LIKA</div>
                </Link>
            </div>
            <Menu onClick={(item) => {
                history.push(item.key);
            }} theme="light" mode="inline" items={items} selectedKeys={[location.pathname]}/>
        </div>
        <div className='pl-[24px] ml-[4px]'>
            <LogoutOutlined />
            {!collapsed && <span className='pl-[10px]'>logout</span>}
        </div>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          LIKA SHOP ©{new Date().getFullYear()} Created by KhanhQuyen with love.
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;