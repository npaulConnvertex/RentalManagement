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
  Text,
  Alert,
  FlatList,
  SafeAreaView,
  View,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Actions, Scene, Router, Tabs } from "react-native-router-flux";
import CardView from "react-native-cardview";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-picker";
import { Dropdown } from "react-native-material-dropdown";
import { GET_TRANSACTION_TYPE, GET_TENANT_LIST_TRANSACTION, VIEW_NOTICES_LANDLORD, SEND_NOTICE, GET_ALL_PROPS_TRANSACTION, GET_ALL_VENDORS, GET_ALL_UNITS_TRANSACTION, IMAGE_URL } from "../logic/ApiConfig"
import { TextField } from "react-native-material-textfield";
import Spinner from 'react-native-loading-spinner-overlay';








var tokenvar = "";


//imjport screens
import globalstyles from "./styles";
import { bluemain, orangemain } from "./styles";





export default class Notice extends Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      name: "hello",
      loggedIn: false,
      refreshing: false,
      newNoticePosted: false,
      token: "",
      isNoticeDetail: false,
      noticeListState: [],
      sendingNoticeLoader: false,
      propertyidstate: "",
      loadingnotice: true,
      isAddModalVisible: false,
      messageState: "",
      PropertyListArrayState: [],
      titleState: "",
      avatarSource: require("../Assets/Images/invitationLandlordSent.png"),
      currentState: "not-panic",
      jsondata: [
        {
          propertyname: "Sandalwood Apartment",
          noticeheader: "Winter Celebration",
          noticedate: "12/2/2018",
          noticetime: "12.00PM",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum elit consequat commodo dignissim. Quisque vehicula, purus id tincidunt dignissim, felis urna scelerisque ipsum, at consequat tortor est eu ex. Sed dignissim feugiat odio, at ultrices mi sodales eget. Pellentesque et aliquam quam. Quisque sollicitudin magna lectus, sit amet blandit sem"
        },
        {
          propertyname: "Sandalwood Apartment",
          noticeheader: "MArraige Anniversary",
          noticedate: "12/2/2018",
          noticetime: "8.00PM",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum elit consequat commodo dignissim. Quisque vehicula, purus id tincidunt dignissim, felis urna scelerisque ipsum, at consequat tortor est eu ex. Sed dignissim feugiat odio, at ultrices mi sodales eget. Pellentesque et aliquam quam. Quisque sollicitudin magna lectus, sit amet blandit sem"
        },
        {
          propertyname: "Precision",
          noticeheader: "Friday Night Party",
          noticedate: "12/2/2018",
          noticetime: "4.00AM",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum elit consequat commodo dignissim. Quisque vehicula, purus id tincidunt dignissim, felis urna scelerisque ipsum, at consequat tortor est eu ex. Sed dignissim feugiat odio, at ultrices mi sodales eget. Pellentesque et aliquam quam. Quisque sollicitudin magna lectus, sit amet blandit sem"
        },
        {
          propertyname: "Mount Juhi",
          noticeheader: "Robbery",
          noticedate: "12/2/2018",
          noticetime: "9.00AM",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum elit consequat commodo dignissim. Quisque vehicula, purus id tincidunt dignissim, felis urna scelerisque ipsum, at consequat tortor est eu ex. Sed dignissim feugiat odio, at ultrices mi sodales eget. Pellentesque et aliquam quam. Quisque sollicitudin magna lectus, sit amet blandit sem"
        }
      ]
    };
  }



  choosepic() {
    ImagePicker.showImagePicker(null, response => {
      //console.error('Response = ', response);
      if (response.didCancel) {
        console.error("User cancelled image picker");
      } else if (response.error) {
        console.error("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.error("User tapped custom button: ", response.customButton);
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
      }
    });
  }


  async sendingNotice() {



    var validated = this.validated()
    if (validated === 200) {
      await this.setState({ isAddModalVisible: false });

      // console.warn(validresponse)
      this.setState({ isLoading: true });

      // console.error(value)
      const formData = new FormData();

      if (this.state.path != null) {
        const uri = this.state.path;
        // const uriParts = uri.split('.');
        // const fileType = uriParts[uriParts.length - 1];

        formData.append("selectFile", {
          uri: uri,
          name: "image.jpg",
          type: "multipart/form-data"
        });
      }




      formData.append(
        "data",
        JSON.stringify({
          property_id: this.state.propertyidstate,
          title: this.state.titleState,
          description: this.state.messageState,
        })
      );

      console.warn(formData);
      // console.error(formData);

      this.setState({ sendingNoticeLoader: true })
      await fetch(SEND_NOTICE, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: this.state.token
        },
        body: formData
      })
        .then(response => response.json())
        .then(responseJson => {
          console.error(responseJson);
          this.setState({ sendingNoticeLoader: false, newNoticePosted: true })
          // this.setState({ isLoading: false });

          // console.warn(responseJson);

          // if (responseJson.msg == "success") {
          //   this.setState({ isAddTransactionSucess: true })
          //   // this.loginUser();
          // }

          // else {
          //   Alert.alert("Error", "All Fields are required");
          // }
        })
        .catch(error => {
          console.error(error);
        });

    }


  }



  validated() {
    if (this.state.messageState !== "" && this.state.titleState !== "" && this.state.propertyidstate !== "")
      return 200;
    else {
      Alert.alert("All Fields need to be filled")
    }


  }



  async componentWillMount() {

    await this._retrieveData()

    await fetch(GET_ALL_PROPS_TRANSACTION, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.token
      },
    }).then(response => response.json())
      .then((responseJson) => {

        // console.error(responseJson);

        var PropertyListArray = responseJson.map(item => {
          var obj = {
            value: item.propertyName,
            id: item.id
          };
          return obj;
        });

        // console.error(PropertyListArray)

        this.setState({ PropertyListArrayState: PropertyListArray, propertyListFull: responseJson })
      })
      .catch(error => {
        console.error(error);
      });



    await fetch(VIEW_NOTICES_LANDLORD, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.token
      },
    }).then(response => response.json())
      .then((responseJson) => {

        // console.error(responseJson.notice);


        this.setState({ noticeListState: responseJson.notice, loadingnotice: false })
      })
      .catch(error => {
        console.error(error);
      });




  }

  async _retrieveData() {
    await AsyncStorage.multiGet(["token", "email_id"]).then(response => {
      // console.error(response[0][1])
      this.setState({
        token: response[0][1],
        // isLoadingProperties1: true
      })

      tokenvar = this.state.token
      // Alert.alert(this.state.tokenState)
    })
  }


  async componentDidMount() {

  }


  async _handleRefresh() {


    // console.error("asdasd");

    fetch(VIEW_NOTICES_LANDLORD, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.token
      },
    }).then(response => response.json())
      .then((responseJson) => {

        // console.error(responseJson.notice);
        this.setState({ noticeListState: responseJson.notice, refreshing: false });

        // console.error(this.state.noticeListState)
      })
      .catch(error => {
        console.error(error);
      });

  }





  render() {


    var defautprofileImgstyle = {
      width: 30,
      height: 30,
      alignSelf: "center"
    };

    var profileImgstyle = {
      width: 115,
      height: 115,
      borderRadius: 200,
      alignSelf: "center"
    };

    let { titleState } = this.state;
    let { messageState } = this.state;






    return (
      <SafeAreaView style={globalstyles.safearea}>






        <Spinner
          overlayColor="rgba(1, 154, 232, 0.7)"
          visible={this.state.sendingNoticeLoader}
          textContent={'Sending Notice...'}
          textStyle={{ color: "#ffffff" }}
        />



        <Spinner
          overlayColor="rgba(1, 154, 232, 0.7)"
          visible={this.state.loadingnotice}
          textContent={'Loading Notices...'}
          textStyle={{ color: "#ffffff" }}
        />







        <Modal
          onBackdropPress={() => { this.setState({ isNoticeDetail: false }); }}
          onBackButtonPress={() => { this.setState({ isNoticeDetail: false }); }}
          isVisible={this.state.isNoticeDetail}
        >
          <View style={globalstyles.mainview_tenantcurrentModal}>
            <View style={globalstyles.titleView_tenantcurrentModal}>

              <View style={globalstyles.titleTxtView_tenantcurrentModal}>
                <Text style={globalstyles.titleTxt_tenantcurrentModal}>
                  {this.state.Titlenew}
                </Text>
              </View>

              <TouchableOpacity
                style={globalstyles.titlecloseImgView_tenantcurrentModal}
                onPress={() => {
                  this.setState({ isNoticeDetail: false });
                }}
              >
                <Image
                  source={require("../Assets/Images/close_gray.png")}
                  style={globalstyles.titleCloseImg_tenantcurrentModal}
                />
              </TouchableOpacity>
            </View>



            <View style={{ height: 150, backgroundColor: "#a3a3a3", borderRadius: 10 }}>
              <Image
                style={{ height: 150, }}
                source={{ uri: IMAGE_URL + this.state.imgnew }}
                resizeMode="cover"
              />
            </View>

            {/* <Text style={{ fontWeight:"500",  fontSize:20}}>{this.state.Titlenew}</Text> */}

            <Text style={{ fontWeight: "500", fontSize: 18, marginTop: 20 }}>{this.state.propertynamenew}</Text>
            <Text style={{ fontWeight: "100", fontSize: 12, color: "#55ff" }}>{this.state.datenew}</Text>
            <Text style={{ fontWeight: "100", fontSize: 12, marginTop: 20, marginBottom: 20, color: "#888888" }}>{this.state.descriptionnew}</Text>

          </View>
        </Modal>






        <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
          {/* TITLE BAR */}
          <CardView style={globalstyles.titlebarmain_timelinetenant}>
            {/* Drawer icon */}
            <TouchableOpacity
              onPress={() => {
                Actions.drawerOpen();
              }}
              style={globalstyles.menuicon_timelintenant}
            >
              <Image
                style={globalstyles.backstyle_notificationtenant}
                source={require("../Assets/Images/menu.png")}
              />
            </TouchableOpacity>

            <View style={globalstyles.titleview_timelinetenant}>
              <Text style={{ color: "#ffffff", fontSize: 22 }}>
                Notice Section
              </Text>
            </View>
          </CardView>

          {/* NOTICE */}
          <TouchableOpacity
            onPress={() => {
              this.setState({ isAddModalVisible: true });
            }}
            style={{
              borderRadius: 200,
              width: 100,
              height: 50,
              zIndex: 10,
              bottom: 10,
              right: 10,
              position: "absolute",
              backgroundColor: orangemain,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#ffffff" }}>Add Notice</Text>
          </TouchableOpacity>

          {/* CLICK ON FAB TO OPEN MODAL ADD TENANT */}
          <Modal
            onBackdropPress={() => {
              this.setState({ isAddModalVisible: false });
            }}
            onBackButtonPress={() => {
              this.setState({ isAddModalVisible: false });
            }}
            isVisible={this.state.isAddModalVisible}
          >
            <View style={globalstyles.mainview_tenantcurrentModal}>
              <View style={globalstyles.titleView_tenantcurrentModal}>
                <View style={globalstyles.titleTxtView_tenantcurrentModal}>
                  <Text style={globalstyles.titleTxt_tenantcurrentModal}>
                    Notice
                  </Text>
                </View>

                <TouchableOpacity
                  style={globalstyles.titlecloseImgView_tenantcurrentModal}
                  onPress={() => {
                    this.setState({ isAddModalVisible: false });
                  }}
                >
                  <Image
                    source={require("../Assets/Images/close_gray.png")}
                    style={globalstyles.titleCloseImg_tenantcurrentModal}
                  />
                </TouchableOpacity>
              </View>


              <TouchableOpacity
                onPress={() => this.choosepic()}
                style={globalstyles.homeImgView_addPropertyModal}
              >
                <Image
                  source={this.state.avatarSource}
                  // source={require("../Assets/Images/home.png")}
                  style={
                    this.state.imgselected
                      ? profileImgstyle
                      : defautprofileImgstyle
                  }

                // style={globalstyles.homeImg_addPropertyModal}
                />
              </TouchableOpacity>



              <Dropdown
                label="Choose Property"
                data={this.state.PropertyListArrayState}
                onChangeText={async (propertyNameState, index) => {
                  // selectedIndex = -1
                  await this.setState({ propertyidstate: this.state.PropertyListArrayState[index].id })
                  // console.error(this.state.propertyidstate);

                }
                }
              />




              <TextField
                label="Title"
                placeholder="exp:- New Year Party"
                value={titleState}
                onChangeText={titleState => this.setState({ titleState })}
                style={globalstyles.txtfieldStyle_tenantcurrentModal}
              />

              <TextField
                label="Message"
                value={messageState}
                onChangeText={messageState => this.setState({ messageState })}
                style={globalstyles.txtfieldStyle_tenantcurrentModal}
              />

              <TouchableOpacity
                style={globalstyles.submitBtnView_tenantcurrentModal}
                onPress={() => {
                  this.sendingNotice()
                }}
              >
                <Text style={globalstyles.submitTxt_tenantcurrentModal}>
                  Send Notice
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <View
            style={{
              flex: 1,
              backgroundColor: "#f3f3f3",
              marginTop: 20,
              marginBottom: 40
            }}
          >


            {this.state.newNoticePosted === true ? <View style={{ marginTop: 10, height: 10, marginBottom: 30, width: "100%", height: 20, alignItems: "center", }}>
              <Text style={{ color: bluemain }}>Pull To Refresh</Text>
            </View> : <View></View>}

            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={this._handleRefresh()}
              data={this.state.noticeListState}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <CardView style={globalstyles.peoplelisttouch_homepeople}>

                    <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
                      <Image
                        source={{ uri: IMAGE_URL + item.img }}
                        resizeMode="contain"
                        style={{ height: 50, width: 100 }}
                      />
                    </View>


                    <View style={{ flex: 0.7 }}>
                      <Text style={{ fontSize: 20, fontWeight: "500" }}>{item.title}</Text>
                      <Text style={{ fontSize: 18 }}>{item.propertyName}</Text>
                      <Text style={{ fontSize: 12 }}>{item.description.substr(0, 20)}. .....</Text>



                      <Text
                        style={{ color: bluemain, marginTop: 15, fontSize: 12 }}
                        onPress={() => this.setState({ isNoticeDetail: true, Titlenew: item.title, descriptionnew: item.description, datenew: item.date, propertynamenew: item.propertyName, imgnew: item.img })}> View Details ></Text>
                    </View>




                  </CardView>
                </View>
              )}
            />



          </View>
        </View>
      </SafeAreaView>
    );
  }
}
