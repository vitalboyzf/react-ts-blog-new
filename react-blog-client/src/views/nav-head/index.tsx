import { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
// redux
import { useSelector, shallowEqual } from "react-redux";
import { storeSchema } from "../../schema/storeSchema";
import { UserSchema } from "../../schema/userSchema";

import NavLinkWrapper from "./NavLinkWrapper";
import { Button, Drawer } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import InfoModal from "./InfoModal";

import "./scss/index.scss";

let bigScreen = window.matchMedia("(min-width:960px)");



function NavHead(props: RouteComponentProps) {
    const user = useSelector<storeSchema, UserSchema>(state => state.user, shallowEqual);
    const [show, setShow] = useState(false);
    const [minHeadShow, setMinHeadShow] = useState(false);

    const showUserClick = () => {
        if (!user) {
            props.history.push("/login");
            return;
        }
        setShow(!show);
    };
    const logoClick = () => {
        if (user && user.name === "张斐") {
            window.location.replace("/react-blog-admin")
            return;
        }
        props.history.push("/home");
    };
    const closeInfoModal = () => {
        setShow(false);
    };
    if (bigScreen.matches) {
        return (
            <div className={"headWrapper"}>
                <div className={"nav-head"}>
                    <div className={"logo"}>
                        <img src={require("./nav-head.svg").default} alt="" />
                        <span onClick={logoClick}>张斐的个人博客</span>
                    </div>
                    <NavLinkWrapper />
                    <div className="user">
                        <img style={{ backgroundColor: "#fff" }}
                            src={user && user.avatar_url ? user.avatar_url : require("../detail/user.png").default} alt="" />
                        <span onClick={showUserClick}>{user ? "修改信息" : "点击登录"}</span>
                    </div>
                    {show && <InfoModal closeInfoModal={closeInfoModal} />}
                </div>
            </div>
        );
    } else {
        return (
            <div className={"headWrapper"} >
                <Drawer
                    title="导航栏"
                    className={"drawer"}
                    placement={"left"}
                    closable={false}
                    width={200}
                    onClose={() => {
                        setMinHeadShow(false);
                    }}
                    visible={minHeadShow}>
                    <NavLinkWrapper isMin={true} />
                </Drawer>
                <Button type="dashed" className="nav-controller" onClick={() => {
                    setMinHeadShow(true);
                }}><MenuFoldOutlined /></Button>
                <span className="title" >张斐的个人博客</span>
            </div>
        );
    }
}


export default withRouter(NavHead);