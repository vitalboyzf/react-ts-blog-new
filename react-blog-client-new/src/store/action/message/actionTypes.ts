import {MessageSchema} from "../../../schema/messageSchema";
export type MESSAGES_ACTION = {
    type: string;
    messages: MessageSchema[];
    id: string;
}
