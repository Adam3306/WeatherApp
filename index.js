import { AppRegistry } from 'react-native';
//import App from './components_02/Weather'
import App from './components_03/components/Weather'
import { fetchWeatherItem } from './components_03/actions';
import configureStore from './components_03/store';
import { Provider } from 'react-redux';
import React from 'react';


const store = configureStore();
var cityNames = ["Nagykanizsa", "Gyékényes","Zalaegerszeg","Debrecen","Hamburg","Amsterdam","Kalocsa","Washington DC.","New York","Paris"];

for(var i = 0;  i < cityNames.length; i++)
{
    store.dispatch(fetchWeatherItem(cityNames[i]));
}

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