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
  AsyncStorage,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import Modal from "react-native-modal";
import globalstyles from "./styles";
import { Actions } from "react-native-router-flux";
import { bluemain, orangemain } from "./styles";
import ImagePicker from "react-native-image-picker";
import { CountryListAPIcall, StateListAPIcall } from "../logic/OtherAPI_Logic";
import {
  COUNTRY_API,
  STATE_API,
  CITY_API,
  ADD_PROPERTY
} from "../logic/ApiConfig";
import Autocomplete from "react-native-autocomplete-input";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class AddProperty extends Component {
  constructor(props) {
    super(props);

    // http://192.168.100.25/property_management/api/addProperties

    //{"propertyName":"sia ambiance",
    // "propertyType":"singlunit",
    // "country":"india",
    // "streetName":"mg Road",
    // "city":"pune",
    // "state":"Maha",
    // "pincode":"411612",
    // "suburb":"abc",
    // "landmark":"KK chouck",
    // "price":"5200",
    // "flatHoseNo":"209"}

    this.state = {
      stateList: [],
      countrList: [],
      countryMap: [],
      stateMap: [],
      countryId: "",
      flat: "",
      streetaddress: "",
      city: " ",
      state: "",
      country: "",
      propertyType: "",
      zip: "",
      suburbs: "",
      landmarks: "",
      notes: "",
      isLoading: false,
      isModalVisible: false,
      isAddTransactionSucess: false,
      token: "",
      avatarSource: require("../Assets/Images/home.png"),
      propertyname: "",
      stateId: "",
      cityList: "",
      citiesMap: []
    };
  }

  async componentDidMount() {

    this.modelshow();

    const value = await AsyncStorage.getItem("usertoken");
    if (value !== null) {
      // We have data!!
      console.warn(value);
      this.setState({ token: value });
      console.warn(value);
    } else {
      console.warn("no value");
    }

    await CountryListAPIcall().then(responseJson => {
      console.error(responseJson);

      var country = responseJson.map(item => {
        var obj = {
          value: item.name
        };
        return obj;
      });
      this.setState({ countrList: responseJson, countryMap: country });
    });
  }

  modelshow() {
    this.setState({ isModalVisible: true });
  }

  modelhide() {
    this.setState({ isModalVisible: false });
  }

  validate() {
    if (
      this.state.streetaddress === "" ||
      this.state.country === "" ||
      this.state.state === "" ||
      this.state.city === "" ||
      this.state.zip === ""
    ) {
      Alert.alert("Error ", "Please enter email");
      return 100;
    } else {
      return 200;
    }
  }

  async saveProperty(value) {
    const validresponse = await this.validate();

    if (validresponse === 100) Alert.alert("PLease enter all Mandatory Fields");
    else {
      // console.warn(validresponse)
      this.setState({ isLoading: true });

      // console.error(value)
      const formData = new FormData();

      if (this.state.path != null) {
        const uri = this.state.path;
        // const uriParts = uri.split('.');
        // const fileType = uriParts[uriParts.length - 1];

        formData.append("property_image", {
          uri: uri,
          name: "image.jpg",
          type: "multipart/form-data"
        });
      }




      formData.append(
        "data",
        JSON.stringify({
          propertyName: this.state.propertyname,
          propertyType: this.state.propertyType,
          country: this.state.country,
          streetName: this.state.streetaddress,
          city: this.state.city,
          state: this.state.state,
          pincode: this.state.zip,
          landmark: this.state.landmarks,
          suburbs: this.state.suburbs,
          notes: this.state.notes
        })
      );

      console.warn(formData);
      // console.error(formData);

      await fetch(ADD_PROPERTY, {
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

          this.setState({ isLoading: false });

          // console.warn(responseJson);

          if (responseJson.msg == "success") {
            this.setState({ isAddTransactionSucess: true })
            // this.loginUser();
          }

          else {
            Alert.alert("Error", "All Fields are required");
          }
        })
        .catch(error => {
          console.error(error);
        });

      // await Actions.Properties();

    }
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

  populateStateDropdown() {
    console.warn(this.state.countrList);
    // console.warn(this.state.countryMap)

    for (var i = 0; i < this.state.countrList.length; i++) {
      var obj = this.state.countrList[i];

      // console.warn(obj.sortname);

      if (obj.name === this.state.country) this.setState({ countryId: obj.id });
    }

    fetch(STATE_API, {
      method: "POST",
      headers: {
        Accept: "application/json"
        //'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country_id: this.state.countryId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        var states = responseJson.map(item => {
          var obj = {
            value: item.name
          };
          return obj;
        });

        this.setState({ stateList: responseJson, stateMap: states });
      });
  }

  populateCityDropdown() {
    console.warn(this.state.countrList);
    // console.warn(this.state.countryMap)

    for (var i = 0; i < this.state.stateList.length; i++) {
      var obj = this.state.stateList[i];

      // console.warn(obj.sortname);

      if (obj.name === this.state.state) this.setState({ stateId: obj.id });
    }

    fetch(CITY_API, {
      method: "POST",
      headers: {
        Accept: "application/json"
        //'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state_id: this.state.stateId
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        var cities = responseJson.map(item => {
          var obj = {
            value: item.name
          };
          return obj;
        });

        this.setState({ cityList: responseJson, citiesMap: cities });
      });
  }

  render() {
    let { flat } = this.state;
    let { streetaddress } = this.state;
    let { city } = this.state;
    let { state } = this.state;
    let { country } = this.state;
    let { zip } = this.state;
    let { suburbs } = this.state;
    let { landmarks } = this.state;
    let { notes } = this.state;
    let { propertyname } = this.state;

    let unitTypeMap = [{ value: "multiunit" }, { value: "singleunit" }];

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

    return (
      <SafeAreaView style={globalstyles.safearea}>
        <Modal
          // onBackdropPress={() => this.setState({ isLoading: false })}
          isVisible={this.state.isLoading}
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
                Property Added Successfully
              </Text>


              <Text
                onPress={() => {
                  this.setState({ isAddTransactionSucess: false }),
                    Actions.Properties();
                }}
                style={{ margin: 12, color: orangemain, fontSize: 15 }}>
                OK
              </Text>
            </View>
          </View>
        </Modal>





        <View style={globalstyles.whitecontainer}>
          {/* HEADER */}
          <View style={globalstyles.headercontainer_addProperty}>
            <TouchableOpacity
              style={globalstyles.Left_arrowImgView_addProperty}
              onPress={() => {
                Actions.Properties();
              }}
            >
              <Image
                source={require("../Assets/Images/left-arrow.png")}
                style={globalstyles.Left_arrowImg_addProperty}
              />
            </TouchableOpacity>

            <View style={{ justifyContent: "center" }}>
              <Text style={globalstyles.TitleTxt_addProperty}>
                {/* Add Properties */}
              </Text>
            </View>
          </View>

          {/* MAIN BODY */}
          <ScrollView>
            {/*  SECOND ABNNER HEADER */}
            <View style={globalstyles.header_timelinetenant}>
              <View style={globalstyles.timelindetails_timelinetenants}>
                <Text style={globalstyles.username2_timelintenant}>
                  To add New property
                </Text>
                <Text style={globalstyles.username_timelintenant}>
                  Enter all Details
                </Text>
                {/* <Text style={globalstyles.username2_timelintenant} >This is your Timeline</Text> */}
              </View>

              <Image
                resizeMode="cover"
                style={globalstyles.headerimagestyle_timelinetenant}
                source={require("../Assets/Images/tenanttimeline.png")}
              />
            </View>
            <View style={globalstyles.mainbodycontainer_addproperty}>
              {/* 
              <Text style={globalstyles.enterAllDetailsTxt_addProperty}>
                Enter all details
              </Text> */}

              <TextField
                label="Street address"
                value={streetaddress}
                onChangeText={streetaddress => this.setState({ streetaddress })}
              />

              <Dropdown
                label="Select Country"
                data={this.state.countryMap}
                onChangeText={value => {
                  this.setState({ country: value });
                  console.warn(this.state.country);
                  this.populateStateDropdown();
                }}
              />

              <Dropdown
                label="Select State"
                data={this.state.stateMap}
                onChangeText={value => {
                  this.setState({ state: value });
                  console.warn(this.state.state);
                  this.populateCityDropdown();
                }}
              />

              <Dropdown
                label="Select City"
                data={this.state.citiesMap}
                onChangeText={value => {
                  this.setState({ city: value });
                  console.warn(this.state.city);
                  this.populateCityDropdown();
                }}
              />

              <TextField
                label="Zip/Postal Code"
                value={zip}
                onChangeText={zip => this.setState({ zip })}
              />

              <TextField
                label="Suburbs"
                value={suburbs}
                onChangeText={suburbs => this.setState({ suburbs })}
              />

              <TextField
                label="Landmarks"
                value={landmarks}
                onChangeText={landmarks => this.setState({ landmarks })}
              />

              <TextField
                label="Notes"
                value={notes}
                onChangeText={notes => this.setState({ notes })}
              />

              {/* SAVE BUTTON */}
              <View style={globalstyles.buttomcontainer2_addproperty}>
                <TouchableOpacity
                  onPress={() =>
                    // console.error(this.state.countrList[9].name)
                    this.saveProperty(this.state.token)
                  }
                  style={globalstyles.saveTextView_addProperty}
                >
                  <Text style={globalstyles.saveTxt_addProperty}>SAVE</Text>
                </TouchableOpacity>
              </View>

              {/* MODAL ADD NEW PROPERTY */}
              <Modal isVisible={this.state.isModalVisible}>
                <View style={globalstyles.mainView_addPropertyModal}>
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

                  <TextField
                    label="Property Name"
                    value={propertyname}
                    onChangeText={propertyname =>
                      this.setState({ propertyname })
                    }
                    style={{ marginLeft: 10, marginRight: 10 }}
                  />

                  <Dropdown
                    label="MultiUnit/SingleUnit"
                    data={unitTypeMap}
                    onChangeText={value => {
                      this.setState({ propertyType: value });
                    }}
                  />

                  {/* MODAL BUTTON */}
                  <TouchableOpacity
                    style={globalstyles.bottomView_addPropertyModal}
                    onPress={() => this.modelhide()}
                  >
                    <Text style={globalstyles.proceedTxt_addPropertyModal}>
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
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
