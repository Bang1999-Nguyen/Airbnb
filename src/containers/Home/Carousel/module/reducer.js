import { ADD__ADULT, ADD__TRANSITION, CHECK__CALENDAR, CLEAR__RESULT, CLICK__ACTION, FETCH_LOCATION_FAIL, FETCH_LOCATION_REQUEST, FETCH_LOCATION_SUCCESS, FIND__LOCATION, HIDE__OVERLAY, IS_LOGOUT, IS__PLACE, SELECT__ACTION, SELECT__LOCATION, VALUE__SELECTION } from "./types";

const initialState = {
  toStay: true,
  experience: false,
  isDisplay: false,
  location: [],
  loading: false,
  error: '',
  locationDefault: [],
  locationSelected: '',
  quantityPeople: [
    {
      type: 'Adults', description: 'Ages 13 and above', quantity: 0
    },
    {
      type: 'Children', description: 'Ages 2-12', quantity: 0
    },
    {
      type: 'Infants', description: 'Under 2', quantity: 0
    }

  ],
  totalPeople: '',
  infants: '',
  transition: false,
  btnSelection: [
    { type: 'toStay', select: true, name: "Places to stay" },
    { type: 'experiences', select: false, name: "Experiences" }
  ],
  currentPlace: '',
  StartDate: '',
  EndDate: '',
  currentTotalPeople: '',
  totalPeopleDefault: ''
}
const CarouselReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLICK__ACTION: {
      return { ...state, isDisplay: true }
    }
    case HIDE__OVERLAY: {
      return { ...state, isDisplay: false }
    }
    case FETCH_LOCATION_REQUEST:
      return { ...state, loading: true };

    case FETCH_LOCATION_SUCCESS:
      return { ...state, location: payload, loading: false, locationDefault: payload };

    case FETCH_LOCATION_FAIL:
      return { ...state, error: payload, loading: false };
    case FIND__LOCATION: {
      return { ...state, location: payload };
    }
    case SELECT__LOCATION: {
      return { ...state }
    }
    case VALUE__SELECTION: {
      return { ...state, locationSelected: payload };
    }
    case ADD__ADULT: {
      if (payload.option === true) {
        let index = state.quantityPeople.findIndex(item => item.type === payload.item.type)
        if (index !== -1) {
          if (state.quantityPeople[index].type !== 'Adults' && state.quantityPeople[0].quantity === 0) {
            state.quantityPeople[index].quantity += 1;
            state.quantityPeople[0].quantity += 1;
          } else {
            state.quantityPeople[index].quantity += 1;
          }
        }
      } else {
        let index = state.quantityPeople.findIndex(item => item.type === payload.item.type)
        if (index !== -1) {
          state.quantityPeople[index].quantity -= 1;
        }
      }
      let totalGuest = (Number(state.quantityPeople[0].quantity) + Number(state.quantityPeople[1].quantity))
      state.infants = Number(state.quantityPeople[2].quantity)
      state.totalPeople = totalGuest
      state.currentTotalPeople = state.totalPeople
      state.totalPeopleDefault =  (Number(state.quantityPeople[0].quantity) + Number(state.quantityPeople[1].quantity))
      return { ...state }
    }
    case ADD__TRANSITION: {
      return { ...state, transition: true };
    }
    case 'CHANGE__NAVBAR': {
      return { ...state, btnSelection: payload };
    }
    case CLEAR__RESULT: {
      state.currentTotalPeople = state.totalPeople;
      state.totalPeopleDefault = state.totalPeople;
      state.quantityPeople[0].quantity = 0;
      state.quantityPeople[1].quantity = 0;
      state.quantityPeople[2].quantity = 0;
      state.StartDate = '';
      state.EndDate = '';
      return { ...state, totalPeople: '', infants: '' };
    }
    case IS__PLACE: {
      return { ...state, currentPlace: payload };
    }
    case CHECK__CALENDAR: {
      return { ...state, StartDate: payload.time, EndDate: payload.end };
    }
    case IS_LOGOUT:{
      state.currentTotalPeople = state.totalPeople;
      state.totalPeopleDefault = state.totalPeople;
      state.quantityPeople[0].quantity = 0;
      state.quantityPeople[1].quantity = 0;
      state.quantityPeople[2].quantity = 0;
      state.StartDate = '';
      state.EndDate = '';
      return { ...state, totalPeople: '', infants: '' };

    }
    case 'REMEMBER__LOCATION': {
      return { ...state, currentPlace: payload };
    }
    default:
      return state;
  }
}
export default CarouselReducer;