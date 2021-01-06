import { BlogSchema } from "./blogSchema";
import { UserSchema } from "./userSchema";
export interface CommentSchema {
    _id: string;
    content: string;
    blogId: BlogSchema;
    fatherComment: CommentSchema | null;
    user: UserSchema;
    publish_date?: string;
    child: CommentSchema[];
}
export interface CommentAddSchema {
    content: string;
    blogId: string | null;
    fatherComment: string | null;
    user: string;
    publish_date?: string;
}