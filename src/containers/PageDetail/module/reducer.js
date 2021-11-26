import { FETCH_DETAIL_FAIL, FETCH_DETAIL_REQUEST, FETCH_DETAIL_SUCCESS, FETCH_MORE_DETAIL, GET_CURRENT_DATE, GET_CURRENT_LOCATION, GET_GUEST, GET_IMAGE } from "./types";

const initialState = {
    DetailOfLocation:[],
    loading:false,
    error:'',
    guest:'',
    locationCurrent:'',
    startOfDate:'',
    endOfDate:'',
    moreDetail:''
  }
  const DetailReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case FETCH_DETAIL_REQUEST:
        return { ...state, loading: true };
  
      case FETCH_DETAIL_SUCCESS:
        return { ...state, DetailOfLocation: payload, loading: false };
  
      case FETCH_DETAIL_FAIL:
        return { ...state, error: payload, loading: false };
     case GET_GUEST:{
      return { ...state, guest: payload };
     }
     case GET_CURRENT_LOCATION:{
      return { ...state, locationCurrent: payload };
     }
     case GET_CURRENT_DATE:{
      return { ...state, startOfDate: payload.startDate, endOfDate: payload.endDate};
     }
     case FETCH_MORE_DETAIL:{
      return { ...state,  moreDetail: payload };
     }
     case 'CUSTOM_ARRAY':{
      return { ...state, DetailOfLocation: payload };
     }
      default:
        return state;
    }
  }
  export default DetailReducer;