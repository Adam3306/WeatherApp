export const GET_WEATHERITEM = 'GET_WEATHERITEM';
export const GET_WEATHERITEM_FAILED = 'GET_WEATHERITEM_FAILED';
export const PUT_WEATHERITEM = 'PUT_WEATHERITEM';


const BASE_URL = 'http://api.openweathermap.org/data/2.5';
const APP_ID = '28c74e0a254572c6c9dcab44bb2ab502';



function getWeatherItem() {
	return {
		type: GET_WEATHERITEM
	};
}

function getWeatherItemFailed(error) {
	return {
		type: GET_WEATHERITEM_FAILED,
		error
	};
}

function putWeatherItem(json) {
	return {
		type: PUT_WEATHERITEM,
		newItem: {
			city: json.name,
			details: json
		}
	};
}



export function fetchWeatherItem(params) {
	const url = `${BASE_URL}/weather?q=${params}&units=metric&appid=${APP_ID}`;
	
	return function (dispatch) {
		dispatch(getWeatherItem());

		return fetch(url)
			.then(response => response.json())
			.then(json => dispatch(putWeatherItem(json)))
			.catch(error => dispatch(getWeatherItemFailed(error.toString())));
	};
}



