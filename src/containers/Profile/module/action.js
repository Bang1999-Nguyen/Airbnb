import locationApi from "../../../apis/airbnb";
import { FETCH_INFORMATION_FAIL, FETCH_INFORMATION_REQUEST, FETCH_INFORMATION_SUCCESS, FETCH_TICKETS_FAIL, FETCH_TICKETS_REQUEST, FETCH_TICKETS_SUCCESS } from "./types";


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
  const actFetchTicketRequest = () => ({
    type:FETCH_TICKETS_REQUEST,
  });
  
  const actFetchTicketSuccess = location => ({
    type:FETCH_TICKETS_SUCCESS,
    payload: location,
  });
  
  const actFetchTicketFail = error => ({
    type:FETCH_TICKETS_FAIL,
    payload: error,
  });
  export const actFetchTickets = (id) => {
    return (dispatch) => {
      dispatch(actFetchTicketRequest());
     locationApi.getTicketsOfYou(id)
        .then(res => {
          dispatch(actFetchTicketSuccess(res.data));
          
        })
        .catch(err => {
          dispatch(actFetchTicketFail(err));
        });
    };
  };