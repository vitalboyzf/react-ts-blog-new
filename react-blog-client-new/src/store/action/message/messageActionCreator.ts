import * as types from "./constantsTypes";
import { MessageSchema } from "../../../schema/messageSchema";
export function getMessages(messages: MessageSchema[] | null) {
    return {
        type: types.GET_MESSAGES_TYPE,
        messages
    };
}
export function delMessage(id: number) {
    return {
        type: types.DEL_MESSAGE_TYPE,
        id
    };
}