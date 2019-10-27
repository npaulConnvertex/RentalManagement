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
  ScrollView,
  FlatList,
  SafeAreaView
} from "react-native";
import CardView from "react-native-cardview";
import globalstyles from "./styles";
import { bluemain } from "./styles";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
// import HideableView from 'react-native-hideable-view';
// import PropTypes from 'prop-types';




export default class UnitsDetails extends Component {



  constructor(props) {
    super(props);

    console.warn(props.flat_id)
    this.state = {
      rentAmtss: "",
      paymentdayss: "",
      paymentfreqss: "",
      depositAmtss: "",
      lease_status: false,
      unitIDScreen: this.props.flat_id,
      linkedTenantState: false,
      leaseAdded: false,
      // tenantPress:false,

      paymentLog: [
        { date: "1.1.2019", payment: "300 USD", msg: "Rent" },
        { date: "2.1.2019", payment: "200 USD", msg: "Rent" },
        { date: "3.1.2019", payment: "20 USD", msg: "TapRepair" },
        { date: "4.1.2019", payment: "300 USD", msg: "Rent" }
      ]
    };


  }



  componentDidMount() {


    fetch(GET_UNIT_DETAILS, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.tokenState
      },

      body: JSON.stringify({

        UnitId: this.state.unitIDScreen
      }),

    }).then(response => response.json())
      .then((responseJson) => {

        console.error(responseJson)


        if (responseJson[0].lease_status == 1)
          Alert.alert("Leased")
        this.setState({ lease_status: true })


      })
      .catch(error => {
        console.error(error);
      });



  }



  render() {


    const images = [
      require("../Assets/Images/ROOMS/room1.jpg"),
      require("../Assets/Images/ROOMS/room2.jpg"),
      require("../Assets/Images/ROOMS/room3.jpg"),
      require("../Assets/Images/ROOMS/room4.jpg"),
    ];



    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

        <View style={globalstyles.container_unitsDetails}>



          {/* TITLEBAR */}
          <View style={globalstyles.titlebarmain_timelinetenant}>


            {/* Drawer icon */}
            <TouchableOpacity
              onPress={() => { Actions.pop() }}
              style={globalstyles.menuicon_timelintenant}>
              <Image
                style={globalstyles.menuImg_transactions}
                source={require('../Assets/Images/backarrow.png')}
              />
            </TouchableOpacity>


            <View style={globalstyles.titleview_timelinetenant}>
              <Text style={{ color: "#ffffff", fontSize: 22 }}>Unit Details</Text>
            </View>



          </View>





          <ScrollView>
            {/* MAIN BODY */}
            <View styles={globalstyles.mainbodycontainer_unitsDetails}>



              <ImageSlider
                loopBothSides
                style={{ flex: 1, height: 250 }}
                autoPlayWithInterval={3000}
                images={images}
              // customSlide={({ index, item, style, width }) => (
              //   // It's important to put style here because it's got offset inside
              //   <View key={index} style={[style, styles.customSlide]}>
              //     <Image source={{ uri: item }} style={styles.customImage} />
              //   </View>
              // )}
              // customButtons={(position, move) => (
              //   <View style={styles.buttons}>
              //     {images.map((image, index) => {
              //       return (
              //         <TouchableHighlight
              //           key={index}
              //           underlayColor="#ccc"
              //           onPress={() => move(index)}
              //           style={styles.button}
              //         >
              //           <Text style={position === index && styles.buttonSelected}>
              //             {index + 1}
              //           </Text>
              //         </TouchableHighlight>
              //       );
              //     })}
              //   </View>
              // )}
              />





              <View style={globalstyles.mainview_unitsDetails}>


                <View style={{ flex: 1 }}>
                  <Text style={globalstyles.title_unitsDetails}>
                    Flat / House No:
                  </Text>
                  <Text style={globalstyles.largetxt_unitsDetails}>
                    {this.props.flat_num}
                  </Text>
                </View>

                <View style={{ flex: 1, alignItems: "flex-end" }}>

                  <View style={{ flexDirection: "row" }}>
                    <Text style={globalstyles.title_unitsDetails}>
                      Unit Type:
                    </Text>
                    <Text style={globalstyles.subtitleTxt_unitsDetails}>
                      {this.props.flat_roomtype}
                    </Text>
                  </View>

                  <Text style={globalstyles.mediumtxt_unitsDetails}>
                    {this.props.flat_furnishType}
                  </Text>

                </View>

              </View>




              {/* BUTTON ADD NEW LEASE */}
              <TouchableOpacity
                style={
                  !this.state.lease_status
                    ? globalstyles.btnTxtView_unitsDetails
                    : globalstyles.btnTxtViewInActive_unitsDetails
                }
                // onPress={()=>{Actions.replace('AddLeaseToProperty',{flat_num:this.props.flat_num})}}>
                onPress={() => {
                  Actions.AddLeaseToProperty({ "flat_id": this.state.unitIDScreen });
                }}
              >
                <Text style={globalstyles.btnTxt_unitsDetails}>
                  ADD NEW LEASE
                </Text>
              </TouchableOpacity>









              {/* CARDVIEW LEASE */}
              <View style={{ margin: 20 }}>

                <View style={globalstyles.cardview1_unitsDetailsLeaseCardview}>
                  <CardView
                    style={globalstyles.cardview_unitsDetailsLeaseCardview}
                    cardElevation={2}
                    cardMaxElevation={4}
                    cornerRadius={3}
                  >
                    <View>
                      {/* CARDVIEW HEADER */}
                      <Text
                        style={globalstyles.titleTxt_unitsDetailsLeaseCardview}
                      >
                        Lease Details
                    </Text>
                      <View style={globalstyles.line_unitsDetailsLeaseCardview} />

                      {/* CARDVIEW MAIN BODY */}
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={
                            globalstyles.subtitleTxt_unitsDetailsLeaseCardview
                          }
                        >
                          Rent Amount:
                      </Text>
                        <Text style={globalstyles.txt_unitsDetailsLeaseCardview}>
                          {this.state.rentAmtss}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 5
                        }}
                      >
                        <Text
                          style={
                            globalstyles.subtitleTxt_unitsDetailsLeaseCardview
                          }
                        >
                          Payment Frequency:
                      </Text>
                        <Text style={globalstyles.txt_unitsDetailsLeaseCardview}>
                          {this.state.paymentfreqss}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 5
                        }}
                      >
                        <Text
                          style={
                            globalstyles.subtitleTxt_unitsDetailsLeaseCardview
                          }
                        >
                          Payment Day:
                      </Text>
                        <Text style={globalstyles.txt_unitsDetailsLeaseCardview}>
                          {this.state.paymentdayss}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 5
                        }}
                      >
                        <Text
                          style={
                            globalstyles.subtitleTxt_unitsDetailsLeaseCardview
                          }
                        >
                          Deposit Amount:
                      </Text>
                        <Text sstyle={globalstyles.txt_unitsDetailsLeaseCardview}>
                          {this.state.depositAmtss}
                        </Text>
                      </View>
                    </View>
                  </CardView>
                </View>


              </View>



              <TouchableOpacity style={globalstyles.paybtnview2_unitsDetails}>
                <Text
                // style={globalstyles.cardviewbtntxt_myhouse}
                >
                  Upload Documents
                        </Text>
                {/* <Image
                  source={require("../Assets/Images/dollar.png")}
                  style={globalstyles.dollarImg_myhouse}
                /> */}
              </TouchableOpacity>




              {/* BUTTON LINK TENANT */}
              <TouchableOpacity
                style={
                  this.state.linkedTenantState
                    ? globalstyles.btnTxtView_unitsDetails
                    : globalstyles.btnTxtViewInActive_unitsDetails
                }
                onPress={() => {

                  Actions.TenantSearchList({ "flat_id": this.props.flat_id });
                }}
              >
                <Text style={globalstyles.btnTxt_unitsDetails}>
                  {linkUnlink}
                </Text>
              </TouchableOpacity>





              <View style={{ marginLeft: 20, marginRight: 20, marginTop: 5 }}>

                <Text style={globalstyles.tenantTxt_unitsDetailsBlurTxt}>
                  Tenant Details
                </Text>

                {/* CARDVIEW TENANT DETAILS */}
                <CardView
                  style={globalstyles.cardview_unitsDetailsTenantcardview}
                  cardElevation={2}
                  cardMaxElevation={4}
                  cornerRadius={3}
                >
                  <View>
                    <Text
                      style={
                        globalstyles.tenantNameTxt_unitsDetailsTenantcardview
                      }
                    >
                      Max Born
                    </Text>
                    <Text
                      style={
                        globalstyles.tenantEmailTxt_unitsDetailsTenantcardview
                      }
                    >
                      maxborn123@gmail.com
                    </Text>
                    <Text
                      style={
                        globalstyles.tenantphoneTxt_unitsDetailsTenantcardview
                      }
                    >
                      994747412
                    </Text>
                  </View>
                </CardView>
              </View>




              {/* VACATE BUTTON */}
              {/* <TouchableOpacity

                style={
                  this.state.leaseAdded
                    ? globalstyles.bottomView2_myhouse
                    : globalstyles.bottomView2_Disabled_myhouse
                }

              >
                <Text style={globalstyles.bottomTxt_myhouse}>Vacate House</Text>

                <Image
                  source={require("../Assets/Images/vacate.png")}
                  style={globalstyles.vacateImg_myhouse}
                />
              </TouchableOpacity> */}





              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20,
                  marginTop: 30,
                  marginBottom: 30
                }}
              >
                <Text style={globalstyles.paymentTxt_unitsDetailsBlurTxt}>
                  Payment Logs
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={globalstyles.dateTxt_unitsDetailFlatlistHeading}>
                    Date
                  </Text>
                  {/* <View style={{flex:0.2}}></View> */}

                  <Text
                    style={globalstyles.paymentTxt_unitsDetailsFlatlistHeading}
                  >
                    Payment
                  </Text>
                  {/* <View style={{flex:0.2}}></View> */}

                  <Text
                    style={globalstyles.messageTxt_unitsDetailsFlatListHeading}
                  >
                    Message
                  </Text>
                </View>

                <FlatList
                  data={this.state.paymentLog}
                  renderItem={({ item }) => (
                    <View>
                      <View style={{ flexDirection: "row", marginTop: 8 }}>
                        <Text style={globalstyles.dateTxt_unitsDetailFlatlist}>
                          {item.date}
                        </Text>
                        {/* <View style={{flex:0.2}}></View> */}

                        <Text
                          style={globalstyles.paymentTxt_unitsDetailsFlatlist}
                        >
                          {item.payment}
                        </Text>
                        {/* <View style={{flex:0.2}}></View> */}

                        <Text
                          style={globalstyles.messageTxt_unitsDetailsFlatList}
                        >
                          {item.msg}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView >
    );
  }
  //}
}
