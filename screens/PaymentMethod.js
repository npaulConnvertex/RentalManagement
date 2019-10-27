/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, FlatList, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import FAB from 'react-native-fab'
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';

//imjport screens
import globalstyles from './styles';
import { orangemain } from './styles.android';





export default class PaymentMethod extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalstatus: false,
      dropdown1: '',
    }
    // console.error(props.usertoken)
  }




  render() {


    let data = [{
      value: 'mpesa',
    }, {
      value: 'Debit Card',
    }, {
      value: 'Credit Card',
    }];






    const flatlistdata1 = [

      { paytype: "mpesa", info: "88453344444" },
      { paytype: "visa", info: "29342934234" },
      { paytype: "mastercard", info: "23232323233" },
    ]



    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1, backgroundColor: "#f3f3f3", }}>



          <Modal
            onBackdropPress={() => { this.setState({ modalstatus: false }) }}
            isVisible={this.state.modalstatus}>
            <View style={{ backgroundColor: "#ffffff" }}>
              <View style={{ margin: 20 }}>
                <View >
                  <Text style={{ fontSize: 20, fontWeight: "500", color: "#019ae8" }}>Enter Payment Details</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                  <View>
                    <Dropdown
                      label='Enter Payment Type'
                      data={data}
                      onChangeText={(value) => this.setState({ dropdown1: value })} />
                  </View>
                  <View>
                    <TextField
                      label='Account Number'
                    />
                  </View>
                  <View>
                    <TextField
                      label='CVV Number'
                    />
                  </View>
                  <View>
                    <TextField
                      label='Expiry Date'
                    />
                  </View>
                </View>


                <View style={{ marginTop: 20, }}>
                  <TouchableOpacity style={globalstyles.bottomView_settingsgeneral}
                    onPress={() => { this.setState({ modalstatus: false }) }}>
                    <Text style={globalstyles.saveTxt_settingsgeneral}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>


          {/* TITLEBAR */}
          <View style={globalstyles.titlebarmain_timelinetenant}>

            {/* Drawer icon */}
            <TouchableOpacity
              onPress={() => { Actions.drawerOpen() }}
              style={globalstyles.menuicon_timelintenant}>
              <Image
                style={globalstyles.menuImg_transactions}
                source={require('../Assets/Images/menu.png')}
              />
            </TouchableOpacity>


            <View style={globalstyles.titleview_timelinetenant}>
              <Text style={{ color: "#ffffff", fontSize: 22 }}>Payment</Text>
            </View>



          </View>


          <ScrollView>


            <View>

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







              <View style={{ margin: 10 }}>
                <FlatList
                  data={flatlistdata1}
                  renderItem={({ item }) =>
                    <View style={{ flex: 1, flexDirection: "row", marginTop: 20, marginLeft: 20 }}>
                      <View style={{ flex: 2 }}>
                        <Image
                          style={{ width: 30, height: 30 }}
                          source={item.paytype === "mastercard" ? require('../Assets/Images/mastercard.png') : item.paytype === "visa" ? require('../Assets/Images/visa.png') : require('../Assets/Images/mpesaLogo.png')}
                        />
                      </View>
                      <View style={{ flex: 8 }}>
                        <Text>{item.info}</Text>
                      </View>
                    </View>
                  }
                />
              </View>



            </View>

          </ScrollView>


          <FAB
            buttonColor={orangemain}
            iconTextColor="#FFFFFF"
            onClickAction={() => { this.setState({ modalstatus: true }) }}
            visible={true}
          />





        </View>


      </SafeAreaView>
    );
  }
}
