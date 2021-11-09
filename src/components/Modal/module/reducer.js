import { TOKEN, USER_LOGIN } from "../../../settings/apiConfig";
import { LOGIN_SUCCESS } from "./types";

let user = {}
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}
let tokenApi = {}
if (localStorage.getItem(TOKEN)) {
    tokenApi = JSON.parse(localStorage.getItem(TOKEN))
}

const initialState = {
    currentUser: user,
    token:tokenApi,
};
const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
       case LOGIN_SUCCESS:{
        localStorage.setItem(USER_LOGIN, JSON.stringify(payload.data.user))
        localStorage.setItem(TOKEN, JSON.stringify(payload.data.token))
        return { ...state, currentUser:payload.data.user, token: payload.data.token};
       }
        default:
            return state;
    }
}
export default authReducer;