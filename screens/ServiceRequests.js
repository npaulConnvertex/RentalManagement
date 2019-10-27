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
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  SafeAreaView
} from "react-native";
import CardView from "react-native-cardview";
import Modal from "react-native-modal";
import globalstyles from "./styles";
import { Actions } from "react-native-router-flux";
import { bluemain, orangemain } from "./styles";
import { completeServiceApiConst, declinedServiceApiConst, pendingServiceApiConst } from "../logic/ServiceRequestApiLogic"
import { Dropdown } from "react-native-material-dropdown";
import Spinner from 'react-native-loading-spinner-overlay';


const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});





servStatus = [
  { value: "Completed" },
  { value: "Pending" },
  { value: "Declined" }

]

export default class ServiceRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listState: [],
      isloading: true,
      refreshing: false,
      users: [
        {
          name: "Monthly Cable Bill",
          propertyName: "GreenWood",
          tenantName: "Abhishek Sinha",
          priority: "Low"
        },
        {
          name: "Noise Reduce",
          propertyName: "GreenWood",
          tenantName: "Vijay Ram",
          priority: "Medium"
        },
        {
          name: "Monthly Cable Bill",
          propertyName: "GreenWood",
          tenantName: "Niralay Mohan",
          priority: "High"
        },
        {
          name: "Repaint Hall",
          propertyName: "GreenWood",
          tenantName: "Abhishek Sinha",
          priority: "Urgent"
        },
        {
          name: "Monthly Cable Bill",
          propertyName: "GreenWood",
          tenantName: "Abhishek Sinha",
          priority: "Low"
        },
        {
          name: "Noise Reduce",
          propertyName: "GreenWood",
          tenantName: "Vijay Ram",
          priority: "Medium"
        },
        {
          name: "Monthly Cable Bill",
          propertyName: "GreenWood",
          tenantName: "Niralay Mohan",
          priority: "High"
        },
        {
          name: "Repaint Hall",
          propertyName: "GreenWood",
          tenantName: "Abhishek Sinha",
          priority: "Urgent"
        },
      ],

      isModalVisible: false,
      modalheader: ""
    };
  }








  modelshow(modalvar) {
    this.setState({ isModalVisible: true });
    this.setState({ modalheader: modalvar });
  }

  modelhide() {
    this.setState({ isModalVisible: false });
  }












  async componentWillMount() {

    await this._retrieveData();
    await this.getListFunc()

  }







  async getListFunc() {

    this.setState({ isloading: true })
    completeServiceApiConst(this.state.token)
      .then((responseJson) => {

        // console.error(responseJson);
        this.setState({ listState: responseJson, refreshing: false, isloading: false })
        // console.error(this.state.listState)

      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });

  }





  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        // console.error(value);
        this.setState({ token: value })
      }
    } catch (error) {
      // Error retrieving data
    }
  };








  setListDataFunc(statusChosen) {

    if (statusChosen === "Completed") {
      console.warn(statusChosen)
      this.setState({ isloading: true })
      completeServiceApiConst(this.state.token)
        .then((responseJson) => {

          // console.error(responseJson);
          this.setState({ listState: responseJson, refreshing: false, isloading: false })
          // console.error(this.state.listState)

        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });
    }
    else if (statusChosen === "Pending") {
      console.warn(statusChosen)
      this.setState({ isloading: true })
      pendingServiceApiConst(this.state.token)
        .then((responseJson) => {

          // console.error(responseJson);
          this.setState({ listState: responseJson, refreshing: false, isloading: false })
          // console.error(this.state.listState)

        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });



    }
    else {
      console.warn(statusChosen)
      this.setState({ isloading: true })
      declinedServiceApiConst(this.state.token)
        .then((responseJson) => {

          // console.error(responseJson);
          this.setState({ listState: responseJson, refreshing: false, isloading: false })
          // console.error(this.state.listState)

        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });



    }

  }






  render() {
    var acceptstyle = { fontSize: 14, color: "#31a559" };
    var declinestyle = { fontSize: 14, color: "#d93f3f" };




    // name: "Monthly Cable Bill",
    //   propertyName: "GreenWood",
    //     tenantName: "Abhishek Sinha",
    //       priority: "Low"





    return (
      <SafeAreaView style={globalstyles.safearea}>




        <Spinner
          overlayColor="rgba(1, 154, 232, 0.7)"
          visible={this.state.isloading}
          textContent={'Loading Service Requests...'}
          textStyle={{ color: "#ffffff" }}
        />





        <View style={globalstyles.container_servicerequest}>


          {/* MODAL FOR LOADING AFTER DATA INSERT */}
          {/* <Modal
            onBackdropPress={() => this.setState({ isloading: false })}
            isVisible={this.state.isloading}
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
                <Text style={{ margin: 20, fontSize: 15 }}>
                  {" "}
                  Under Progress{" "}
                </Text>
              </View>
            </View>
          </Modal> */}









          {/* HEADER */}
          <View style={globalstyles.headercontainer_serviceRequest}>
            <TouchableOpacity
              onPress={() => {
                Actions.drawerOpen();
              }}
              style={globalstyles.menuImgView_serviceRequest}
            >
              <Image
                source={require("../Assets/Images/menu.png")}
                style={globalstyles.menuImg_serviceRequest}
              />
            </TouchableOpacity>

            <View style={globalstyles.TitleTextView_serviceRequest}>
              <Text style={globalstyles.TitleTxt_serviceRequest}>
                Service Requests
              </Text>
            </View>
          </View>










          {/* <View style={{ height: 70, width: "100%", backgroundColor: "#ffffff", alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => Actions.ServiceRequestsCompleted({ "usertoken": this.state.tokenState })}
              style={{ marginRight: 20, marginTop: 20, marginBottom: 10, width: 150, justifyContent: "center", alignItems: "center", borderRadius: 200, borderWidth: 2, padding: 10, borderColor: orangemain }}>
              <Text style={{ color: orangemain }}>View Completed</Text>
            </TouchableOpacity>
          </View> */}


          {/* MAIN BODY */}
          <View style={globalstyles.mainbodycontainer_serviceRequest}>


            <Dropdown
              value="Completed"
              label="Select Service Request Status, exp: pending"
              data={servStatus}
              onChangeText={value => {
                // this.setState({ country: value });
                console.warn(value);
                this.setListDataFunc(value)
              }}
            />








            {this.state.listState.length > 0 ? <View>
              <FlatList
                data={this.state.listState}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      // Alert.alert(this.state.tokenState)
                      Actions.ServiceRequestsViewDetails({ "tokenprop": this.state.token, "id": item.servicereqID })
                    }
                  >
                    <CardView
                      style={globalstyles.cardview_serviceRequest}
                      cardElevation={3}
                      cardMaxElevation={3}
                      cornerRadius={3}
                    >
                      <View>
                        {/* CARDVIEW HEADER */}
                        <View style={globalstyles.TitleView_serviceRequestCard}>
                          <View
                            style={
                              globalstyles.TitleInfoImgView_serviceRequestCard
                            }
                          >
                            <Image
                              source={require("../Assets/Images/info.png")}
                              style={[globalstyles.TitleInfoImg_serviceRequestCard, { width: 20, height: 20 }]}
                            />
                          </View>

                          <View
                            style={globalstyles.NameTextView_serviceRequestCard}
                          >
                            <Text style={globalstyles.NameTxt_serviceRequestCard}>
                              {item.title}
                            </Text>
                          </View>
                          {/* style={{ color: item.priority == "Low" ? "#00cc66" : item.priority == "Medium" ? "#cccc00" : item.priority == "High" ? "#ff9900" : "#cc3300" }} */}
                          {/* item.status == "Medium" ? "#cccc00" : item.status == "High" ? "#ff9900" : "#cc3300"  */}
                          <View
                            style={globalstyles.AccDecTextView_serviceRequestCard}
                          >
                            <View
                              style={{ borderRadius: 3, padding: 5, justifyContent: "center", alignItems: "center", width: 100, backgroundColor: item.priority == "0" ? "#00cc66" : item.priority == "1" ? "#ff9900" : item.priority == "3" ? "#cccc00" : "#cc3300" }}
                            >
                              <Text
                                style={{ color: "#ffffff" }}
                              >
                                {item.priority == "0" ? "Low" : item.priority == "1" ? "High" : item.priority == "3" ? "Medium" : "Urgent"}

                              </Text>
                            </View>
                          </View>
                        </View>



                        <View>
                          <Text>Property Name: <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.propertyName}</Text></Text>
                          <Text>Tenant Name: <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.userName}</Text></Text>
                        </View>
                      </View>
                    </CardView>
                  </TouchableOpacity>
                )} /></View> :

              <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>

                {/* tenaticonlist */}
                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                  <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                    <Image
                      style={{ width: 200, height: 200, }}
                      source={require('../Assets/Images/servicenavicon.png')}
                    />

                    <Image
                      style={{ width: 30, height: 30, marginTop: 20 }}
                      source={require('../Assets/Images/close_gray.png')}
                    />
                  </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                  <Text style={{ width: 300, marginLeft: 30, marginRight: 30 }}>Currently you do not have any service request under this category</Text>
                </View>

              </View>

            }


            {/* SERVICE REQUESTS MODAL  */}
            <Modal isVisible={this.state.isModalVisible}>
              <View style={globalstyles.mainview_serviceRequestModal}>
                <View style={globalstyles.TitleView_serviceRequestModal}>
                  <View style={globalstyles.TitleTextView_serviceRequestModal}>
                    <Text style={globalstyles.TitleText_serviceRequestModal}>
                      {this.state.modalheader}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => this.modelhide()}
                    style={globalstyles.TitlecloseImageView_serviceRequestModal}
                  >
                    <Image
                      source={require("../Assets/Images/close.png")}
                      style={globalstyles.TitleCloseImg}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={globalstyles.DetailText_serviceRequestModal}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </Text>
                </View>

                <View style={globalstyles.BottomView_serviceRequestModal}>
                  <TouchableOpacity style={{ flex: 1 }}>
                    <Text style={globalstyles.AcceptText_serviceRequestModal}>
                      ACCEPT
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1 }}>
                    <Text style={globalstyles.DeclineText_serviceRequestModal}>
                      DECLINE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
