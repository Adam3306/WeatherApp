import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image
} from 'react-native';

import fetchWeather from '../api/api';
import styles from './Styles'

const DEFAULT_CITY = "Budapest";

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
        debugger;
              return(
                <View style={{flex: 1}}>  
                    <View style={{flexDirection: 'row', height: 200,  }}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <View style={{flex: 2, justifyContent: 'center'}}>
                                <Text style={{fontSize: 40, fontWeight: 'bold', textAlign:  'center',}}> {this.props.name} </Text>
                            </View>
                            <View style={{flex: 1,  }}>
                                <Text style={{fontSize: 25, textAlign:  'center'}}> {this.props.country}  </Text>
                            </View>
                        </View>

                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <View style={{flex: 1,  justifyContent: 'center'}}>
                                <Text style={{textAlign:  'center'}}> {this.props.item.icon}  </Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center' }}>
                                <Text style={{textAlign:  'center', fontSize: 30}}> {this.props.item.main} </Text>
                            </View>
                            <View style={{flex: 1,justifyContent: 'center' }}>
                                <Text style={{textAlign:  'center', fontSize: 25}}> {this.props.temperature} </Text>
                            </View>
                        </View>

                    </View>
                    <View style={{height: 3, backgroundColor: 'black'}}>
                    </View>
                </View>
       
            
        );
    }
}

export default class BasicFlatList extends Component {

    constructor(props)
    {
        super(props);
        this.state = 
        {
            city: DEFAULT_CITY,
            temperature: 15,
            country: "Hungary",
            weatherType: "Clear",
            temperature: 21,
            dummy: 0,
            backgroundColor: this.randomColor(),
            data: [],
            isLoading: true,
            name: "Budapest",
            icon: "adsa"
        }
    }

    getWeather = () => 
    {
        return fetch('http://api.openweathermap.org/data/2.5/weather?q=nagykanizsa&appid=28c74e0a254572c6c9dcab44bb2ab502')
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            
            data: responseJson.weather,
            temperature: responseJson.main.temp,
            name: responseJson.name,
            country: responseJson.sys.country,
            isLoading: false,
             
  
          }, function(){
  
          });
  
        })
        .catch((error) =>{
          alert(error);
        });
        
    }



    componentDidMount()
    {
        this.getWeather();
    }

    randomColor()
    {
        var colors = [0, 1, 2].map(() => Math.ceil(Math.random() * 255));
    
        return "rgb(" + colors.join(",") + ")"
    }


    render() {

        if (this.state.isLoading)
        {
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
        }
        
        return (
        
            <View style={{backgroundColor: 'mediumseagreen', flex: 1}}>
                <TextInput style={styles.input} editable = {true}/>
                <View style={{height: 3, backgroundColor: 'black'}}></View>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => { return (<FlatListItem item={item}  
                                                                    temperature={this.state.temperature - 272.15} 
                                                                    name={this.state.name}  
                                                                    country={this.state.country} /> );}}
                    keyExtractor={(item, index) => index}
                />
            </View> 
            
    
        );
    }
}