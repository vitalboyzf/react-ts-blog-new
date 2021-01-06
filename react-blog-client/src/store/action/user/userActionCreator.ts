import * as types from "./constantsTypes";
import { UserSchema } from "../../../schema/userSchema";
export function getUser(user: UserSchema | null) {
    return {
        type: types.GET_USER,
        user
    };
}
export function delUser() {
    return {
        type: types.DEL_USER
    };
}