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
  AsyncStorage,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import Modal from "react-native-modal";
import { Actions, Scene, Router, Tabs } from "react-native-router-flux";
import CardView from "react-native-cardview";
import { GET_PROP_OCCUP_LIST } from '../logic/ApiConfig'
import { IMAGE_URL } from "../logic/ApiConfig"
import { bluemain, orangemain } from "../screens/styles.android"


//imjport screens
import globalstyles from "./styles";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class PropertyList extends Component {





  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      name: "hello",
      loggedIn: false,
      tokenState: "",
      isLoadingProperties1: false,
      dataSource: [],
      currentState: "not-panic",
      jsondata: [
        {
          name: "Green Suites Apartment",
          address: "12A , Damien Street",
          units: 60,
          imgSource: require("../Assets/Images/samplePropertyImages/pImage1.jpg")
        },
        {
          name: "Green Suites Apartment",
          address: "12A , Damien Street",
          units: 50,
          imgSource: require("../Assets/Images/samplePropertyImages/pImage2.jpg")
        },
        {
          name: "Green Suites Apartment",
          address: "12A , Damien Street",
          units: 2500,
          imgSource: require("../Assets/Images/samplePropertyImages/pImage3.jpg")
        },
        {
          name: "Green Suites Apartment",
          address: "12A , Damien Street",
          units: 234,
          imgSource: require("../Assets/Images/samplePropertyImages/pImage4.jpg")
        },
        {
          name: "Green Suites Apartment",
          address: "12A , Damien Street",
          units: 50,
          imgSource: require("../Assets/Images/samplePropertyImages/pImage5.jpg")
        }
      ]

    };
  }














  async componentDidMount() {


    await AsyncStorage.multiGet(["token", "email_id", "username", "phone"]).then(response => {
      // console.error(response[0][1])
      this.setState({
        tokenState: response[0][1],
        // isLoadingProperties1: true
      })
      // Alert.alert(this.state.tokenState)
    })



    await fetch(GET_PROP_OCCUP_LIST, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.tokenState
      },



    }).then(response => response.json())
      .then((responseJson) => {
        console.error(responseJson)
        this.setState({ dataSource: responseJson, isLoadingProperties1: false })
      })
      .catch(error => {
        console.warn(error);
      });

  }














  async detailsVacantPageOpener(value, valu2, propertyType, propertyName, country, state, city) {

    // await console.error(value)
    await this.storePropertyID(value, valu2, propertyType, propertyName, country, state, city)
    // await Actions.PropertyDetailsVacantStack();
  }


  async storePropertyID(value, valu2, propertyType, propertyName, country, state, city) {
    try {

      // await AsyncStorage.setItem('propertyVacantID', value);
      await AsyncStorage.multiSet(
        [
          ["propertyOccupiedID", value],
          ["propertyImage_link", valu2],
          ["propertyType", propertyType],
          ["sPropertyName", propertyName],
          ["sCountry", country],
          ["sCity", state],
          ["sState", city],
        ]
      );
      console.warn(" saved")
      await Actions.PropertyDetailsOccupiedStack()
    } catch (error) {
      console.error(" Error saving data")
    }
  }















  render() {





    return (
      <View style={globalstyles.container_propertylist}>




        <Modal
          // onBackdropPress={() => this.setState({ isLoadingProperties1: false })}
          isVisible={this.state.isLoadingProperties1}
        >
          <View style={{ padding: 20, backgroundColor: "#ffffff", }}>

            <Text style={{ fontSize: 20, fontWeight: "500" }}>Wait</Text>

            <View style={{ flexDirection: "row", backgroundColor: "#ffffff", alignItems: "center" }}>
              <ActivityIndicator size="large" color={bluemain} />
              <Text style={{ margin: 20, fontSize: 15 }}>Loading Properties  </Text>
            </View>
          </View>
        </Modal>



        {/* , isLoadingProperties1: false */}


        <TouchableOpacity
          onPress={() => Actions.AddProperty()}
          style={globalstyles.addpropertybtn_propertylist}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#ffffff" }}>Add New Property</Text>

            <Image
              resizeMode="contain"
              style={globalstyles.piconsty2_propertylist}
              source={require("../Assets/Images/add_plus.png")}
            />
          </View>
        </TouchableOpacity>




        {this.state.dataSource.length > 0 ? <View>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.detailsVacantPageOpener(item.id, IMAGE_URL + item.property_imges, item.propertyType, item.propertyName, item.country, item.state, item.city)
                }}
                style={globalstyles.singleListItemView_propertylist}
              >
                {/* ICON */}
                <View style={globalstyles.piconview_propertylist}>
                  <Image
                    resizeMode="cover"
                    style={globalstyles.piconsty_propertylist}
                    // source={require("../Assets/Images/propertyicon.png")}
                    source={{ uri: IMAGE_URL + item.property_imges }}
                  />
                </View>

                {/* INFORMATION */}
                <View style={globalstyles.plistitemsview_propertylist}>
                  <Text style={globalstyles.pnamesty_propertylist}>
                    {item.propertyName}
                  </Text>
                  <Text style={globalstyles.paddresssty_propertylist}>
                    {item.country}, {item.state},{item.city}
                  </Text>

                  <Text style={globalstyles.paddresssty_propertylist}>
                    PropertyType: SingleUnit
                </Text>
                </View>

                {/* UNITS */}
                <View style={globalstyles.unitnumberview_propertylist}>
                  <View style={globalstyles.greeneround_propertylist}>
                    <Text
                      allowFontScaling
                      style={globalstyles.orangerountext_propertylist}
                    >
                      {item.occupied_unit} Units
                  </Text>
                  </View>
                </View>

                {/* ARROW */}
                <View style={globalstyles.arrow_propertylist}>
                  <Image
                    resizeMode="contain"
                    style={globalstyles.viewicon_propertylist}
                    source={require("../Assets/Images/rightarrow2.png")}
                  />
                </View>
              </TouchableOpacity>
            )}
          /></View> : <View>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>

              {/* tenaticonlist */}
              <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                  <Image
                    style={{ width: 200, height: 200, }}
                    source={require('../Assets/Images/propertynavicon.png')}
                  />

                  <Image
                    style={{ width: 30, height: 30, marginTop: 20 }}
                    source={require('../Assets/Images/close_gray.png')}
                  />
                </View>
              </View>

              <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                <Text style={{ width: 300, marginLeft: 30, marginRight: 30, textAlign: "center" }}>Currently you do not have any occupied Properties under this category</Text>
                <Text style={{ width: 300, marginLeft: 30, marginRight: 30, textAlign: "center", fontWeight: "500", color: bluemain }}>Link a Tenant from Vacant Properties -></Text>
              </View>

            </View>

          </View>}



      </View>
    );



  }
}

