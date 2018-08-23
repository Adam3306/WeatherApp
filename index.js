import { AppRegistry } from 'react-native';
//import App from './components_02/Weather'
import App from './components_03/components/Weather'
import { fetchWeatherItem } from './components_03/actions';
import configureStore from './components_03/store';
import { Provider } from 'react-redux';
import React from 'react';


const store = configureStore();


store.dispatch(fetchWeatherItem("Nagykanizsa"));
store.dispatch(fetchWeatherItem("Gyékényes"));
store.dispatch(fetchWeatherItem("Zalaegerszeg"));
store.dispatch(fetchWeatherItem("Debrecen"));
store.dispatch(fetchWeatherItem("Hamburg"));
store.dispatch(fetchWeatherItem("Amsterdam"));
store.dispatch(fetchWeatherItem("Kalocsa"));
store.dispatch(fetchWeatherItem("Washington DC."));
store.dispatch(fetchWeatherItem("New York"));
store.dispatch(fetchWeatherItem("Paris"));

class WeatherAppProvider extends React.Component
{
    render()
    {
        return(<Provider store={store}>
                    <App />
                </Provider>
        );
    }
}


//AppRegistry.registerComponent('WeatherApp', () => App);
AppRegistry.registerComponent('WeatherApp', () => WeatherAppProvider);