import locationApi from "../../../apis/airbnb";
import { FETCH_INFORMATION_FAIL, FETCH_INFORMATION_REQUEST, FETCH_INFORMATION_SUCCESS } from "./types";


const actFetchInformationRequest = () => ({
    type: FETCH_INFORMATION_REQUEST,
  });
  
  const actFetchInformationSuccess = location => ({
    type:FETCH_INFORMATION_SUCCESS,
    payload: location,
  });
  
  const actFetchInformationlFail = error => ({
    type: FETCH_INFORMATION_FAIL,
    payload: error,
  });
  export const actFetchInformation = (id) => {
    return (dispatch) => {
      dispatch(actFetchInformationRequest());
     locationApi.getInformation(id)
        .then(res => {
          dispatch(actFetchInformationSuccess(res.data));
          
        })
        .catch(err => {
          dispatch(actFetchInformationlFail(err));
        });
    };
  };