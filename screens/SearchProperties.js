/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, Alert, RefreshControl, TextInput, SafeAreaView, AsyncStorage, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import SearchHeader from 'react-native-search-header';
import { searchpropertyapiconst, newSearchPropertyConst } from "../logic/searchpropertyApiLogic"
import Spinner from 'react-native-loading-spinner-overlay';

//imjport screens
import globalstyles from './styles';
import { ADD_SERVICE_REQUEST, IMAGE_URL } from '../logic/ApiConfig';
import { bluemain } from './styles.android';



// For Pagenation
let skip = 0;
const limit = 10;


export default class Searchproperties extends Component {

  constructor(props) {

    super(props)



    // for pagination
    this.onEndReachedCalledDuringMomentum = true;
    skip = 0;

    console.warn(this.props.popstatus, this.props.msg)


    this.state = {
      tokenState: "",
      unitype_filter: "all",
      propertype_filter: "both",
      refreshing: false,
      scrollBegin: false,
      isloading1: true,
      propertyArrayState: [],
      skip: 0,
    }
    // console.error(props.usertoken)


  }


  async componentWillMount() {
    await this._retrieveData()
    // console.error(this.state.tokenState)
    this.searchpropertyapifunction(this.state.tokenState)
    // Alert.alert("asdasd")


  }




  // asdasd(value) 
  // { Alert.alert("asdasd") }
  loadmorefunc() {
    // console.warn("end reached")
    this.searchpropertyapifunction(this.state.tokenState)
  }







  async searchpropertyapifunction(value) {


    // console.error(this.state.unitype_filter)
    // searchpropertyapiconst(value, 0, this.state.unitype_filter, this.state.furnish_filter, this.state.propertype_filter, this.state.upperrange_filter)
    await searchpropertyapiconst(value, skip, this.state.propertype_filter, this.state.unitype_filter, this.state.furnish_filter, this.state.upperrange_filter)
      .then((responseJson) => {

        console.warn(responseJson.length)
        // this.setState({ propertyArrayState: responseJson,})
        this.setState({ refreshing: false });



        if (responseJson.length > 0) {
          this.setState({ isloading1: false });
          this.setState({ propertyArrayState: [...this.state.propertyArrayState, ...responseJson] });
        }




        // Increasing the skip limit after first response
        skip += limit;

      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        this.setState({ refreshing: false, isloading1: false })
      });

  }


  // ["unitype_filter", this.state.unittype_filterstate],
  // ["furnish_filter", this.state.furnish_filterstate],
  // ["propertype_filter", this.state.property_filterstate],
  // ["upperrange_filter", this.state.SliderValue],


  _retrieveData = async () => {


    await AsyncStorage.multiGet(["usertoken", "unitype_filter", "furnish_filter", "propertype_filter", "upperrange_filter"]).then(response => {
      console.warn(response[0][1], response[1][1], response[2][1], response[3][1], response[4][1]);

      this.setState({ tokenState: response[0][1], unitype_filter: response[1][1], furnish_filter: response[2][1], propertype_filter: response[3][1], upperrange_filter: response[4][1] })



    });

  };




  componentWillUpdate() {
    // console.warn("asdasdasd")
  }

  // this.state.propertype_filter, this.state.unitype_filter, this.state.furnish_filter, this.state.upperrange_filter)



  searchfunc(text) {
    // console.error(value)
    newSearchPropertyConst(this.state.tokenState, text, this.state.propertype_filter, this.state.unitype_filter, this.state.furnish_filter, this.state.upperrange_filter)
      .then((responseJson) => {

        // console.error(responseJson)
        this.setState({ propertyArrayState: responseJson })



      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });


  }








  _handleRefresh = () => {

    this.setState({ refreshing: true });
    this.searchpropertyapifunction(this.state.tokenState);

    // console.error("refreshing")
  };



  componentDidMount() {
    // console.error(Actions.currentScene)
  }


  render() {



    return (

      <SafeAreaView
        style={[globalstyles.safearea, { backgroundColor: "#ffffff" }]}>
        {/* 
        <View
          style={{ flex: 1, backgroundColor: "#f1f1f1" }}> */}



        <Spinner
          overlayColor="rgba(0, 0, 0, 0.3)"
          visible={this.state.isloading1}
          textContent={'Loading Properties...'}
          textStyle={{ color: bluemain }}
        />



        {/* TITLEBAR */}
        <View style={globalstyles.titlebarmain_timelinetenant}>

          {/* Drawer icon */}
          <TouchableOpacity
            onPress={() => { Actions.drawerOpen() }}
            style={globalstyles.menuicon_timelintenant}>
            <Image
              style={globalstyles.menuImg_transactions}
              source={require('../Assets/Images/menu.png')}
            />
          </TouchableOpacity>


          <View style={globalstyles.titleview_timelinetenant}>
            <Text style={{ color: "#ffffff", fontSize: 22 }}>Properties</Text>
          </View>


          <View style={{ padding: 10 }}>
            <TouchableOpacity
              onPress={() => { Actions.replace("FilterSearchProperty", { "unitype_filter": this.state.unitype_filter, "furnish_filter": this.state.furnish_filter, "propertype_filter": this.state.propertype_filter, "upperrange_filter": this.state.upperrange_filter }) }}
              style={{ flex: 1, flexDirection: "row" }} >
              <Image
                style={{ width: 25, height: 25, }}
                source={require('../Assets/Images/filter.png')}
              />
              <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: "#ff3333" }}>
              </View>
            </TouchableOpacity>
          </View>



        </View>


        <View style={{ backgroundColor: bluemain, flexDirection: "row", height: 60, }}>
          <TextInput
            placeholderTextColor="#ffffff"
            underlineColorAndroid="#ffffff"
            style={{ height: 40, margin: 10, color: "#ffffff", fontSize: 20, width: "100%" }}
            placeholder="Search Here"
            onChangeText={(text) => this.searchfunc(text)}
          />
        </View>


        {/* <View style={{ backgroundColor: "white", paddingTop: 20 }}> */}
        <View style={{ marginLeft: 10, marginBottom: 10, marginTop: 20 }}>
          <Text>You have <Text style={{ fontWeight: "500", color: bluemain }}>{this.state.propertyArrayState.length}</Text> Results</Text>
        </View>



        <FlatList

          data={this.state.propertyArrayState}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this._handleRefresh}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}

          onEndReached={({ distanceFromEnd }) => {
            if (!this.onEndReachedCalledDuringMomentum) {
              this.loadmorefunc();
              this.onEndReachedCalledDuringMomentum = true;
            }
          }}

          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          renderItem={({ item }) =>

            <CardView

              cardElevation={2}
              style={globalstyles.listcardview_searchproperties}>

              <TouchableOpacity
                onPress={() => Actions.UnitDetailsPropertyTenant({ "uid": item.id, "token": this.state.tokenState })}
                style={{ flexDirection: "row", justifyContent: "space-between", height: 120 }}>


                <View style={{ flex: 0.3 }}>


                  <Image
                    source={item.property_imges === "" ? { uri: IMAGE_URL + item.property_imges } : { uri: IMAGE_URL + item.property_imges }}
                    resizeMode="cover"
                    style={{ height: 120, width: 140 }}
                  />
                </View>




                <View style={{ flex: 0.7, backgroundColor: "#ffffff" }}>

                  <View style={{ flex: 1, marginLeft: 15, marginRight: 10, marginTop: 10, marginBottom: 10, justifyContent: "space-between" }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                      <View>
                        <Text style={{ fontSize: 20, fontWeight: "500" }} >{item.flatHoseNo}</Text>
                      </View>

                      <View>
                        <Text>{item.propertyName}</Text>
                      </View>

                    </View>


                    <View>
                      <Text style={{ fontSize: 12, color: "#999999" }}>{item.streetName} {item.state} {item.city} {item.pincode} </Text>
                    </View>



                    <View>
                      <Text style={item.onRent === "Yes" ? { color: "#00B21E" } : { color: "#ff0000" }}>{item.onRent === "Yes" ? "Vacant" : "Occupied"}</Text>
                    </View>

                  </View>

                </View>

              </TouchableOpacity>

            </CardView>

          }
        />


      </SafeAreaView>

    );
  }
}






{/* <ScrollView
// refreshControl={
//   <RefreshControl
//     refreshing={this.state.refreshing}
//     onRefresh={this._handleRefresh}
//   />
// }
// onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
style={{ flex: 1, backgroundColor: "#ffffff" }}>


{/* <View style={{ backgroundColor: bluemain, flex: 1, flexDirection: "row", height: 60, }}>
  <TextInput
    placeholderTextColor="#ffffff"
    underlineColorAndroid="#ffffff"
    style={{ height: 40, margin: 10, color: "#ffffff", fontSize: 20, width: "100%" }}
    placeholder="Search Here"
    onChangeText={(text) => this.searchfunc(text)}
  />
</View>
*/}




{/* <View style={{ backgroundColor: "white", paddingTop: 20 }}>

  <View style={{ marginLeft: 10, marginBottom: 10 }}>
    <Text>You have <Text style={{ fontWeight: "500", color: bluemain }}>{this.state.propertyArrayState.length}</Text> Results</Text>
  </View>



</View> */}


