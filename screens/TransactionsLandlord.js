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
  Alert,
  FlatList,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import globalstyles from "./styles";
import CardView from "react-native-cardview";
import { bluemain, orangemain } from "./styles";
import { Actions } from "react-native-router-flux";
import Modal from "react-native-modal";
import { showAllTransactions } from '../logic/ShowAllTransactions';



export default class TransactionsLandlord extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAddTransactionLoader: false,
      userToken1: "",
      refreshing: false,
      refreshing1: false,
      transactionList: [],
      isModalVisible: false
    };


    this._retrieveData()
  }


  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('usertoken');
      if (value !== null) {
        // We have data!!
        console.log(value);
        this.setState({ userToken1: value })
        this.fetchTransactions(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  };




  fetchTransactions(value) {
    showAllTransactions(value)
      .then((responseJson) => {

        // console.error(responseJson)
        this.setState({ transactionList: responseJson, refreshing: false })



      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });

  }


  modelshow() {


  }


  _handleRefresh = () => {

    this.setState({ refreshing: true });
    this.fetchTransactions(this.state.userToken1);

    //console.error(this.state.userToken1)
  };





  render() {
    return (
      <SafeAreaView style={globalstyles.safearea}>
        <View style={styles.container}>





          <Modal
            // onBackdropPress={() => this.setState({ isAddTransactionLoader: false })}
            isVisible={this.state.isAddTransactionLoader}
          >
            <View style={{ padding: 20, backgroundColor: "#ffffff" }}>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>Loading</Text>

              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#ffffff",
                  alignItems: "center"
                }}
              >
                <ActivityIndicator size="large" color={bluemain} />
                <Text style={{ margin: 20, fontSize: 15 }}> Under Progress </Text>
              </View>
            </View>
          </Modal>




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
              <Text style={{ color: "#ffffff", fontSize: 22 }}>Transactions</Text>
            </View>


            {/* <View style={{ flex: 0.1, padding: 10 }}>
              <TouchableOpacity
                onPress={() => { this.setState({ isAddTransactionLoader: true }) }}
                style={{ flex: 1, flexDirection: "row" }} >
                <Image
                  style={{ width: 25, height: 25, }}
                  source={require('../Assets/Images/filter.png')}
                />
                <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: "#ff3333" }}>
                </View>
              </TouchableOpacity>
            </View> */}


          </View>













          <TouchableOpacity
            onPress={() =>
              Actions.AddTransaction1({ "usertoken": this.state.userToken1 })
              // Actions.replace("AddTransaction1", { "usertoken": this.state.userToken })
            }
            style={globalstyles.addpropertybtn_propertylist}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#ffffff" }}>Add New Transaction</Text>

              <Image
                resizeMode="contain"
                style={globalstyles.piconsty2_propertylist}
                source={require("../Assets/Images/add_plus.png")}
              />
            </View>
          </TouchableOpacity>




          {/* transaction */}



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

              data={this.state.transactionList}
              keyExtractor={(item, index) => item.key}
              renderItem={({ item }) => (



                <TouchableOpacity onPress={() => this.modelshow()}>
                  <CardView
                    style={globalstyles.cardview_transactions}
                    cardElevation={2}
                    cardMaxElevation={3}
                    cornerRadius={3}
                  >


                    {/* 
          // "id":"40",
  // "userName":"Tenant003",
  // "vender_name":"",
  // "payment_date":"2019-03-28",
  // "type":"1",
  // "propertyName":null,
  // "totalAmount":"1000",
  // "payment_status":"1"
 */}


                    <View>
                      <Text style={{ fontSize: 20, fontWeight: "500", color: bluemain }}>{item.userName}</Text>





                      <Text>Property Name: <Text>{item.propertyName}</Text></Text>





                      <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>

                        <View style={{ flex: 0.5, }}>
                          <Text>Status: </Text>
                          <Text style={{ fontSize: 20, fontWeight: "500", color: item.payment_status === "1" ? "#009933" : "#cc3300" }}>{item.payment_status === "1" ? "paid" : "unpaid"}</Text>

                        </View>

                        <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                          <Text>Transaction Amount</Text>
                          <Text style={{ fontWeight: "500", color: "#009933", fontSize: 20 }}>{item.totalAmount}</Text>
                        </View>


                      </View>



                      <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>

                        <View style={{ flex: 0.5 }}>
                          <Text> Date of Payment</Text>
                          <Text style={{ fontWeight: "500", }}>{item.payment_date}</Text>
                        </View>

                        <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                          <Text> Payment Method</Text>
                          <Text style={{ fontWeight: "500" }}>{item.type === "1" ? "Cash" : item.type === "2" ? "cash" : "other"}</Text>
                        </View>


                      </View>





                    </View>


                  </CardView>
                </TouchableOpacity>
              )}
            />


          </ScrollView>




        </View>
      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },

  container: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },

  tabcontainer: {
    height: 50,
    flexDirection: "row",
    backgroundColor: bluemain,
    paddingLeft: 20
  },

  mainbodycontainer: {
    height: "90%",
    width: "100%",
    marginTop: 30
  }
});
