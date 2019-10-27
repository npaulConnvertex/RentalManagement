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
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
  SafeAreaView
} from "react-native";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import CardView from "react-native-cardview";
import Modal from "react-native-modal";
import globalstyles from "./styles";
import { Actions } from "react-native-router-flux";
import { bluemain, orangemain } from "./styles";


import { GET_ALL_UNITS, ADD_UNIT_TO_PROPERTY, GET_PROPERTY_DETAILS_WITH_UNTS } from "../logic/ApiConfig"



const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});





export default class PropertyDetailsVacant extends Component {
  constructor(props) {
    super(props);




    this.state = {
      LoaderState: false,
      flatHoseNoState: '',
      tokenState: '',
      propertyImage_linkState: "",
      unitFurnishType: '',
      propertyIDState: '',
      yOffset: 0,
      propertyType: "",
      units: 0,
      successMessage1: false,
      unitRoomType: '',
      users: [],
      ValueState: "",
      Valuecity: "",
      ValueCountry: "",
      ValuePropertyName: "",
      isModalVisible: false
    };
  }







  async componentDidMount() {

    await this._retrieveData()


    // console.error(this.state.tokenState)
    // console.warn(this.state.propertyIDState)


    await fetch(GET_PROPERTY_DETAILS_WITH_UNTS, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.tokenState
      },
      body: JSON.stringify({
        propertyId: this.state.propertyIDState
      }),
    }).then(response => response.json())
      .then((responseJson) => {

        console.error(responseJson)
        this.setState({ users: responseJson.list, totalunitsState: responseJson.totalUnits })
        // console.error(responseJson.totalUnits[0].totalUnits)

      })
      .catch(error => {
        console.error(error);
      });

  }










  _retrieveData = async () => {

    // Alert.alert("Triggered")


    try {


      await AsyncStorage.multiGet(["token", "propertyVacantID", "propertyImage_link", "propertyType", "sPropertyName", "sCountry", "sCity", "sState"]).then(response => {

        this.setState({ tokenState: response[0][1] })
        this.setState({ propertyIDState: response[1][1] })
        this.setState({ propertyImage_linkState: response[2][1] })
        this.setState({ propertyType: response[3][1] })
        this.setState({ ValuePropertyName: response[4][1] })
        this.setState({ ValueCountry: response[5][1] })
        this.setState({ Valuecity: response[6][1] })
        this.setState({ ValueState: response[7][1] })
      })



    } catch (error) {
      // Error retrieving data
    }
  };









  async submitUnitDetails() {

    this.modelhide()


    this.setState({ LoaderState: true })
    await fetch(ADD_UNIT_TO_PROPERTY, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.tokenState
      },
      body: JSON.stringify({

        flatHoseNo: this.state.flatHoseNoState,
        unitType: this.state.unitRoomType,
        furnishing: this.state.unitFurnishType,
        propertyId: this.state.propertyIDState
      }),
    }).then(response => response.json())
      .then((responseJson) => {

        this.setState({ LoaderState: false, successMessage1: true })
        // console.error(responseJson)


        // this.setState({ users: responseJson.data })
      })
      .catch(error => {
        console.warn(error);
      });


    this.componentDidMount()


  }

  modelshow() {
    this.setState({ isModalVisible: true });
  }

  modelhide() {
    this.setState({ isModalVisible: false });
  }


  async addNewUnit() {

    if (this.state.propertyType === "singleunit" && parseInt(this.state.totalunitsState) === 1)
      Alert.alert("Only Single unit can be added to this unit")
    else
      this.setState({ isModalVisible: true });


  }



  render() {

    let data = [
      { value: "1 RK" },
      { value: "1 BHK" },
      { value: "2 BHK" },
      { value: "3 BHK" },
      { value: "4 BHK" },
      { value: "4+ BHK" }
    ];

    let datas = [
      { value: "Fully Furnished" },
      { value: "Semi Furnished" },
      { value: "UnFurnished" }
    ];

    return (
      <SafeAreaView style={globalstyles.safearea}>


        {/* <OfflineNotice /> */}

        <View style={globalstyles.container}>





          <Modal isVisible={this.state.successMessage1}>
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
                  Unit has Added Successfully
              </Text>


                <Text
                  onPress={() => {
                    this.setState({ successMessage1: false }),
                      console.log("asda")
                  }}
                  style={{ margin: 12, color: orangemain, fontSize: 15 }}>
                  OK
              </Text>
              </View>
            </View>
          </Modal>








          <Modal
            // onBackdropPress={() => this.setState({ isLoading: false })}
            isVisible={this.state.LoaderState}
          >
            <View style={{ padding: 20, backgroundColor: "#ffffff", }}>

              <Text style={{ fontSize: 20, fontWeight: "500" }}>Loading</Text>

              <View style={{ flexDirection: "row", backgroundColor: "#ffffff", alignItems: "center" }}>
                <ActivityIndicator size="large" color={bluemain} />
                <Text style={{ margin: 20, fontSize: 15 }}> Under Progress </Text>
              </View>
            </View>
          </Modal>





          {/* HEADER */}
          <View style={globalstyles.headercontainer_propertydetails}>
            <TouchableOpacity
              onPress={() => Actions.OccupiedProperty({ asd: "asd" })}
              style={globalstyles.menuImgView_propertyDetails}>
              <Image
                source={require("../Assets/Images/backarrow.png")}
                style={globalstyles.menuImg_propertyDetails}
              />
            </TouchableOpacity>

            <Text style={globalstyles.titleTxt_propertyDetails}>
              Properties
            </Text>


          </View>




          {/* MAIN BODY */}
          <View style={{ flex: 1, }}>


            <ScrollView
              // onScroll={event => {
              //   this.state.yOffset = event.nativeEvent.contentOffset.y
              //   console.warn(this.state.yOffset)
              // }}
              style={{ backgroundColor: "#ffffff", }}>



              <View style={{ flex: 1, height: 300, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{ height: 250, width: 500, flex: 0.9, borderRadius: 10 }}
                  source={{ uri: this.state.propertyImage_linkState }}
                />
              </View>


              <View style={globalstyles.mainbodyTitleView_propertyDetails}>


                <Text style={globalstyles.mainbodyTitleTxt_propertyDetails}>
                  Property Details
                </Text>


                {/* PROPERTY NAME*/}
                <View style={globalstyles.propertyNameView_peropertyDetails}>
                  <Image
                    source={require("../Assets/Images/home-outline.png")}
                    style={globalstyles.propertyNameImg_propertydetails}
                  />
                  <Text style={globalstyles.propertyNameTxt_propertyDetails}>
                    {this.state.ValuePropertyName}
                  </Text>
                </View>



                <View style={{ marginBottom: 20 }}>
                  <Text>Total Units: <Text style={{ fontWeight: "500" }}>{this.state.totalunitsState}</Text></Text>
                </View>




                {/* PROPERTY ADDRESS*/}
                <View style={globalstyles.propertyAddressView_propertyDetails}>

                  <View style={{ flexDirection: "row", alignItems: "center", }}>
                    <Text style={{ fontSize: 15, fontWeight: "500" }}>Country</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10 }}>{this.state.ValueCountry}</Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "500" }}>State</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10 }}>{this.state.ValueState}</Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "500" }}>City</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10 }}>{this.state.Valuecity}</Text>
                  </View>


                  {/* <Text
                    style={globalstyles.propertyAddressZipTxt_propertyDetails}
                  >
                    411022
                  </Text> */}
                </View>




              </View>



              {/* ALL VACANT UNITS*/}
              <View style={globalstyles.mainView_propertyDetailsUnit}>


                <Text style={globalstyles.mainViewTitleTxt_propertyDetailsUnit}>
                  All Vacant Units
                </Text>




                <FlatList
                  style={{ marginBottom: 100 }}
                  data={this.state.users}
                  keyExtractor={(item, index) => item.key}
                  renderItem={({ item }) => (
                    <CardView
                      style={globalstyles.cardview_propertyDetailsCardviewVac}
                      cardElevation={2}
                      cardMaxElevation={4}
                      cornerRadius={3}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          // Alert.alert(this.state.tokenState)
                          Actions.UnitsDetailsVacant({ tokenProps: this.state.tokenState, flat_id: item.id, flat_num: item.flatHoseNo, flat_roomtype: item.unitType, flat_furnishType: item.furnishing });
                        }}
                        style={{
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <View
                          style={
                            globalstyles.mainView_propertyDetailsCardviewVac
                          }
                        >
                          <Text
                            style={
                              globalstyles.cardviewTitleTxt_propertyDetailsCardview
                            }
                          >
                            Flat/House No:
                        </Text>

                          <Text
                            style={
                              globalstyles.cardviewtxt_propertyDetailsCardview
                            }
                          >
                            {item.flatHoseNo}
                          </Text>

                          <Image
                            source={require("../Assets/Images/right-arrow-gray.png")}
                            style={
                              globalstyles.rightArrowGray_propertyDetailsCardview
                            }
                          />
                        </View>
                      </TouchableOpacity>

                    </CardView>
                  )}
                />




              </View>



            </ScrollView>

          </View>



          {/*  FLOATING BUTTON */}
          <TouchableOpacity
            style={globalstyles.floatingbtn_propertydetails}
            onPress={() => {
              this.addNewUnit();
            }}
          >
            <Text style={globalstyles.floatingbtnTxt_propertydetails}>
              Add New Unit
            </Text>

            <Image
              source={require("../Assets/Images/add_plus.png")}
              style={globalstyles.floatingbtnicon_propertydetails}
            />
          </TouchableOpacity>



          {/* CLICK ON FAB TO OPEN MODAL ADD NEW UNIT */}
          <Modal isVisible={this.state.isModalVisible}>
            <View style={globalstyles.mainview_propertyDetailsModal}>
              <View style={globalstyles.titleView_propertyDetailsModal}>
                <View style={globalstyles.titleTxtView_propertyDetailsModal}>
                  <Text style={globalstyles.titleTxt_propertyDetailsModal}>
                    Add New Unit
                  </Text>
                </View>

                <TouchableOpacity
                  style={globalstyles.titlecloseImgView_propertyDetailsModal}
                  onPress={() => this.modelhide()}
                >
                  <Image
                    source={require("../Assets/Images/close_gray.png")}
                    style={globalstyles.titleCloseImg_propertyDetailsModal}
                  />
                </TouchableOpacity>
              </View>

              <TextField
                label="Enter Flat/House No"
                onChangeText={flatHoseNoState => this.setState({ flatHoseNoState })}
                style={{ marginLeft: 10, marginRight: 10 }}
              />

              <Dropdown label="Select BHK type" data={data}
                onChangeText={(value) => {
                  this.setState({ unitRoomType: value })

                }}
              />

              <Dropdown label="Select Furnishing" data={datas}
                onChangeText={(value) => {
                  this.setState({ unitFurnishType: value })

                }}
              />



              <TouchableOpacity
                style={globalstyles.bottomView_propertyDetailsModal}
                onPress={() => this.submitUnitDetails()}
              >
                <Text style={globalstyles.proceedTxt_propertyDetailsModal}>
                  SUBMIT
                </Text>
                <Image
                  source={require("../Assets/Images/right_arrow_org.png")}
                  style={globalstyles.right_arrowImg_addPropertyModal}
                />
              </TouchableOpacity>



            </View>
          </Modal>




        </View>
      </SafeAreaView>
    );
  }
}
