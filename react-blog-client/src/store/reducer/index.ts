import { combineReducers } from "redux";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";
import messageReducer from "./messageReducer";
import sentenceReducer from "./sentenceReducer";
export default combineReducers({
    blogs: blogReducer,
    user: userReducer,
    sentences: sentenceReducer,
    comments: commentReducer,
    messages: messageReducer
});