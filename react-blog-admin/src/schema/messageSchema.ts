import { UserSchema } from "./userSchema";
export interface MessageSchema {
    _id: string;
    content: string;
    fatherMessage: MessageSchema | null;
    user: UserSchema | null;
    publish_date: string;
    child: MessageSchema[];
}
export interface MessageAddSchema {
    content: string;
    fatherMessage?: string;
    user: string;
    publish_date?: string;
}