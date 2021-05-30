import { queryBlog } from "../../api/blog";
import { getSentences } from "../../api/shortSentences";
import { queryAllComment } from "../../api/comment";
import {
    queryRootMessage,
    queryMessageByFatherId
} from "../../api/message";
import { whoami } from "../../api/user";

import { takeEvery, put, call, fork } from "redux-saga/effects";
import * as blogActionCreator from "../action/blog/blogActionCreator";
import * as userActionCreator from "../action/user/userActionCreator";
import * as sentenceActionCreator from "../action/sentence/sentenceActionCreator";
import * as commentActionCreator from "../action/comment/commentActionCreator";
import * as messageActionCreator from "../action/message/messageActionCreator";

// schema
import { MessageSchema } from "../../schema/messageSchema";
import {
    effectDelUser,
    effectFetchComment,
    effectFetchSentence,
    effectFetchMessage,
    effectFetchBlogs,
    effectFetchUser
} from "./fetchTypes";
function* queryAllBlog() {
    const result = yield call(queryBlog);
    if (result.status === 200) {
        yield put(blogActionCreator.queryBlog(result.data));
    }
}
function* delUser() {
    localStorage.removeItem("token");
    document.cookie = "token=; max-age=-1";
    yield put(userActionCreator.delUser());
}
function* getUser() {
    try {
        const res = yield whoami();
        yield put(userActionCreator.getUser(res.data));
    } catch (error) {
        yield put(userActionCreator.getUser(null));
    }
}
function* querySentence() {
    const result = yield call(getSentences);
    console.log(result);

    if (result.status === 200) {
        yield put(sentenceActionCreator.getSentences(result.data));
    }
}
function* queryComment() {
    const { data } = yield call(queryAllComment);
    yield put(commentActionCreator.getComments(data));
}
function* queryMessage() {
    const { data } = yield call(queryRootMessage);

    let messages: MessageSchema[] = data;
    const newArrPromise = messages.map(async rootMessage => {
        return queryMessageByFatherId(rootMessage._id).then((res: any) => {
            rootMessage.child = res;
            return rootMessage;
        });
    });
    const res = yield Promise.all(newArrPromise);
    yield put(messageActionCreator.getMessages(res));
}
function* initFetch() {
    yield call(getUser);
    yield call(queryAllBlog);
}
export default function* sagaHandler() {
    yield fork(initFetch);
    yield takeEvery(effectFetchUser().type, getUser);
    yield takeEvery(effectFetchBlogs().type, queryAllBlog);
    yield takeEvery(effectFetchSentence().type, querySentence);
    yield takeEvery(effectFetchComment().type, queryComment);
    yield takeEvery(effectFetchMessage().type, queryMessage);
    yield takeEvery(effectDelUser().type, delUser);
}