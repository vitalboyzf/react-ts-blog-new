import * as types from "./constantsTypes";
import {SentenceSchema} from "../../../schema/sentenceSchema";
export function getSentences(sentences: SentenceSchema[] | null) {
    return {
        type: types.GET_SENTENCES,
        sentences
    };
}
export function delSentence(id: number) {
    return {
        type: types.DEL_SENTENCES,
        id
    };
}