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
  SafeAreaView,
  Alert,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import { Actions, Scene, Router, Tabs } from "react-native-router-flux";
import CardView from "react-native-cardview";
import { FloatingAction } from "react-native-floating-action";
import FAB from "react-native-fab";
import call from "react-native-phone-call";
import Carousel from 'react-native-snap-carousel';
import { unitDetailsapiconst, requestLandlordForUnitApiConst } from "../logic/searchpropertyApiLogic"




//imjport screens
import globalstyles from "./styles";
import { orangemain } from "./styles";
import { bluemain } from "./styles.ios";
import { IMAGE_URL } from "../logic/ApiConfig"











var DeviceWidth = Dimensions.get('window').width
DeviceWidth = DeviceWidth






export default class UnitDetailsPropertyTenant extends Component {
  constructor(props) {
    super(props);

    // console.error(props.uid)
    this.state = {
      isSuccessModalVisible: false,
      unitdetailResState: [],
      unitImagesState: [],
      imagelist: [],
      entries: [
        { imgSource: require("../Assets/Images/ROOMS/room1.jpg") },
        { imgSource: require("../Assets/Images/ROOMS/room2.jpg") },
        { imgSource: require("../Assets/Images/ROOMS/room3.jpg") },
        { imgSource: require("../Assets/Images/ROOMS/room4.jpg") },
        { imgSource: require("../Assets/Images/ROOMS/room2.jpg") },
      ],
    }
    // console.error(props.usertoken)
  }



  componentWillMount() {

    this.get_unit_details_function()
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Image
          style={{ width: "100%", borderRadius: 10, height: DeviceWidth * 0.5 }}
          source={item.imgSource}
        />
      </View>
    );
  }

  async get_unit_details_function() {


    // console.error(value)
    await unitDetailsapiconst(this.props.uid, this.props.token)
      .then((responseJson) => {


        this.setState({ unitdetailResState: responseJson.data[0], unitImagesState: responseJson.image })

        var iamgeslistvar = responseJson.image.map(item => {
          var obj = {
            imgSource: { uri: IMAGE_URL + item.home_img }
          };
          return obj;
        });


        this.setState({ imagelist: iamgeslistvar, });
        // console.error(this.state.unitImagesState)
        // Alert.alert(this.state.unitdetailResState)

      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });



    // console.error(this.state.unitdetailResState[0].landlord_id)
    console.warn(this.state.unitImagesState)
  }




  requestUnitFunction() {




    // console.error(value)
    requestLandlordForUnitApiConst(this.props.token, this.props.uid, this.state.unitdetailResState.propertyid, this.state.unitdetailResState.landlord_id)
      .then((responseJson) => {

        console.error(responseJson)
        // if (responseJson.msg == "added successfully")
        //   this.setState({ isSuccessModalVisible: true })
        // else
        this.setState({ isSuccessModalVisible: true })

        this.setState({ propertyArrayState: responseJson })



      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });



  }



  render() {



    const actions = [
      {
        text: "Accessibility",
        //   icon: require('./images/ic_accessibility_white.png'),
        name: "bt_accessibility",
        position: 2
      },
      {
        text: "Language",
        //  icon: require('./images/ic_language_white.png'),
        name: "bt_language",
        position: 1
      },
      {
        text: "Location",
        // icon: require('./images/ic_room_white.png'),
        name: "bt_room",
        position: 3
      },
      {
        text: "Video",
        //icon: require('./images/ic_videocam_white.png'),
        name: "bt_videocam",
        position: 4
      }
    ];

    const callargs = {
      number: "9163139548", // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    return (
      <SafeAreaView style={globalstyles.safearea}>



        {/* MODAL FOR SUCCES MESSAGE */}
        <Modal
          onBackdropPress={() =>
            this.setState({ isSuccessModalVisible: false })
          }
          isVisible={this.state.isSuccessModalVisible}
        >
          <View
            style={{

              backgroundColor: "#ffffff",
              alignItems: "center"
            }}
          >
            <Image
              style={{ height: 60, width: 60, margin: 30 }}
              source={require("../Assets/Images/correctMark.png")}
            />
            <Text style={{ margin: 20, fontSize: 15 }}>
              Request Sent Successfully
              </Text>


            <Text
              onPress={() => {
                this.setState({ isSuccessModalVisible: false })

              }}
              style={{ margin: 12, color: orangemain, fontSize: 15 }}>
              OK
              </Text>

          </View>
        </Modal>








        <ScrollView style={{ backgroundColor: "#ffffff" }}>
          {/* TITLEBAR */}
          <View
            cardElevation={3}
            style={globalstyles.titlebarmain_timelinetenant}
          >
            {/* Drawer icon */}
            <TouchableOpacity
              onPress={() => {
                Actions.pop();
              }}
              style={globalstyles.menuicon_timelintenant}
            >
              <Image
                style={globalstyles.backstyle_notificationtenant}
                source={require("../Assets/Images/backarrow.png")}
              />
            </TouchableOpacity>

            <View style={globalstyles.titleview_timelinetenant}>
              <Text style={{ color: "#ffffff", fontSize: 22 }} />
            </View>
          </View>

          {/* BANNER */}
          {/* <View style={globalstyles.header_timelinetenant}>
            <View style={globalstyles.timelindetails_timelinetenants}>
              <Text style={globalstyles.username2_timelintenant}>{unitno}</Text>
              <Text style={globalstyles.username_timelintenant}>
                {propertyname}
              </Text>
              {/* <Text style={ globalstyles.username2_timelintenant} >{unitno}</Text> */}
          {/* </View> */}

          {/* <Image
              resizeMode="cover"
              style={globalstyles.headerimagestyle_timelinetenant}
              source={require("../Assets/Images/unitpageBg.png")}
            />
          </View> */}



          <View style={{ height: 20, backgroundColor: "#ffffff" }} ></View>

          <Carousel
            // layout={'stack'} layoutCardOffset={`18`}
            ref={(c) => { this._carousel = c; }}
            data={this.state.imagelist}
            renderItem={this._renderItem}
            sliderWidth={DeviceWidth}
            itemWidth={DeviceWidth * 0.8}
          />

          {/* <View style={{ backgroundColor: "#ff0000", width: 100, height: 100 }}></View> */}
          {/* DETAILS */}

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.5, backgroundColor: "#ffff" }} />
            <View style={globalstyles.contextmainview_unitdetailsproperty}>



              <View
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Text>Unit No: {this.state.unitdetailResState.flatHoseNo}</Text>
                <Text
                  style={[globalstyles.bluecontenttextstyle_unitdetailsproperty, { fontSize: 25 }]}
                >
                  {this.state.unitdetailResState.propertyName}
                </Text>
              </View>



              <View style={globalstyles.contextsubview_unitdetailsproperty}>
                <Text style={globalstyles.headertextstyle_unitdetailsproperty}>
                  Address
                </Text>
                <Text
                  style={globalstyles.addresstextstyle2_unitdetailsproperty}
                >
                  {this.state.unitdetailResState.streetName} , {this.state.unitdetailResState.city},{this.state.unitdetailResState.state},{this.state.unitdetailResState.pincode}
                </Text>
              </View>

              <View style={globalstyles.contextsubview2_unitdetailsproperty}>
                <View>
                  <Text
                    style={globalstyles.headertextstyle_unitdetailsproperty}
                  >
                    Flat / House Type Available
                  </Text>
                  <Text
                    style={
                      globalstyles.bluecontenttextstyle_unitdetailsproperty
                    }
                  >
                    {this.state.unitdetailResState.unitType}
                  </Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={globalstyles.headertextstyle_unitdetailsproperty}
                  >
                    Furnish Type
                  </Text>
                  <Text
                    style={
                      globalstyles.bluecontenttextstyle_unitdetailsproperty
                    }
                  >
                    {this.state.unitdetailResState.furnishing}
                  </Text>
                </View>
              </View>

              <View style={globalstyles.contextsubview2_unitdetailsproperty}>
                <View>
                  <Text
                    style={globalstyles.headertextstyle_unitdetailsproperty}
                  >
                    Rent Per Month
                  </Text>
                  <Text
                    style={
                      globalstyles.bluecontenttextstyle_unitdetailsproperty
                    }
                  >
                    {this.state.unitdetailResState.rentAmount}
                  </Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={globalstyles.headertextstyle_unitdetailsproperty}
                  >
                    Deposit
                  </Text>
                  <Text
                    style={
                      globalstyles.bluecontenttextstyle_unitdetailsproperty
                    }
                  >
                    {this.state.unitdetailResState.depositAmount}
                  </Text>
                </View>
              </View>

              <View style={globalstyles.contextsubview_unitdetailsproperty}>
                <Text style={globalstyles.headertextstyle_unitdetailsproperty}>
                  Landlord Name
                </Text>
                <Text
                  style={globalstyles.bluecontenttextstyle_unitdetailsproperty}
                >
                  {this.state.unitdetailResState.userName}
                </Text>
              </View>
            </View>
            <View style={{ flex: 0.5, backgroundColor: "#ffff" }} />
          </View>




          {/* <FloatingAction
                  //actions={actions}
                  onPressMain={ ()=> console.error("123123")}
                /> */}

          {/*
                <FAB 
                buttonColor={orangemain} 
                iconTextColor="#FFFFFF" 
                onClickAction={() => {call(callargs).catch(console.error)}} 
                visible={true} 
                 iconTextComponent={require("../Assets/Images/callback.png")}
                 /> */}

          {/* <TouchableOpacity style={globalstyles.callLand_unitdetailsproperty}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../Assets/Images/callAnswer.png")}
            />
          </TouchableOpacity> */}



        </ScrollView>


        <TouchableOpacity
          onPress={() => this.requestUnitFunction()}
          style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: bluemain, height: 70, position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <Text style={{ fontSize: 20, color: "#ffffff" }}>Request This Unit</Text>
          <Image

            style={{ width: 30, height: 30, marginLeft: 10 }}
            source={require("../Assets/Images/sendmsg_white.png")}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }


}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  slide: {
    // width: "100%",
    borderRadius: 10,
    backgroundColor: "#444444"
  }
});

