export interface SentenceSchema {
    _id?: string;
    content: string;
    img_url: string;
    publish_date?: string;
}
export interface SentenceAddSchema {
    content: string;
    img_url: string;
}