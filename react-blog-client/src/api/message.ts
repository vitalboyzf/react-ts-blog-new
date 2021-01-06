import axios from "axios";
import { baseUrl } from "./baseUrl";
import { MessageSchema, MessageAddSchema } from "../schema/messageSchema";
const sentencesInstance = axios.create({
    baseURL: `${baseUrl}/message`
});
sentencesInstance.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data;
    } else {
        return "error";
    }
});

export function addMessage(message: MessageAddSchema) {
    const { content, user, fatherMessage = null } = message;
    return sentencesInstance.post("/", {
        content,
        user,
        fatherMessage
    });
}

export function queryRootMessage() {
    return sentencesInstance.get<MessageSchema[]>("/");
}
export async function queryRootMessageByPage(page: string, limit: string) {
    const result = sentencesInstance.get<MessageSchema[]>("/queryRootMessageByPage", {
        params: {
            page,
            limit
        }
    });
    return result;
}

export function queryMessageByFatherId(fatherId: string) {
    return sentencesInstance.get<MessageSchema[]>("/queryByFather", {
        params: {
            fatherId
        }
    });
}

export function deleteMessageById(id: string) {
    return sentencesInstance.delete("/" + id);
}


