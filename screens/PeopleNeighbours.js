/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'


//imjport screens
import globalstyles from './styles';






export default class PeopleNeighbours extends Component {

  constructor(props){
    super(props)

     // console.error(props.usertoken)
  }




  render() {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center"}}>
          <Text>All chats with Neighbours goes here</Text>
      </View>
    );
  }
}
