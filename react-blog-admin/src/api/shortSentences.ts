import axios from "axios";
import { baseUrl } from "./baseUrl";
import { SentenceSchema, SentenceAddSchema } from "../schema/sentenceSchema";
const sentencesInstance = axios.create({
    baseURL: `${baseUrl}/sentences`
});
sentencesInstance.interceptors.request.use(config => {
    const needCheckLogin = ["post", "delete", "put", "patch"];
    if (config.method && needCheckLogin.includes(config.method) && window.localStorage.getItem("token") !== null) {
        config.headers["authorization"] = window.localStorage.getItem("token");
    }
    return config;
});
sentencesInstance.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data;
    } else {
        return "error";
    }
});
export function addShortSentences(sentence: SentenceAddSchema) {
    const { img_url, content } = sentence;
    return sentencesInstance.post("/", {
        img_url: img_url,
        content
    });
}
export function getSentences() {
    return sentencesInstance.get<SentenceSchema[]>("/");
}
export function updateSentences(id: string, sentences: SentenceAddSchema) {
    return sentencesInstance.put<SentenceSchema[]>("/" + id, {
        ...sentences
    });
}
export function deleteSentences(id: string) {
    return sentencesInstance.delete("/" + id);
}

