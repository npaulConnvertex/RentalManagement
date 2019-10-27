/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,Image, StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'


//imjport screens
import globalstyles from './styles';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
   });


export default class HomePeople extends Component {


  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      name:"hello",
      loggedIn: false,
      currentState: "not-panic",
      jsondata:[
        {
          name: "Prateek Bansal",
          propertyname: "Sandalwood Apartment",
          usertype: "tenant",
        },
        {
          name: "Rahul Sinha",
          propertyname: "Greenwood Apartment",
          usertype: "tenant",
        },
        {
          name: "Radhika Paul",
          propertyname: "Roseewood Apartment",
          usertype: "staff",
        },
        {
          name: "Prateek Bansal",
          propertyname: "Sandalwood Apartment",
          usertype: "staff",
        },
        {
          name: "Rahul Sinha",
          propertyname: "Greenwood Apartment",
          usertype: "tenant",
        },
      ]
    }
  }


  render() {
    return (
      <View style={globalstyles.peoplebg_homepeople}>


        <FlatList
          data={this.state.jsondata}
          renderItem={({item}) => (
            <View style={{ padding:5}}>
                <View
                style={globalstyles.peoplelisttouch_homepeople}
                >
                  <View style={{ flex: 0.2, backgroundColor:"#ffffff"}}>
                    <Image 
                    resizeMode="contain"
                    style={globalstyles.peopleicon_homepeople}
                    source={item.usertype=="tenant"?require("../Assets/Images/stafficon.png"):require("../Assets/Images/tenanticon.png")}
                    />
                </View>

                <View style={{ flex: 0.5, backgroundColor:"#ffffff"}}>
                    <Text style={globalstyles.peoplenameTxtstyle_homepeople}>{item.name}</Text>
                    <Text style={globalstyles.propertyTxtstyle_homepeople}>{item.propertyname}</Text>
                </View>


                <View style={{ flex: 0.3, backgroundColor:"#ffffff", flexDirection:"row" }}>
                <TouchableOpacity 
                 activeOpacity={0.5}
                style={{ flex:0.5, backgroundColor:"#ffffff",  justifyContent:"center", alignContent:"center"}}>
                <Image 
                    style={globalstyles.peopleicon_homepeople}
                    source={require("../Assets/Images/callcirclebutton.png")}
                    />
                    </TouchableOpacity>
                <TouchableOpacity 
                activeOpacity={0.5}
                style={{ flex:0.5, backgroundColor:"#ffffff",  justifyContent:"center", alignContent:"center"}}>
                <Image 
                    style={globalstyles.peopleicon_homepeople}
                    source={require("../Assets/Images/sendmsgbtn.png")}
                    />
                    </TouchableOpacity>
                </View>

              </View>
            </View>
          )}
        />
    
      </View>
    );
  }
  }
