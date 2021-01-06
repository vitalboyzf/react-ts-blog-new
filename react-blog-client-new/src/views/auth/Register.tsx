import React, { useState, useCallback } from "react";
import { UserAddSchema } from "../../schema/userSchema";
import style from "./register.module.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { register } from "../../api/user";
import { withRouter } from "react-router-dom";
import { Sex } from "./enum";
function Register(props: any) {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [gender, setGender] = useState<Sex>(Sex.girl);
    const toLogin = useCallback(() => {
        props.history.push("/login");
    }, [props.history]);
    const inputUserName = useCallback(event => {
        setUserName(event.target.value);
    }, []);
    const inputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const confirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirm(event.target.value);
    };
    const changeGender = (sex: Sex) => {
        return () => {
            setGender(sex);
        };
    };
    const submitRegister = () => {
        if (!userName) return message.error("请输入账号!");
        if (!password) return message.error("请输入密码!");
        if (password !== confirm) {
            message.error("两次密码输入不一致", .6);
            return;
        }
        const params: UserAddSchema = { name: userName, password, gender };
        register(params).then(() => {
            message.success("注册成功，去登录吧！", .3);
            toLogin();
        }).catch((error) => {
            message.error("注册失败，可能用户名已经存在！", 1);
        });
    };
    return (
        <div className={style.registerWrapper}>
            <div className={style.form}>
                <div className={style.goLogin}>
                    <ArrowLeftOutlined onClick={toLogin} />
                </div>
                <div className={style.title}>注册</div>
                <div className={style.item}>
                    <label>
                        <span>请输入昵称：</span>
                        <input placeholder={"请输入您的昵称"} value={userName}
                            onChange={inputUserName} type="text" />
                    </label>
                </div>
                <div className={style.item}>
                    <label>
                        <span>请输入密码：</span>
                        <input placeholder={"请输入您的密码"} value={password}
                            onChange={inputPassword} type="password" />
                    </label>
                </div>
                <div className={style.item}>
                    <label>
                        <span>请确认密码：</span>
                        <input placeholder={"请确认您的密码"} value={confirm}
                            onChange={confirmPassword} type="password" />
                    </label>
                </div>
                <div className={style.sex}>
                    <label >
                        <span>男：</span>
                        <input value={gender} checked={true} onChange={changeGender(Sex.boy)} name={"sex"} type="radio" />
                    </label>
                    <label >
                        <span>女：</span>
                        <input value={gender} onChange={changeGender(Sex.girl)} name={"sex"} type="radio" />
                    </label>
                </div>
                <div className={style.btn} >
                    <Button onClick={submitRegister}>注册</Button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Register);