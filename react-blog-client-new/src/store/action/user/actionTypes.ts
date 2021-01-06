import {UserSchema} from "../../../schema/userSchema";
export type GET_USER_ACTION = {
    type: string;
    user: UserSchema;
}