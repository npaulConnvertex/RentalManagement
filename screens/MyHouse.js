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
  Alert,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  NetInfo,
  Dimensions,
  FlatList,
  AsyncStorage,
} from "react-native";

import globalstyles from "./styles";
import CardView from "react-native-cardview";
import { Dropdown } from "react-native-material-dropdown";
import Modal from "react-native-modal";
import { TextField } from "react-native-material-textfield";
import Carousel from 'react-native-snap-carousel';
import ImagePicker from "react-native-image-picker";
import SearchHeader from 'react-native-search-header';
import { bluemain } from "./styles";
import { Actions } from "react-native-router-flux";
import { IMAGE_URL } from "../logic/ApiConfig"
import ImageSlider from 'react-native-image-slider';
import { orangemain } from "./styles.android";
import { getMyhouseBasicConst, sendInvitationConst, requestLandlordForUnitApiConst, getLandlordListConst, propertyunderlandlordConst, unitUnderlandlordConst } from "../logic/MyHouseApiLogic"
import Spinner from 'react-native-loading-spinner-overlay';



import {
  ADD_SERVICE_REQUEST, VIEW_NOTICES_TENANT
} from "../logic/ApiConfig";


var DeviceWidth = Dimensions.get('window').width
DeviceWidth = DeviceWidth




export default class MyHouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagelist: [],
      connection_Status: "Offline",
      landlordList: [],
      detailsState: {},
      isAddTransactionSucess: false,
      isAddTransactionSucess2: false,
      isAddTransactionSucess3: false,
      uidState: "",
      emialidSend: "",
      pidState: "",
      lidState: "",
      connection_Status: "",
      isfindLandlordVis: false,
      isfindLandlordVis23: false,
      residingStatus: 1,
      timeerState: "14 Days",
      ReantStatusPayment: "Due",
      serviceImageSource: require("../Assets/Images/home.png"),
      entries: [
        { imgSource: require("../Assets/Images/ROOMS/room1.jpg") },
        { imgSource: require("../Assets/Images/ROOMS/room2.jpg") },
        { imgSource: require("../Assets/Images/ROOMS/room3.jpg") },
        { imgSource: require("../Assets/Images/ROOMS/room4.jpg") },
        { imgSource: require("../Assets/Images/ROOMS/room2.jpg") },
      ],
      isModalVisible: false,
      token: "",
      messagetitle: "",
      message: "",
      serviceTitle: "",
      serviceDescription: "",
      serviceImagePath: "",
      users: [
        {
          name: "Monthly Cable Bill",
          status: "ACCEPTED",
          address: "Melissa Franklin,",
          city: "Westlands,Nairobi",
          detail:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },
        {
          name: "Reimbarsurement",
          status: "PENDING",
          address: "Melissa Franklin,",
          city: "Westlands,Nairobi",
          detail:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        },

      ],
    };
  }





  async setunitlist(value, index) {

    await this.setState({ pidState: this.state.propertylist[index].id })


    // console.warn(this.state.propertylist[index].id + this.state.token)
    await unitUnderlandlordConst(this.state.propertylist[index].id, this.state.token)
      .then((responseJson) => {

        // console.error(responseJson)

        var unitList = responseJson.map(item => {
          // console.warn(item);

          var obj = {
            value: item.flatHoseNo,
            id: item.id
          };
          return obj;
        });


        this.setState({ unitListState: unitList });

        // this.setState({ landlordList: landlordNames }); 

      })
      .catch((error) => {
        // console.error(`Error: ${error}`);
      });

    console.warn(this.state.unitListState)

  }


  sendrequestFunc() {


    this.setState({ isfindLandlordVis: false })
    if (this.state.token === "" || this.state.pidState === "" || this.state.lidState === "" || this.state.uidState === "") {
      Alert.alert("Error", "Missing Fields")
    }
    else {

      // console.error("dfsdfs" + this.state.token + this.state.lidState + this.state.uidState + this.state.pidState)
      requestLandlordForUnitApiConst(this.state.token, this.state.uidState, this.state.pidState, this.state.lidState)
        .then((responseJson) => {

          // console.error(responseJson.status)
          if (responseJson.status === "added successfully")
            this.setState({ isAddTransactionSucess: true })
          else
            this.setState({ isAddTransactionSucess2: true })


        })
        .catch((error) => {
          // console.error(`Error: ${error}`);
        });

    }


  }


  async componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange

    );

    NetInfo.isConnected.fetch().done((isConnected) => {

      if (isConnected == true) {
        // Alert.alert("online")
        this.setState({ connection_Status: "Online" })
      }
      else {
        // Alert.alert("offline")
        this.setState({ connection_Status: "Offline" })
      }

    });
  }



  _handleConnectivityChange = (isConnected) => {

    if (isConnected == true) {
      this.setState({ connection_Status: "Online" })
    }
    else {

      this.setState({ connection_Status: "Offline" })
    }
  };





  async componentWillMount() {


    // Alert.alert("asdasdssd")
    await NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange

    );



    await AsyncStorage.multiGet(["token", "email_id", "username", "phone"]).then(response => {
      // console.warn(response[0][1])
      this.setState({ sUsername: response[2][1], token: response[0][1] })
      //  console.warn(response[0][1]) // Value1
      //  console.warn(response[1][0]) // Key2
      //  console.warn(response[1][1]) // Value2


      // Saving a key to recognize at signin process
      if (response[0][1] !== null) {
        // console.error(response[0][1]);
        AsyncStorage.multiSet([['usertoken', response[0][1]], ['usertoken2', 'tenant']],
          function (error) {
            // alert("finished");
            if (error) {
              alert("error!");
            } else {
              // console.warn("saved to internal storage")
            }
          });
      }
    })

    // console.warn(this.state.token)






    await getMyhouseBasicConst(this.state.token)
      .then((responseJson) => {


        // console.error(responseJson)


        if (responseJson.status === "Link") {
          // Alert.alert("linked"),
          this.setState({ residingStatus: 2 })
          this.setState({ detailsState: responseJson.data.data, listState: responseJson.data.service_request })
        }
        else {
          // Alert.alert("unlinked"),
          this.setState({ residingStatus: 3 })
        }



        // this.setState({ detailsState: responseJson.data.data, listState: responseJson.data.service_request })

        // console.warn(this.state.detailsState);


        var iamgeslistvar = responseJson.data.image.map(item => {
          var obj = {
            imgSource: { uri: IMAGE_URL + item.home_img }
          };
          return obj;
        });

        this.setState({ imagelist: iamgeslistvar, });


        // console.error(this.state.imagelist);

        // console.error(this.state.detailsState.state);


        // console.error(this.state.detailsState);
        // "landlord_id":"94",
        //     "unit_id":"20",
        //     "propertyIdflatHoseNo":"14",
        //     "userName":"Dexter Jordan",
        //     "onRent":"Yes"

      })
      .catch((error) => {
        // console.error(`Error: ${error}`);
      });




    // Alert.alert(this.state.residingStatus)





    await getLandlordListConst(this.state.token)
      .then((responseJson) => {

        // console.error(responseJson)

        var landlordNames = responseJson.map(item => {
          var obj = {
            value: item.userName,
            id: item.id
          };
          return obj;
        });

        this.setState({ landlordList: landlordNames });

      })
      .catch((error) => {
        // console.error(`Error: ${error}`);
      });


    // console.error(this.state.landlordList)





    await fetch(VIEW_NOTICES_TENANT, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.state.token
      },
    }).then(response => response.json())
      .then((responseJson) => {

        // console.error(responseJson);


        this.setState({ noticeListState: responseJson })
      })
      .catch(error => {
        console.error(error);
      });



  }









  modelshow() {
    this.setState({ isModalVisible: true });
  }

  modelhide() {

    var defautprofileImgstyle = {
      width: 30,
      height: 30,
      alignSelf: "center"
    };

    this.setState({ isModalVisible: false });
    // await this.setState({ imgselected: defautprofileImgstyle });
    // await this.setState({ serviceImageSource: '' });
  }









  async sendMessage() {
    // console.warn(this.state.serviceImagePath);
    const formData = new FormData();

    if (this.state.serviceImagePath != null) {
      const uri = this.state.serviceImagePath;
      // const uriParts = uri.split('.');
      // const fileType = uriParts[uriParts.length - 1];

      formData.append("file", {
        uri: uri,
        name: "image.jpg",
        type: "multipart/form-data"
      });
    }
    else {
      Alert.alert("Image not found")
    }

    formData.append(
      "data",
      JSON.stringify({
        unit_id: 20,
        title: this.state.serviceTitle,
        description: this.state.serviceDescription,
      })
    );




    console.warn(this.state.serviceTitle);
    console.warn(this.state.serviceDescription);
    console.warn(this.state.serviceImagePath);






    await fetch(ADD_SERVICE_REQUEST, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        authorization: this.state.token,
      },
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.error(responseJson);

        this.setState({ isModalVisible: false, isAddTransactionSucess: true })
        // this.setState({ isLoading: false });

        // Alert.alert(responseJson);
        // if (responseJson.msg == "success") {
        //   Alert.alert("Sucess", "Property Added");
        //   // this.loginUser();
        // }

        // else {
        //   Alert.alert("Error", "All Fields are required");
        // }
      })
      .catch(error => {
        // console.error(error);
      });

  }
















  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Image
          style={{ width: "100%", borderRadius: 10, height: DeviceWidth * 0.5 }}
          source={item.imgSource}
        />
      </View>
    );
  }


  choosepic() {
    ImagePicker.showImagePicker(null, response => {
      //console.error('Response = ', response);
      if (response.didCancel) {
        // console.error("User cancelled image picker");
      } else if (response.error) {
        // console.error("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        // console.error("User tapped custom button: ", response.customButton);
      } else {
        //const source = { uri: response.uri };
        //console.error(response);

        const source = { uri: "file://" + response.path };
        //Alert.alert("IMAGE ADDRESS", source.text())

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          serviceImageSource: source,
          serviceImagePath: response.uri,
          imgselected: true
        });
      }
    });
  }



  async setPropertyList(value, index) {


    await this.setState({ lidState: this.state.landlordList[index].id })

    propertyunderlandlordConst(this.state.landlordList[index].id)
      .then((responseJson) => {

        // console.error(responseJson)



        this.setState({ propertylist: responseJson });

      })
      .catch((error) => {
        // console.error(`Error: ${error}`);
      });



  }







  async sendInvitation() {

    this.setState({ isloadingsendinvitaion: true, isfindLandlordVis23: false })
    sendInvitationConst(this.state.token, this.state.emialidSend)
      .then((responseJson) => {

        console.error(responseJson)
        this.setState({ isAddTransactionSucess3: true, isloadingsendinvitaion: false })


      })
      .catch((error) => {
        // console.error(`Error: ${error}`);
      });

  }





  render() {



    const images = [
      require("../Assets/Images/ROOMS/room1.jpg"),
      require("../Assets/Images/ROOMS/room2.jpg"),
      require("../Assets/Images/ROOMS/room3.jpg"),
      require("../Assets/Images/ROOMS/room4.jpg"),
    ];

    var acceptstyle = { fontSize: 14, color: "#31a559" };
    var declinestyle = { fontSize: 14, color: "#d93f3f" };
    var pendingstyle = { fontSize: 14, color: "#f4b342" };

    let { messagetitle } = this.state;
    let { message } = this.state;

    var propertyNames = [{
      value: 'Newyork',
    }, {
      value: 'Louisiana',
    }, {
      value: 'Rhode Island',
    }, {
      value: 'Oregon',
    }, {
      value: 'North Carolina',
    }, {
      value: 'Indiana',
    }];






    var defautprofileImgstyle = {
      width: 30,
      height: 30,
      alignSelf: "center"
    };

    var profileImgstyle = {
      width: 115,
      height: 115,
      // borderRadius: 200,
      alignSelf: "center"
    };


    if (this.state.residingStatus === 1) {
      return (

        <View>

          {/* <Text>dfsdf</Text> */}
        </View>
      )
    }
    else if (this.state.residingStatus === 3) {
      return (
        <SafeAreaView style={globalstyles.safearea}>


          <Spinner
            overlayColor="rgba(0, 0, 0, 0.5)"
            visible={this.state.isloadingsendinvitaion}
            textContent={'Sending Invitation...'}
            textStyle={{ color: "White" }}
          />




          <Modal isVisible={this.state.isAddTransactionSucess}>
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
                  Request Sent Successfully
              </Text>


                <Text
                  onPress={() => {
                    this.setState({ isAddTransactionSucess: false })
                  }}
                  style={{ margin: 12, color: orangemain, fontSize: 15 }}>
                  OK
              </Text>
              </View>
            </View>
          </Modal>









          <Modal isVisible={this.state.isAddTransactionSucess2}>
            <View style={{ padding: 20, backgroundColor: "#ffffff" }}>


              <View
                style={{

                  backgroundColor: "#ffffff",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{ height: 60, width: 60, margin: 30 }}
                  source={require("../Assets/Images/error_cloud.png")}
                />
                <Text style={{ margin: 20, fontSize: 15 }}>
                  Error while sending request
              </Text>


                <Text
                  onPress={() => {
                    this.setState({ isAddTransactionSucess2: false })
                  }}
                  style={{ margin: 12, color: orangemain, fontSize: 15 }}>
                  OK
              </Text>
              </View>
            </View>
          </Modal>




          <Modal
            onBackButtonPress={() => this.setState({ isAddTransactionSucess3: false })}
            onBackdropPress={() => this.setState({ isAddTransactionSucess3: false })}
            isVisible={this.state.isAddTransactionSucess3}>
            <View style={{ padding: 20, backgroundColor: "#ffffff" }}>


              <View
                style={{

                  backgroundColor: "#ffffff",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{ height: 60, width: 60, margin: 30 }}
                  source={require("../Assets/Images/invitationLandlordSent.png")}
                />
                <Text style={{ margin: 20, fontSize: 15 }}>
                  Invitation has been sent
              </Text>


                <Text
                  onPress={() => {
                    this.setState({ isAddTransactionSucess2: false })
                  }}
                  style={{ margin: 12, color: orangemain, fontSize: 15 }}>
                  OK
              </Text>
              </View>
            </View>
          </Modal>






          <View style={globalstyles.container}>



            {/* MODAL LANLORD FIND */}
            <Modal
              onBackButtonPress={() => this.setState({ isfindLandlordVis: false })}
              onBackdropPress={() => this.setState({ isfindLandlordVis: false })}
              isVisible={this.state.isfindLandlordVis}>
              <View style={globalstyles.mainView_addPropertyModal}>




                <Text style={{ fontSize: 20, fontWeight: "500" }}>Find Your landlord</Text>








                <Dropdown
                  label="Choose Landlord"
                  data={this.state.landlordList}
                  onChangeText={(value, index) => {
                    this.setPropertyList(value, index)
                    // console.error("sadasd")
                  }

                  }
                />



                <Dropdown
                  label="select property"
                  data={this.state.propertylist}
                  onChangeText={(value, index) => {
                    this.setunitlist(value, index)
                  }
                  }
                />





                <Dropdown
                  label="select unit"
                  data={this.state.unitListState}
                  onChangeText={(value, index) => {
                    // console.warn(this.state.unitListState[index].id)
                    this.setState({ uidState: this.state.unitListState[index].id })
                  }}
                />




                {/* MODAL BUTTON */}
                <TouchableOpacity
                  style={{ width: 200, height: 50, color: "#ffffff", borderRadius: 200, backgroundColor: "#ffffff" }}
                  onPress={() => {
                    this.sendrequestFunc()
                  }
                  }
                >
                  <Text style={globalstyles.proceedTxt_addPropertyModal}>
                    Send request
                    </Text>


                </TouchableOpacity>


                <View style={{ marginBottom: 20, alignItems: "center" }}>
                  <Text>Could Not Find your Landlord ? </Text>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500" }}
                    onPress={() => {
                      this.setState({ isfindLandlordVis: false, isfindLandlordVis23: true })
                    }
                    }> Send Invitation </Text>
                </View>




              </View>
            </Modal>







            {/* MODAL LANLORD FIND */}
            <Modal
              onBackButtonPress={() => this.setState({ isfindLandlordVis23: false })}
              onBackdropPress={() => this.setState({ isfindLandlordVis23: false })}
              isVisible={this.state.isfindLandlordVis23}>
              <View style={globalstyles.mainView_addPropertyModal}>




                <Text style={{ fontSize: 20, fontWeight: "500" }}>Send Invitation To landlord</Text>




                <TextField
                  label="Emailid"
                  keyboardType="email-address"
                  onChangeText={(value) => this.setState({ emialidSend: value })}
                />


                {/* MODAL BUTTON */}
                <TouchableOpacity
                  style={{ width: 200, height: 50, color: "#ffffff", borderRadius: 200, backgroundColor: "#ffffff" }}
                  onPress={() => {
                    this.sendInvitation()
                  }
                  }
                >
                  <Text style={[globalstyles.proceedTxt_addPropertyModal, { marginTop: 10 }]}>
                    Send Invitation
                    </Text>


                </TouchableOpacity>






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
                <Text style={{ color: "#ffffff", fontSize: 22 }}>My House</Text>
              </View>





              <View style={{ flex: 0.1, padding: 10 }}>
                <TouchableOpacity
                  onPress={() => { Actions.NotificationsTenant() }}
                  style={{ flex: 1, flexDirection: "row" }} >
                  <Image
                    style={{ width: 25, height: 25, }}
                    source={require('../Assets/Images/notifications.png')}
                  />
                  <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: "#ff3333" }}>
                  </View>
                </TouchableOpacity>
              </View>

            </View>






            <View style={{ flex: 1, alignItems: "center", backgroundColor: "#ffffff" }}>

              <View style={{ alignContent: "center", justifyContent: "center", marginTop: 100, marginBottom: 60 }}>
                <Text style={{ fontSize: 20 }}>Hello <Text style={{ fontSize: 25, fontWeight: "500", color: bluemain }}>{this.state.sUsername}</Text></Text>
                <Text>Curretly you are not linked to any unit</Text>
                <Text>Either search for a landlord or search property</Text>
              </View>









              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignSelf: "center" }}>

                <View style={{ flex: 0.45 }}>

                  <TouchableOpacity
                    onPress={() => { this.setState({ isfindLandlordVis: true }) }}
                  >
                    <CardView
                      style={{ backgroundColor: "#ffffff", marginRight: 10, justifyContent: "center", alignItems: "center" }}
                      cardElevation={4}
                    >
                      <View style={{ borderRadius: 700, backgroundColor: "#7BC574", height: 140, width: 140, justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                        <Image
                          style={{ height: 100, width: 100 }}
                          source={require("../Assets/Images/landlordSearchLogo.png")}
                        />
                      </View>

                      <View>
                        <Text style={{ fontSize: 15, fontWeight: "500", marginBottom: 20, marginTop: 30 }}>Find your Landlord</Text>
                      </View>


                    </CardView>
                  </TouchableOpacity>


                </View>


                <View style={{ flex: 0.45 }}>

                  <TouchableOpacity
                    onPress={() => {
                      Actions.Searchproperties()
                    }
                    }
                  >
                    <CardView
                      style={{ backgroundColor: "#ffffff", marginRight: 10, justifyContent: "center", alignItems: "center" }}
                      cardElevation={4}
                    >
                      <View style={{ borderRadius: 700, backgroundColor: bluemain, height: 140, width: 140, justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                        <Image
                          style={{ height: 90, width: 90 }}
                          // source={require("../Assets/Images/landlordSearchLogo.png")}
                          source={require("../Assets/Images/searchPropertyLogo.png")}
                        />
                      </View>

                      <View>
                        <Text style={{ fontSize: 15, fontWeight: "500", marginBottom: 20, marginTop: 30 }}>Search For Properties</Text>
                      </View>


                    </CardView>
                  </TouchableOpacity>


                </View>






              </View>

            </View>

          </View>

        </SafeAreaView >
      );

    }




    else {
      if (Platform.OS === "android") {
        return (
          <SafeAreaView style={globalstyles.safearea}>

            <Modal isVisible={this.state.isAddTransactionSucess}>
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
                    Request Sent Successfully
              </Text>


                  <Text
                    onPress={() => {
                      this.setState({ isAddTransactionSucess: false })
                    }}
                    style={{ margin: 12, color: orangemain, fontSize: 15 }}>
                    OK
              </Text>
                </View>
              </View>
            </Modal>





            <ScrollView style={{ flex: 1 }}>


              <View style={globalstyles.container}>


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
                    <Text style={{ color: "#ffffff", fontSize: 22 }}>My House</Text>
                  </View>


                  <View style={{ flex: 0.1, padding: 10 }}>
                    <TouchableOpacity
                      onPress={() => { Actions.NotificationsTenant() }}
                      style={{ flex: 1, flexDirection: "row" }} >
                      <Image
                        style={{ width: 25, height: 25, }}
                        source={require('../Assets/Images/notifications.png')}
                      />
                      <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: "#ff3333" }}>
                      </View>
                    </TouchableOpacity>
                  </View>

                </View>


                <View style={globalstyles.mainbodycontainer2_myhouse}>

                  {/* <ImageSlider
                loopBothSides
                style={{ flex: 1, height: 250 }}
                autoPlayWithInterval={3000}
                images={images}
              /> */}


                  <View style={{ height: 20, backgroundColor: "#ffffff" }} >
                    {this.state.connection_Status === "Offline" ? <View style={{ flex: 1, marginBottom: 10, flexDirection: "row", height: 40, backgroundColor: "#ee5555", justifyContent: "center", alignItems: "center" }}><Text>Offline</Text></View> : <View style={{ flex: 1, marginBottom: 20, flexDirection: "row", height: 40, backgroundColor: "#ffffff" }}></View>}
                  </View>

                  <Carousel
                    // layout={'stack'} layoutCardOffset={`18`}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.imagelist}
                    renderItem={this._renderItem}
                    sliderWidth={DeviceWidth}
                    itemWidth={DeviceWidth * 0.8}
                  />


                  {/* MAINBODY */}
                  <View style={globalstyles.mainbodycontainer_myhouse}>


                    {/* ADDRESS CARDVIEW */}
                    {/* <CardView
                  style={globalstyles.cardview_myhouse}
                  cardElevation={10}
                  cardMaxElevation={10}
                  cornerRadius={3}
                > */}
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20, }}>


                      <Text style={globalstyles.smalltxtview_myhouse}>
                        {/* {this.state.detailsState.country} */}
                        {this.state.detailsState.propertyName}
                        {/* kasbfjksdjbf */}
                      </Text>


                      <View style={{ flexDirection: "row", marginBottom: 20, justifyContent: "center" }}>
                        <Text style={globalstyles.titletxt_myhouse}>
                          Flat/House No:
                    </Text>
                        <Text style={globalstyles.titletxt_myhouse}>
                          {this.state.detailsState.flathoseNo}
                        </Text>
                      </View>

                      <View style={{ justifyContent: "center", alignItems: "center" }}>


                        <Text style={{ fontSize: 15 }}>
                          {this.state.detailsState.state},  {this.state.detailsState.suburbs},  {this.state.detailsState.country},  {this.state.detailsState.landmark}
                        </Text>


                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                          <Text style={{ fontSize: 15 }}>
                            Pincode:
                   </Text>
                          <Text style={{ fontSize: 15 }}>
                            {this.state.detailsState.pincode}
                          </Text>
                        </View>


                      </View>


                    </View>
                    {/* </CardView> */}




                    {/* MODAL */}
                    {/* <Modal
                  onBackdropPress={() => this.modelhide()}
                  onBackButtonPress={() => this.modelhide()}
                  isVisible={this.state.isModalVisible}
                >
                  <View style={globalstyles.mainview_myhouseModal}>
                    <TouchableOpacity
                      onPress={() => this.modelhide()}
                      style={{ alignItems: "flex-end" }}
                    >
                      <Image
                        source={require("../Assets/Images/close_gray.png")}
                        style={{ width: 20, height: 20 }}
                      />
                    </TouchableOpacity>

                    <TextField
                      label="Enter Title"
                      value={messagetitle}
                      onChangeText={messagetitle => this.setState({ messagetitle })}
                      style={globalstyles.txtfield_myhouseModal}
                    />

                    <TextField
                      label="Enter Messsage for service"
                      value={message}
                      onChangeText={message => this.setState({ message })}
                      style={globalstyles.txtfield_myhouseModal}
                    />

                    <View style={{ marginTop: 20 }}>

                      <Dropdown
                        label="Select Location"
                        data={propertyNames}
                        onChangeText={value => console.warn('selected')}
                      />

                    </View>


                    <TouchableOpacity onPress={() => this.modelhide()}>
                      <Text style={globalstyles.sendtxt_myhouseModal}>
                        Send Message
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal> */}










                    <Modal
                      onBackdropPress={() => this.modelhide()}
                      isVisible={this.state.isModalVisible}
                    >
                      <View style={globalstyles.mainView_addPropertyModal}>

                        <TouchableOpacity
                          onPress={() => this.modelhide()}
                          style={{ alignItems: "flex-end" }}
                        >
                          <Image
                            source={require("../Assets/Images/close_gray.png")}
                            style={{ width: 20, height: 20 }}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => this.choosepic()}
                          style={globalstyles.homeImgView_addPropertyModal}
                        >
                          <Image
                            source={this.state.serviceImageSource}
                            // source={require("../Assets/Images/home.png")}
                            style={
                              this.state.imgselected
                                ? profileImgstyle
                                : defautprofileImgstyle
                            }

                          // style={globalstyles.homeImg_addPropertyModal}
                          />
                        </TouchableOpacity>

                        <TextField
                          label="Service Title"
                          value={this.state.serviceTitle}
                          onChangeText={text =>
                            this.setState({ serviceTitle: text })
                          }
                          style={{ marginLeft: 10, marginRight: 10 }}
                        />

                        <TextField
                          label="Service Description"
                          value={this.state.serviceDescription}
                          onChangeText={text =>
                            this.setState({ serviceDescription: text })
                          }
                          multiline
                          style={{ marginLeft: 10, marginRight: 10 }}
                        />

                        {/* MODAL BUTTON */}
                        <TouchableOpacity
                          style={globalstyles.bottomView_addPropertyModal}
                          onPress={() => this.sendMessage()}
                        >
                          <Text style={{
                            fontSize: 20,
                            color: "#f65418",
                          }}>
                            Send Request
                    </Text>
                          {/* 
                      <Image
                        source={require("../Assets/Images/right_arrow_org.png")}
                        style={globalstyles.right_arrowImg_addPropertyModal}
                      /> */}
                        </TouchableOpacity>
                      </View>
                    </Modal>









                    {/* PLEASE READ B  E F O R E    CODING THIS */}
                    {/* below view is for stating weither payment is upcoming , done, or overdue */}

                    <View style={{ marginTop: 20, flex: 1, height: 70, justifyContent: "space-around", alignItems: "center", flexDirection: "row", backgroundColor: this.state.ReantStatusPayment !== "Due in" ? this.state.ReantStatusPayment === "Payment Over" ? "#26AA36" : "#E4C000" : "#ee4444" }}>
                      <View>
                        <Text style={{ color: "#ffffff", fontSize: 25 }}>{this.state.ReantStatusPayment + this.state.timeerState}</Text>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ color: "#ffffff", fontSize: 15 }}>Payment Date: <Text style={{ color: "#ffffff", fontSize: 15 }}>16/03/2018</Text></Text>
                        </View>
                      </View>

                      <View >
                        <Image
                          style={{ width: 40, height: 40 }}
                          source={this.state.ReantStatusPayment !== "Due in" ? this.state.ReantStatusPayment === "Payment Over" ? require("../Assets/Images/done.png") : require("../Assets/Images/clock.png") : require("../Assets/Images/error.png")} />
                      </View>
                    </View>









                    <TouchableOpacity
                      onPress={() => { Actions.PayScreenTenant() }}
                      style={globalstyles.paybtnview_myhouse}>
                      <Text style={globalstyles.cardviewbtntxt_myhouse}>
                        Pay Rent
          </Text>
                      <Image
                        source={require("../Assets/Images/dollar.png")}
                        style={globalstyles.dollarImg_myhouse}
                      />
                    </TouchableOpacity>


                    {/* PAYMENT CARDVIEW */}
                    <View
                    >
                      <View>


                        <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around", marginTop: 20 }}>
                          <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 10 }}>First Day</Text>
                            <Text>{this.state.detailsState.leaseStartDate}</Text>
                          </View>

                          <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 10 }}>Lease Start Date</Text>
                            <Text>{this.state.detailsState.leaseEndDate}</Text>
                          </View>


                          <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 10 }}>Lease End Date</Text>
                            <Text>{this.state.detailsState.leaseTenantEndDate}</Text>
                          </View>


                          <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 10 }}>Payment Day</Text>
                            <Text>{this.state.detailsState.leaseTenantStartDate}</Text>
                          </View>



                        </View>

                        <View style={{ flexDirection: "row", marginTop: 50, marginLeft: 20, marginRight: 20 }}>
                          <View style={{ flex: 0.5 }}>
                            <Text style={globalstyles.smalltxtview_myhouse}>
                              Rent per Month
                         </Text>
                            <Text style={globalstyles.largetxtview_myhouse}>{this.state.detailsState.rentAmount}</Text>
                          </View>

                          <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                            <Text style={globalstyles.smalltxtview_myhouse}>
                              Payment Frequency
                         </Text>
                            <Text style={globalstyles.largetxtview_myhouse}>
                              {this.state.detailsState.paymentFrequency}
                            </Text>
                          </View>

                        </View>


                        <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20, marginRight: 20, }}>
                          <View style={{ flex: 0.5 }}>
                            <Text style={globalstyles.smalltxtview_myhouse}>
                              Deposit
                         </Text>
                            <Text style={globalstyles.largetxtview_myhouse}>{this.state.detailsState.depositAmount}</Text>
                          </View>


                          <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                            <Text style={globalstyles.smalltxtview_myhouse}>
                              Landlord name
                              </Text>
                            <Text style={[globalstyles.largetxtview_myhouse, { fontSize: 20 }]}>{this.state.detailsState.UserName}</Text>
                          </View>


                        </View>





                      </View>
                    </View>
                  </View>



                  <View style={{ marginTop: 40 }}>
                    <Text style={{ marginBottom: 20, marginLeft: 10 }}>
                      Previous Service Request
                  </Text>
                  </View>

                  <View style={{ padding: 10, backgroundColor: "#eeeeee" }}>

                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      // refreshing={this.state.noticeListState}
                      // onRefresh={this._handleRefresh()}
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
                          <CardView
                            cornerRadius={10}
                            style={globalstyles.peoplelisttouch_homepeople}>

                            <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
                              <Image
                                source={{ uri: IMAGE_URL + item.img }}
                                resizeMode="contain"
                                style={{ height: 50, width: 100 }}
                              />
                            </View>


                            <View style={{ marginRight: 10 }}>
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







                  <TouchableOpacity
                    // style={{ backgroundColor: orangemain, padding: 10, borderRadius: 200 }}
                    onPress={() => this.modelshow()}
                  >
                    <Text style={globalstyles.cardviewbtntxt_myhouse}>
                      Send Service Request
                           </Text>

                    {/* <Image
                      source={require("../Assets/Images/sendmsg_white.png")}
                      style={globalstyles.sendmsgwhiteImg_myhouse}
                    /> */}
                  </TouchableOpacity>
















                  <TouchableOpacity
                    onPress={() => this.modelshow()}
                    style={globalstyles.bottomView_myhouse}>
                    <Text style={globalstyles.bottomTxt_myhouse}>Add Service Request</Text>

                    <Image
                      tintColor={"#ffffff"}
                      source={require("../Assets/Images/servicenavicon.png")}
                      style={globalstyles.vacateImg_myhouse}
                    />
                  </TouchableOpacity>




                  <View style={{ marginTop: 40 }}>
                    <Text style={{ marginBottom: 20, marginLeft: 10 }}>
                      Previous Service Request
                  </Text>




                    <FlatList
                      data={this.state.listState}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() =>
                            // Alert.alert(this.state.tokenState)
                            Actions.ServiceRequestsViewDetails({ "tokenprop": this.state.token })
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
                                    style={{ borderRadius: 3, padding: 5, justifyContent: "center", alignItems: "center", width: 100, backgroundColor: item.priority == "0" ? "#00cc66" : item.priority == "1" ? "#cccc00" : item.priority == "3" ? "#ff9900" : "#cc3300" }}
                                  >
                                    <Text
                                      style={{ color: "#ffffff" }}
                                    >
                                      {item.priority}

                                    </Text>
                                  </View>
                                </View>
                              </View>


                              {/* "title":"Tubelight needs to be repaired",
                "description":"please help fast",
                "priority":"0",
                "status":"0",
                "id":"17",
                "name":null */}
                              <View>
                                <Text style={{ fontSize: 12 }}>{item.description}</Text>
                                <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.status === "0" ? "Pending" : item.status === "1" ? "Complete" : "Decline"}</Text>
                              </View>
                            </View>
                          </CardView>
                        </TouchableOpacity>
                      )}

                    />
                  </View>


                </View>



              </View>







            </ScrollView>

          </SafeAreaView >
        );
      }

      else {
        return (
          <SafeAreaView style={globalstyles.safearea}>



            <Modal isVisible={this.state.isAddTransactionSucess}>
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
                    Request Sent Successfully
              </Text>


                  <Text
                    onPress={() => {
                      this.setState({ isAddTransactionSucess: false })
                    }}
                    style={{ margin: 12, color: orangemain, fontSize: 15 }}>
                    OK
              </Text>
                </View>
              </View>
            </Modal>



            <ScrollView style={{ flex: 1 }}>

              <View style={globalstyles.container}>


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
                    <Text style={{ color: "#ffffff", fontSize: 22 }}>My House</Text>
                  </View>


                  <View style={{ flex: 0.1, padding: 10 }}>
                    <TouchableOpacity
                      onPress={() => { Actions.NotificationsTenant() }}
                      style={{ flex: 1, flexDirection: "row" }} >
                      <Image
                        style={{ width: 25, height: 25, }}
                        source={require('../Assets/Images/notifications.png')}
                      />
                      <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: "#ff3333" }}>
                      </View>
                    </TouchableOpacity>
                  </View>

                </View>


                <View style={{ height: 20, backgroundColor: "#ffffff" }} ></View>

                <Carousel
                  // layout={'stack'} layoutCardOffset={`18`}
                  ref={(c) => { this._carousel = c; }}
                  data={this.state.imagelist}
                  renderItem={this._renderItem}
                  sliderWidth={DeviceWidth}
                  itemWidth={DeviceWidth * 0.8}
                />



                <View style={[globalstyles.mainbodycontainer2_myhouse, { margin: 20 }]}>








                  <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20, }}>


                    <Text style={globalstyles.smalltxtview_myhouse}>
                      {/* {this.state.detailsState.country} */}
                      {this.state.detailsState.propertyName}
                    </Text>


                    <View style={{ flexDirection: "row", marginBottom: 20, justifyContent: "center" }}>
                      <Text style={globalstyles.titletxt_myhouse}>
                        Flat/House No:
                    </Text>
                      <Text style={globalstyles.titletxt_myhouse}>{this.state.detailsState.flathoseNo}</Text>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center" }}>


                      <Text style={{ fontSize: 15 }}>
                        {this.state.detailsState.state},  {this.state.detailsState.suburbs},  {this.state.detailsState.country},  {this.state.detailsState.landmark}
                      </Text>


                      <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Text style={{ fontSize: 15 }}>
                          Pincode:
                   </Text>
                        <Text style={{ fontSize: 15 }}>{this.state.detailsState.pincode}</Text>
                      </View>


                    </View>


                  </View>
                  {/* </CardView> */}


                  <Modal
                    onBackdropPress={() => this.modelhide()}
                    isVisible={this.state.isModalVisible}
                  >
                    <View style={globalstyles.mainView_addPropertyModal}>

                      <TouchableOpacity
                        onPress={() => this.modelhide()}
                        style={{ alignItems: "flex-end" }}
                      >
                        <Image
                          source={require("../Assets/Images/close_gray.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => this.choosepic()}
                        style={globalstyles.homeImgView_addPropertyModal}
                      >
                        <Image
                          source={this.state.serviceImageSource}
                          // source={require("../Assets/Images/home.png")}
                          style={
                            this.state.imgselected
                              ? profileImgstyle
                              : defautprofileImgstyle
                          }

                        // style={globalstyles.homeImg_addPropertyModal}
                        />
                      </TouchableOpacity>

                      <TextField
                        label="Service Title"
                        value={this.state.serviceTitle}
                        onChangeText={text =>
                          this.setState({ serviceTitle: text })
                        }
                        style={{ marginLeft: 10, marginRight: 10 }}
                      />

                      <TextField
                        label="Service Description"
                        value={this.state.serviceDescription}
                        onChangeText={text =>
                          this.setState({ serviceDescription: text })
                        }
                        multiline
                        style={{ marginLeft: 10, marginRight: 10 }}
                      />

                      {/* MODAL BUTTON */}
                      <TouchableOpacity
                        style={globalstyles.bottomView_addPropertyModal}
                        onPress={() => this.sendMessage()}
                      >
                        <Text style={{
                          fontSize: 20,
                          color: "#f65418",
                        }}>
                          Send Message
                    </Text>
                        {/* 
                      <Image
                        source={require("../Assets/Images/right_arrow_org.png")}
                        style={globalstyles.right_arrowImg_addPropertyModal}
                      /> */}
                      </TouchableOpacity>
                    </View>
                  </Modal>


                  {/* PLEASE READ B  E F O R E    CODING THIS */}
                  {/* below view is for stating weither payment is upcoming , done, or overdue */}

                  <View style={{ marginTop: 20, flex: 1, height: 70, justifyContent: "space-around", alignItems: "center", flexDirection: "row", backgroundColor: this.state.ReantStatusPayment !== "Due in" ? this.state.ReantStatusPayment === "Payment Over" ? "#26AA36" : "#E4C000" : "#ee4444" }}>
                    <View>
                      <Text style={{ color: "#ffffff", fontSize: 25 }}>{this.state.ReantStatusPayment + this.state.timeerState}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "#ffffff", fontSize: 15 }}>Payment Date: <Text style={{ color: "#ffffff", fontSize: 15 }}>16/03/2018</Text></Text>
                      </View>
                    </View>

                    <View >
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={this.state.ReantStatusPayment !== "Due in" ? this.state.ReantStatusPayment === "Payment Over" ? require("../Assets/Images/done.png") : require("../Assets/Images/clock.png") : require("../Assets/Images/error.png")} />
                    </View>
                  </View>


                  <TouchableOpacity
                    onPress={() => { Actions.PayScreenTenant() }}
                    style={globalstyles.paybtnview_myhouse}>
                    <Text style={globalstyles.cardviewbtntxt_myhouse}>
                      Pay Rent
          </Text>
                    <Image
                      source={require("../Assets/Images/dollar.png")}
                      style={globalstyles.dollarImg_myhouse}
                    />
                  </TouchableOpacity>


                  {/* PAYMENT CARDVIEW */}
                  <View
                  >
                    <View>


                      <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", marginTop: 20 }}>
                        <View style={{ alignItems: "center" }}>
                          <Text style={{ fontSize: 10 }}>First Day</Text>
                          <Text style={{ color: "#333333" }}>{this.state.detailsState.leaseStartDate}</Text>
                        </View>

                        <View style={{ alignItems: "center" }}>
                          <Text style={{ fontSize: 10 }}>Lease Start Date</Text>
                          <Text>{this.state.detailsState.leaseEndDate}</Text>
                        </View>


                        <View style={{ alignItems: "center" }}>
                          <Text style={{ fontSize: 10 }}>Lease End Date</Text>
                          <Text>{this.state.detailsState.leaseTenantEndDate}</Text>
                        </View>


                        <View style={{ alignItems: "center" }}>
                          <Text style={{ fontSize: 10 }}>Payment Day</Text>
                          <Text>{this.state.detailsState.leaseTenantStartDate}</Text>
                        </View>



                      </View>

                      <View style={{ flexDirection: "row", marginTop: 50, marginLeft: 20, marginRight: 20 }}>
                        <View style={{ flex: 0.5 }}>
                          <Text style={globalstyles.smalltxtview_myhouse}>
                            Rent per Month
                         </Text>
                          <Text style={globalstyles.largetxtview_myhouse}>{this.state.detailsState.rentAmount}</Text>
                        </View>

                        <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                          <Text style={globalstyles.smalltxtview_myhouse}>
                            Payment Frequency
                         </Text>
                          <Text style={globalstyles.largetxtview_myhouse}>
                            {this.state.detailsState.paymentFrequency}
                          </Text>
                        </View>

                      </View>


                      <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20, marginRight: 20, }}>
                        <View style={{ flex: 0.5 }}>
                          <Text style={globalstyles.smalltxtview_myhouse}>
                            Deposit
                         </Text>
                          <Text style={globalstyles.largetxtview_myhouse}>{this.state.detailsState.depositAmount}</Text>
                        </View>



                      </View>





                    </View>
                  </View>


                </View>


                <View style={{ marginTop: 50 }}>
                  <Text style={{ marginBottom: 20, marginLeft: 20, fontSize: 20, fontWeight: "500" }}>
                    Notices
                  </Text>
                </View>


                <View style={{ padding: 10, backgroundColor: "#eeeeee" }}>

                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    // refreshing={this.state.noticeListState}
                    // onRefresh={this._handleRefresh()}
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
                        <CardView
                          cornerRadius={10}
                          style={globalstyles.peoplelisttouch_homepeople}>

                          <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
                            <Image
                              source={{ uri: IMAGE_URL + item.img }}
                              resizeMode="contain"
                              style={{ height: 50, width: 100 }}
                            />
                          </View>


                          <View style={{ marginRight: 10 }}>
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







                <TouchableOpacity
                  // style={{ backgroundColor: orangemain, padding: 10, borderRadius: 200 }}
                  onPress={() => this.modelshow()}
                >
                  <Text style={globalstyles.cardviewbtntxt_myhouse}>
                    Send Service Request
                        </Text>

                  {/* <Image
                    source={require("../Assets/Images/sendmsg_white.png")}
                    style={globalstyles.sendmsgwhiteImg_myhouse}
                  /> */}
                </TouchableOpacity>
















                <TouchableOpacity
                  onPress={() => this.modelshow()}
                  style={globalstyles.bottomView_myhouse}>
                  <Text style={globalstyles.bottomTxt_myhouse}>Add Service Request</Text>

                  <Image
                    tintColor={"#ffffff"}
                    source={require("../Assets/Images/tools_service.png")}
                    style={globalstyles.vacateImg_myhouse}
                  />
                </TouchableOpacity>


                <View style={{ marginTop: 40 }}>



                  <Text style={{ marginBottom: 20, marginLeft: 10, fontSize: 20, fontWeight: "500" }}>
                    Previous Service Request
                  </Text>




                  <FlatList
                    data={this.state.listState}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          // Alert.alert(this.state.tokenState)
                          Actions.ServiceRequestsViewDetails({ "tokenprop": this.state.token })
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
                                  style={{ borderRadius: 3, padding: 5, justifyContent: "center", alignItems: "center", width: 100, backgroundColor: item.priority == "0" ? "#00cc66" : item.priority == "1" ? "#cccc00" : item.priority == "3" ? "#ff9900" : "#cc3300" }}
                                >
                                  <Text
                                    style={{ color: "#ffffff" }}
                                  >
                                    {item.priority}

                                  </Text>
                                </View>
                              </View>
                            </View>


                            {/* "title":"Tubelight needs to be repaired",
                "description":"please help fast",
                "priority":"0",
                "status":"0",
                "id":"17",
                "name":null */}
                            <View>
                              <Text style={{ fontSize: 12 }}>{item.description}</Text>
                              <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.status === "0" ? "Pending" : item.status === "1" ? "Complete" : "Decline"}</Text>
                            </View>
                          </View>
                        </CardView>
                      </TouchableOpacity>
                    )}

                  />
                </View>




              </View>











            </ScrollView>

          </SafeAreaView >
        );
      }
    }




  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  slide: {
    // width: "100%",
    borderRadius: 10,
    backgroundColor: "#444444"
  }
  ,



  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 56,
    marginBottom: 6,
    backgroundColor: '#00bcd4'
  },
  label: {
    flexGrow: 1,
    fontSize: 20,
    fontWeight: `600`,
    textAlign: `left`,
    marginVertical: 8,
    paddingVertical: 3,
    color: `#f5fcff`,
    backgroundColor: `transparent`
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 40,
    marginTop: 40,
    borderRadius: 2,
    backgroundColor: `#ff5722`
  }



});

