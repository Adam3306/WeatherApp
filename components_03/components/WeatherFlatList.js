import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    TextInput,
    ActivityIndicator,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { fetchWeatherItem } from '../actions';





class FlatListItem extends Component{
    constructor(props)
    {
        super(props);
        this.state =
        {
           
        };
    }


    render()
    {
        return(
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', height: 200,  }}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 2, justifyContent: 'center'}}>
                        <Text style={{fontSize: 40, fontWeight: 'bold', textAlign:  'center',}}> {this.props.item.details.name} </Text>
                    </View>
                    <View style={{flex: 1,  }}>
                        <Text style={{fontSize: 25, textAlign:  'center'}}> {this.props.item.details.sys.country}  </Text>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
                        <Image style = {{ width: 100, height: 100,}} source={{uri:`http://openweathermap.org/img/w/${this.props.item.details.weather[0].icon}.png`}}></Image> 
                    </View>
                    <View style={{flex: 1, justifyContent: 'center' }}>
                        <Text style={{textAlign:  'center', fontSize: 30}}> {this.props.item.details.weather[0].description} </Text>
                    </View>
                    <View style={{flex: 1,justifyContent: 'center' }}>
                        <Text style={{textAlign:  'center', fontSize: 25}}> {this.props.item.details.main.temp }°C </Text>
                    </View>
                </View>
            </View>
            <View style={{height: 3, backgroundColor: 'black'}}>
            </View>
        </View>

            
        );
    }
}


class WeatherFlatList extends Component {

    constructor(props)
    {
        super(props);
        this.state = 
        {
        }
    }

    onSubmitEditing = (event) =>
    {  
        this.props.dispatch(fetchWeatherItem(event.nativeEvent.text));
    }
    

    render() {
        
        if (this.props.weatherData.error)               // hiba eseten
        {
            alert(this.props.weatherData.error);
            return null;
        }

        if (this.props.weatherData.isLoading)           // ha meg nem jottek volna le az adatok
        {
            return(
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator />
              </View>
            )
        }
    
        return (        
            <View style={{backgroundColor: 'mediumseagreen', flex: 1}}>
                <TextInput  editable = {true} onSubmitEditing={this.onSubmitEditing} />
                
                <View style={{height: 3, backgroundColor: 'black'}}></View>
                <FlatList
                    data={this.props.weatherData.weatherList}
                    renderItem={({item}) => { if (item.details == null) return null;   return (<FlatListItem item={item} /> );}}
                    keyExtractor={(item, index) => index.toString()}
                    
                />
            </View> 
            
    
        );
    }
}



const mapStateToProps = (state) => {

	return {
		weatherData: state.weatherItemReducer
	};
};

WeatherFlatList = connect(mapStateToProps)(WeatherFlatList);

export default WeatherFlatList;