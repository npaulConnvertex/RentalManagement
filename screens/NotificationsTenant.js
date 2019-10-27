/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image ,FlatList ,Platform, SafeAreaView ,StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'


//imjport screens
import globalstyles from './styles';






export default class NotificationsTenant extends Component {

  constructor(props){
    super(props)

     // console.error(props.usertoken)
  }




  render() {
    
   


    const flatlistdata=[ 
      {name:"Service request has been approved", add:"3:00PM"},
      {name:"Howard has messaged you", add:"11:00PM"},
      {name:"Rent Payment was successfull", add:"5:00PM"},
      {name:"Service request has been approved", add:"3:00PM"},
      {name:"Howard has messaged you", add:"11:00PM"},
      {name:"Rent Payment was successfull", add:"5:00PM"},
      {name:"Service request has been approved", add:"3:00PM"},
      {name:"Howard has messaged you", add:"11:00PM"},
      {name:"Rent Payment was successfull", add:"5:00PM"},
      {name:"Service request has been approved", add:"3:00PM"},
      {name:"Howard has messaged you", add:"11:00PM"},
      
    ]
    
    
    return (
      <SafeAreaView style={globalstyles.safearea}>
       
          <View style={{ flex:1, backgroundColor:"#ffffff"}}>




              {/* TITLE BAR */}
              <View style={globalstyles.titlebarmain_timelinetenant}>

                  {/* Drawer icon */}
                    <TouchableOpacity 
                    onPress={() => { Actions.pop() } }
                    style={globalstyles.menuicon_timelintenant}>
                    <Image
                    style={globalstyles.backstyle_notificationtenant}
                    source={require('../Assets/Images/backarrow.png')}
                    />
                    </TouchableOpacity>


                    <View style={globalstyles.titleview_timelinetenant}>
                      <Text style={{ color:"#ffffff", fontSize:22 }}>Notifications</Text>
                    </View>
                </View>   




                <View style={globalstyles.notificationlist_notificationtenant}>
                <FlatList 

                data={flatlistdata}
                renderItem={
                  ({item}) => 
                      <View style={globalstyles.listview_notificationtenant}>
                        
                        
                        <View style={globalstyles.listview2_notificationtenant}>
                            <Text style={globalstyles.text1_notificationtenant}>{item.name}</Text>
                            <Text style={globalstyles.text2_notificationtenant}>{item.add}</Text>
                        </View>

                        <View style={{ height:1,marginTop:10, backgroundColor:"#aaaaaa", width:"100%"}}></View>
                      </View>
                      
                }
                />
                </View>
          
          
            </View>
      </SafeAreaView>
    );
  }
}
