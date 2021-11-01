import locationApi from "../../../apis/airbnb";
import { FETCH_DETAIL_FAIL, FETCH_DETAIL_REQUEST, FETCH_DETAIL_SUCCESS, GET_CURRENT_DATE, GET_CURRENT_LOCATION, GET_GUEST} from "./types";

const actFetchDetailRequest = () => ({
    type: FETCH_DETAIL_REQUEST,
  });
  
  const actFetchDetailSuccess = location => ({
    type:FETCH_DETAIL_SUCCESS,
    payload: location,
  });
  
  const actFetchDetailFail = error => ({
    type: FETCH_DETAIL_FAIL,
    payload: error,
  });
  export const actFetchDetail = (id) => {
    return (dispatch) => {
      dispatch(actFetchDetailRequest());
      locationApi.getDetailOfLocation(id)
        .then(res => {
          dispatch(actFetchDetailSuccess(res.data));
          console.log(res.data);
        })
        .catch(err => {
          dispatch(actFetchDetailFail(err));
        });
    };
  };
  export const getGuest = (guest) =>({
    type:GET_GUEST,
    payload:guest
  })
  export const getCurrentLocation = (location) =>({
    type:GET_CURRENT_LOCATION,
    payload:location
  })
  export const getCurrentDate = (startDate, endDate) =>({
    type:GET_CURRENT_DATE,
    payload:{
      startDate, 
      endDate
    }
  })
 