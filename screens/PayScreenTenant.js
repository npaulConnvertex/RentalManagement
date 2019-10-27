/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, Image, SafeAreaView, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import { Dropdown } from "react-native-material-dropdown";
import { TextField } from "react-native-material-textfield";
// import Rave from 'react-native-rave';


//imjport screens
import globalstyles from './styles';






export default class HomeChats extends Component {

  constructor(props) {
    super(props);
    this.state = {

      otherPayType: "",
      otherPayState: true
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onSuccess(data) {
    console.log("success", data);
    // You can get the transaction reference from successful transaction charge response returned and handle your transaction verification here

  }

  onFailure(data) {
    console.log("error", data);
  }

  onClose() {
    //navigate to the desired screen on rave close

  }


  render() {

    let { otherPayType } = this.state;


    var PaymentType = [{
      value: 'Rent',
    }, {
      value: 'Service Request',
    }, {
      value: 'Others',
    },];




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
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>



        {/* HEADER */}
        <View style={globalstyles.headercontainer_filtersearchProperties}>


          <CardView
            style={{ paddingLeft: 20, backgroundColor: "#ffffff", flexDirection: "row", width: "100%", height: 60 }}
            cardElevation={2}
            cardMaxElevation={4}
            cornerRadius={3}>


            <TouchableOpacity
              onPress={() => Actions.pop()}
              style={globalstyles.menuImgView_myhouse}
            >
              <Image
                source={require("../Assets/Images/backarrow2.png")}
                style={globalstyles.menuImg_myhouse}
              />
            </TouchableOpacity>

            <View style={globalstyles.TitleTextView_filtersearchProperties}>
              <Text style={globalstyles.TitleTxt_filtersearchProperties}>Pay</Text>
            </View>
          </CardView>

        </View>




        <View style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}>
          <Text>Complete Your</Text>
          <Text style={globalstyles.largetxtview_myhouse}>Payment</Text>
        </View>




        {/* CHOOSE PAY TYPE */}
        <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20 }}>

          <Dropdown
            label="Select Payment Type"
            data={PaymentType}
            onChangeText={value => {
              console.warn('selected')
              if (value === 'Others')
                this.setState({ otherPayState: false })
              else
                this.setState({ otherPayState: true })
            }
            }
          />


          <TextField
            disabled={this.state.otherPayState}
            label="Select Other Pay Type"
            value={otherPayType}
            onChangeText={otherPayType => this.setState({ otherPayType })}
          />

        </View>

        <View style={{ height: 1, backgroundColor: "#aaaaaa", width: "100%" }}></View>



        {/* CHOOSE PAY */}
        <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20 }}>

          <View style={{ margin: 10 }}>
            <FlatList
              data={flatlistdata1}
              renderItem={({ item }) =>
                <TouchableOpacity style={{ flex: 1, flexDirection: "row", marginTop: 20, marginLeft: 20 }}>
                  <View style={{ flex: 2 }}>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={item.paytype === "mastercard" ? require('../Assets/Images/mastercard.png') : item.paytype === "visa" ? require('../Assets/Images/visa.png') : require('../Assets/Images/mpesaLogo.png')}
                    />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>{item.info}</Text>
                  </View>
                </TouchableOpacity>
              }
            />
          </View>

        </View>


        <View style={{ height: 1, backgroundColor: "#aaaaaa", width: "100%" }}></View>



        {/* VACATE BUTTON */}
        <TouchableOpacity style={globalstyles.bottomView_payscreentenant}>
          <Text style={globalstyles.bottomTxt_payscreentenant}>PAY</Text>
        </TouchableOpacity>

      </View>
    );
  }
}




