import axios from "axios";
import { baseUrl } from "./baseUrl";
import { CommentSchema, CommentAddSchema } from "../schema/commentSchema";
const sentencesInstance = axios.create({
    baseURL: `${baseUrl}/comment`
});
sentencesInstance.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data;
    } else {
        return "error";
    }
});

export function addComment(comment: CommentAddSchema) {
    const { content, user, blogId, fatherComment } = comment;

    console.log(typeof comment.fatherComment);

    return sentencesInstance.post("/", {
        content,
        user,
        fatherComment,
        blogId
    });
}

export function queryRootComment(blogId: string) {
    return sentencesInstance.get<CommentSchema[]>("/queryRootComment", {
        params: {
            blogId
        }
    });
}
export function queryAllComment() {
    return sentencesInstance.get<CommentSchema[]>("/");
}

export function queryCommentByFatherId(fatherId: string) {
    return sentencesInstance.get<CommentSchema[]>("/queryByFather", {
        params: {
            fatherId
        }
    });
}
export function deleteCommentById(id: string) {
    return sentencesInstance.delete("/" + id);
}

