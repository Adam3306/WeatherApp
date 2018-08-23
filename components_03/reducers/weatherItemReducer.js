import {
	GET_WEATHERITEM,
	GET_WEATHERITEM_FAILED,
	PUT_WEATHERITEM,
	
} from '../actions';

const initialState = {
	isLoading: true,
	isRefereshing: false,
	weatherList: 
	[
		
	],
};

export default function weatherItemReducer(state = initialState, action) {
	switch (action.type) {
		case GET_WEATHERITEM:
			return Object.assign({}, state, {
				isLoading: true,
			});

		case GET_WEATHERITEM_FAILED:
			return Object.assign({}, state, {
				isLoading: false,
				error: action.error
			});

		case PUT_WEATHERITEM:
			return Object.assign({}, state, {
				isLoading: false,
				weatherList: state.weatherList.concat(action.newItem)
			});
	
		default:
			return state;
	}
}
