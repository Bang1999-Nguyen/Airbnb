import { GO_BACK, IS_BACK, IS_LOGOUT } from "../../../containers/Home/Carousel/module/types";
import {  TOKEN_AIRBNB, USER_LOGIN_AIRBNB } from "../../../settings/apiConfig";
import { CHANGE_SUCCESS, LOGIN_SUCCESS } from "./types";

let user = {}
if (localStorage.getItem(USER_LOGIN_AIRBNB)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN_AIRBNB))
}
let tokenApi = {}
if (localStorage.getItem(TOKEN_AIRBNB)) {
    tokenApi = JSON.parse(localStorage.getItem(TOKEN_AIRBNB))
}

const initialState = {
    currentUser: user,
    token:tokenApi,
    on:false
};
const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
       case LOGIN_SUCCESS:{
        localStorage.setItem(USER_LOGIN_AIRBNB, JSON.stringify(payload.data.user))
        localStorage.setItem(TOKEN_AIRBNB, JSON.stringify(payload.data.token))
        return { ...state, currentUser:payload.data.user, token: payload.data.token};
       }
       case IS_LOGOUT:{
        localStorage.removeItem(USER_LOGIN_AIRBNB)
        localStorage.removeItem(TOKEN_AIRBNB)
        return { ...state};
       }
       case CHANGE_SUCCESS:{
        localStorage.setItem(USER_LOGIN_AIRBNB, JSON.stringify(payload.data))
        return { ...state, currentUser:payload.data};
       }
       case IS_BACK:{
        return { ...state, on: true};
       }
       case GO_BACK:{
        return { ...state, on: false};
       }
        default:
            return state;
    }
}
export default authReducer;