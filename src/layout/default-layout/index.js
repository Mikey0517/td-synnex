import { useState } from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from "antd"
import SDKManagementIcon from '@/assets/ICON2_API.svg'
import { Svg } from "@/components";
import './index.less'

const { Sider, Content } = Layout;

export default function DefaultLayout () {
  const navigate = useNavigate();
  const location = useLocation()

  const items = [
    {
      key: '/user-profile',
      label: 'User Profile',
      icon: <Svg src={SDKManagementIcon}/>
    },
    {
      key: '/sdk-management',
      label: 'SDK Management',
      icon: <Svg src={SDKManagementIcon}/>
    },
    {
      key: '/dashboards',
      label: 'Dashboards',
      icon: <Svg src={SDKManagementIcon}/>
    },
    {
      key: '/terms-and-conditions',
      label: 'Terms & Conditions',
      icon: <Svg src={SDKManagementIcon}/>
    }
  ]

  const handleClick = ({ key }) => {
    navigate(key)
  }

  return (
    <Layout className="default-layout">
      <Sider>
      <Menu
        className="default-layout-menu"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleClick}
        style={{ width: 200 }}
        items={items}
      />
      </Sider>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}