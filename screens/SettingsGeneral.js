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
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import { TextField } from "react-native-material-textfield";
import CardView from 'react-native-cardview'
import globalstyles from "./styles";
import ImagePicker from "react-native-image-picker";
import { bluemain } from "./styles.android";
import { UPDATE_PROFILE_IMAGE } from "../logic/ApiConfig"
import { changePassapiconst, changeMobileandNameapiconst } from "../logic/settingsApiLogic"





export default class SettingsGeneral extends Component {



  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      currentpwd: "",
      newpwd: "",
      confirmpwd: "",
      mobile: "",
      path: null,
      token: "",
      avatarSource: require("../Assets/Images/camera.png")
    };
  }

  validation() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let mobilreg = /^[0]?[789]\d{9}$/;

    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.currentpwd === "" ||
      this.state.newpwd === "" ||
      this.state.confirmpwd === "" ||
      this.state.mobile === ""
    ) {
      Alert.alert("Error ", "Empty fields");
    } else if (reg.test(this.state.email) === false) {
      Alert.alert("Error", "Invalid Email");
    } else if (this.state.newpwd !== this.state.confirmpwd) {
      Alert.alert("Error ", "Confirm password not matches");
    } else if (mobilreg.test(this.state.mobile) === false) {
      Alert.alert("Error", "Invalid Mobile");
    } else {
      Alert.alert(
        "success",
        "data....." +
        this.state.name +
        "," +
        this.state.email +
        "," +
        this.state.currentpwd +
        "," +
        this.state.newpwd +
        "," +
        this.state.confirmpwd +
        "," +
        this.state.mobile
      );
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


  }









  UpdateProfilePhoto() {

    if (this.state.path === null)
      Alert.alert("Photo Not Selected")
    else {
      {

        const formData = new FormData();


        if (this.state.path != null) {
          const uri = this.state.path;
          formData.append('selectFile', { uri: uri, name: 'Profileimage.jpg', type: "multipart/form-data" });
        }


        console.warn(formData);



        fetch(UPDATE_PROFILE_IMAGE, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: this.state.token
          },
          body: formData,
        }).then((response) => response.text())
          .then((responseJson) => {
            console.error(responseJson);


            AsyncStorage.multiSet(
              [
                ["token", this.state.token],
                ["profile_pic", responseJson.profilephoto],

              ],
              function (error) {
                //alert("finished");
                if (error) {
                  alert("error!");
                } else {
                  console.warn("saved to internal storage");
                }
              }
            );



          })
          .catch((error) => {
            console.error(error);
          });


      }

    }
  }


  async updateNameMobileFunc() {


    if (this.state.name === "" || this.state.mobile === "") {
      Alert.alert("Fields are empty")
    }
    else {

      await changeMobileandNameapiconst(this.state.token, this.state.name, this.state.mobile)
        .then((responseJson) => {

          console.error(responseJson)
          if (responseJson.msg === "success")
            Alert.alert("Updated Successfully")
          else if (responseJson.msg === "error") {
            Alert.alert(responseJson.errorInfo)
          }

        })
        .catch((error) => {
          console.error(`Error: ${error}`);
        });


    }
  }



  async updatePasswordFunc() {

    if (this.state.confirmpwd === "" || this.state.newpwd === "" || this.state.currentpwd === "") {
      Alert.alert("Fields are empty")
    }
    else {
      if (this.state.confirmpwd === this.state.newpwd) {
        await changePassapiconst(this.state.token, this.state.newpwd, this.state.currentpwd)
          .then((responseJson) => {

            console.error(responseJson)
            if (responseJson.msg === "error") {
              Alert.alert(responseJson.errorInfo)
            }
            else
              Alert.alert("Password Successfully updated")

          })
          .catch((error) => {
            console.error(`Error: ${error}`);
          });
      }
      else
        Alert.alert("Passwords do not match")

    }
  }









  render() {
    let { name } = this.state;
    let { email } = this.state;
    let { currentpwd } = this.state;
    let { newpwd } = this.state;
    let { confirmpwd } = this.state;
    let { mobile } = this.state;



    var defautprofileImgstyle =
    {
      backgroundColor: "#cecece",
      width: 30,
      height: 30,
      alignSelf: "center"
    };


    var profileImgstyle = {
      backgroundColor: "#cecece",
      width: 115,
      height: 115,
      borderRadius: 60,
      alignSelf: "center"
    };





    return (
      <SafeAreaView style={globalstyles.safearea}>
        <View style={globalstyles.container_settingsgeneral}>
          <ScrollView>
            {/* MAINBODY */}
            <View style={globalstyles.mainbodycontainer_settingsgeneral}>










              <TouchableOpacity
                onPress={() => this.choosepic()}
                style={globalstyles.cameraImgView2_SignUp}
              >
                <Image
                  style={
                    this.state.imgselected
                      ? profileImgstyle
                      : defautprofileImgstyle
                  }
                  source={this.state.avatarSource}
                />
              </TouchableOpacity>


              <View style={{ width: "100%", alignItems: "center", height: 60, }}>
                <TouchableOpacity
                  onPress={() => this.UpdateProfilePhoto()}
                  style={{ backgroundColor: bluemain, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 20 }}
                >
                  <Text style={{ paddingLeft: 20, paddingRight: 20, color: "white" }}>Update Profile Picture</Text>
                </TouchableOpacity>
              </View>




              <CardView

                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={10}
              >

                <View
                  style={{ padding: 10, borderWidth: 1, borderColor: "#909090", borderRadius: 10 }}
                >
                  <TextField
                    label='Enter Name'
                    value={name}
                    onChangeText={(name) => this.setState({ name })}
                    style={globalstyles.txtfield_settingsgeneral}
                  />
                  <TextField
                    label='Enter Mobile'
                    keyboardType="numeric"
                    value={mobile}
                    onChangeText={(mobile) => this.setState({ mobile })}
                    style={globalstyles.txtfield_settingsgeneral}
                  />


                  <TouchableOpacity
                    onPress={() => this.updateNameMobileFunc()}
                    style={{ backgroundColor: bluemain, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 20 }}
                  >
                    <Text style={{ paddingLeft: 20, paddingRight: 20, color: "white" }}>Update Full name and Number</Text>
                  </TouchableOpacity>



                </View>

              </CardView>




              <View style={{ flex: 1, flexDirection: "row", height: 30 }}></View>




              <CardView

                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={10}
              >

                <View
                  style={{ padding: 10, borderWidth: 1, borderColor: "#909090", borderRadius: 10 }}
                >

                  <TextField
                    label='Enter Current password'
                    value={currentpwd}
                    onChangeText={(currentpwd) => this.setState({ currentpwd })}
                    style={globalstyles.txtfield_settingsgeneral}
                  />
                  <TextField
                    label='Enter New password'
                    value={newpwd}
                    onChangeText={(newpwd) => this.setState({ newpwd })}
                    style={globalstyles.txtfield_settingsgeneral}
                  />
                  <TextField
                    label='Confirm Password'
                    value={confirmpwd}
                    onChangeText={(confirmpwd) => this.setState({ confirmpwd })}
                    style={globalstyles.txtfield_settingsgeneral}
                  />



                  <TouchableOpacity
                    onPress={() => this.updatePasswordFunc()}
                    style={{ backgroundColor: bluemain, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 20 }}
                  >
                    <Text style={{ paddingLeft: 20, paddingRight: 20, color: "white" }}>Update Password</Text>
                  </TouchableOpacity>



                </View>

              </CardView>











            </View>
          </ScrollView>

          {/* SAVE BUTTON */}
          <View style={globalstyles.btncontainer_settingsgeneral}>
            <TouchableOpacity
              style={globalstyles.bottomView_settingsgeneral}
              onPress={() => {
                this.validation();
              }}
            >
              <Text style={globalstyles.saveTxt_settingsgeneral}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView >
    );
  }
}
