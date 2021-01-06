import axios from "axios";
import { baseUrl } from "./baseUrl";
import { UserSchema, UserAddSchema } from "../schema/userSchema";
const sentencesInstance = axios.create({
    baseURL: `${baseUrl}/user`
});
sentencesInstance.interceptors.request.use(config => {
    if (config.method === "get" && config.url === "/whoami" && window.localStorage.getItem("token") !== null) {
        config.headers["authorization"] = window.localStorage.getItem("token");
    }
    return config;
});
sentencesInstance.interceptors.response.use(res => {
    if (res.config.method === "post" && res.config.url === "/login") {
        if (res.headers["authorization"]) {
            window.localStorage.setItem("token", res.headers["authorization"]);
        }
    }
    return res.data;
}, (err) => {
    window.localStorage.removeItem("token");
    return null;
});
export function whoami() {
    return sentencesInstance.get<UserSchema>("/whoami");
}
export function queryAllUser() {
    return sentencesInstance.get<UserSchema[]>("/");
}
export function queryUserById(id: string) {
    return sentencesInstance.get<UserSchema>("/" + id);
}
export function login(name: string, password: string) {
    return sentencesInstance.post("/login", {
        name,
        password
    });
}

export function register(user: UserAddSchema) {
    const { name, password, gender, avatar_url } = user;
    return sentencesInstance.post("/", {
        name,
        password,
        gender,
        avatar_url
    });
}

export function deleteUser(id: string) {
    return sentencesInstance.delete("/" + id);
}

export function updateUser(id: string, user: UserAddSchema) {
    const { name, password, avatar_url, gender } = user;
    return sentencesInstance.patch("/" + id, {
        name,
        avatar_url,
        gender,
        password
    });
}


