import { CommentSchema } from "../../schema/commentSchema";
import { GET_COMMENTS_TYPE, DEL_COMMENT_TYPE } from "../action/comment/constantsTypes";
import { COMMENTS_ACTION } from "../action/comment/actionTypes";
const defaultState: CommentSchema[] = [];
export default function commentReducer(state: CommentSchema[] = defaultState, action: COMMENTS_ACTION): CommentSchema[] {
    switch (action.type) {
        case GET_COMMENTS_TYPE:
            return action.comments;
        case DEL_COMMENT_TYPE:
            return state.filter(comment => comment._id !== action.id);
        default:
            return state;
    }
}