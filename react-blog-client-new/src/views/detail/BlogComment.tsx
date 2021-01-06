import { useEffect, useState, ChangeEvent } from "react";
// api
import { addComment, queryCommentByFatherId, queryRootComment } from "../../api/comment";
// redux
import { useSelector, shallowEqual } from "react-redux";
import { storeSchema } from "../../schema/storeSchema";
import { CommentSchema, CommentAddSchema } from "../../schema/commentSchema";
import { UserSchema } from "../../schema/userSchema";
// util
import { carefulParseDate } from "../../components/util";
// components
import ReplyComment from "./ReplyComment";
import { Avatar, Button, Comment, message } from "antd";
import "./scss/comment.scss";
interface Iprops {
    blogId: string;
}
function BlogComment(props: Iprops) {
    const [comments, setComments] = useState<CommentSchema[] | null>(null);
    const [show, setShow] = useState(false);
    const [reFetchData, setReFetchData] = useState(true);
    const [fatherComment, setFatherComment] = useState<string | null>(null);
    const [content, setContent] = useState("");
    const user = useSelector<storeSchema, UserSchema>(store => store.user, shallowEqual);

    useEffect(() => {
        queryRootComment(props.blogId).then((res: any) => {
            const renderPromise = res.data.map((item: any) => {
                return queryCommentByFatherId(item._id).then((itemChild: any) => {
                    item.child = itemChild;
                    return item;
                });
            });
            Promise.all(renderPromise).then((resultComment: any) => {
                setComments(resultComment);
            });
        });
    }, [props.blogId, reFetchData]);

    if (!comments) {
        return null;
    }
    // 处理函数
    function onSendComment(content: string) {
        if (!user) {
            message.warn("请先登录", .5);
            return;
        }
        const comment: CommentAddSchema = { content, user: user._id, blogId: props.blogId, fatherComment };
        addComment(comment).then((res: any) => {
            message.success("评论成功", .3);
            setShow(false);
            setReFetchData(!reFetchData);
        });
    }
    function showReplyModal() {
        setShow(true);
    }
    function closeReplyModal() {
        setShow(false);
    }
    function replyClick(comment: CommentSchema) {
        setFatherComment(comment._id);
        showReplyModal();
    }
    function areaChangeContent(e: ChangeEvent<HTMLTextAreaElement>) {
        setContent(e.target.value);
    }
    function sendCommentController() {
        if (!user) {
            message.warn("请先登录", .5);
            return;
        }
        const comment: CommentAddSchema = { content, user: user._id, blogId: props.blogId, fatherComment };
        addComment(comment).then((res: any) => {
            if (res.content) {
                setReFetchData(!reFetchData);
                setContent("");
                message.success("留言成功", .3);
            } else {
                message.error("留言失败", .3);
            }
        });
    }
    const renderExample = comments.map((comment) => {
        const itemChild = comment.child.map((childComment) => {
            return <Comment
                key={childComment._id}
                author={<span>{childComment.user ? childComment.user.name : "被删除的用户"}</span>}
                avatar={
                    <Avatar
                        src={(childComment.user && childComment.user.avatar_url) || require("./user.png").default}
                        alt="默认头像" />}
                datetime={carefulParseDate(childComment.publish_date)}
                content={<p>{childComment.content}</p>} />;
        });
        return <div key={comment._id}>
            <Comment
                actions={[<span onClick={() => replyClick(comment)} key="comment-nested-reply-to">回复</span>]}
                author={<span>{comment.user ? comment.user.name : "被删除的用户"}</span>}
                avatar={
                    <Avatar
                        src={(comment.user && comment.user.avatar_url) || require("./user.png").default}
                        alt="默认头像" />}
                datetime={carefulParseDate(comment.publish_date)}
                content={<p>{comment.content}</p>}>{itemChild}</Comment>

        </div>;
    });

    return (
        <div className="commentWrapper" >
            <div className="title">最新评论</div>
            {renderExample}
            <div className="sendComment">
                <textarea className="textarea" placeholder={"说说你的看法吧~~~"} value={content} onChange={areaChangeContent} name="" id="" cols={100} rows={5} />
                <div className="send-btn">
                    <Button onClick={sendCommentController} type={"primary"}>我也说说</Button>
                </div>
            </div>
            {show && <ReplyComment onSendComment={onSendComment} onCancel={closeReplyModal} />}
        </div>
    );
}

export default BlogComment;