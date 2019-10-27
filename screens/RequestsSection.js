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
  Image,
  Text,
  FlatList,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  View,
  TouchableOpacity
} from "react-native";
import { Actions, Scene, Router, Tabs } from "react-native-router-flux";
import CardView from "react-native-cardview";
import { Dropdown } from "react-native-material-dropdown";
import Modal from "react-native-modal";
import { TextField } from "react-native-material-textfield";

//imjport screens
import globalstyles from "./styles";
import { bluemain, orangemain } from "./styles";

import { requestDetailsSectionConst, updaterequestDetailsConst } from "../logic/RequestSectionApi"




var statusList = [
  {
    value: "Accept",
    id: "1",
  }

  ,

  {
    value: "Decline",
    id: "2",
  }

  ,


  {
    value: "Delete",
    id: "3"
  }


]





export default class Notice extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      name: "hello",
      successdialof: false,
      loggedIn: false,
      refreshing: false,
      isActionDialogVisible: false,
      isAddModalVisible: false,
      currentState: "not-panic",
      listState: [],
      jsondata: [
        {
          propertyname: "Sandalwood Apartment",
          noticeheader: "Winter Celebration",
          noticedate: "12/2/2018",
          noticetime: "12.00PM",
          status: "0"
        },

        {
          propertyname: "Sandalwood Apartment",
          noticeheader: "MArraige Anniversary",
          noticedate: "12/2/2018",
          noticetime: "8.00PM",
          status: "1"
        },
        {
          propertyname: "Precision",
          noticeheader: "Friday Night Party",
          noticedate: "12/2/2018",
          noticetime: "4.00AM",
          status: "2"
        },
        {
          propertyname: "Mount Juhi",
          noticeheader: "Robbery",
          noticedate: "12/2/2018",
          noticetime: "9.00AM",
          status: "0"
        }
      ]
    };
  }




  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.multiGet(["token", "email_id", "username", "phone"]).then(response => {
        console.warn(response[1][1])
        this.setState({ sUsername: response[2][1], token: response[0][1] })
        //  console.warn(response[0][1]) // Value1
        //  console.warn(response[1][0]) // Key2
        //  console.warn(response[1][1]) // Value2


        // Saving a key to recognize at signin process
        if (response[0][1] !== null) {
          // console.error(response[0][1]);
          AsyncStorage.multiSet([['usertoken', response[0][1]], ['usertoken2', 'tenant']],
            function (error) {
              // alert("finished");
              if (error) {
                alert("error!");
              } else {
                // console.warn("saved to internal storage")
              }
            });
        }
      })
    } catch (error) {
      // Error retrieving data
    }
  };






  async  componentWillMount() {


    await this._retrieveData()


    // console.warn(this.state.token)

    await this.getList()



  }








  getList() {

    requestDetailsSectionConst(this.state.token)
      .then((responseJson) => {

        console.error(responseJson);
        this.setState({ listState: responseJson, refreshing: false })
        // console.error(this.state.listState)

      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });

  }

  async setStatus(value, index) {

    this.setState({ asdas: this.state.listState[index].id })


  }







  // tenant_id





  async openOrNot(value, id, index) {



    await this.setState({ uid: id, indexState23: index })
    this.setState({ isActionDialogVisible: true })


    // console.warn(value)
    // if (value === "1" || value == "2") {

    // }
    // else {
    //   this.setState({ isActionDialogVisible: true })
    // }



  }








  updateStatus(value) {
    // console.error(value);


    updaterequestDetailsConst(this.state.token, this.state.listState[this.state.indexState23].tenant_id, this.state.uid, value)
      .then((responseJson) => {


        // this.setState({ unitdetailResState: responseJson.data, unitImagesState: responseJson.image })
        // console.error(responseJson)
        this.setState({ isActionDialogVisible: false, successdialof: true })

      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });


    if (value === "3") {
      var array = [...this.state.listState]; // make a separate copy of the array
      var index = this.state.indexState23
      if (index !== -1) {
        array.splice(index + 1, 1);
        this.setState({ listState: array });
      }
    }
    else {
      var array = [...this.state.listState]; // make a separate copy of the array
      var index = this.state.indexState23
      array[index].status = parseInt(value);
      this.setState({ listState: array });
      console.warn(index)

    }



  }








  _handleRefresh = () => {

    this.setState({ refreshing: true });
    this.getList();

    //console.error(this.state.userToken1)
  };









  render() {
    return (
      <SafeAreaView style={globalstyles.safearea}>



        {/* MODAL FOR SUCCES MESSAGE */}
        <Modal
          onBackdropPress={() =>
            this.setState({ successdialof: false })
          }
          isVisible={this.state.successdialof}
        >
          <View style={{ padding: 20, backgroundColor: "#ffffff" }}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>Success</Text>

            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#ffffff",
                alignItems: "center"
              }}
            >
              <Text style={{ marginTop: 20, fontSize: 15 }}>
                {" "}
                Request was updated successfully
                 {" "}
              </Text>
            </View>
          </View>
        </Modal>






        <Modal
          style={{ justifyContent: "center", }}
          onBackButtonPress={() => this.setState({ isActionDialogVisible: false })}
          onBackdropPress={() => this.setState({ isActionDialogVisible: false })}
          isVisible={this.state.isActionDialogVisible}>


          <View style={globalstyles.mainView_addPropertyModal}>

            <Text style={{ fontSize: 20, fontWeight: "500" }}>Update the Status</Text>


            <Dropdown
              label="Select"
              data={statusList}
              onChangeText={(value, index) => {
                this.setState({ statusID: statusList[index].id })
                // console.error("sadasd")
              }
              }
            />




            {/* <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}> */}

            <TouchableOpacity
              onPress={() => this.updateStatus(this.state.statusID)}
              style={{ margin: 20, alignSelf: "center", borderRadius: 300, width: 200, height: 50, backgroundColor: orangemain, justifyContent: "center", alignItems: "center" }} >
              <Text style={{ color: "white" }}>Update</Text>
            </TouchableOpacity>

            {/* </View> */}

          </View>



        </Modal>



        <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
          {/* TITLE BAR */}
          <CardView style={globalstyles.titlebarmain_timelinetenant}>
            {/* Drawer icon */}
            <TouchableOpacity
              onPress={() => {
                Actions.drawerOpen();
              }}
              style={globalstyles.menuicon_timelintenant}
            >
              <Image
                style={globalstyles.backstyle_notificationtenant}
                source={require("../Assets/Images/menu.png")}
              />
            </TouchableOpacity>

            <View style={globalstyles.titleview_timelinetenant}>
              <Text style={{ color: "#ffffff", fontSize: 22 }}>
                Request Section
              </Text>
            </View>
          </CardView>





          <View
            style={{
              flex: 1,
              backgroundColor: "#f3f3f3",
              marginTop: 20,
              marginBottom: 40
            }}
          >




            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._handleRefresh}
                />
              }
            >

              <View style={{ marginTop: 10, height: 10, marginBottom: 30, width: "100%", height: 20, alignItems: "center", }}>
                <Text style={{ color: bluemain }}>Pull To Refresh</Text>
              </View>



              <FlatList
                data={this.state.listState}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 10,
                      marginBottom: 10
                    }}
                  >



                    <TouchableOpacity
                      onPress={() => this.openOrNot(item.status, item.id, index)}
                      style={globalstyles.peoplelisttouch_homepeople}>

                      <View
                        style={{
                          flex: 0.7,
                          backgroundColor: "#ffffff",
                          marginLeft: 10
                        }}
                      >
                        <Text style={globalstyles.propertyname_notice}>
                          {item.propertyName}
                        </Text>
                        <Text style={globalstyles.headingmessage_notice}>
                          {item.userName}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 0.3,
                          backgroundColor: "#ffffff",
                          alignItems: "flex-end",
                          marginRight: 10
                        }}
                      >

                        <Text style={globalstyles.noticedate_notice}>
                          {item.unitType}
                        </Text>

                        <View
                          style={{ width: 100, height: 30, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: item.status == "0" ? "#ff9900" : item.status == "1" ? "#009933" : "#cc3300" }}
                        >
                          <Text style={{ color: "white" }}>{item.status == "0" ? "Pending..." : item.status == "1" ? "Accepted" : "Declined"}</Text>
                        </View>

                      </View>


                    </TouchableOpacity>








                  </View>
                )}
              />

            </ScrollView>


          </View>
        </View >
      </SafeAreaView >
    );
  }
}
