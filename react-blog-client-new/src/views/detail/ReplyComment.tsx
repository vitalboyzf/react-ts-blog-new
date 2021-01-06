import { useState, ChangeEvent } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./scss/reply.scss";
interface Iprops {
    onCancel(): void;
    onSendComment(content: string): void;
}
function ReviewComment(props: Iprops) {
    const [content, setContent] = useState("");
    function closeModal() {
        props.onCancel();
    }
    function changeTextArea(e: ChangeEvent<HTMLTextAreaElement>) {
        setContent(e.target.value);
    }
    function sendClick() {
        props.onSendComment(content);
    }
    return (
        <div className="replyWrapper">
            <CloseOutlined className={"icon"} onClick={closeModal} />
            <textarea
                className={"textarea"}
                value={content} onChange={changeTextArea} cols={50} rows={5} />
            <Button onClick={sendClick}>发表看法</Button>
        </div>
    );
}

export default ReviewComment;