import axios from "axios";
import { baseUrl } from "./baseUrl";
import { BlogAddSchema, BlogSchema } from "../schema/blogSchema";
const sentencesInstance = axios.create({
    baseURL: `${baseUrl}/blog`
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

export function addBlog(blog: BlogAddSchema) {


    const { content, title, tags, cover_picture, intro } = blog;
    return sentencesInstance.post("/", {
        content,
        title,
        tags,
        cover_picture,
        intro
    }
    );
}

export function queryBlog() {
    return sentencesInstance.get<BlogSchema[]>("/");
}

export function queryBlogByPage(page: number, limit: number) {
    return sentencesInstance.get<BlogSchema[]>("/order/queryBlogByPage", {
        params: {
            page,
            limit
        }
    });
}

export function queryBlogByKey(title: string, tags: string) {
    return sentencesInstance.get<BlogSchema[]>("/order/queryBlogByKey", {
        params: {
            title,
            tags
        }
    });
}

export function queryBlogById(id: string) {
    return sentencesInstance.get<BlogSchema>("/" + id);
}

export function deleteBlog(id: string) {
    return sentencesInstance.delete("/" + id);
}

export function updateBlog(id: string, newInfo: BlogAddSchema) {
    return sentencesInstance.put("/" + id, {
        ...newInfo
    });
}

export function queryBlogByViews() {
    return sentencesInstance.get("/order/queryBlogByViews");
}
