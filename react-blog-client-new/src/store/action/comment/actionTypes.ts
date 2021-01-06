import {CommentSchema} from "../../../schema/commentSchema";
export type COMMENTS_ACTION = {
    type: string;
    comments: CommentSchema[];
    id: string;
}
