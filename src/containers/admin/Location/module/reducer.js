import { FETCH_ADMIN_FAIL, FETCH_ADMIN_REQUEST, FETCH_ADMIN_SUCCESS } from "./types";


const initialState = {
  listLocation:[],
    loading:false,
    error:''
  
}
const CarouselAdminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    
    case FETCH_ADMIN_REQUEST:
      return { ...state, loading: true };

    case FETCH_ADMIN_SUCCESS:
      return { ...state,  listLocation: payload, loading: false };

    case FETCH_ADMIN_FAIL:
      return { ...state, error: payload, loading: false };
    
    default:
      return state;
  }
}
export default CarouselAdminReducer;