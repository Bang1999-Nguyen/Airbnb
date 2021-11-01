import locationApi from "../../../../apis/airbnb";
import {ADD__ADULT, ADD__TRANSITION, CHECK__CALENDAR, CLEAR__RESULT, CLICK__ACTION, FETCH_LOCATION_FAIL, FETCH_LOCATION_REQUEST, FETCH_LOCATION_SUCCESS, FIND__LOCATION, HIDE__OVERLAY, IS__PLACE, SELECT__ACTION, VALUE__SELECTION } from "./types";


  
const actFetchLocationRequest = () => ({
  type: FETCH_LOCATION_REQUEST,
});

const actFetchLocationSuccess = location => ({
  type:FETCH_LOCATION_SUCCESS,
  payload: location,
});

const actFetchLocationFail = error => ({
  type: FETCH_LOCATION_FAIL,
  payload: error,
});
export const clearResult = () =>({
  type:CLEAR__RESULT,
  payload:null
})
export const isPlaceCurrent = (place) =>({
  type:IS__PLACE,
  payload:place
})
export const isCalendar = (time, end) =>({
  type:CHECK__CALENDAR,
  payload:{
    time,
    end
  }
})
export const actFetchLocation = () => {
  return (dispatch) => {
    dispatch(actFetchLocationRequest());
    locationApi.getLocation()
      .then(res => {
        dispatch(actFetchLocationSuccess(res.data));
      })
      .catch(err => {
        dispatch(actFetchLocationFail(err));
      });
  };
};
export const selectAction  = () =>({
  type: CLICK__ACTION,
  payload: null
})
export const findLocation = (list) =>({
  type: FIND__LOCATION,
  payload: list
})
export const hideOverlay = () =>({
  type: HIDE__OVERLAY,
  payload: null
})
export const valueSelection = (item) =>({
  type: VALUE__SELECTION,
  payload: item
})
export const plusAdult = (item, option) =>({
  type:ADD__ADULT,
  payload : {
    item, option
  }
})
export const transition = () =>({
  type: ADD__TRANSITION,
  payload: null
})

