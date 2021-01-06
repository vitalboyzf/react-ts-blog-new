import axios from "axios";
import { baseUrl } from "./baseUrl";
const sentencesInstance = axios.create({
    baseURL: `${baseUrl}/book`
});
sentencesInstance.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data;
    } else {
        return "error";
    }
});
export function queryBooks() {
    return sentencesInstance.get("/");
}

