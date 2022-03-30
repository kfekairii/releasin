import React, { Children, createElement, useState } from "react";
import { Menu, Layout as AntdLayout, Dropdown, Button, Typography } from "antd";
// import { Link } from "react-router-dom";
import {
  DesktopOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const { Header, Content, Sider } = AntdLayout;

function Layout({ children }: any) {
  // Page State
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false); // Main Drawer state
  return (
    <AntdLayout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ minHeight: "100vh" }}
        theme="light"
        className="shadow"
      >
        {/* <Link to="/"> */}
        <div
          style={{
            height: 64,
            display: "flex",
            paddingLeft: 24,
            alignItems: "center",
            backgroundColor: "#00172F",
          }}
        >
          {!collapsed && (
            <Typography.Title
              level={4}
              style={{
                color: "#f0f0f0",
                margin: "auto",
              }}
            >
              HMSystem
            </Typography.Title>
          )}
        </div>
        {/* </Link> */}
        <Menu mode="inline" selectedKeys={[router.pathname]}>
          <Menu.Item
            key="/"
            style={{
              fontSize: 18,
              margin: 0,
              marginTop: 12,
              backgroundColor: "transparent",
            }}
            icon={<HomeOutlined style={{ fontSize: 20 }} />}
          >
            <Link href="/">Products</Link>
          </Menu.Item>

          <Menu.Item
            key="/products-config"
            style={{ fontSize: 18, margin: 0, backgroundColor: "transparent" }}
            icon={<DesktopOutlined style={{ fontSize: 20 }} />}
          >
            <Link href="/products-config">Configs</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <AntdLayout>
        <Header
          style={{
            padding: 0,
            paddingRight: 24,
            backgroundColor: "#00172F",
            display: "flex",
            alignItems: "center",
          }}
        >
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "",
            style: { color: "#f0f0f0", fontSize: 22 },
            onClick: () => setCollapsed((prevState) => !prevState),
          })}
          <div style={{ flex: 1 }} />

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="logout"
                  icon={<LogoutOutlined style={{ fontSize: 16 }} />}
                  style={{ margin: 0 }}
                  onClick={() => {}}
                >
                  Déconnexion
                </Menu.Item>
              </Menu>
            }
            placement="bottomLeft"
          >
            <Button icon={<UserOutlined />} />
          </Dropdown>
          <Typography.Text
            style={{ color: "#f0f0f0", marginLeft: 12, fontSize: 16 }}
          >
            username
          </Typography.Text>
        </Header>
        <Content>{children}</Content>
      </AntdLayout>
    </AntdLayout>
  );
}

export default Layout;
