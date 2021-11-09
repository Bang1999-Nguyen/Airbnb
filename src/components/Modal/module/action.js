import { LOGIN_SUCCESS } from "./types";

export const actLogin = (payload) => ({
    type:LOGIN_SUCCESS,
    payload: payload,
  });