/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  AsyncStorage,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  ScrollView,
  ImageBackground,
  key,
  KeyboardAvoidingView
} from "react-native";
import globalstyles from "./styles";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { Actions } from "react-native-router-flux";
import { TextField } from "react-native-material-textfield";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-picker";
import { RegisterLogicCall } from "../logic/LoginRegister_Logic"

import { bluemain } from "./styles.android"


// import { KeyboardAvoidingView } from 'react-native';
// import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'


//import variables , Apis etc
import { SIGNUP_LANDLORD, SIGNUP_TENANT } from "../logic/ApiConfig";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      mobile: "",
      confirmpassword: "",
      userType: "Landlord",
      isLoading: false,
      usertokenimgselected: false,
      avatarSource: require("../Assets/Images/camera.png"),
      path: null,
    };
    console.warn(props.usertoken);
  }






  onSelect(index, value) {
    this.setState({ userType: value });

    //console.warn("test warn");
  }

  validate() {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // let passreg = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    let passreg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{5,}$/gm;

    if (this.state.name === "") {
      Alert.alert("Alert ", "Name cannot be empty");
      return 100;
    }
    else if (this.state.email === "") {
      Alert.alert("Alert ", "Email cannot be empty");
      return 100;
    }
    else if (this.state.password === "") {
      Alert.alert("Alert ", "Password cannot be empty");
      return 100;
    }
    else if (this.state.confirmpassword === "") {
      Alert.alert("Alert ", "Confirm password cannot be empty");
      return 100;
    }
    else if (reg.test(this.state.email) === false) {
      Alert.alert("Alert", "Invalid Email");
      return 100;
    }
    else if (this.state.password < 6) {
      Alert.alert("Alert", "Password must be at least 6 characters long");
    }
    else if (passreg.test(this.state.password) === false) {
      Alert.alert("Alert", "Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters");
      return 100;
    }
    else if (this.state.password !== this.state.confirmpassword) {
      Alert.alert("Alert ", "Confirm password does not match with password");
      return 100;
    }
    else if (this.state.path === null) {
      Alert.alert("Alert ", "Please select a profile picture");
      return 100;
    }
    else {
      return 200;
    }


  }







  // if (this.state.email === "") {
  //   Alert.alert("Error ", "Please enter email");
  //   return "100";
  // }

  // else {

  //   if (reg.test(this.state.email) === true) {

  //     if (this.state.password.trim() === "") {
  //       Alert.alert("Error ", "Please enter password");
  //       return "100";
  //     }
  //     else {
  //       return "200";
  //     }

  //   }

  //   else {
  //     Alert.alert("Error", "Please enter a valid email");
  //     return "100";
  //   }
  // }












  async signUp() {

    var validateresp = await this.validate();

    console.warn(validateresp)


    if (validateresp === 200) {

      this.setState({ isLoading: true });
      var SIGNUPAPIUSER = await (this.state.userType === "Landlord")
        ? SIGNUP_LANDLORD
        : SIGNUP_TENANT;


      const formData = new FormData();


      if (this.state.path != null) {
        const uri = this.state.path;
        formData.append('profile_image', { uri: uri, name: 'prImage.jpg', type: "multipart/form-data" });
      }
      // else {
      //   const uri = "../Assets/Images/Avatar.png";
      //   // formData.append('profile_image', { uri: uri, name: 'prImage.jpg', type: "multipart/form-data" });
      //   formData.append('profile_image', require("../Assets/Images/Avatar.png"));
      // }




      formData.append('data', JSON.stringify({

        email: this.state.email,
        phone: this.state.mobile,
        userName: this.state.name,
        password: this.state.password


      }));

      // console.error(formData)


      await fetch(SIGNUPAPIUSER, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }).then((response) => response.json())
        .then((responseJson) => {
          console.error(responseJson);

          this.setState({ isLoading: false })

          if (responseJson.msg === "error")
            Alert.alert(responseJson.errorInfo)
          else {
            // Alert.alert("Successfully Signed Up")

            // Works on both iOS and Android
            Alert.alert(
              'Almost Done',
              "We've sent an email to " + this.state.email + ". Open it up to activate your Account.",
              [
                // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                // {
                //   text: 'Cancel',
                //   onPress: () => console.log('Cancel Pressed'),
                //   style: 'cancel',
                // },
                { text: 'OK', onPress: () => Actions.SignIn() },
              ],
              { cancelable: false },
            );

          }
        })
        .catch((error) => {
          console.error(error);
          this.setState({ isLoading: false })
        });


      // Actions.SignIn();
    }


  }







  choosepic() {
    // console.error("Here...")
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

        // const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };

        // or a reference to the platform specific asset location

        // const source;
        // if (Platform.OS === 'ios') {
        //   source = { uri: response.uri };
        // } else {
        //   source = { uri: "file://" + response.uri };
        // }
        // const source;

        // if (Platform.OS === "android") {
        //   source = { uri: "file://" + response.path };
        // }
        // else {
        //   source = { uri: response.uri };
        // }
        const source = { uri: "file://" + response.path };
        // console.error(source)
        // const source = { uri: "file://" + response.path };

        // const iosimagShow = { uri: response.path };
        // console.error(source.uri)


        //Alert.alert("IMAGE ADDRESS", source.text())

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          path: source.uri,
          imgselected: true
        });
      }
    });
  }




  // choosepic() {
  //   ImagePicker.showImagePicker(null, response => {

  //     //console.error('Response = ', response);
  //     if (response.didCancel) {
  //       console.error("User cancelled image picker");
  //     } else if (response.error) {
  //       console.error("ImagePicker Error: ", response.error);
  //     } else if (response.customButton) {
  //       console.error("User tapped custom button: ", response.customButton);
  //     } else {
  //       //const source = { uri: response.uri };
  //       //console.error(response);

  //       const source = { uri: "file://" + response.path };
  //       //Alert.alert("IMAGE ADDRESS", source.text())

  //       // You can also display the image using data:
  //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };

  //       this.setState({
  //         avatarSource: source,
  //         path: response.uri,
  //         imgselected: true
  //       });
  //     }
  //   });
  // }





  render() {
    let { name } = this.state;
    let { email } = this.state;
    let { password } = this.state;
    let { confirmpassword } = this.state;
    let { mobile } = this.state;

    var defautprofileImgstyle =
    {
      width: 30,
      height: 30,
      alignSelf: "center"
    };


    var profileImgstyle = {
      width: 115,
      height: 115,
      borderRadius: 60,
      alignSelf: "center"
    };

    return (
      <SafeAreaView style={globalstyles.safearea}>

        {/* MODAL FOR LOADING AFTER DATA INSERT */}
        <Modal
          onBackdropPress={() => this.setState({ isProgrees: false })}
          isVisible={this.state.isLoading}
        >
          <View style={{ padding: 20, backgroundColor: "#ffffff", }}>

            <Text style={{ fontSize: 20, fontWeight: "500" }}>Loading</Text>

            <View style={{ flexDirection: "row", backgroundColor: "#ffffff", alignItems: "center" }}>
              <ActivityIndicator size="large" color={bluemain} />
              <Text style={{ margin: 20, fontSize: 15 }}> Under Progress </Text>
            </View>
          </View>
        </Modal>



        <ImageBackground
          source={require("../Assets/Images/backgroundImagePic.jpg")}
          style={globalstyles.container_signUp}>
          <View style={globalstyles.headercontainer_signUp}>
            <TouchableOpacity
              style={globalstyles.left_arrowImgView_SignUp}
              onPress={() => {
                Actions.pop();
              }}
            >
              <Image
                source={require("../Assets/Images/left-arrow.png")}
                style={globalstyles.left_arrowImg_SignUp}
              />
            </TouchableOpacity>

            <Text style={globalstyles.titleTxt_SignUp}>New Account</Text>
          </View>

          <View style={globalstyles.mainformcontainer_signUp}>
            <ScrollView>
              <KeyboardAvoidingView style={{ height: "100%" }}>

                <TouchableOpacity
                  onPress={() => this.choosepic()}
                  style={globalstyles.cameraImgView_SignUp}
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

                {/* NAME FIELD */}
                <View style={globalstyles.editFieldView_signUp}>
                  <Image
                    source={require("../Assets/Images/username.png")}
                    style={globalstyles.imgView_SignUp}
                  />

                  <View style={{ flex: 1, marginLeft: 22 }}>
                    <TextField
                      label="Name"
                      value={name}
                      textColor="#fff"
                      tintColor="#fff"
                      baseColor="#fff"
                      fontSize={16}
                      onChangeText={name => this.setState({ name })}
                    />
                  </View>
                </View>



                {/* EMAIL FIELD */}
                <View style={globalstyles.editFieldView_signUp}>
                  <Image
                    source={require("../Assets/Images/email.png")}
                    style={globalstyles.imgView_SignUp}
                  />

                  <View style={{ flex: 1, marginLeft: 22 }}>
                    <TextField
                      label="Email"
                      value={email}
                      textColor="#fff"
                      tintColor="#fff"
                      baseColor="#fff"
                      fontSize={16}
                      keyboardType="email-address"
                      onChangeText={email =>
                        this.setState({ email: email.trim() })
                      }
                    />
                  </View>
                </View>



                {/* EMAIL FIELD */}
                <View style={globalstyles.editFieldView_signUp}>
                  <Image
                    source={require("../Assets/Images/mobile.png")}
                    style={globalstyles.imgView_SignUp}
                  />

                  <View style={{ flex: 1, marginLeft: 22 }}>
                    <TextField
                      label="Mobile"
                      value={mobile}
                      textColor="#fff"
                      tintColor="#fff"
                      baseColor="#fff"
                      fontSize={16}
                      placeholder={"+(254)850099127"}
                      placeholderTextColor={"#a0d1ff"}
                      keyboardType="phone-pad"
                      maxLength={10}
                      onChangeText={mobile =>
                        this.setState({ mobile: mobile.trim() })
                      }
                    />
                  </View>
                </View>



                {/* PASSWORD FIELD */}
                <View style={globalstyles.editFieldView_signUp}>
                  <Image
                    source={require("../Assets/Images/password.png")}
                    style={globalstyles.imgView_SignUp}
                  />

                  <View style={{ flex: 1, marginLeft: 22 }}>
                    <TextField
                      label="Password"
                      value={password}
                      textColor="#fff"
                      tintColor="#fff"
                      baseColor="#fff"
                      fontSize={16}
                      minLength={6}
                      secureTextEntry={true}
                      onChangeText={password => this.setState({ password })}
                    />
                  </View>
                </View>

                {/* <Text onPress={() => this.setState({ showFirstPassword: true })}>{this.state.showFirstPassword ? "Hide Password" : "Show Password"}</Text> */}


                {/* COMFIRM PASSWORD FIELD */}
                <View style={globalstyles.editFieldView_signUp}>
                  <Image
                    source={require("../Assets/Images/confirmpwd.png")}
                    style={globalstyles.imgView_SignUp}
                  />

                  <View style={{ flex: 1, marginLeft: 22 }}>
                    <TextField
                      label="Confirm Password"
                      value={confirmpassword}
                      textColor="#fff"
                      tintColor="#fff"
                      baseColor="#fff"
                      fontSize={16}
                      secureTextEntry={true}
                      onChangeText={confirmpassword =>
                        this.setState({ confirmpassword })
                      }
                    />
                  </View>
                </View>




                {/* CLICK RADIO BUTTON TO SELECT CATEGORY */}
                <RadioGroup
                  style={globalstyles.radiogrp_signUp}
                  color="#fff"
                  selectedIndex={0}
                  onSelect={(index, value) => this.onSelect(index, value)}
                >
                  <RadioButton value={"Landlord"}>
                    <Text style={globalstyles.radioTxt_signIn}>Landlord</Text>
                  </RadioButton>

                  <RadioButton value={"Tenant"}>
                    <Text style={globalstyles.radioTxt_signIn}>Tenant</Text>
                  </RadioButton>
                </RadioGroup>





                {/* <Text style={{marginLeft:20,marginTop:10,marginBottom:10,marginRight:20}}>{this.state.user}</Text> */}
              </KeyboardAvoidingView>
            </ScrollView>
          </View>

          <View style={globalstyles.bottomcontainer_signUp}>
            <TouchableOpacity
              style={globalstyles.signUpTextView_signUp}
              onPress={() => {
                this.signUp();
              }}
            >
              <Text style={globalstyles.signUpTxt_signUp}>Sign Up</Text>
            </TouchableOpacity>
          </View>







        </ImageBackground>
      </SafeAreaView>
    );
  }


}
