import {  FETCH_INFORMATION_FAIL, FETCH_INFORMATION_REQUEST, FETCH_INFORMATION_SUCCESS, GET_CURRENT_DATE, GET_CURRENT_LOCATION, GET_GUEST, GET_IMAGE } from "./types";

const initialState = {
   Information:[],
    loading:false,
    error:'',
  
  }
  const ProfileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case FETCH_INFORMATION_REQUEST:
        return { ...state, loading: true };
  
      case FETCH_INFORMATION_SUCCESS:
        return { ...state,  Information: payload, loading: false };
  
      case FETCH_INFORMATION_FAIL:
        return { ...state, error: payload, loading: false };
     
      default:
        return state;
    }
  }
  export default ProfileReducer;