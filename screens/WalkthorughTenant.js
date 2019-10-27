/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  Text,
  RefreshControl,
  View,
  windows,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  ImageBackground,
  SafeAreaView
} from "react-native";
import { TextField } from "react-native-material-textfield";
import globalstyles from "./styles";
import { Actions } from "react-native-router-flux";
import { LOGINUSER } from "../logic/ApiConfig";
import AppIntroSlider from 'react-native-app-intro-slider';
import { bluemain } from './styles.android'





const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
});

const slides = [
  {
    key: 'Property Management',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../Assets/Images/Avatar.png'),
    imageStyle: styles.image,
    backgroundColor: bluemain,
  },
  {
    key: 'Property Management',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../Assets/Images/Avatar.png'),
    imageStyle: styles.image,
    backgroundColor: bluemain,
  },
  {
    key: 'Property Management',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../Assets/Images/Avatar.png'),
    imageStyle: styles.image,
    backgroundColor: bluemain,
  }
];





export default class WalkthorughTenant extends Component {

  async componentDidMount() {


    AsyncStorage.multiSet(
      [
        ["sample", "sample"],
        ["FirstTimeStatus1", "Done"],

      ],
      function (error) {
        //alert("finished");
        if (error) {
          alert("error!");
        } else {
          console.warn("saved to internal storage");
        }
      }
    );



  }

  constructor(props) {
    super(props);

    this.state = {
      showRealApp: false
    };
  }



  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // this.setState({ showRealApp: true });

    Actions.replace("drawerMenu1")
  }



  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return <AppIntroSlider slides={slides} onDone={this._onDone} />;
    }
  }
}