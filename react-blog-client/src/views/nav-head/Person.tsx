import { useState, ChangeEvent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./scss/person.scss";
// redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { UserSchema } from "../../schema/userSchema";
import { storeSchema } from "../../schema/storeSchema";

import { Button, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { login, updateUser } from "../../api/user";
import { UserAddSchema } from "../../schema/userSchema";
import { effectDelUser } from "../../store/saga/fetchTypes";
import { effectFetchUser } from "../../store/saga/fetchTypes";

function Person(props: RouteComponentProps) {
    const user = useSelector<storeSchema, UserSchema | null>(store => store.user, shallowEqual);
    const dispatch = useDispatch();
    const [avatar_url, setAvatar_url] = useState((user && user.avatar_url) || "");
    const [gender, setGender] = useState((user && user.gender) || "");
    const [pwd, setPwd] = useState((user && user.password) || "");
    const [identity, setIdentity] = useState((user && user.identity) || "");
    const [name, setName] = useState((user && user.name) || "");
    const deleteUserController = () => {
        // token设置过期
        document.cookie = `token=;"max-age"=-1}`;
        dispatch(effectDelUser());
        message.success("注销成功", .5);
        props.history.push("/login");
    };
    function changeNamePwdIdentifyInfo(key: "name" | "pwd" | "identity", e: ChangeEvent<HTMLInputElement>) {
        if (key === "name") {
            setName(e.target.value);
        } else if (key === "pwd") {
            setPwd(e.target.value);
        } else if (key === "identity") {
            setIdentity(e.target.value);
        }
    }
    function changeGender(sex: "男" | "女") {
        setGender(sex);
    }
    const submitUpdate = () => {
        const newUser: UserAddSchema = { name, password: pwd, avatar_url, gender };
        updateUser(user!._id, newUser).then(async () => {
            await login(name, pwd);
            dispatch(effectFetchUser());
            message.success("修改成功", .3);
        });
    };
    // 如果用户未登录，跳转到登录页面
    if (!user) {
        props.history.push("/login");
    }
    const uploadButton = (
        <div>
            {user && user.avatar_url ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ backgroundColor: "#fff" }}>上传头像</div>
        </div>
    );
    return (
        <div className="personWrapper" >
            <div className={"person-info"}>个人信息</div>
            <Upload
                name="img"
                method={"POST"}
                action="http://49.232.250.47:2000/upload"
                onChange={(e) => {
                    if (e.file.response) {
                        setAvatar_url(e.file.response.url);
                    }
                }}
            >
                <span>头像：</span>
                {avatar_url ?
                    <img style={{
                        width: "40px",
                        textAlign: "center",
                        marginLeft: "1vw"
                    }} src={avatar_url} alt="avatar" /> : uploadButton}
            </Upload>
            <div className="form">
                <div className="item">
                    <label>
                        <span>姓名：</span>
                        <input type="text" value={name} onChange={event => changeNamePwdIdentifyInfo("name", event)} />
                    </label>
                </div>
                <div className="item">
                    <label>
                        <span>密码：</span>
                        <input type="password" value={pwd} onChange={event => changeNamePwdIdentifyInfo("pwd", event)} />
                    </label>
                </div>
                <div className="item sex">
                    <label >
                        <span>男:</span>
                        <input type="radio" name={"gender"} value={gender} checked={gender === "男"}
                            onChange={event => changeGender("男")} />
                    </label>
                    <label >
                        <span>女:</span>
                        <input type="radio" name={"gender"} value={gender} checked={gender === "女"}
                            onChange={event => changeGender("女")} />
                    </label>
                </div>
                <div className="item">
                    <label>
                        <span>身份：</span>
                        <input type="text" disabled value={identity}
                            onChange={event => setIdentity(event.target.value)} />
                    </label>
                </div>
            </div>
            <div className="btn" >
                <Button onClick={submitUpdate}
                    type={"primary"}>提交修改</Button>
                <Button onClick={deleteUserController} danger style={{ marginLeft: "50px" }}>
                    退出登录</Button>
            </div>
            <div>
            </div>
        </div >
    );
}

export default withRouter(Person);