/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { ADD_PROPERTY, GET_PROPERTY_LIST, GET_PROP_VACANT_LIST } from "../logic/ApiConfig";
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  RefreshControl,
  View,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { Actions, Scene, Router, Tabs } from "react-native-router-flux";
import CardView from "react-native-cardview";
import Modal from "react-native-modal";
import SearchHeader from 'react-native-search-header';
import { GetAllProperties } from "../logic/Property_Landlord_Login"
import { IMAGE_URL } from "../logic/ApiConfig"
import { OfflineNotice } from "../screens/OfflineNotice"
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
      refreshing: false,
      tokenState: '',
      name: "hello",
      isLoadingProperties1: false,
      loggedIn: false,
      currentState: "not-panic",
      dataSource: [],
      refreshing: false,
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







  // componentDidMount() {
  //   var jdata = this.getPropertyList()
  //   console.error(jdata)
  // }








  async componentDidMount() {




    await AsyncStorage.multiGet(["token", "email_id", "username", "phone"]).then(response => {
      // console.error(response[0][1])
      this.setState({ tokenState: response[0][1], isLoadingProperties1: true })
      // Alert.alert(this.state.tokenState)
    })





    await fetch(GET_PROP_VACANT_LIST, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.tokenState
      },

    }).then(response => response.json())
      .then((responseJson) => {
        // console.error(responseJson)
        this.setState({ dataSource: responseJson, isLoadingProperties1: false })
      })
      .catch(error => {
        console.warn(error);
      });

  }














  async detailsVacantPageOpener(value, value2, propertyType, propertyName, country, state, city) {

    // await console.error(value)
    await this.storePropertyID(value, value2, propertyType, propertyName, country, state, city)
    // await Actions.PropertyDetailsVacantStack();
  }




  async storePropertyID(value, valu2, propertyType, propertyName, country, state, city) {
    try {

      // await AsyncStorage.setItem('propertyVacantID', value);
      await AsyncStorage.multiSet(
        [
          ["propertyVacantID", value],
          ["propertyImage_link", valu2],
          ["propertyType", propertyType],
          ["sPropertyName", propertyName],
          ["sCountry", country],
          ["sCity", state],
          ["sState", city],
        ]
      );
      console.warn(" saved")
      await Actions.PropertyDetailsVacantStack()
    } catch (error) {
      console.error(" Error saving data")
    }
  }







  // _handleRefresh = () => {

  //   this.setState({ refreshing: true });

  //   this.fetchPropertyList(this.state.tokenState);

  //   //console.error(this.state.userToken1)
  // };



  async fetchPropertyList(value) {




    await fetch(GET_PROP_VACANT_LIST, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.tokenState
      },

    }).then(response => response.json())
      .then((responseJson) => {
        // console.error(responseJson)
        this.setState({ dataSource: responseJson, refreshing: false })
        console.warn(responseJson)
      })
      .catch(error => {
        console.warn(error);
      });





    // fetch(GET_PROP_VACANT_LIST, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     //'Content-Type': 'application/json',
    //     Authorization: value
    //   },



    // }).then(response => response.json())
    //   .then((responseJson) => {
    //     this.setState({ dataSource: responseJson.properties })

    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });




  }

  render() {



    return (
      <View style={globalstyles.container_propertylist}>




        <Modal
          onBackdropPress={() => this.setState({ isLoadingProperties1: false })}
          isVisible={this.state.unitImageLoaderState}
        >
          <View style={{ padding: 20, backgroundColor: "#ffffff", }}>

            <Text style={{ fontSize: 20, fontWeight: "500" }}>Wait</Text>

            <View style={{ flexDirection: "row", backgroundColor: "#ffffff", alignItems: "center" }}>
              <ActivityIndicator size="large" color={bluemain} />
              <Text style={{ margin: 20, fontSize: 15 }}>Loading Properties  </Text>
            </View>
          </View>
        </Modal>






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



        <SearchHeader
          ref={(searchHeader) => {
            this.searchHeader = searchHeader;
          }}
          placeholder='Search...'
          placeholderColor='gray'
          onClear={() => {
            console.log(`Clearing input!`);
          }}
          onGetAutocompletions={async (text) => {
            if (text) {
              const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                method: `get`
              });
              const data = await response.json();
              return data[1];
            } else {
              return [];
            }
          }}
        />

        {/* 
        <View style={{ marginTop: 10, height: 10, marginBottom: 30, width: "100%", height: 20, alignItems: "center", }}>
          <Text style={{ color: bluemain }}>Pull To Refresh</Text>
        </View>


 */}







        {this.state.dataSource.length > 0 ? <View>
          <FlatList
            // refreshing={this.state.refreshing}
            // onRefresh={this._handleRefresh}
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
                    source={{ uri: IMAGE_URL + item.property_imges }}
                  />
                </View>



                {/* INFORMATION */}
                <View style={globalstyles.plistitemsview_propertylist}>
                  <Text style={globalstyles.pnamesty_propertylist}>
                    {item.propertyName}
                  </Text>
                  <Text style={globalstyles.paddresssty_propertylist}>
                    {item.country}, {item.state}, {item.city}
                  </Text>

                  <Text style={globalstyles.paddresssty_propertylist}>
                    PropertyType: <Text style={{ color: item.propertyType === "singleunit" ? "green" : "red" }}> {item.propertyType}</Text>
                  </Text>


                </View>



                {/* UNITS */}
                <View style={globalstyles.unitnumberview_propertylist}>
                  <View style={globalstyles.orangeround_propertylist}>
                    <Text
                      allowFontScaling
                      style={globalstyles.orangerountext_propertylist}
                    >
                      {item.vaccant_unit} Units
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
          />

        </View> : <View>
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
                <Text style={{ width: 300, marginLeft: 30, marginRight: 30, textAlign: "center" }}>Currently you do not have any Vacant Properties under this category</Text>
                <Text style={{ width: 300, marginLeft: 30, marginRight: 30, textAlign: "center", fontWeight: "500", color: bluemain }}>Add New Poperty From Below</Text>
              </View>

            </View>

          </View>}




      </View>
    );
  }
}
