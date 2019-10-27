/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, SafeAreaView, Image, Switch, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import { TextField } from 'react-native-material-textfield';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Modal from "react-native-modal";




//imjport screens
import globalstyles from './styles';
import { orangemain, bluemain } from './styles'





export default class SettingsTransactionLandlord extends Component {



  constructor(props) {
    super(props)

    this.state = {

      name: '',
      email: '',
      currentpwd: '',
      newpwd: '',
      confirmpwd: '',
      mobile: '',
      switch1Value: true,
      switch2Value: true,
      isaddtypevis: false,
    };

  }





  render() {


    let { name } = this.state;
    let { email } = this.state;
    let { currentpwd } = this.state;
    let { newpwd } = this.state;
    let { confirmpwd } = this.state;
    let { mobile } = this.state;



    var radio_props = [
      { label: 'Mpesa 77900...', value: 0 },
      { label: 'ICICI Bank Acc 3434.....', value: 1 },
      { label: 'Unity Bank Bank Acc 4588.....', value: 2 },
      { label: 'HSBC Bank Acc 4545.....', value: 3 },
    ];


    return (
      <SafeAreaView style={globalstyles.safearea}>
        <View style={styles.container}>

          <Modal
            onBackdropPress={() => this.setState({ isaddtypevis: false })}
            isVisible={this.state.isaddtypevis}
          >
            <View style={{ padding: 20, backgroundColor: "#ffffff" }}>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>Add Transaction Type</Text>

              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#ffffff",
                  alignItems: "center"
                }}
              >

                {/* <Text style={{ margin: 20, fontSize: 15 }}> Under Progress </Text> */}





              </View>


              <TextField
                label="Enter Flat/House No"
                style={{ marginLeft: 10, marginRight: 10 }}
              />

              <TextField
                label="Enter Flat/House No"
                style={{ marginLeft: 10, marginRight: 10 }}
              />



            </View>


          </Modal>


          <ScrollView>



            {/*  HEADER */}
            <View style={globalstyles.header_timelinetenant}>

              <View style={globalstyles.timelindetails_timelinetenants}>
                <Text style={globalstyles.username2_timelintenant} >Choose Your</Text>
                <Text style={globalstyles.username_timelintenant} >PaymentMethod</Text>

              </View>

              <Image
                resizeMode="cover"
                style={globalstyles.headerimagestyle_timelinetenant}
                source={require("../Assets/Images/paymentbg.png")}
              />



            </View>


            <View style={{ flex: 1, flexDirection: "row", height: 50, justifyContent: "flex-end" }}>
              <TouchableOpacity
                onPress={() => this.setState({ isaddtypevis: true })}
                activeOpacity={0.5}
                style={{ borderRadius: 200, borderWidth: 1, borderColor: bluemain, padding: 10 }}><Text>Add Transaction Type</Text></TouchableOpacity>
            </View>




            {/* MAINBODY */}
            <View style={styles.mainbodycontainer}>

              <View style={{ marginTop: 30 }}>
                <View>
                  <View style={{ margin: 20 }}>
                    <RadioForm
                      radio_props={radio_props}
                      initial={0}
                      buttonColor="#aaaaaa"
                      selectedButtonColor={orangemain}
                      buttonSize={20}
                      labelStyle={{ margin: 10 }}
                      // style={{ margin: 10 }}
                      onPress={(value) => { this.setState({ value: value }) }}
                    />
                  </View>
                </View>
              </View>

              {/* <View style={{ marginLeft: 20 }}>

                <View style={{ flexDirection: "row" }}>
                  <Switch
                    onValueChange={() => this.setState({ switch1Value: !this.state.switch1Value })}
                    onTintColor="#f6541855"
                    thumbTintColor="#f65418"
                    tintColor="#00000022"
                    value={this.state.switch1Value} />

                  <Text style={{ marginLeft: 10 }}>Auto Cashout</Text>
                </View>


              </View> */}

            </View>



            {/* SAVE BUTTON */}
            <View style={styles.btncontainer}>

              <TouchableOpacity style={globalstyles.bottomView_settingsgeneral}
                onPress={() => { this.validation() }}>
                <Text style={globalstyles.saveTxt_settingsgeneral}>Save Changes</Text>
              </TouchableOpacity>



            </View>



          </ScrollView>

















        </View>
      </SafeAreaView>
    );



  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',

  },

  mainbodycontainer: {

    width: "100%",
    paddingTop: 40,

  },

  btncontainer: {

    padding: 20,
    justifyContent: 'flex-end',

  },



});




