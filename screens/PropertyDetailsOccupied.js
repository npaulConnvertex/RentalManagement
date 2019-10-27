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
  Alert,
  AsyncStorage,
  FlatList,
  SafeAreaView
} from "react-native";


import Modal from "react-native-modal";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import CardView from "react-native-cardview";

import globalstyles from "./styles";
import { Actions } from "react-native-router-flux";
import { bluemain } from "./styles";
import { GET_PROPERTY_DETAILS_WITH_UNTS_OCC } from "../logic/ApiConfig"









const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class PropertyDetailsOccupied extends Component {
  constructor(props) {
    super(props);

    this.state = {
      occusers: [],
      tokenState: "",
      ValueState: "",
      Valuecity: "",
      ValueCountry: "",
      ValuePropertyName: "",
      isModalVisible: false
    };
  }

  modelshow() {
    this.setState({ isModalVisible: true });
  }

  modelhide() {
    this.setState({ isModalVisible: false });
  }
























  async componentDidMount() {

    await this._retrieveData()


    // console.error(this.state.tokenState)





    {





    }
    console.warn(this.state.tokenState)
    console.warn(this.state.propertyIDState)


    await fetch(GET_PROPERTY_DETAILS_WITH_UNTS_OCC, {
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


        if (responseJson.list[0].flatHoseNo === null)
          this.setState({ occusers: [] })

        else
          this.setState({ occusers: responseJson.list, totalunitsState: responseJson.totalUnits })
      })
      .catch(error => {
        console.error(error);
      });

  }









  _retrieveData = async () => {

    // Alert.alert("Triggered")


    try {
      await AsyncStorage.multiGet(["token", "propertyOccupiedID", "propertyImage_link", "propertyType", "sPropertyName", "sCountry", "sCity", "sState"]).then(response => {

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
      Console.error()
    }


  };









  componentWillReceiveProps(props) {
    // console.log('component: componentWillReceiveProps');
    console.error(this.props.userid);
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
        <View style={globalstyles.container}>
          {/* HEADER */}
          <View style={globalstyles.headercontainer_propertydetails}>
            <TouchableOpacity
              onPress={() => Actions.pop()}
              style={globalstyles.menuImgView_propertyDetails}>
              <Image
                source={require("../Assets/Images/backarrow.png")}
                style={globalstyles.menuImg_propertyDetails}
              />
            </TouchableOpacity>

            <Text style={globalstyles.titleTxt_propertyDetails}>
              Properties
            </Text>

            {/* <TouchableOpacity style={globalstyles.searchImgView_propertyDetails}>
             <Image source ={require('../Assets/Images/search.png')}
                    style ={globalstyles.searchImg_propertyDetails} />    
            </TouchableOpacity>


            <TouchableOpacity style={globalstyles.dotsmenuImgView_propertyDetails}>
             <Image source ={require('../Assets/Images/dotsmenu.png')}
                    style ={globalstyles.dotsmenuImg_propertyDetails} />    
            </TouchableOpacity> */}
          </View>

          {/* MAIN BODY */}
          <View style={{ flex: 0.9 }}>
            <ScrollView>







              <View style={{ flex: 1, flexDirection: "row", height: 300, justifyContent: "center", alignItems: "center" }}>
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
                    style={globalstyles.propertyAddressCityTxt_propertyDetails}
                  >
                    {this.state.Valuecity}
                  </Text>
                  <Text style={globalstyles.propertyAddressTxt_propertyDetails}>
                    {this.state.ValueState}
                  </Text> */}
                  {/* <Text
                    style={globalstyles.propertyAddressZipTxt_propertyDetails}
                  >
                    411022
                  </Text> */}
                </View>
              </View>

              {/* ALL VACANT UNITS*/}
              {/* <View style={globalstyles.mainView_propertyDetailsUnit}>
        <Text  style={globalstyles.mainViewTitleTxt_propertyDetailsUnit}>All Vacant Units</Text>

        <FlatList

         data={this.state.users}
             renderItem={({item}) =>

             <CardView
              style={globalstyles.cardview_propertyDetailsCardview}
              cardElevation={2}
              cardMaxElevation={4}
              cornerRadius={3} 
              >

              <TouchableOpacity onPress={()=>{Actions.UnitsDetails({flat_num:item.num})}} >

                    <View style={globalstyles.mainView_propertyDetailsCardview}>
              
                         <Text style={globalstyles.cardviewTitleTxt_propertyDetailsCardview}>Flat/House No:</Text>

                         <Text style={globalstyles.cardviewtxt_propertyDetailsCardview}>{item.num}</Text>

                         <Image source={require('../Assets/Images/right-arrow-gray.png')}
                                style={globalstyles.rightArrowGray_propertyDetailsCardview}   
              />


              </View>
              </TouchableOpacity>

             </CardView>       

            }
        />

      </View> */}

              {/* ALL OCCUPIED UNITS*/}
              <View style={globalstyles.mainView_propertyDetailsUnit}>
                <Text style={globalstyles.mainViewTitleTxt_propertyDetailsUnit}>
                  All Occupied Units
                </Text>















                <FlatList
                  data={this.state.occusers}
                  renderItem={({ item }) => (
                    <CardView
                      style={globalstyles.cardview_propertyDetailsCardview}
                      cardElevation={2}
                      cardMaxElevation={4}
                      cornerRadius={3}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          Actions.UnitsDetailsVacant({
                            propstoken: this.state.tokenState,
                            tenant_id: item.Tenant_id,
                            flat_id: item.id,
                            flat_num: item.flatHoseNo,
                            flat_roomtype: item.unitType,
                            flat_furnishType: item.furnishing

                          })

                        }
                      >

                        <View
                          style={globalstyles.mainView_propertyDetailsCardview}
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
                              globalstyles.cardviewTitleTxt_pcardviewtxt_propertyDetailsCardview
                            }
                          >
                            {item.flatHoseNo}
                          </Text>
                        </View>

                        <View
                          style={globalstyles.mainView_propertyDetailsCardview}
                        >
                          <Text
                            style={
                              globalstyles.cardviewTitleTxt_propertyDetailsCardview
                            }
                          >
                            Tenant Name:
                          </Text>
                          <Text
                            style={
                              globalstyles.cardviewTitleTxt_pcardviewtxt_propertyDetailsCardview
                            }
                          >
                            {item.userName}
                          </Text>
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
                style={{ marginLeft: 10, marginRight: 10 }}
              />

              <Dropdown label="Select BHK type" data={data} />

              <Dropdown label="Select Furnishing" data={datas} />

              <TouchableOpacity
                style={globalstyles.bottomView_propertyDetailsModal}
                onPress={() => this.modelhide()}
              >
                <Text style={globalstyles.proceedTxt_propertyDetailsModal}>
                  PROCEED
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
