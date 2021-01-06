import { SentenceSchema } from "../../schema/sentenceSchema";
import { GET_SENTENCES } from "../action/sentence/constantsTypes";
import { GET_SENTENCES_ACTION } from "../action/sentence/actionTypes";
const defaultState: SentenceSchema[] = [];
export default function sentenceReducer(state: SentenceSchema[] = defaultState, action: GET_SENTENCES_ACTION): SentenceSchema[] {
    switch (action.type) {
        case GET_SENTENCES:
            return action.sentences;
        default:
            return state;
    }
}