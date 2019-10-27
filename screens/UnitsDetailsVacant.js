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
  Switch,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  FlatList,
  SafeAreaView
} from "react-native";
import Modal from "react-native-modal";
import CardView from "react-native-cardview";
import globalstyles from "./styles";
import { bluemain } from "./styles";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
// import HideableView from 'react-native-hideable-view';
// import PropTypes from 'prop-types';
import { VIEW_MULTITENANT, TOGGLE_MULTITENANT } from "../logic/ApiConfig"





import {
  GET_UNIT_DETAILS,
  IMAGE_URL,
  VACATE_TENANT,
  REMOVE_LEASE,
  EDIT_LEASE,
  ADDUNIT_IMAGE
} from "../logic/ApiConfig";
import ImageSlider from "react-native-image-slider";
import { orangemain } from "./styles.android";
import ImagePicker from "react-native-image-picker";

export default class UnitsDetailsVacant extends Component {
  constructor(props) {
    super(props);

    // console.error(BASE_URL)
    // console.error("this is tenent id " + props.tenant_id + "    " + props.flat_id + "    " + props.tokenProps)
    this.state = {
      propstoken: this.props.tokenProps,
      rentAmtss: "",
      unit_details_State: {},
      unitImageLoaderState: false,
      paymentdayss: "",
      paymentfreqss: "",
      unitImageSucessState: false,
      dataUnits: [],
      dataUnitsFlatList: [],
      depositAmtss: "",
      switch1Value: false,
      lease_status: false,
      unitIDScreen: this.props.flat_id,
      tenant_id: this.props.tenant_id,
      linkedTenantState: false,
      leaseAdded: false,
      stateUserEmail: "",
      stateUserName: "",
      stateUserMobile: "",

      linkUnlink: "Link tenant",
      imgselected: false,
      path: "",
      roomImages: [],
      // tenantPress:false,

      paymentLog: [
        { date: "1.1.2019", payment: "300 USD", msg: "Rent" },
        { date: "2.1.2019", payment: "200 USD", msg: "Rent" },
        { date: "3.1.2019", payment: "20 USD", msg: "TapRepair" },
        { date: "4.1.2019", payment: "300 USD", msg: "Rent" }
      ]
    };
  }






  async componentWillMount() {

    // console.error(VIEW_MULTITENANT)


    await fetch(VIEW_MULTITENANT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        //'Content-Type': 'application/json',
        Authorization: this.state.propstoken
      },

      body: JSON.stringify({
        unit_id: this.props.unitIDScreen
      })
    })
      .then(Response => Response.json())
      .then(responseJson => {
        // console.error(responseJson)
        if (responseJson.linkMultiTenant === "0")
          this.setState({ switch1Value: false })
        else
          this.setState({ switch1Value: true })
      })






    await fetch(GET_UNIT_DETAILS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        //'Content-Type': 'application/json',
        Authorization: this.state.propstoken
      },

      body: JSON.stringify({
        UnitId: this.state.unitIDScreen
      })
    })
      .then(response => response.json())
      .then((responseJson) => {


        console.error(responseJson)
        if (responseJson.unit_details[0].onLease == "Yes") {
          this.setState({ linkedTenantState: true });
        }

        var imgs = [];

        responseJson.unit_img.map(function (item) {
          imgs.push(IMAGE_URL + item.home_img);
        });

        // console.error(imgs);
        this.setState({ roomImages: imgs });

        // console.error(this.state.roomImages)

        this.setState({
          unit_details_State: responseJson.unit_details[0],
          rentAmtss: responseJson.unit_details[0].rentAmount,
          paymentfreqss: responseJson.unit_details[0].paymentFrequency,
          depositAmtss: responseJson.unit_details[0].depositAmount,
          paymentdayss: responseJson.unit_details[0].paymentDay,
          // stateUserEmail: responseJson.unit_details[0].email,
          // stateUserName: responseJson.unit_details[0].userName,
          // stateUserMobile: responseJson.unit_details[0].phone,
        });

        if (responseJson.unit_details[0].userName === null) {
          this.setState({ dataUnits: responseJson.unit_details });
          console.warn("This is DataUnits" + this.state.dataUnits);
        } else {
          this.setState({ dataUnits: responseJson });
          console.warn("This is DataUnits" + this.state.dataUnits);
        }

        if (responseJson.unit_details[0].userName !== null) {
          this.setState({ dataUnitsFlatList: responseJson.unit_details });
          // console.error(this.state.dataUnitsFlatList)
        }
        else
          this.setState({ dataUnitsFlatList: [] });
        // console.warn(
        //   responseJson.unit_details[0].lease_status +
        //   " " +
        //   responseJson.unit_details[0].userName
        // );

        if (responseJson.unit_details[0].lease_status === "1") {
          // Alert.alert("Leased");
          this.setState({ lease_status: true });
        } else if (responseJson.unit_details[0].lease_status === "0") {
          // Alert.alert("Not Leased");
          this.setState({ lease_status: false });
        } else {
        }

        if (responseJson.unit_details[0].userName === null) {

          // Alert.alert("tenant has not  been linked")
          // this.setState({ linkUnlink: "link Tenant" })
          this.setState({ linkedTenantState: false })

        }
        else {

          // Alert.alert("tenant has been linked" + responseJson[0].userName)
          // this.setState({ linkUnlink: "Unlink Tenant" })
          this.setState({ linkedTenantState: true })

          // }
        }





      })
      .catch(error => {
        console.error(error);
      });
  }






  link_unlink_button(value) {




    if (this.state.lease_status === false)
      Alert.alert("Not Allowed", "Please add lease first")
    else
      Actions.TenantSearchList({ flat_id: value });
  }





  removeLeaseFunction() {





    if (this.state.linkedTenantState === true) {
      Alert.alert("Cannot Remove lease while tenant is added");
    }

    else {
      if (this.state.lease_status === true) {
        // Alert.alert(this.state.propstoken)
        fetch(REMOVE_LEASE, {
          method: "POST",
          headers: {
            Accept: "application/json",
            //'Content-Type': 'application/json',
            Authorization: this.state.propstoken
          },

          body: JSON.stringify({
            unitID: this.state.unitIDScreen
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            // console.error(responseJson);
            // Alert.alert("Lease Successfully Removed..");
            // this.componentDidMount();

            Alert.alert(
              "Alert",
              "Lease removed successfully..",
              [
                //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                  text: "Cancel",
                  onPress: () => console.warn("Cancel Pressed")
                  // style: 'cancel',
                },
                {
                  text: "OK",
                  onPress: () => {
                    console.warn("OK Pressed");

                    fetch(GET_UNIT_DETAILS, {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        //'Content-Type': 'application/json',
                        Authorization: this.state.tokenState
                      },

                      body: JSON.stringify({
                        UnitId: this.state.unitIDScreen
                      })
                    })
                      .then(response => response.json())
                      .then(responseJson => {
                        // console.error(responseJson);

                        if (responseJson.unit_details[0].onLease == "Yes") {
                          this.setState({ linkedTenantState: true });
                        }
                        // this.imageMap()

                        // rentAmtss: "",
                        //   paymentdayss: "",
                        //     paymentfreqss: "",
                        //       dataUnits: "",
                        //         depositAmtss: "",

                        var imgs = [];

                        // console.error(BASE_URL)

                        responseJson.unit_img.map(function (item) {
                          imgs.push(IMAGE_URL + item.home_img);
                        });

                        // console.error(imgs);
                        this.setState({ roomImages: imgs });

                        // console.error(this.state.roomImages)

                        this.setState({
                          rentAmtss: responseJson.unit_details[0].rentAmount,
                          paymentfreqss:
                            responseJson.unit_details[0].paymentFrequency,
                          depositAmtss:
                            responseJson.unit_details[0].depositAmount,
                          paymentdayss: responseJson.unit_details[0].paymentDay
                        });

                        if (responseJson.unit_details[0].userName === null) {
                          this.setState({ dataUnits: [] });
                          console.warn(
                            "This is DataUnits" + this.state.dataUnits
                          );
                        } else {
                          this.setState({ dataUnits: responseJson });
                          console.warn(
                            "This is DataUnits" + this.state.dataUnits
                          );
                        }

                        console.warn(
                          responseJson.unit_details[0].lease_status +
                          " " +
                          responseJson.unit_details[0].userName
                        );

                        if (responseJson.unit_details[0].lease_status === "1") {
                          // Alert.alert("Leased");
                          this.setState({ lease_status: true });
                        } else if (
                          responseJson.unit_details[0].lease_status === "0"
                        ) {
                          // Alert.alert("Not Leased");
                          this.setState({ lease_status: false });
                        } else {
                        }

                        // if (responseJson[0].userName === null) {

                        //   Alert.alert("tenant has not  been linked")
                        //   // this.setState({ linkUnlink: "link Tenant" })
                        //   this.setState({ linkedTenantState: false })

                        // }
                        // else {

                        //   Alert.alert("tenant has been linked" + responseJson[0].userName)
                        //   // this.setState({ linkUnlink: "Unlink Tenant" })
                        //   this.setState({ linkedTenantState: true })

                        // }
                      })
                      .catch(error => {
                        console.error(error);
                      });
                  }
                }
              ],
              { cancelable: false }
            );
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        Alert.alert("Lease Not yet added");
      }
    }
  }





  unlink_button(unitID, tenanID) {
    // Alert.alert(" " + unitID + " " + tenanID + "  " + this.state.propstoken)
    // console.error(tenanID)

    fetch(VACATE_TENANT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        //'Content-Type': 'application/json',
        Authorization: this.state.propstoken
      },

      body: JSON.stringify({
        tenant_id: tenanID,
        unit_id: unitID
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // Alert.alert("Tenant Has Been Vacated");
        // console.error(responseJson)
        Actions.popTo("PropertyDetailsOccupied");
      })
      .catch(error => {
        console.error(error);
      });
  }







  editLeaseFunction() {
    if (this.state.lease_status === true) {
      // Actions.AddLeaseToProperty({ "Action": "Edit Lease", "flat_id": this.state.unitIDScreen })
      Actions.replace("AddLeaseToProperty", {
        Action: "Edit",
        flat_id: this.state.unitIDScreen,
        tokenProps: this.state.propstoken,
      });
    } else {
      Alert.alert("Not Allowed", "Please add lease First");
    }
  }

  async addUnitImage() {
    var resp = await this.choosepic();

    // if (resp === 200)
    //   Alert.alert("Success")
    // else
    //   Alert.alert("Nope")
  }

  async choosepic() {
    await ImagePicker.showImagePicker(null, response => {
      //console.error('Response = ', response);
      if (response.didCancel) {
        return 100;
        // console.error("User cancelled image picker");
      } else if (response.error) {
        return 120;
        // console.error("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        return 140;
        // console.error("User tapped custom button: ", response.customButton);
      } else {
        //const source = { uri: response.uri };
        //console.error(response);

        const source = { uri: "file://" + response.path };
        //Alert.alert("IMAGE ADDRESS", source.text())

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          path: response.uri,
          imgselected: true
        });

        // Alert.alert("yes")

        this.imageUpload();
        return 200;
      }
    });
  }

  async imageUpload() {


    this.setState({ unitImageLoaderState: true })
    const formData = new FormData();

    if (this.state.path != null) {
      const uri = this.state.path;
      formData.append("selectFile", {
        uri: uri,
        name: "unitImage.jpg",
        type: "multipart/form-data"
      });
    }

    formData.append("id", this.state.unitIDScreen);

    // Alert.alert(formData)
    // console.error(ADDUNIT_IMAGE)

    await fetch(ADDUNIT_IMAGE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        tokenProps: this.state.propstoken
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {

        this.asdasdad()
        this.setState({ unitImageLoaderState: false, unitImageSucessState: true })

        // console.error(responseJson);
        // if (responseJson.msg === "success")
        //   Alert.alert("Success")
        // else
        //   Alert.alert("Error Adding Photo")
      })
      .catch(error => {
        console.error(error);
      });
  }





  async asdasdad() {

    fetch(GET_UNIT_DETAILS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        //'Content-Type': 'application/json',
        Authorization: this.state.tokenState
      },

      body: JSON.stringify({
        UnitId: this.state.unitIDScreen
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.error(responseJson);

        if (responseJson.unit_details[0].onLease == "Yes") {
          this.setState({ linkedTenantState: true });
        }
        // this.imageMap()

        // rentAmtss: "",
        //   paymentdayss: "",
        //     paymentfreqss: "",
        //       dataUnits: "",
        //         depositAmtss: "",

        var imgs = [];

        // console.error(BASE_URL)

        responseJson.unit_img.map(function (item) {
          imgs.push(IMAGE_URL + item.home_img);
        });

        // console.error(imgs);
        this.setState({ roomImages: imgs });

        // console.error(this.state.roomImages)

        this.setState({
          rentAmtss: responseJson.unit_details[0].rentAmount,
          paymentfreqss:
            responseJson.unit_details[0].paymentFrequency,
          depositAmtss:
            responseJson.unit_details[0].depositAmount,
          paymentdayss: responseJson.unit_details[0].paymentDay
        });

        if (responseJson.unit_details[0].userName === null) {
          this.setState({ dataUnits: [] });
          console.warn(
            "This is DataUnits" + this.state.dataUnits
          );
        } else {
          this.setState({ dataUnits: responseJson });
          console.warn(
            "This is DataUnits" + this.state.dataUnits
          );
        }

        console.warn(
          responseJson.unit_details[0].lease_status +
          " " +
          responseJson.unit_details[0].userName
        );

        if (responseJson.unit_details[0].lease_status === "1") {
          Alert.alert("Leased");
          this.setState({ lease_status: true });
        } else if (
          responseJson.unit_details[0].lease_status === "0"
        ) {
          Alert.alert("Not Leased");
          this.setState({ lease_status: false });
        } else {
        }

        // if (responseJson[0].userName === null) {

        //   Alert.alert("tenant has not  been linked")
        //   // this.setState({ linkUnlink: "link Tenant" })
        //   this.setState({ linkedTenantState: false })

        // }
        // else {

        //   Alert.alert("tenant has been linked" + responseJson[0].userName)
        //   // this.setState({ linkUnlink: "Unlink Tenant" })
        //   this.setState({ linkedTenantState: true })

        // }
      })
      .catch(error => {
        console.error(error);
      });
  }



  toggleApi() {


    fetch(TOGGLE_MULTITENANT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        //'Content-Type': 'application/json',
        Authorization: this.state.propstoken
      },

      body: JSON.stringify({
        unit_id: this.props.flat_id
      })
    })
      .then(Response => Response.json())
      .then(responseJson => {
        // console.error(responseJson)
        // if (responseJson.linkMultiTenant === "0")
        if (responseJson.status === true) {
          this.setState({ switch1Value: !this.state.switch1Value })
          if (this.state.switch1Value === true)
            Alert.alert("Unit Enabled for Tenant Search")
          else
            Alert.alert("Tenant Search Disabled")
        }
        else
          Alert.alert(responseJson)

      })



  }

  render() {


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>



        <Modal
          // onBackdropPress={() => this.setState({ isLoading: false })}
          isVisible={this.state.unitImageLoaderState}
        >
          <View style={{ padding: 20, backgroundColor: "#ffffff", }}>

            <Text style={{ fontSize: 20, fontWeight: "500" }}>Loading</Text>

            <View style={{ flexDirection: "row", backgroundColor: "#ffffff", alignItems: "center" }}>
              <ActivityIndicator size="large" color={bluemain} />
              <Text style={{ margin: 20, fontSize: 15 }}> Under Progress </Text>
            </View>
          </View>
        </Modal>






        <Modal isVisible={this.state.unitImageSucessState}>
          <View style={{ padding: 20, backgroundColor: "#ffffff" }}>


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
                Image Added Successfully
              </Text>


              <Text
                onPress={() => {
                  this.setState({ unitImageSucessState: false }),
                    Actions.popTo("PropertyDetailsVacant")
                }}
                style={{ margin: 12, color: orangemain, fontSize: 15 }}>
                OK
              </Text>
            </View>
          </View>
        </Modal>






        <View style={globalstyles.container_unitsDetails}>
          {/* TITLEBAR */}
          <View style={globalstyles.titlebarmain_timelinetenant}>
            {/* Drawer icon */}
            <TouchableOpacity
              onPress={() => {
                // Actions.PropertyDetailsVacant();
                Actions.pop();
              }}
              style={globalstyles.menuicon_timelintenant}
            >
              <Image
                style={globalstyles.menuImg_transactions}
                source={require("../Assets/Images/backarrow.png")}
              />
            </TouchableOpacity>

            <View style={globalstyles.titleview_timelinetenant}>
              <Text style={{ color: "#ffffff", fontSize: 22 }}>
                Unit Details
              </Text>
            </View>
          </View>





          <ScrollView>
            {/* MAIN BODY */}
            <View styles={globalstyles.mainbodycontainer_unitsDetails}>
              <TouchableOpacity
                onPress={() => this.addUnitImage()}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 70,
                  height: 70,
                  zIndex: 10,
                  position: "absolute",
                  top: 215,
                  right: 20,
                  backgroundColor: orangemain,
                  borderRadius: 200
                }}
              >




                <Image
                  style={{ height: 40, width: 40 }}
                  source={require("../Assets/Images/AddPhoto.png")}
                />
              </TouchableOpacity>

              <ImageSlider
                loopBothSides
                style={{ flex: 1, height: 250 }}
                // autoPlayWithInterval={3000}
                images={this.state.roomImages}
              />

              <View style={{ height: 50, backgroundColor: "#ffffff" }} />

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
                    {this.state.unit_details_State.furnishing}
                  </Text>
                </View>
              </View>


              <View style={{ flex: 1, margintop: 20, flexDirection: "row", justifyContent: "flex-start", marginLeft: 20, }}>


                <Switch
                  onValueChange={() => {
                    this.toggleApi()
                  }}
                  onTintColor="#f6541855"
                  thumbTintColor="#f65418"
                  tintColor="#00000022"
                  value={this.state.switch1Value} />


                <Text style={{ marginLeft: 10 }}>{this.state.switch1Value ? "Deactive for search Section" : "Activate for Search Section"}</Text>
              </View>






              {/* <TouchableOpacity
                // disabled={this.state.linkedTenantState}
                onPress={() => {
                  Actions.AddTransaction({
                    unit_id: this.state.unitIDScreen,
                    token: this.state.propstoken
                  });
                  // Alert.alert(this.state.path)
                }}
                style={globalstyles.paybtnview3_unitsDetails}
              >
                <Text style={{ color: "#ffffff" }}>Log Payment</Text>
                <Image
                  source={require("../Assets/Images/dollar.png")}
                  style={globalstyles.dollarImg_myhouse}
                />
              </TouchableOpacity> */}






              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 30
                }}
              >



                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    flex: 0.3,
                    backgroundColor: "#f3f3f3",
                    borderColor: orangemain,
                    borderRadius: 2,
                    borderWidth: 1
                  }}
                  onPress={() => {
                    if (this.state.lease_status === false) {
                      // Actions.AddLeaseToProperty({
                      //   flat_id: this.state.unitIDScreen
                      // });
                      Actions.replace("AddLeaseToProperty", {
                        Action: "Add",
                        flat_id: this.state.unitIDScreen,
                        tokenProps: this.state.propstoken,
                      });
                      // this.componentDidMount()
                      // Alert.alert("asd")
                    } else {
                      Alert.alert(
                        "Remove Lease to add New one or Edit Current Lease"
                      );
                    }
                  }}
                >
                  <Image
                    style={{ width: 30, height: 30, marginTop: 10 }}
                    source={require("../Assets/Images/orangePlus.png")}
                  />
                  <Text
                    style={{
                      marginTop: 10,
                      color: orangemain,
                      fontSize: 12,
                      marginBottom: 10
                    }}
                  >
                    Add Lease
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flex: 0.3,
                    alignItems: "center",
                    backgroundColor: "#f3f3f3",
                    borderColor: orangemain,
                    borderRadius: 2,
                    borderWidth: 1
                  }}
                  onPress={() => {
                    this.editLeaseFunction();
                  }}
                >
                  <Image
                    style={{ width: 30, height: 30, marginTop: 10 }}
                    source={require("../Assets/Images/orangeEdit.png")}
                  />
                  <Text
                    style={{
                      marginTop: 10,
                      color: orangemain,
                      fontSize: 12,
                      marginBottom: 10
                    }}
                  >
                    Edit Lease
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={!this.state.lease_status}
                  style={this.state.lease_status ? {
                    flex: 0.3,
                    alignItems: "center",
                    backgroundColor: "#f3f3f3",
                    borderColor: orangemain,
                    borderRadius: 2,
                    borderWidth: 1
                  } :
                    {
                      flex: 0.3,
                      alignItems: "center",
                      backgroundColor: "#f3f3f3",
                      borderColor: "#9e9e9e",
                      borderRadius: 2,
                      borderWidth: 1
                    }
                  }
                  onPress={() => {
                    this.removeLeaseFunction();
                  }}
                >
                  <Image
                    tintColor={this.state.lease_status ? null : "#9e9e9e"}
                    style={{ width: 30, height: 30, marginTop: 10 }}
                    source={require("../Assets/Images/orangeMinus.png")}
                  />
                  <Text
                    style={
                      this.state.lease_status ?
                        {
                          marginTop: 10,
                          color: orangemain,
                          fontSize: 12,
                          marginBottom: 10
                        } :
                        {
                          marginTop: 10,
                          color: "#9e9e9e",
                          fontSize: 12,
                          marginBottom: 10
                        }
                    }
                  >
                    Remove Lease
                  </Text>
                </TouchableOpacity>

                {/* BUTTON ADD NEW LEASE */}
                {/* <TouchableOpacity
                  disabled={!this.state.lease_status}
                  style={
                    this.state.lease_status
                      ? globalstyles.btnTxtView_unitsDetails
                      : globalstyles.btnTxtViewInActive_unitsDetails
                  }
                  // onPress={()=>{Actions.replace('AddLeaseToProperty',{flat_num:this.props.flat_num})}}>
                  onPress={() => {
                    Actions.AddLeaseToProperty({ "flat_id": this.state.unitIDScreen });
                    this.componentDidMount()
                  }}
                >
                  <Text style={globalstyles.btnTxt_unitsDetails}>
                    ADD NEW LEASE
                                        </Text>
                </TouchableOpacity> */}

                {/* BUTTON ADD NEW LEASE */}
                {/* <TouchableOpacity
                  // disabled={!this.state.lease_status}
                  style={globalstyles.btnTxtView_unitsDetails}
                  // onPress={()=>{Actions.replace('AddLeaseToProperty',{flat_num:this.props.flat_num})}}>
                  onPress={() => {
                    this.editLeaseFunction()
                  }}
                >
                  <Text style={globalstyles.btnTxt_unitsDetails}>
                    EDIT LEASE
                                        </Text>
                </TouchableOpacity> */}

                {/* BUTTON  REMOVE NEW LEASE */}
                {/* <TouchableOpacity
                  disabled={this.state.lease_status}
                  style={globalstyles.btnTxtView_unitsDetails}
                  // onPress={()=>{Actions.replace('AddLeaseToProperty',{flat_num:this.props.flat_num})}}>
                  onPress={() => {
                    this.removeLeaseFunction()
                  }}
                >
                  <Text style={globalstyles.btnTxt_unitsDetails}>
                    REMOVE LEASE
                                        </Text>
                </TouchableOpacity> */}


              </View>








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
                      <View
                        style={globalstyles.line_unitsDetailsLeaseCardview}
                      />

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
                        <Text
                          style={globalstyles.txt_unitsDetailsLeaseCardview}
                        >
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
                        <Text
                          style={globalstyles.txt_unitsDetailsLeaseCardview}
                        >
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
                        <Text
                          style={globalstyles.txt_unitsDetailsLeaseCardview}
                        >
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
                        <Text
                          sstyle={globalstyles.txt_unitsDetailsLeaseCardview}
                        >
                          {this.state.depositAmtss}
                        </Text>
                      </View>
                    </View>
                  </CardView>
                </View>
              </View>

              {/* 
              <TouchableOpacity style={globalstyles.paybtnview2_unitsDetails}>
                <Text

                >
                  Upload Documents
                        </Text>

              </TouchableOpacity> */}








              {/* BUTTON LINK TENANT */}
              <TouchableOpacity
                // disabled={!this.state.lease_status}
                style={this.state.lease_status === true ? {
                  backgroundColor: "#f65418",
                  width: 100,

                  height: 38,
                  borderRadius: 50,
                  justifyContent: "center",
                  marginTop: 50,
                  marginLeft: 10,
                  marginBottom: 10
                } :
                  {
                    backgroundColor: "#d3d3d3",
                    width: 100,
                    height: 38,
                    borderRadius: 50,
                    justifyContent: "center",
                    marginTop: 50,
                    marginLeft: 10,
                    marginBottom: 10
                  }}
                onPress={() => {
                  this.link_unlink_button(this.props.flat_id);
                }}
              >
                <Text style={globalstyles.btnTxt_unitsDetails}>
                  link Tenant
                </Text>
              </TouchableOpacity>








              <View style={{ marginLeft: 20, marginRight: 20, marginTop: 5 }}>
                <Text style={globalstyles.tenantTxt_unitsDetailsBlurTxt}>
                  Tenant Details
                </Text>

                {/* CARDVIEW TENANT DETAILS */}

                <FlatList
                  data={this.state.dataUnitsFlatList}
                  renderItem={({ item }) => (
                    <CardView
                      style={globalstyles.cardview_unitsDetailsTenantcardview}
                      cardElevation={2}
                      cardMaxElevation={4}
                      cornerRadius={3}
                    >
                      <Text
                        style={
                          globalstyles.tenantNameTxt_unitsDetailsTenantcardview
                        }
                      >
                        {item.userName}
                      </Text>
                      <Text
                        style={
                          globalstyles.tenantEmailTxt_unitsDetailsTenantcardview
                        }
                      >
                        {item.email}
                      </Text>
                      <Text
                        style={
                          globalstyles.tenantphoneTxt_unitsDetailsTenantcardview
                        }
                      >
                        {item.phone}
                      </Text>

                      {/* BUTTON UNLINK TENANT */}
                      <TouchableOpacity
                        style={globalstyles.btnTxtView2_unitsDetails}
                        onPress={() => {
                          this.unlink_button(
                            this.props.flat_id,
                            item.tenant_id
                          );
                          // Alert.alert(item.tenant_id)
                        }}
                      >
                        <Text style={globalstyles.btnTxt_unitsDetails}>
                          unlink
                        </Text>
                      </TouchableOpacity>
                    </CardView>
                  )}
                />
              </View>



              {/* USERNAME DETAILS */}

              {/* <View
                style={{ margin: 20, backgroundColor: "#ececec" }}
              >

                <View style={{ margin: 10 }}>
                  <Text style={{ color: bluemain, fontSize: 12 }}>Tenant name: <Text style={{ color: "#999999", fontSize: 17 }}>{this.state.stateUserName}</Text> </Text>
                  <Text style={{ color: bluemain, fontSize: 12 }}>EmailId: <Text style={{ color: "#999999", fontSize: 17 }}>{this.state.stateUserEmail}</Text> </Text>
                  <Text style={{ color: bluemain, fontSize: 12 }}>Mobile No: <Text style={{ color: "#999999", fontSize: 17 }}>{this.state.stateUserMobile}</Text> </Text>
                </View>

              </View> */}





              {/* VACATE BUTTON */}
              {/* <TouchableOpacity
                onPress={() => this.unlink_button(this.state.unitIDScreen, this.state.tenant_id)}
                style={globalstyles.bottomView2_myhouse}

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
            </View >
          </ScrollView >
        </View >
      </SafeAreaView >
    );



  }
  //}
}
