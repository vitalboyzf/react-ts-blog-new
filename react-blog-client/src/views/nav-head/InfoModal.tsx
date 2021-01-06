import { memo, useState, ChangeEvent } from "react";
import { login, updateUser } from "../../api/user";
import { Button, message, Upload } from "antd";
import { UserSchema, UserAddSchema } from "../../schema/userSchema";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { storeSchema } from "../../schema/storeSchema";
import { effectDelUser } from "../../store/saga/fetchTypes";
import { effectFetchUser } from "../../store/saga/fetchTypes";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import "./scss/info-modal.scss";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
interface Iprops extends RouteComponentProps {
    closeInfoModal(): void;
}
function InfoModal(props: Iprops) {
    const user = useSelector<storeSchema, UserSchema>(state => state.user, shallowEqual);
    const [avatar_url, setAvatar_url] = useState(user ? user.avatar_url : "");
    const [gender, setGender] = useState(user ? user.gender : "");
    const [pwd, setPwd] = useState(user ? user.password : "");
    const [identity, setIdentity] = useState(user ? user.identity : "");
    const [name, setName] = useState(user ? user.name : "");

    const dispatch = useDispatch();
    if (user && user.name !== name) {
        setName(user.name);
        setGender(user.gender);
        setPwd(user.password);
        setIdentity(user.identity);
        setAvatar_url(user.avatar_url);
    }
    const uploadButton = (
        <div>
            {user && user.avatar_url ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ backgroundColor: "#fff" }}>上传头像</div>
        </div>
    );
    const deleteUserController = () => {
        // token设置过期
        document.cookie = `token=;"max-age"=-1}`;
        message.success("注销成功", .5);
        props.closeInfoModal();
        dispatch(effectDelUser());
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
        updateUser(user._id, newUser).then(async () => {
            await login(name, pwd);
            dispatch(effectFetchUser());
            message.success("修改成功", .3);
            props.closeInfoModal();
        });
    };
    return (
        <div className={"InfoModal"}>
            <div className={"person-info"}>个人信息</div>
            <Upload
                name="img"
                // method={"POST"}
                listType="picture-card"
                showUploadList={false}
                action="http://49.232.250.47:2000/upload"
                onChange={(e) => {
                    if (e.file.response) {
                        setAvatar_url(e.file.response.url);
                    }
                }}
                beforeUpload={(file) => {
                    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
                    if (!isJpgOrPng) {
                        message.error("只能上传jpg,png类型的图片");
                    }
                    const isLt2M = file.size / 1024 / 1024 < 1;
                    if (!isLt2M) {
                        message.error("上传图片必须小于1M");
                    }
                    return isJpgOrPng && isLt2M;
                }}
            >
                {avatar_url ?
                    <img style={{
                        width: "40px"
                    }} src={avatar_url} alt="avatar" /> : uploadButton}
            </Upload>
            <div className={"form"}>
                <div className={"item"}>
                    <label>
                        <span>姓名：</span>
                        <input type="text" value={name} onChange={event => changeNamePwdIdentifyInfo("name", event)} />
                    </label>
                </div>
                <div className={"item"}>
                    <label>
                        <span>密码：</span>
                        <input type="password" value={pwd} onChange={event => changeNamePwdIdentifyInfo("pwd", event)} />
                    </label>
                </div>
                <div className={"item sex"}>
                    <label >
                        <span>男:</span>
                        <input type="radio" name={"gender"} value={gender} checked={gender === "男"}
                            onChange={() => changeGender("男")} />
                    </label>
                    <label >
                        <span>女:</span>
                        <input type="radio" name={"gender"} value={gender} checked={gender === "女"}
                            onChange={() => changeGender("女")} />
                    </label>
                </div>
                <div className={"item"}>
                    <label>
                        <span>身份：</span>
                        <input type="text" disabled value={identity}
                            onChange={event => changeNamePwdIdentifyInfo("identity", event)} />
                    </label>
                </div>
            </div>
            <div className="btn" >
                <Button onClick={submitUpdate} type={"primary"}>提交修改</Button>
                <Button onClick={deleteUserController} danger style={{ marginLeft: "50px" }}>退出登录</Button>
            </div>
            <div>
            </div>
        </div>
    );
}
export default withRouter(memo(InfoModal));