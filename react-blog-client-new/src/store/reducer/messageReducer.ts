import { MessageSchema } from "../../schema/messageSchema";
import { GET_MESSAGES_TYPE, DEL_MESSAGE_TYPE } from "../action/message/constantsTypes";
import { MESSAGES_ACTION } from "../action/message/actionTypes";
const defaultState: MessageSchema[] = [];
export default function messageReducer(state: MessageSchema[] = defaultState, action: MESSAGES_ACTION): MessageSchema[] {
    switch (action.type) {
        case GET_MESSAGES_TYPE:
            return action.messages;
        case DEL_MESSAGE_TYPE:
            return state.filter(message => message._id !== action.id);
        default:
            return state;
    }
}