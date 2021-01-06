import * as types from "./constantsTypes";
import {CommentSchema} from "../../../schema/commentSchema";
export function getComments(comments: CommentSchema[] | null) {
    return {
        type: types.GET_COMMENTS_TYPE,
        comments
    };
}
export function delComment(id: number) {
    return {
        type: types.DEL_COMMENT_TYPE,
        id
    };
}