/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView
} from "react-native";
import CardView from "react-native-cardview";
import Modal from "react-native-modal";
import globalstyles from "./styles";
import { Actions } from "react-native-router-flux";
import { bluemain, orangemain } from "./styles";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class ServiceRequestsAddMod extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      modalheader: ""
    };
  }


  render() {

    return (
      <SafeAreaView style={globalstyles.safearea}>
        <View style={globalstyles.container_servicerequest}>


          {/* HEADER */}
          {/* <View style={globalstyles.headercontainer_serviceRequest}>
            <TouchableOpacity
              onPress={() => {
                Actions.pop();
              }}
              style={globalstyles.menuImgView_serviceRequest}
            >
              <Image
                source={require("../Assets/Images/backarrow.png")}
                style={globalstyles.menuImg_serviceRequest}
              />
            </TouchableOpacity>

            <View style={globalstyles.TitleTextView_serviceRequest}>
              <Text style={globalstyles.TitleTxt_serviceRequest}>
                Completed
              </Text>
            </View>
          </View> */}




          {/* MAIN BODY */}
          <View style={globalstyles.mainbodycontainer_serviceRequest}>
            />


          </View>
        </View>
      </SafeAreaView>
    );
  }
}
