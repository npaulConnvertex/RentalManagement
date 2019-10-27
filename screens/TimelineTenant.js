/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AsyncStorage, ScrollView, Platform, Image, StyleSheet, FlatList, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import Modal from "react-native-modal";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";

//imjport screens
import globalstyles from './styles';
import { bluemain } from './styles.android';






export default class HomeChats extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSearchLandlordModalVisible: false,
      status: false,
      sUsername: "",
    }

  };








  async componentDidMount() {

    await AsyncStorage.multiGet(["token", "email_id", "username", "phone"]).then(response => {
      console.warn(response[0][1])
      this.setState({ sUsername: response[2][1] })
      //  console.warn(response[0][1]) // Value1
      //  console.warn(response[1][0]) // Key2
      //  console.warn(response[1][1]) // Value2


      // Saving a key to recognize at signin process
      if (response[0][1] !== null) {
        // console.error(response[0][1]);
        AsyncStorage.multiSet([['usertoken', response[0][1]], ['usertoken2', 'tenant']],
          function (error) {
            //alert("finished");
            if (error) {
              alert("error!");
            } else {
              //  console.warn("saved to internal storage")
            }
          });
      }
    })

  }










  render() {


    const flatlistdata = [

      { eventname: "October Rent Paid", eventType: "Payment", time: "10", date: "12.10.2018" },
      { eventname: "Service request has been approved", eventType: "Service", time: "9", date: "11.10.2018" },
      { eventname: "Winter Celebration", eventType: "Notice", time: "3", date: "5.10.2018" },
      { eventname: "SeptemberRent Paid", eventType: "Payment", time: "1", date: "20.9.2018" },
      { eventname: "Service request has been approved", eventType: "Service", time: "9", date: "6.9.2018" },
      { eventname: "Group Meeting", eventType: "Notice", time: "9", date: "5.9.2018" },
      { eventname: "SeptemberRent Paid", eventType: "Payment", time: "7", date: "20.9.2018" },
      { eventname: "Service request has been approved", eventType: "Service", time: "12", date: "6.9.2018" },
      { eventname: "Group Meeting", eventType: "Notice", time: "11", date: "5.9.2018" },
    ]



    let { landlordName } = this.state;




    //     if (this.state.status === true) {

    //       return (
    //         <SafeAreaView style={globalstyles.safearea}>
    //           <View style={{ flex: 1, backgroundColor: "#f3f3f3", }}>



    //             {/* TITLEBAR */}
    //             <View style={globalstyles.titlebarmain_timelinetenant}>

    //               {/* Drawer icon */}
    //               <TouchableOpacity
    //                 onPress={() => { Actions.drawerOpen() }}
    //                 style={globalstyles.menuicon_timelintenant}>
    //                 <Image
    //                   style={globalstyles.menuImg_transactions}
    //                   source={require('../Assets/Images/menu.png')}
    //                 />
    //               </TouchableOpacity>


    //               <View style={globalstyles.titleview_timelinetenant}>
    //                 <Text style={{ color: "#ffffff", fontSize: 22 }}>Timeline</Text>
    //               </View>


    //               <View style={{ flex: 0.1, padding: 10 }}>
    //                 <TouchableOpacity
    //                   onPress={() => { Actions.NotificationsTenant() }}
    //                   style={{ flex: 1, flexDirection: "row" }} >
    //                   <Image
    //                     style={{ width: 25, height: 25, }}
    //                     source={require('../Assets/Images/notifications.png')}
    //                   />
    //                   <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: "#ff3333" }}>
    //                   </View>
    //                 </TouchableOpacity>
    //               </View>

    //             </View>





    //             <ScrollView>

    //               {/*  HEADER */}
    //               <View style={globalstyles.header_timelinetenant}>

    //                 <View style={globalstyles.timelindetails_timelinetenants}>
    //                   <Text style={globalstyles.username2_timelintenant} >Hello</Text>
    //                   <Text style={globalstyles.username_timelintenant} >{this.state.sUsername}</Text>
    //                   <Text style={globalstyles.username2_timelintenant} >This is your Timeline</Text>

    //                 </View>

    //                 <Image
    //                   resizeMode="cover"
    //                   style={globalstyles.headerimagestyle_timelinetenant}
    //                   source={require("../Assets/Images/tenanttimeline.png")}
    //                 />

    //               </View>




    //               {/* TIMELINE */}
    //               <View style={globalstyles.notimelineview2_timelinetenant}>
    //                 {/* <Image 
    //                   style={globalstyles.notimelineimagestyle_timelinetenant}
    //                   source={require("../Assets/Images/notimeline.png")}
    //                     />
    //                     <Text  style={globalstyles.notimelinetext_timelinetenant}>
    //                     currently you dont have anything going on.</Text> */}



    //                 <FlatList
    //                   data={flatlistdata}
    //                   renderItem={
    //                     ({ item }) =>

    //                       <View style={globalstyles.itemflat1_timelinetenant}>
    //                         <View style={{ flex: 0.03, }}></View>
    //                         <View style={{ flex: 0.94 }}>

    //                           <CardView
    //                             cardElevation={2}
    //                             cornerRadius={3}
    //                           >
    //                             <View style={{ flexDirection: "row", backgroundColor: "#ffffff" }}>
    //                               <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
    //                                 <Text style={globalstyles.time1_timelinetenant}>{item.time}</Text>
    //                                 <Text>PM</Text>
    //                               </View>


    //                               <View style={{ flex: 0.05, justifyContent: "center", alignItems: "center" }}>
    //                                 <View style={{ width: 10, height: 10, borderRadius: 40, backgroundColor: item.eventType === "Notice" ? "#eec10b" : (item.eventType === "Payment" ? "#39b54a" : "#c651a1"), }}></View>
    //                               </View>

    //                               <View style={globalstyles.flex3_timelinetenant}>
    //                                 <Text style={{ fontSize: 12, fontStyle: "italic" }}>{item.eventType}</Text>
    //                                 <Text style={{ fontSize: 17, fontWeight: "400" }}>{item.eventname}</Text>

    //                               </View>


    //                               <View style={globalstyles.flex4_timelinetenant}></View>


    //                             </View>
    //                           </CardView>
    //                         </View>
    //                         <View style={{ flex: 0.03, }}></View>
    //                       </View>
    //                   }
    //                 />
    //               </View>


    //             </ScrollView>





    //           </View>
    //         </SafeAreaView>
    //       );
    //     }
    //     else {
    //       return (
    //         <SafeAreaView style={globalstyles.safearea}>
    //           <View style={{ flex: 1, backgroundColor: "#f3f3f3", }}>



    //             {/* MODAL */}
    //             <Modal
    //               onBackdropPress={() => { this.setState({ isSearchLandlordModalVisible: false }) }}
    //               onBackButtonPress={() => { this.setState({ isSearchLandlordModalVisible: false }) }}
    //               isVisible={this.state.isSearchLandlordModalVisible}
    //             >
    //               <View style={globalstyles.mainview_myhouseModal}>
    //                 <TouchableOpacity
    //                   onPress={() => { this.setState({ isSearchLandlordModalVisible: false }) }}
    //                   style={{ alignItems: "flex-end" }}
    //                 >
    //                   <Image
    //                     source={require("../Assets/Images/close_gray.png")}
    //                     style={{ width: 20, height: 20 }}
    //                   />
    //                 </TouchableOpacity>


    //                 <Text style={{ fontSize: 20, fontWeight: "500" }}>Searh landlord</Text>

    //                 {/*     SELECT LANDLORD BASED ON THAT LIST OF ALL THE PROPERTIES WILL COME */}
    //                 {/*      CLICK ONE OF THE PROPERTIES AND WILL DISPLAY A LIST OF ALL THE UNITS UNDER AND 
    //           THEN REQUEST CAN BE SENT FROM ANY OF THEM TO LANDLORD
    // */}
    //                 <View style={{ marginTop: 20 }}>

    //                   <TextField
    //                     label="Enter Landlord name"
    //                     value={landlordName}
    //                     onChangeText={messagetitle => this.setState({ messagetitle })}
    //                     style={globalstyles.txtfield_myhouseModal}
    //                   />

    //                 </View>

    //                 <View style={{ marginTop: 20 }}>



    //                 </View>


    //                 <TouchableOpacity onPress={() => this.modelhide()}>
    //                   <Text style={globalstyles.sendtxt_myhouseModal}>
    //                     Search Properties
    //                         </Text>
    //                 </TouchableOpacity>


    //               </View>
    //             </Modal>






    //             {/* TITLEBAR */}
    //             <View style={globalstyles.titlebarmain_timelinetenant}>

    //               {/* Drawer icon */}
    //               <TouchableOpacity
    //                 onPress={() => { Actions.drawerOpen() }}
    //                 style={globalstyles.menuicon_timelintenant}>
    //                 <Image
    //                   style={globalstyles.menuImg_transactions}
    //                   source={require('../Assets/Images/menu.png')}
    //                 />
    //               </TouchableOpacity>


    //               <View style={globalstyles.titleview_timelinetenant}>
    //                 <Text style={{ color: "#ffffff", fontSize: 22 }}>Timeline</Text>
    //               </View>


    //               <View style={{ flex: 0.1, padding: 10 }}>
    //                 <TouchableOpacity
    //                   onPress={() => { Actions.NotificationsTenant() }}
    //                   style={{ flex: 1, flexDirection: "row" }} >
    //                   <Image
    //                     style={{ width: 25, height: 25, }}
    //                     source={require('../Assets/Images/notifications.png')}
    //                   />
    //                   <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: "#ff3333" }}>
    //                   </View>
    //                 </TouchableOpacity>
    //               </View>

    //             </View>





    //             <ScrollView>

    //               {/*  HEADER */}
    //               <View style={globalstyles.header_timelinetenant}>

    //                 <View style={globalstyles.timelindetails_timelinetenants}>
    //                   <Text style={globalstyles.username2_timelintenant} >Hello</Text>
    //                   <Text style={globalstyles.username_timelintenant} >{this.state.sUsername}</Text>
    //                   <Text style={globalstyles.username2_timelintenant} >This is your Timeline</Text>

    //                 </View>

    //                 <Image
    //                   resizeMode="cover"
    //                   style={globalstyles.headerimagestyle_timelinetenant}
    //                   source={require("../Assets/Images/tenanttimeline.png")}
    //                 />

    //               </View>



    //               <View style={{ justifyContent: "center", alignItems: "center" }}>




    //                 <View style={{ marginTop: 40, justifyContent: "center", alignItems: "center" }}>
    //                   <Text style={{ fontSize: 30, }}>New Around Here?</Text>
    //                   <Text>Search your property.</Text>
    //                 </View>



    //                 <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", marginTop: 30 }}>

    //                   <CardView style={{ marginRight: 20, padding: 20 }}>
    //                     <TouchableOpacity
    //                       onPress={() => this.setState({ isSearchLandlordModalVisible: true })}
    //                       style={{ justifyContent: "center", alignItems: "center" }}>
    //                       <Image
    //                         style={{ width: 70, height: 70 }}
    //                         source={require("../Assets/Images/landlordsearch.png")}
    //                       />
    //                       <Text>Search By Landlord</Text>
    //                     </TouchableOpacity>
    //                   </CardView>


    //                   <CardView style={{ marginRight: 20, padding: 20, justifyContent: "center", alignItems: "center" }}>
    //                     <TouchableOpacity
    //                       onPress={() => Actions.Searchproperties()}
    //                       style={{ justifyContent: "center", alignItems: "center" }}>
    //                       <Image
    //                         style={{ width: 70, height: 70 }}
    //                         source={require("../Assets/Images/propertiesSearch.png")}
    //                       />
    //                       <Text>Search By Properties</Text>
    //                     </TouchableOpacity>
    //                   </CardView>



    //                 </View>
    //               </View>
    //             </ScrollView>





    //           </View>
    //         </SafeAreaView >
    //       );
    //     }



  }




}




