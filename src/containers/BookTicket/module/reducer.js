import { FETCH_COMMENT_FAIL, FETCH_COMMENT_REQUEST, FETCH_COMMENT_SUCCESS, FETCH_ROOM_FAIL, FETCH_ROOM_REQUEST, FETCH_ROOM_SUCCESS } from "./types";

const initialState = {
  DetailOfRoom: [],
  loading: false,
  error: '',
  comment: [],
}
const RoomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ROOM_REQUEST:
      return { ...state, loading: true };

    case FETCH_ROOM_SUCCESS:
      return { ...state, DetailOfRoom: payload, loading: false };

    case FETCH_ROOM_FAIL:
      return { ...state, error: payload, loading: false };
    case FETCH_COMMENT_REQUEST:
      return { ...state, loading: true };

    case FETCH_COMMENT_SUCCESS:
      return { ...state, comment: payload, loading: false };

    case FETCH_COMMENT_FAIL:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
export default RoomReducer;