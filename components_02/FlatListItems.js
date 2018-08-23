import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    TextInput,
    ActivityIndicator,
    Image
} from 'react-native';






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
                                <Text style={{fontSize: 25, textAlign:  'center'}}> {this.props.item.details.country}  </Text>
                            </View>
                        </View>

                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
                                <Image style = {{ width: 100, height: 100,}} source={{uri:`http://openweathermap.org/img/w/${this.props.item.details.icon}.png`}}></Image> 
                            </View>
                            <View style={{flex: 1, justifyContent: 'center' }}>
                                <Text style={{textAlign:  'center', fontSize: 30}}> {this.props.item.details.description} </Text>
                            </View>
                            <View style={{flex: 1,justifyContent: 'center' }}>
                                <Text style={{textAlign:  'center', fontSize: 25}}> {this.props.item.details.temperature   }°C </Text>
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
          
            isLoading: true,
            weatherData: 
            [
                {city: "Nagykanizsa", details: null},
                {city: "Zalaegerszeg", details: null},
                {city: "Debrecen", details: null},
                {city: "Gyékényes", details: null},
                {city: "Washington DC.", details: null},            
                {city: "New York", details: null},
                {city: "Paris", details: null},
                
            ],
            changeCounter: 0,
            refreshing: false,

            
        }
    }


    ///////////////////////////////////////////////////
    // Adatok lekerese az api-bol, majd a szukseges adatok tovabbpasszolasa a state-be

    getWeather = () => 
    {
        for(var i = 0; i < this.state.weatherData.length; i++)
        {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.weatherData[i].city}&appid=28c74e0a254572c6c9dcab44bb2ab502`)
            .then((response) => response.json())
            .then((responseJson) => 
            {
                if (responseJson.weather == undefined)
                {
                    alert("Ismeretlen varos!" );
                    
                }
                var myObj = 
                {
                    "name": "" + responseJson.name,
                    "icon": "" + responseJson.weather[0].icon,
                    "description" : "" + responseJson.weather[0].description,    
                    "temperature" : ""+ Math.round(responseJson.main.temp - 274.15),
                    "country": "" + responseJson.sys.country
                };
                
                
                for (var j = 0; j < this.state.weatherData.length; j++)
                {
                    
                    if (this.state.weatherData[j].city == responseJson.name)
                    {
                        this.state.weatherData[j].details = myObj;
                        
                        if (j == this.state.weatherData.length-1)
                        {

                            this.setState({
                                isLoading: false,
                                changeCounter: this.state.changeCounter + 1,
                                refreshing: false
                                
            
                            }, function()
                            {
            
                            });
                        }

                        break;
                    }
                }
            

               
                
                })
                .catch((error) =>{
                    alert("ERROR: " + error );
                });
        }
        
    }

    //////////////////////////
    // Lista frissitese
    handleRefresh = () =>
    {
        this.setState({refreshing: true}, () => {this.getWeather()});
    }

    onSubmitEditing = (event) =>
    {  
         var newCity = 
         {
             city: event.nativeEvent.text,
             details: null
         };
        
        this.state.weatherData.push(newCity);
        this.getWeather();
        
        
    }
    
    componentDidMount()
    {
        this.getWeather();
        setInterval(() => {this.getWeather()}, 600000);  // ha a user nem frissiti, akkor is frissul onmagatol 10 percenkent
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
                    data={this.state.weatherData}
                    renderItem={({item}) => { if (item.details == null) return null;   return (<FlatListItem item={item}/> );}}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
            </View> 
            
    
        );
    }
}