import { combineReducers } from 'redux';
import weatherItemReducer from './weatherItemReducer';


const rootReducer = combineReducers({
	weatherItemReducer,
	
});

export default rootReducer;
