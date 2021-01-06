import {UserSchema} from "../../schema/userSchema";
import { GET_USER, DEL_USER } from "../action/user/constantsTypes";
import { GET_USER_ACTION } from "../action/user/actionTypes";
const defaultState: UserSchema | null = null;
export default function userReducer(state: UserSchema | null = defaultState, action: GET_USER_ACTION): UserSchema | null {
    switch (action.type) {
        case GET_USER:
            return action.user;
        case DEL_USER:
            return null;
        default:
            return state;
    }
}