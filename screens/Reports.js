/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, ActivityIndicator, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';




//imjport screens
import globalstyles from './styles';






export default class Reports extends Component {



  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      dropdown1: '',
      dropdown2: '',
      currentState: false,

    }
  }




  render() {

    let data = [{
      value: 'Greenwood apartment',
    }, {
      value: 'Rosewood apartment',
    }, {
      value: 'Mainroad House',
    }];


    let data1 = [{
      value: 'rent',
    }, {
      value: 'Service Request',
    }, {
      value: 'Others',
    }];




    // IF REPORT NOT SENT
    if (this.state.currentState === false) {
      return (
        <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>


          {/* TITLE BAR */}
          <View style={globalstyles.titlebarmain_timelinetenant}>

            {/* Drawer icon */}
            <TouchableOpacity
              onPress={() => { Actions.drawerOpen() }}
              style={globalstyles.menuicon_timelintenant}>
              <Image
                style={globalstyles.backstyle_notificationtenant}
                source={require('../Assets/Images/menu.png')}
              />
            </TouchableOpacity>


            <View style={globalstyles.titleview_timelinetenant}>
              <Text style={{ color: "#ffffff", fontSize: 22 }}>Reports</Text>
            </View>
          </View>



          <CardView
            cardElevation={2}
            style={globalstyles.formcard_report}
          >

            <View style={{ margin: 20 }}>
              <View >
                <Text>Enter the form to get detailed report</Text>
              </View>

              <View style={{ marginTop: 10 }}>
                <View>
                  <Dropdown
                    label='Select Property'
                    data={data}
                    onChangeText={(value) => this.setState({ dropdown1: value })} />
                </View>
                <View>
                  <Dropdown
                    label='Select Payment Category'
                    data={data1}
                    onChangeText={(value) => this.setState({ dropdown2: value })} />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.5 }}>
                    <TextField
                      label='Start Date'
                    />
                  </View>
                  <View style={{ flex: 0.5 }}>
                    <TextField
                      label='End Date'
                    />
                  </View>
                </View>
              </View>

            </View>


          </CardView>



          {/* CET REPORT BUTTON */}

          <TouchableOpacity style={globalstyles.getreportbtn_report}
            onPress={() => { this.setState({ currentState: !this.state.currentState }) }}
          >
            <Text style={globalstyles.getreporttext_report}>Get Report</Text>
          </TouchableOpacity>

        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>



          {/* TITLE BAR */}
          <View style={globalstyles.titlebarmain_timelinetenant}>

            {/* Drawer icon */}
            <TouchableOpacity
              onPress={() => { Actions.drawerOpen() }}
              style={globalstyles.menuicon_timelintenant}>
              <Image
                style={globalstyles.backstyle_notificationtenant}
                source={require('../Assets/Images/menu.png')}
              />
            </TouchableOpacity>


            <View style={globalstyles.titleview_timelinetenant}>
              <Text style={{ color: "#ffffff", fontSize: 22 }}>Reports</Text>
            </View>
          </View>




          <CardView
            cardElevation={10}
            cornerRadius={3}
            style={globalstyles.downloadview_report}
          >


            <TouchableOpacity
              onPress={() => { this.setState({ currentState: !this.state.currentState }) }}
              style={globalstyles.Touchdownloadview_report}>

              {/*text */}
              <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#ffffff", fontSize: 25 }}>Download Report</Text>
              </View>

              {/* Icon Download pdf */}
              <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
                <Image
                  resizeMode="contain"
                  style={{ width: 70, height: 70 }}
                  source={require("../Assets/Images/Downloadpdficon.png")} />
              </View>


            </TouchableOpacity>

          </CardView>

        </View>
      );
    }
  }
}
