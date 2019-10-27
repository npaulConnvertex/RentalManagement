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
  AsyncStorage,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Alert
} from "react-native";
import globalstyles from "./styles";
import Modal from "react-native-modal";
import { TextField } from "react-native-material-textfield";
import { ADD_TENANT, GET_TENANT_LIST, IMAGE_URL, BASE_URL } from "../logic/ApiConfig";
import { bluemain } from "./styles.android";
// import { stringify } from "querystring";

var mapTenants = [];

export default class TenantCurrent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddModalVisible: false,
      isModalVisible: false,
      descriptionTenant: [],
      isProgrees: false,
      dataStatus: true,
      stateTenantEmail: "",
      isSuccessModalVisible: false,
      stateTenantName: "",
      stateTenantMobile: "",
      stateTenantPassword: "",
      stateTenantConfirmPassword: "",
      tenantjsondata: [],
      // tenantjsondata: [
      //   {
      //     name: "Sanya Roamano",
      //     address: "Westlands,Nairobi"
      //   },
      //   {
      //     name: "Elizabeth Blackburn",
      //     address: "Westlands,Nairobi"
      //   },
      //   {
      //     name: "Max Born",
      //     address: "Westlands,Nairobi"
      //   },
      //   {
      //     name: "Chris Paul",
      //     address: "Westlands,Nairobi"
      //   },
      //   {
      //     name: "Dorothy Hodgkin",
      //     address: "Westlands,Nairobi"
      //   }
      // ]
    };
  }

  addmodelshow() {
    this.setState({ isAddModalVisible: true });
  }

  addmodelhide() {
    this.setState({ isAddModalVisible: false });
  }




  async showSuccessModal() {
    // await this.setState({ isSuccessModalVisible: true });

    const value = await AsyncStorage.getItem("usertoken");
    if (value !== null) {
      // We have data!!
      console.warn(value);
      this.setState({ token: value });
      console.warn(value);
    } else {
      console.warn("no value");
    }





    await fetch(GET_TENANT_LIST, {
      method: "GET",
      headers: {
        Accept: "application/json",
        //'Content-Type': 'application/json',
        Authorization: value
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.error(responseJson.tenantList.length);
        // this.setState({ tenantjsondata: responseJson });
        // console.warn(this.state.tenantjsondata.length);

        if (responseJson.tenantList.length > 0) {
          this.setState({ tenantjsondata: responseJson.tenantList });
        } else {
          this.setState({ tenantjsondata: [] });
        }

      })
      .catch(error => {
        console.error(error);
      });


  }

  async addTenantDetails() {
    this.setState({ isProgrees: true });
    this.addmodelhide();

    console.warn(this.state.stateTenantName)

    await fetch(ADD_TENANT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        //'Content-Type': 'application/json',
        Authorization: this.state.token
      },
      body: JSON.stringify({
        email: this.state.stateTenantEmail,
        phone: this.state.stateTenantMobile,
        userName: this.state.stateTenantName
        // password: this.state.stateTenantPassword,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ isProgrees: false });
        // this.setState({ isSuccessModalVisible: true });
        // console.error(responseJson);
        this.addmodelhide();
        // this.componentDidMount();
        // this.forceUpdate();

        Alert.alert(
          "Alert",
          "You have successfully added a Tenant. Email has ben sent to Tenant.",
          [
            // {
            //   text: "Ask me later",
            //   onPress: () => console.log("Ask me later pressed")
            // },
            // {
            //   text: "Cancel",
            //   onPress: () => console.warn("Cancel Pressed")
            //   // style: "cancel"
            // },
            {
              text: "OK",
              onPress: () => {
                console.warn("OK Pressed");
                this.showSuccessModal();
              }
            }
          ],
          { cancelable: false }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  modelshow(modalvar) {
    var strinn = modalvar.profilephoto
    strinn = strinn.toString()
    modalvar.profilephoto = strinn
    this.setState({ isModalVisible: true, descriptionTenant: modalvar });

  }

  modelhide() {
    this.setState({ isModalVisible: false });
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem("usertoken");
    if (value !== null) {
      // We have data!!
      console.warn(value);
      this.setState({ token: value });
      console.warn(value);
    } else {
      console.warn("no value");
    }

    await fetch(GET_TENANT_LIST, {
      method: "GET",
      headers: {
        Accept: "application/json",
        //'Content-Type': 'application/json',
        Authorization: value
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.error(responseJson);

        if (responseJson.tenantList.length > 0) {
          this.setState({ tenantjsondata: responseJson.tenantList });
        } else {
          this.setState({ tenantjsondata: [] });
        }
        // this.setState({ tenantjsondata: responseJson.tenantList });
        // console.warn(this.state.tenantjsondata.length);
      })
      .catch(error => {
        console.error(error);
      });
  }



  render() {
    let { stateTenantEmail } = this.state;
    let { stateTenantMobile } = this.state;
    let { stateTenantName } = this.state;
    let { stateTenantPassword } = this.state;
    let { stateTenantConfirmPassword } = this.state;

    if (!this.state.dataStatus) {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={globalstyles.nodatacontainer_tenantcurrent}>
            <Image source={require("../Assets/Images/tenatsnodata.png")} />
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={globalstyles.safearea}>





          {/* MODAL FOR LOADING AFTER DATA INSERT */}
          <Modal
            onBackdropPress={() => this.setState({ isProgrees: false })}
            isVisible={this.state.isProgrees}
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
          </Modal>




          {/* MODAL FOR SUCCES MESSAGE */}
          <Modal
            onBackdropPress={() =>
              this.setState({ isSuccessModalVisible: false })
            }
            isVisible={this.state.isSuccessModalVisible}
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
                  You have succesfully added a tenant. Email has ben sent to
                  Tenant{" "}
                </Text>
              </View>
            </View>
          </Modal>






          <View style={globalstyles.datacontainer_tenantcurrent}>
            <FlatList
              data={this.state.tenantjsondata}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={async () => {
                    await this.setState({})
                    this.modelshow(item);
                  }}
                  style={globalstyles.mainView_tenantcurrentflatlist}
                >
                  {/* ICON */}
                  <View
                    style={globalstyles.tenantIconView_tenantcurrentflatlist}
                  >
                    <Image
                      resizeMode="contain"
                      style={globalstyles.tenantIconstyle_tenantcurrentflatlist}
                      source={item.profilephoto == null ? require("../Assets/Images/tenaticonlist.png") : item.profilephoto.indexOf("https:") !== -1 ? { uri: item.profilephoto } : { uri: IMAGE_URL + item.profilephoto }}
                    // source={{ uri: IMAGE_URL + item.property_imges }}
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
                    onPress={() => {
                      this.modelshow(item.name);
                    }}
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





            {/*  FLOATING BUTTON */}
            <TouchableOpacity
              style={globalstyles.floatingbtn_tenantcurrent}
              onPress={() => {
                this.addmodelshow();
              }}
            >
              <Image
                source={require("../Assets/Images/add_plus.png")}
                style={globalstyles.floatingbtnicon_tenantcurrent}
              />
            </TouchableOpacity>






            {/* CLICK ON FAB TO OPEN MODAL ADD TENANT */}
            <Modal isVisible={this.state.isAddModalVisible}>
              <View style={globalstyles.mainview_tenantcurrentModal}>
                <View style={globalstyles.titleView_tenantcurrentModal}>
                  <View style={globalstyles.titleTxtView_tenantcurrentModal}>
                    <Text style={globalstyles.titleTxt_tenantcurrentModal}>
                      Add Tenant
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={globalstyles.titlecloseImgView_tenantcurrentModal}
                    onPress={() => this.addmodelhide()}
                  >
                    <Image
                      source={require("../Assets/Images/close_gray.png")}
                      style={globalstyles.titleCloseImg_tenantcurrentModal}
                    />
                  </TouchableOpacity>
                </View>

                <TextField
                  label="Name"
                  style={globalstyles.txtfieldStyle_tenantcurrentModal}
                  value={stateTenantName}
                  onChangeText={stateTenantName =>
                    this.setState({ stateTenantName })
                  }
                />

                <TextField
                  label="Email Id"
                  style={globalstyles.txtfieldStyle_tenantcurrentModal}
                  value={stateTenantEmail}
                  onChangeText={stateTenantEmail =>
                    this.setState({ stateTenantEmail })
                  }
                />

                <TextField
                  label="Mobile No"
                  keyboardType="number-pad"
                  style={globalstyles.txtfieldStyle_tenantcurrentModal}
                  value={stateTenantMobile}
                  onChangeText={stateTenantMobile =>
                    this.setState({ stateTenantMobile })
                  }
                />

                {/* <TextField
                  label="Password"
                  secureTextEntry={true}
                  style={globalstyles.txtfieldStyle_tenantcurrentModal}
                  value={stateTenantConfirmPassword}
                  onChangeText={stateTenantConfirmPassword => this.setState({ stateTenantConfirmPassword })}
                />

                <TextField
                  label="Confirm Password"
                  secureTextEntry={true}
                  style={globalstyles.txtfieldStyle_tenantcurrentModal}
                  value={stateTenantPassword}
                  onChangeText={stateTenantPassword => this.setState({ stateTenantPassword })}
                /> */}

                <TextField
                  label="Add Notes"
                  style={globalstyles.txtfieldStyle_tenantcurrentModal}
                />

                <TouchableOpacity
                  style={globalstyles.submitBtnView_tenantcurrentModal}
                  onPress={() => this.addTenantDetails()}
                >
                  <Text style={globalstyles.submitTxt_tenantcurrentModal}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>



            {/* MODAL TO OPEN VIEW DETAIL */}
            <Modal isVisible={this.state.isModalVisible}>
              <View style={globalstyles.mainview_tenantcurrentModal}>
                <View style={globalstyles.titleView_tenantcurrentModal}>
                  <View style={globalstyles.titleTxtView_tenantcurrentModal}>
                    <Text style={globalstyles.titleTxt_tenantcurrentModal}>
                      {this.state.tenantName}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={globalstyles.titlecloseImgView_tenantcurrentModal}
                    onPress={() => this.modelhide()}
                  >
                    <Image
                      source={require("../Assets/Images/close_gray.png")}
                      style={globalstyles.titleCloseImg_tenantcurrentModal}
                    />
                  </TouchableOpacity>
                </View>


                {/* // { uri: IMAGE_URL + this.state.descriptionTenant.profilephoto } */}


                <View>
                  <Image
                    style={{ width: 300, height: 200 }}
                  // source={this.state.descriptionTenant.profilephoto === "null" ? require("../Assets/Images/ROOMS/room1.jpg") : (this.state.descriptionTenant.profilephoto.indexOf("https:") == -1 ? { uri: IMAGE_URL + this.state.descriptionTenant.profilephoto } : { uri: this.state.descriptionTenant.profilephoto })}
                  //source={this.state.descriptionTenant.profilephoto.indexOf("https:") == -1 ? { uri: IMAGE_URL + this.state.descriptionTenant.profilephoto } : { uri: this.state.descriptionTenant.profilephoto }}
                  />
                </View>
                <Text style={{ fontWeight: "500", fontSize: 23 }}>
                  {this.state.descriptionTenant.userName}
                </Text>
                <Text style={{ fontSize: 18 }}>
                  {this.state.descriptionTenant.email}
                </Text>
                <Text style={{ fontSize: 18 }}>
                  {this.state.descriptionTenant.phone}
                </Text>


                {/* line */}
                {/* <View style={globalstyles.Line_tenantcurrentModal} /> */}

                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={globalstyles.nametxt_tenantcurrentflatlist}>
                    Property Name:{" "}
                  </Text>
                  <Text style={globalstyles.addrtxt_tenantcurrentflatlist}>
                    Greenville Apartment
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={globalstyles.nametxt_tenantcurrentflatlist}>
                    Flat/House no:{" "}
                  </Text>
                  <Text style={globalstyles.addrtxt_tenantcurrentflatlist}>
                    32A
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={globalstyles.nametxt_tenantcurrentflatlist}>
                    Rent Amount:{" "}
                  </Text>
                  <Text style={globalstyles.addrtxt_tenantcurrentflatlist}>
                    300 USD
                  </Text>
                </View> */}

                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20
                  }}
                >
                  <Text style={globalstyles.nametxt_tenantcurrentflatlist}>
                    Payment Day:{" "}
                  </Text>
                  <Text style={globalstyles.addrtxt_tenantcurrentflatlist}>
                    Date 5
                  </Text>
                </View> */}



              </View>
            </Modal>



          </View>
        </SafeAreaView>
      );
    }
  }
}
