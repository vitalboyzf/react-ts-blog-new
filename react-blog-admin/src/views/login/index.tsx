import { useState, ChangeEvent } from "react";
import { Button, message } from "antd";
import { login } from "../../api/user";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./login.scss";

function Login(props: RouteComponentProps) {
    const [userName, setUserName] = useState("");
    const [pwd, setPwd] = useState("");
    const loginController = async () => {
        try {
            await login(userName, pwd)
            // props.history.push("/home");
            window.location.replace("/home");
            message.success("登录成功", .3);
        } catch (error) {
            message.error("用户名或密码错误！", .3);
            return;
        }
    };
    const inputUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };
    const inputPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value);
    };
    return (
        <div className={"loginWrapper"}>
            <div className={"form"}>
                <div className={"title"}>
                    登录后台管理系统
            </div>
                <div className={"item"}>
                    <label>
                        <span>请输入昵称：</span>
                        <input placeholder={"请输入您的昵称"} type="text" value={userName} onChange={inputUserName} />
                    </label>
                </div>
                <div className={"item"}>
                    <label>
                        <span>请输入密码：</span>
                        <input placeholder={"请输入您的密码"} type="password" value={pwd} onChange={inputPassword} />
                    </label>
                </div>
                <div className={"btn"}>
                    <Button className={"login"} onClick={loginController}>登录</Button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);
