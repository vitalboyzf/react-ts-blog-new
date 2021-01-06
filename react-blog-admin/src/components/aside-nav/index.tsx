import React, { memo } from "react";
import { Layout, Menu } from 'antd';
import { NavLink } from "react-router-dom";
import {
    UserOutlined,
    FileTextOutlined,
    CommentOutlined,
    MessageOutlined
} from '@ant-design/icons';
import SubMenu from "antd/lib/menu/SubMenu";
const { Sider } = Layout;
export default memo(function AsideNav(props: any) {

    return (
        <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
            <div className="logo">BLOG后台管理系统</div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['blok-list，sentence-list']}>
                <SubMenu key="blog" icon={<FileTextOutlined />} title="博文管理">
                    <Menu.Item key="blok-list">
                        <NavLink to="/blog">博文列表</NavLink>
                    </Menu.Item>
                    <Menu.Item key="blok-add">
                        <NavLink to="/blog-add">添加博文</NavLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sentence" icon={<FileTextOutlined />} title="短句管理">
                    <Menu.Item key="sentence-list">
                        <NavLink to="/sentence">短句列表</NavLink>
                    </Menu.Item>
                    <Menu.Item key="sentence-add">
                        <NavLink to="/sentence-add">添加短句</NavLink>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="comment" icon={<CommentOutlined />}>
                    <NavLink to="/comment">评论管理</NavLink>
                </Menu.Item>
                <Menu.Item key="message" icon={<MessageOutlined />}>
                    <NavLink to="/message">留言管理</NavLink>
                </Menu.Item>
                <Menu.Item key="user" icon={<UserOutlined />}>
                    <NavLink to="/user">用户管理</NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    )
})
