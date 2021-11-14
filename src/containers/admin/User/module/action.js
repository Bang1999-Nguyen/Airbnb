import locationApi from "../../../../apis/airbnb";
import { FETCH_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./types";

  
const actFetchUserAdminRequest = () => ({
    type: FETCH_USER_REQUEST,
  });
  
  const actFetchUserAdminSuccess = location => ({
    type:FETCH_USER_SUCCESS,
    payload: location,
  });
  
  const actFetchUserAdminFail = error => ({
    type: FETCH_USER_FAIL,
    payload: error,
  });
  
  export const actFetchUserAdmin = () => {
    return (dispatch) => {
      dispatch(actFetchUserAdminRequest());
    locationApi.getUserAdmin()
        .then(res => {
          dispatch(actFetchUserAdminSuccess(res.data));
        })
        .catch(err => {
          dispatch(actFetchUserAdminFail(err));
        });
    };
  };
  