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
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  AsyncStorage,
  TextInput,
  SafeAreaView
} from "react-native";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";
import globalstyles from "./styles";
import { GET_TENANT_LIST, GET_TENANT_THAT_NOT_LINKED, LINK_TENANT_TO_UNIT, IMAGE_URL } from "../logic/ApiConfig"
import { bluemain, orangemain } from "../screens/styles.android"



import SearchHeader from "react-native-search-header";
export default class TenantSearchList extends Component {


  constructor(props) {
    super(props)
    this.state = ({
      tokenState: "",
      isLoading: "",
      isLinkedModal: false,
      tenantjsondata: [],
    })
  }







  async  componentWillMount() {


    this.setState({ isLoading: true })

    await AsyncStorage.multiGet(["token", "propertyVacantID", "propertyImage_link"]).then(response => {
      this.setState({ tokenState: response[0][1] })
      console.warn(this.state.tokenState)

    })





    // console.warn(this.state.tokenState)
    await fetch(GET_TENANT_THAT_NOT_LINKED, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.tokenState
      },


    }).then(response => response.json())
      .then((responseJson) => {
        this.setState({ isLoading: false })

        console.error(responseJson)
        this.setState({ tenantjsondata: responseJson })



      })
      .catch(error => {
        console.error(error);
      });



    // this.searchHeader.show();



  }





  LinkTenantMethod(tenantID) {

    fetch(LINK_TENANT_TO_UNIT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.tokenState
      },
      body: JSON.stringify({

        tenant_id: tenantID,
        unit_id: this.props.flat_id,


      }),



    }).then(response => response.json())
      .then((responseJson) => {

        // "Tenant Has Been Linked"
        // console.error(responseJson)
        this.setState({ isLinkedModal: true })



      })
      .catch(error => {
        console.error(error);
      });

    console.warn(tenantID + " " + this.props.flat_id)

    // Actions.pop()

  }

  // correctMark















  render() {

    if (this.state.tenantjsondata.length > 0) {
      return (
        <SafeAreaView style={globalstyles.safearea}>


          <Modal
            onBackdropPress={() => this.setState({ isLoading: false })}
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








          <View style={globalstyles.container_tenantsearchlist}>


            {/* TITLEBAR */}
            <View style={globalstyles.titlebarmain_timelinetenant}>


              {/* Drawer icon */}
              <TouchableOpacity
                onPress={() => { Actions.pop() }}
                style={globalstyles.menuicon_timelintenant}>
                <Image
                  style={globalstyles.menuImg_transactions}
                  source={require('../Assets/Images/backarrow.png')}
                />
              </TouchableOpacity>


              <View style={globalstyles.titleview_timelinetenant}>
                <Text style={{ color: "#ffffff", fontSize: 22 }}>Tenants</Text>
              </View>



            </View>








            <SearchHeader
              ref={searchHeader => {
                this.searchHeader = searchHeader;
              }}
              placeholder="Search..."
              placeholderColor="gray"
              //CLOSE ICON
              onClear={() => {
                console.log(`Clearing input!`);
              }}
              //BACK ICON
              onHide={() => {
                Actions.pop();
              }}
              onGetAutocompletions={async text => {
                if (text) {
                  const response = await fetch(
                    `http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`,
                    {
                      method: `get`
                    }
                  );
                  const data = await response.json();
                  return data[1];
                } else {
                  return [];
                }
              }}
            />

            {/* <View
            style={{ backgroundColor: "#00000088", width: "100%", height: 1 }}
          />

          <View style={globalstyles.mainbodycontainer_tenantsearchlist} /> 


          */}






            <FlatList
              data={this.state.tenantjsondata}
              renderItem={({ item }) => (
                <TouchableOpacity

                  onPress={() => this.LinkTenantMethod(item.id)}


                  style={globalstyles.mainView_tenantcurrentflatlist}>
                  {/* ICON */}
                  <View
                    style={globalstyles.tenantIconView_tenantcurrentflatlist}
                  >
                    <Image
                      resizeMode="contain"
                      style={globalstyles.tenantIconstyle_tenantcurrentflatlist}
                      // source={require("../Assets/Images/tenaticonlist.png")}
                      source={item.profilephoto == null ? require("../Assets/Images/tenaticonlist.png") : item.profilephoto.indexOf("https:") !== -1 ? { uri: item.profilephoto } : { uri: IMAGE_URL + item.profilephoto }}
                    />
                  </View>

                  {/* INFORMATION */}
                  <View
                    style={globalstyles.tenantListTxtView_tenantcurrentflatlist}
                  >
                    <Text style={globalstyles.nametxt_tenantcurrentflatlist}>
                      {item.userName}
                    </Text>
                    <Text style={globalstyles.addrtxt_tenantcurrentflatlist}>
                      {item.email}
                    </Text>
                  </View>

                  {/* VIEW TEXT WITH ARROW */}
                  <View
                    style={{ flexDirection: "row" }}
                  >
                    <Text style={{ marginRight: 10 }}>VIEW</Text>
                    <Image
                      resizeMode="contain"
                      style={globalstyles.rightarrow_tenantcurrentflatlist}
                      source={require("../Assets/Images/rightarrow2.png")}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />









            <Modal isVisible={this.state.isLinkedModal}>
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
                    Tenant Linked Successfully
              </Text>


                  <Text
                    onPress={() => {
                      this.setState({ isLinkedModal: false }),
                        Actions.popTo("PropertyDetailsVacant")
                    }}
                    style={{ margin: 12, color: orangemain, fontSize: 15 }}>
                    OK
              </Text>
                </View>
              </View>
            </Modal>












          </View>
        </SafeAreaView>
      );
    }

    else {

      return (
        <SafeAreaView style={globalstyles.safearea}>
          <View style={globalstyles.container_tenantsearchlist}>


            {/* TITLEBAR */}
            <View style={globalstyles.titlebarmain_timelinetenant}>


              {/* Drawer icon */}
              <TouchableOpacity
                onPress={() => { Actions.pop() }}
                style={globalstyles.menuicon_timelintenant}>
                <Image
                  style={globalstyles.menuImg_transactions}
                  source={require('../Assets/Images/backarrow.png')}
                />
              </TouchableOpacity>


              <View style={globalstyles.titleview_timelinetenant}>
                <Text style={{ color: "#ffffff", fontSize: 22 }}>Tenants</Text>
              </View>




            </View>



            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

              {/* tenaticonlist */}
              <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                  <Image
                    style={{ width: 200, height: 200, }}
                    source={require('../Assets/Images/tenaticonlist.png')}
                  />

                  <Image
                    style={{ width: 30, height: 30, }}
                    source={require('../Assets/Images/close_gray.png')}
                  />
                </View>
              </View>

              <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                <Text>Currently you do not have any tenant in this system</Text>
              </View>

            </View>



          </View>



        </SafeAreaView>
      );
    }
  }
}
