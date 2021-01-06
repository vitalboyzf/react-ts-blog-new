import {
    ChangeEvent,
    useEffect,
    useState
} from "react";
// component
import HeadCom from "../../components/head-com/HeadCom";
import ReplyMessage from "./ReplyMessage";
import Pager from "../../components/pager/Pager";
import { Button, Calendar, message } from "antd";
import { Spin } from "antd";
// redux 
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { storeSchema } from "../../schema/storeSchema";
import { MessageAddSchema, MessageSchema } from "../../schema/messageSchema";
import { UserSchema } from "../../schema/userSchema";
import { effectFetchMessage } from "../../store/saga/fetchTypes";
// util
import { carefulParseDate } from "../../components/util";
import { addMessage } from "../../api/message";
// css
import "./scss/message.scss";

function MessageBoard() {
    const [content, setContent] = useState("");
    const [show, setShow] = useState(false);
    const [fatherMessage, setFatherMessage] = useState("");
    const [current, setCurrent] = useState(1);
    const messages = useSelector<storeSchema, MessageSchema[]>(store => store.messages, shallowEqual)
        .sort((a, b) => parseInt(b.publish_date) - parseInt(a.publish_date));
    const dispatch = useDispatch();
    let user = useSelector<storeSchema, UserSchema>(store => store.user, shallowEqual);
    useEffect(() => {
        dispatch(effectFetchMessage());
    }, [current, dispatch]);

    const RootMessage = messages.slice((current - 1) * 5, (current - 1) * 5 + 5).map((message) => {
        if (message.user === null) {
            message.user = {
                name: "已经删除的用户",
                identity: "游侠",
                _id: (Math.random() * 1000).toString(32),
                password: ""
            };
        }
        const msgChild = message.child && message.child.map((childMsg) => {
            if (childMsg.user === null) {
                childMsg.user = {
                    name: "已经删除的用户",
                    identity: "游侠",
                    _id: (Math.random() * 1000).toString(32),
                    password: ""
                };
            }
            return <div key={childMsg._id} className="child-message">
                <div className="title">
                    <img className={"user-avatar"} src={childMsg.user.avatar_url ? childMsg.user.avatar_url : require("../detail/user.png").default} alt="" />
                    <span>{childMsg.user.name}
                        {childMsg.user.identity === "超级管理员" ?
                            <span style={{ color: "#f40", marginLeft: "10px" }}>[{childMsg.user.identity}]</span> :
                            <span style={{ color: "#f90", marginLeft: "10px" }}>[{childMsg.user.identity}]</span>}
                        <span className={"date"}>{carefulParseDate(childMsg.publish_date)}</span>
                    </span>
                </div>
                <div className="content">
                    <p>{childMsg.content}</p>
                </div>
            </div>;
        });
        return <div className={"message-item"} key={message._id}>
            <div className="title">
                <img className="user-avatar" src={message.user.avatar_url ? message.user.avatar_url : require("../detail/user.png").default} alt="" />
                <span>
                    {message.user.name}
                    {message.user.identity === "超级管理员" ?
                        <b style={{ color: "#f40", marginLeft: "10px" }}>[{message.user.identity}]</b> :
                        <b style={{ color: "#f90", marginLeft: "10px" }}>[{message.user.identity}]</b>}
                    <span className={"reply"}
                        onClick={() => openReplyModel(message)}
                    >回复</span>
                    <span className={"date"}>{carefulParseDate(message.publish_date)}</span>
                </span>
            </div>
            <div className="content">
                <p>{message.content}</p>
            </div>
            {msgChild}
        </div>;
    });
    // 处理逻辑函数
    function sendMessage() {
        if (!user) {
            message.warn("请先登录", .5);
            return;
        }
        const msg: MessageAddSchema = { content, user: user._id };
        addMessage(msg).then((res: any) => {
            if (res.content) {
                setContent("");
                getNewMessage();
                message.success("留言成功", .3);
            } else {
                message.error("留言失败", .3);
            }
        });
    }
    function changeContent(e: ChangeEvent<HTMLTextAreaElement>) {
        setContent(e.target.value);
    }
    function openReplyModel(msg: MessageSchema) {
        if (user === null) {
            message.warn("请先登录", .5);
            return;
        }
        setShow(true);
        setFatherMessage(msg._id);
    }
    function cancelReplyModel() {
        setShow(false);
    }
    function replySendMessage(content: string) {
        const msg: MessageAddSchema = { content, user: user._id, fatherMessage };
        addMessage(msg).then((res: any) => {
            if (res.content) {
                getNewMessage();
                message.success("发送成功", .3);
            } else {
                message.error("发送失败", .3);
            }
        });
        setShow(false);
    }
    function getNewMessage() {
        dispatch(effectFetchMessage());
    }
    function changePage(index: number) {
        setCurrent(index);
    }

    return (
        <>
            <HeadCom title={"留言板"} content={"存在即合理"} />
            <div className="messageWrapper">
                <textarea placeholder={"嘿！留个言吧~~~"}
                    className={"textarea"}
                    value={content}
                    onChange={changeContent}
                    name="" id="" cols={100} rows={5} />
                <div className="send-btn">
                    <Button onClick={sendMessage} type={"primary"}>发表留言</Button>
                </div>
                <div className="message-container">
                    <Spin tip="加载留言中~~~" spinning={messages.length === 0}>
                        {RootMessage}
                    </Spin>
                    {messages.length > 5 && <Pager current={current} total={messages.length} onChangePage={changePage} />}
                    <div className="site-calendar-demo-card">
                        <Calendar
                            fullscreen={false}
                            className={"calendar"}
                        />
                    </div>
                    <div className="girl-picture">
                        <img className={"image"} src={require("./1.jpg").default} alt="" />
                    </div>
                    {show ? <ReplyMessage onCancel={cancelReplyModel}
                        onSendMessage={replySendMessage}
                    /> : null}
                </div>
            </div>
        </>
    );
}

export default MessageBoard;