import * as types from "./constantsTypes";
import {BlogSchema} from "../../../schema/blogSchema";
export function queryBlog(blogs: BlogSchema[]) {
    return {
        type: types.QUERY_BLOG,
        blogs
    };
}
export function addBlog(newBlog: BlogSchema) {
    return {
        type: types.ADD_BLOG,
        newBlog
    };
}
export function deleteBlog(id: number) {
    return {
        type: types.DELETE_BLOG,
        id
    };
}