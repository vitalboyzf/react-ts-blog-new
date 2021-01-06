import { BlogSchema } from "../../../schema/blogSchema";
export type QUERY_BLOG_ACTION = {
    type: string;
    blogs: BlogSchema[];
}