import { BlogSchema } from "../../schema/blogSchema";
import { QUERY_BLOG } from "../action/blog/constantsTypes";
import { QUERY_BLOG_ACTION } from "../action/blog/actionTypes";
const defaultState: BlogSchema[] = [];
export default function blogReducer(state: BlogSchema[] = defaultState, action: QUERY_BLOG_ACTION): BlogSchema[] {
    switch (action.type) {
        case QUERY_BLOG:
            return action.blogs;
        default:
            return state;
    }
}