import { useState, ChangeEvent } from "react";
import { Button, message } from "antd";
import { login } from "../../api/user";
import style from "./login.module.css";
import { RouteComponentProps } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { effectFetchUser } from "../../store/saga/fetchTypes";

function Login(props: RouteComponentProps) {
    const [userName, setUserName] = useState("");
    const [pwd, setPwd] = useState("");
    const dispatch = useDispatch();
    const loginController = () => {
        login(userName, pwd).then((res: any) => {
            if (!res) {
                message.error("用户名或密码错误！", .3);
                return;
            }
            dispatch(effectFetchUser());
            props.history.push("/home");
            message.success(res.message, .3);
        });
    };
    const ToRegister = () => {
        props.history.push("/register");
    };
    const inputUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };
    const inputPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value);
    };
    return (
        <div className={style.loginWrapper}>
            <div className={style.form}>
                <div className={style.title}>
                    用户登录
            </div>
                <div className={style.item}>
                    <label>
                        <span>请输入昵称：</span>
                        <input placeholder={"请输入您的昵称"} type="text" value={userName} onChange={inputUserName} />
                    </label>
                </div>
                <div className={style.item}>
                    <label>
                        <span>请输入密码：</span>
                        <input placeholder={"请输入您的密码"} type="password" value={pwd} onChange={inputPassword} />
                    </label>
                </div>
                <div className={style.btn}>
                    <Button className={style.login} onClick={loginController}>登录</Button>
                    <Button className={style.register} onClick={ToRegister}>注册</Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
