import locationApi from "../../../apis/airbnb";
import { FETCH_COMMENT_FAIL, FETCH_COMMENT_REQUEST, FETCH_COMMENT_SUCCESS, FETCH_ROOM_FAIL, FETCH_ROOM_REQUEST, FETCH_ROOM_SUCCESS } from "./types";

const actFetchRoomRequest = () => ({
    type: FETCH_ROOM_REQUEST
  });
  
  const actFetchRoomSuccess = location => ({
    type:FETCH_ROOM_SUCCESS,
    payload: location,
  });
  
  const actFetchRoomFail = error => ({
    type: FETCH_ROOM_FAIL,
    payload: error,
  });
  const actFetchCommentRequest = () => ({
    type: FETCH_COMMENT_REQUEST
  });
  
  const actFetchCommentSuccess = location => ({
    type:FETCH_COMMENT_SUCCESS,
    payload: location,
  });
  
  const actFetchCommentFail = error => ({
    type: FETCH_COMMENT_FAIL,
    payload: error,
  });
  export const actFetchRoom = (id) => {
    return (dispatch) => {
      dispatch(actFetchRoomRequest());
     locationApi.getRoom(id)
        .then(res => {
          dispatch(actFetchRoomSuccess(res.data));
        
        })
        .catch(err => {
          dispatch(actFetchRoomFail(err));
        });
    };
  };
  export const actFetchComment = (id) => {
    return (dispatch) => {
      dispatch(actFetchCommentRequest());
    locationApi.getComment(id)
        .then(res => {
          dispatch(actFetchCommentSuccess(res.data));
          console.log(res.data);
        
        })
        .catch(err => {
          dispatch(actFetchCommentFail(err));
        });
    };
  };