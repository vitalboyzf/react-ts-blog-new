export interface BlogSchema {
    _id: string;
    views: number;
    content: string;
    title: string;
    tags: string;
    intro: string;
    cover_picture?: string;
    publish_date?: string;
}
export interface BlogAddSchema {
    views?: number;
    content?: string;
    title?: string;
    tags?: string;
    intro?: string;
    cover_picture?: string;
    publish_date?: string;
}