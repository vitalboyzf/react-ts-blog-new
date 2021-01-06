import { BlogSchema } from "./blogSchema";
import { CommentSchema } from "./commentSchema";
import { MessageSchema } from "./messageSchema";
import { UserSchema } from "./userSchema";
import { SentenceSchema } from "./sentenceSchema";
export type storeSchema = {
    blogs: BlogSchema[]
    comments: CommentSchema[]
    messages: MessageSchema[]
    user: UserSchema
    sentences: SentenceSchema[]
}