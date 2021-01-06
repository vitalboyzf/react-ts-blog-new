export interface UserSchema {
    _id: string;
    name: string;
    password: string;

    identity?: string;
    gender?: string;
    avatar_url?: string;
}
export interface UserAddSchema {
    name: string;
    password: string;
    identity?: string;
    gender?: string;
    avatar_url?: string;
}