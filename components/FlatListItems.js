import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image
} from 'react-native';


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
        
              return(
                <View style={{flex: 1}}>  
                    <View style={{flexDirection: 'row', height: 200,  }}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <View style={{flex: 2, justifyContent: 'center'}}>
                                <Text style={{fontSize: 40, fontWeight: 'bold', textAlign:  'center',}}> {this.props.item.name} </Text>
                            </View>
                            <View style={{flex: 1,  }}>
                                <Text style={{fontSize: 25, textAlign:  'center'}}> {this.props.item.country}  </Text>
                            </View>
                        </View>

                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
                                <Image style = {{ width: 100, height: 100,}} source={{uri:`http://openweathermap.org/img/w/${this.props.item.icon}.png`}}></Image> 
                            </View>
                            <View style={{flex: 1, justifyContent: 'center' }}>
                                <Text style={{textAlign:  'center', fontSize: 30}}> {this.props.item.description} </Text>
                            </View>
                            <View style={{flex: 1,justifyContent: 'center' }}>
                                <Text style={{textAlign:  'center', fontSize: 25}}> {this.props.item.temperature - 274.15  }°C </Text>
                            </View>
                        </View>

                    </View>
                    <View style={{height: 3, backgroundColor: 'black'}}>
                    </View>
                </View>
       
            
        );
    }
}

var weatherConditions = [];
var cityNames = ["washington", "budapest", "new york", "paris", "nagykanizsa", "zalaegerszeg", "debrecen"];

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


    ///////////////////////////////////////////////////
    // Adatok lekerese az api-bol, majd a szukseges adatok tovabbpasszolasa a state-be

    getWeather = () => 
    {
       

        for(var i = 0; i < cityNames.length; i++)
        {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityNames[i]}&appid=28c74e0a254572c6c9dcab44bb2ab502`)
            .then((response) => response.json())
            .then((responseJson) => {
                var myObj = 
                {
                    "name": "" + responseJson.name,
                    "icon": "" + responseJson.weather[0].icon,
                    "description" : "" + responseJson.weather[0].description,    
                    "temperature" : ""+ responseJson.main.temp,
                    "country": "" + responseJson.sys.country
                };
                
                weatherConditions.push(myObj);
                this.setState({
                    isLoading: false,
                    
                    

                }, function()
                {

                });
                
                })
                .catch((error) =>{
                alert(error);
                });
        }
        
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

        /////////////////////////////////////
        // Ha meg az adatok nem jottek le

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
                    data={weatherConditions}
                    renderItem={({item}) => { return (<FlatListItem item={item}  
                                                                    /> );}}
                    keyExtractor={(item, index) => index}
                />
            </View> 
            
    
        );
    }
}