import { ChangeEvent, useState } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./scss/reply.scss";

interface Iprops {
    onCancel(): void;
    onSendMessage(content: string): void;
}

function ReviewMessage(props: Iprops) {
    const [content, setContent] = useState("");
    // 处理函数
    function closeReplyModel() {
        props.onCancel();
    }
    function changeContent(e: ChangeEvent<HTMLTextAreaElement>) {
        setContent(e.target.value);
    }
    function setMessage() {
        props.onSendMessage(content);
    }
    return (
        <div className="replyWrapper">
            <CloseOutlined spin className="out-line"
                onClick={closeReplyModel}
            />
            <textarea className="textarea" value={content} onChange={changeContent} cols={50} rows={5} />
            <Button className="send-btn" onClick={setMessage}>回复评论</Button>
        </div>
    );
}
export default ReviewMessage;