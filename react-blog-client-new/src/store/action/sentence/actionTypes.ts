import {SentenceSchema} from "../../../schema/sentenceSchema";
export type GET_SENTENCES_ACTION = {
    type: string;
    sentences: SentenceSchema[];
}