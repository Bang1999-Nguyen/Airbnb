import { FETCH_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./types";



const initialState = {
  listUser:[],
    loading:false,
    error:''
  
}
const UserAdminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };

    case FETCH_USER_SUCCESS:
      return { ...state,  listUser: payload, loading: false };

    case FETCH_USER_FAIL:
      return { ...state, error: payload, loading: false };
    case 'CUSTOM_USER':{
      return { ...state,  listUser: payload };
    }
    default:
      return state;
  }
}
export default UserAdminReducer;