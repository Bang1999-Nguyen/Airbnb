import locationApi from "../../../../apis/airbnb";
import { FETCH_ADMIN_FAIL, FETCH_ADMIN_REQUEST, FETCH_ADMIN_SUCCESS } from "./types";



  
const actFetchLocationAdminRequest = () => ({
  type: FETCH_ADMIN_REQUEST,
});

const actFetchLocationAdminSuccess = location => ({
  type:FETCH_ADMIN_SUCCESS,
  payload: location,
});

const actFetchLocationAdminFail = error => ({
  type: FETCH_ADMIN_FAIL,
  payload: error,
});

export const actFetchLocationAdmin = () => {
  return (dispatch) => {
    dispatch(actFetchLocationAdminRequest());
   locationApi.getLocation()
      .then(res => {
        dispatch(actFetchLocationAdminSuccess(res.data));
      })
      .catch(err => {
        dispatch(actFetchLocationAdminFail(err));
      });
  };
};
