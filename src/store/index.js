import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import CarouselReducer from '../containers/Home/Carousel/module/reducer';
import DetailReducer from '../containers/PageDetail/module/reducer';
import authReducer from '../components/Modal/module/reducer';
import RoomReducer from '../containers/BookTicket/module/reducer';
import ProfileReducer from '../containers/Profile/module/reducer';
const rootReducer = combineReducers({
    CarouselReducer,
    DetailReducer,
   authReducer,
   RoomReducer,
   ProfileReducer
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)) );
export default store;