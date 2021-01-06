import React, { memo, useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Layout, Button } from 'antd';
import "./layout.scss";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import AsideNav from "./components/aside-nav";
import Home from "./views/home";
import Blog from "./views/blog";
import BlogAdd from "./views/blog/blog-add";
import Sentence from "./views/sentence";
import SentenceAdd from "./views/sentence/sentence-add";
import Comment from "./views/comment";
import Message from "./views/message";
import User from "./views/user";
import Login from "./views/login";
import { whoami } from "./api/user";
import { UserSchema } from "./schema/userSchema";
const { Header, Content } = Layout;


export default memo(function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<UserSchema | null>(null);
  useEffect(() => {
    whoami().then((res) => {
      setUser(res && res.data);
    })
  }, [])
  function toggle() {
    setCollapsed(!collapsed);
  };
  function logoutController() {
    // window.localStorage.removeItem("token");
    // window.location.reload()
    window.location.replace("/react-blog");
  }

  return (
    <BrowserRouter>
      {user ? <Layout>
        <AsideNav isCollapsed={collapsed} />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <div className="user">
              <span className="welcome">
                <UserOutlined />
                <span className="user-name">
                  {user.name}
                </span>
              </span>
              <Button danger onClick={logoutController}>退出</Button>
            </div>
          </Header>
          <Content className="layout-content">
            <Route path="/home" component={Home} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog-add" component={BlogAdd} />
            <Route path="/sentence" component={Sentence} />
            <Route path="/sentence-add" component={SentenceAdd} />
            <Route path="/comment" component={Comment} />
            <Route path="/message" component={Message} />
            <Route path="/user" component={User} />
            <Redirect to="/home" />
          </Content>
        </Layout>
      </Layout> : <Login />}
    </BrowserRouter >
  );
});
