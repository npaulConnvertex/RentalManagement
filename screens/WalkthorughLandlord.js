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
    text: 'Rental App allows you to find your perfect place to stay \n\nLorem ipsum dolor sit amet.',
    image: require('../Assets/Images/tenatsnodata.png'),
    imageStyle: styles.image,
    backgroundColor: bluemain,
  },
  {
    key: 'Property Management',
    title: 'Title 2',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n\nLorem ipsum dolor sit amet.',
    image: require('../Assets/Images/Avatar.png'),
    imageStyle: styles.image,
    backgroundColor: bluemain,
  },
  {
    key: 'Property Management',
    title: 'Rocket guy',
    text: 'Do your Transactions with Mpesa \n\nLorem ipsum dolor sit amet.',
    image: require('../Assets/Images/mpesaLogo.png'),
    imageStyle: styles.image,
    backgroundColor: bluemain,
  }
];





export default class WalkthorughLandlord extends Component {

  async componentDidMount() {


    AsyncStorage.multiSet(
      [
        ["sample", "sample"],
        ["FirstTimeStatus", "Done"],

      ],
      function (error) {
        //alert("finished");
        if (error) {
          // alert("error!");
        } else {
          // console.warn("saved to internal storage");
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



  _onDone = async () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // this.setState({ showRealApp: true });
    await this._storeData()
    Actions.SignIn()
  }


  _storeData = async () => {
    try {
      await AsyncStorage.setItem('firsttimeload', 'false');
    } catch (error) {
      // Error saving data
    }
  };


  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return <AppIntroSlider slides={slides} onDone={this._onDone} />;
    }
  }
}