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
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  FlatList,
  SafeAreaView
} from "react-native";
import globalstyles from "./styles";

export default class SettingsSocial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text1: "Mobilenumber",
      text2: "password",
      // colorTrueSwitchIsOn: true,
      // colorFalseSwitchIsOn: false,
      // chatenableSwitchIsOn: true,
      // chatenableSwitchIsoff: false,

      settings: [
        { title: "Show My Name on Chart", colorFalseSwitchIsOn: false },
        { title: "Enable chat Notifiaction", colorFalseSwitchIsOn: false }
      ]
    };
  }

  onChangeFunction(newState, index) {
    //console.error(index);

    var newarr = this.state.settings;

    newarr[index].colorFalseSwitchIsOn = newState;

    // console.error(newarr[index].colorFalseSwitchIsOn);

    // this.setState({settings:newarr});

    this.setState({ settings: newarr }, () =>
      Alert.alert(
        "Changed",
        "...." +
          newarr[index].colorFalseSwitchIsOn +
          "...." +
          newarr[index].title
      )
    );
  }

  render() {
    return (
      <SafeAreaView style={globalstyles.safearea}>
        <View style={globalstyles.container_settingssocial}>
          {/* MAINBODY */}
          <View style={globalstyles.mainbodycontainer_settingssocial}>
            <FlatList
              extraData={this.state}
              data={this.state.settings}
              renderItem={({ item, index }) => (
                <View style={globalstyles.singleItemView_settingssocial}>
                  {/* PROFILE IMAGE */}
                  <View style={{ flex: 0.1 }}>
                    <Image
                      source={require("../Assets/Images/tenantuser_gray.png")}
                      style={globalstyles.tenantusergrayImg_settingssocial}
                    />
                  </View>

                  {/* TITLE */}
                  <View style={{ flex: 0.6 }}>
                    <Text style={globalstyles.smalltxt_settingssocial}>
                      {item.title}
                    </Text>
                  </View>

                  {/* SWITCH */}
                  <View style={{ flex: 0.3 }}>
                    <Switch
                      onValueChange={value =>
                        this.onChangeFunction(value, index)
                      }
                      onTintColor="#f6541855"
                      thumbTintColor="#f65418"
                      tintColor="#00000022"
                      value={item.colorFalseSwitchIsOn}
                    />
                  </View>
                </View>
              )}
            />
          </View>

          {/* SAVE BUTTON */}
          <View style={globalstyles.btncontainer_settingssocial}>
            <TouchableOpacity style={globalstyles.bottomView_settingssocial}>
              <Text style={globalstyles.saveTxt_settingssocial}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
