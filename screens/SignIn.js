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
  StyleSheet,
  Text,
  RefreshControl,
  View,
  Image,
  ScrollView,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ImageBackground,
  SafeAreaView
} from "react-native";
import Modal from "react-native-modal";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { TextField } from "react-native-material-textfield";
import globalstyles from "./styles";
// import SplashScreen from 'react-native-splash-screen'
import { Actions } from "react-native-router-flux";
import { LOGINUSER, CHECKUSEREXISTING, CHECKUSEREXISTING2_API_2, CHANGE_PASSWORD } from "../logic/ApiConfig";
import { orangemain, bluemain } from "./styles.android"
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class SignIn extends Component {

  constructor(props) {
    super(props);

    // ranjit.holkar@codevian.com 47514846
    // bedgeamol132@gmail.com 123456

    this.state = {
      loginsttatus: false,
      email: "dexterlab004@gmail.com",
      password: "123456",
      forgetPasswordloader: false,
      validated: false,
      forgetPasswordModal: false,
      status: "true",
      mobile: "",
      userType: "landlord",
      isLoading: false,
      userInfoState: ' ',
      RoleChooseDialog: false,
      roleChosen: "Landlord",
      isProgrees1: false
    };
  }



  componentWillMount() {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console

      iosClientId: '929353431884-oq7c6r12spgin5f47olp20134om8lsnj.apps.googleusercontent.com',
      webClientId:
        '929353431884-qdu1alusedhee8othdk8ah7fp0kmuk98.apps.googleusercontent.com',
    });
    // this._getCurrentUser();
  }


  _getCurrentUser = async () => {
    //May be called eg. in the componentDidMount of your main component.
    //This method returns the current user
    //if they already signed in and null otherwise.
    try {
      const userInfo = await GoogleSignin.signInSilently();

      // console.error(userInfo);
      await this.setState({ userInfoState: userInfo });



    } catch (error) {
      // console.error(error);
    }
  };






  async sendToDataBase() {




    // Alert.alert(this.state.userInfoState.user.email)

    // await this.setState({ isProgrees1: true })

    await fetch(CHECKUSEREXISTING, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: this.state.userInfoState.user.email,
      }),

    }).then(response => response.json())
      .then((responseJson) => {

        // console.error(responseJson)

        if (responseJson.FirstTimeLogin === true) {

          this.setState({ RoleChooseDialog: true })
        }
        else {
          // console.error(this.state.userInfoState.user.photo)

          AsyncStorage.multiSet(
            [
              ["token", responseJson.token],
              ["email_id", this.state.userInfoState.user.email],
              ["username", responseJson.userName],
              ["phone", "Not Available"],
              ["role", responseJson.role],
              ["profile_pic", this.state.userInfoState.user.photo === null ? "Unavailable" : this.state.userInfoState.user.photo]

            ],
            function (error) {
              //alert("finished");
              if (error) {
                alert("error!");
              } else {
                // console.warn("saved to internal storage");
              }
            }
          );

          if (responseJson.role === "tenant")
            Actions.replace("WalkthorughTenant");
          else Actions.replace("WalkthorughLandlord");


        }


      }
      )
      .catch(error => {
        // console.error(error);
      });


  }






  async signUpFinal() {


    // console.error(this.state.userInfoState.user.givenName, this.state.userInfoState.user.familyName, this.state.userInfoState.user.email, this.state.roleChosen, this.state.userInfoState.user.photo)
    await fetch(CHECKUSEREXISTING2_API_2, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
      },

      body: JSON.stringify({

        userName: this.state.userInfoState.user.givenName + this.state.userInfoState.user.familyName,
        email: this.state.userInfoState.user.email,
        role: this.state.roleChosen,
        profilephoto: this.state.userInfoState.user.photo

      }),

    }).then(response => response.json())
      .then((responseJson) => {

        // console.error(responseJson)



        AsyncStorage.multiSet(
          [
            ["token", responseJson.token],
            ["email_id", this.state.userInfoState.user.email],
            ["username", this.state.userInfoState.user.givenName + this.state.userInfoState.user.familyName],
            ["phone", "Not Available"],
            ["role", this.state.roleChosen],
            ["profile_pic", this.state.userInfoState.user.photo === null ? "Unavailable" : this.state.userInfoState.user.photo]

          ],
          function (error) {
            //alert("finished");
            if (error) {
              alert("error!");
            } else {
              // console.warn("saved to internal storage");
            }
          }
        );

        if (this.state.roleChosen === "tenant")
          Actions.replace("WalkthorughTenant");
        else Actions.replace("WalkthorughLandlord");






        this.setState({ RoleChooseDialog: false })

      })
      .catch(error => {
        // console.error(error);
      });

  }










  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      userInfo = await GoogleSignin.signIn();
      // console.error(userInfo);


      await this.setState({ userInfoState: userInfo });


      this.sendToDataBase();


    } catch (error) {
      console.warn(error.message);
      Alert.alert(error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("SIGN_IN_CANCELLED");
        console.warn('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("IN_PROGRESS");
        console.warn('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("PLAY_SERVICES_NOT_AVAILABLE");
        console.warn('Play Services Not Available or Outdated');
      }
      // else {
      // Alert.alert("Some Other Error Happened");
      // console.warn('Some Other Error Happened');
      // }
    }
  }

  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await this.setState({ userInfo: ' ' }); // Remove the user from your app's state as well
      Alert.alert("Logged Out Successfully...");
    } catch (error) {
      // console.error(error);
    }
  };

  _revokeAccess = async () => {
    //Remove your application from the user authorized applications.
    try {
      await GoogleSignin.revokeAccess();
      console.log('deleted');
    } catch (error) {
      // console.error(error);
    }
  };

  async componentDidMount() {
    await AsyncStorage.multiGet(["usertoken", "usertoken2", "FirstTimeStatus", "FirstTimeStatus1"]).then(response => {
      console.warn(response[0][1]);
      console.warn(response[1][0]);
      console.warn(response[0][0]);
      console.warn(response[1][1]);
      console.warn(response[2][1]);
      console.warn(response[3][1]);


      if (response[0][1] !== null) {

        if (response[1][1] === "landlord" || response[1][1] === "Landlord") {
          if (response[2][1] === "Done")
            Actions.HomeDashboard();
          else
            Actions.WalkthorughLandlord();
        }
        else {
          if (response[3][1] === "Done")
            Actions.MyHouse();
          else
            Actions.WalkthorughTenant();
        }

      }

    });
    //     const value = await AsyncStorage.getItem('usertoken');
    //     if (value !== null) {
    //       // We have data!!
    //       console.warn(value);

    //     }
    //     else
    //     console.warn("no value")
    //    } catch (error) {
    //      // Error retrieving data
    //    }
    // // console.warn("hello")
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("usertoken");
      if (value !== null) {
        // We have data!!
        // console.warn(value);
      } else console.warn("no value");
    } catch (error) {
      // Error retrieving data
    }
  };

  validate() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.email === "") {
      Alert.alert("Error ", "Please enter email");
      return "100";
    }

    else {

      if (reg.test(this.state.email) === true) {

        if (this.state.password.trim() === "") {
          Alert.alert("Error ", "Please enter password");
          return "100";
        }
        else {
          return "200";
        }

      }

      else {
        Alert.alert("Error", "Please enter a valid email");
        return "100";
      }
    }
    //return 100;
  }




  async signinSimple() {
    var validateresp = await this.validate();

    if (validateresp === "200") {

      await fetch(LOGINUSER, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phoneOrEmail: this.state.email,
          pass: this.state.password
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          // Loader state
          //{"msg":"error","errorInfo":"invalid credential"}
          this.setState({ isLoading: false });

          // console.error(responseJson);

          if (responseJson.msg === "error") {
            Alert.alert(responseJson.errorInfo);
          }
          else if (responseJson.msg === "deactive") {
            Alert.alert("Please activate your account from your email")
          }
          else {




            // this.setState({ loginsttatus: true })


            // console.warn(responseJson)
            // console.warn(responseJson.userinfo.email)
            // console.warn(responseJson.userinfo.role)
            // console.warn(responseJson.userinfo.phone)
            // console.warn(responseJson.userinfo.userName)

            AsyncStorage.multiSet(
              [
                ["token", responseJson.token],
                ["email_id", responseJson.userinfo.email],
                ["username", responseJson.userinfo.userName],
                ["phone", responseJson.userinfo.phone],
                ["role", responseJson.userinfo.role],
                ["profile_pic", responseJson.userinfo.profilephoto === null ? "Unavailable" : responseJson.userinfo.profilephoto]

              ],
              function (error) {
                //alert("finished");
                if (error) {
                  alert("error!");
                } else {
                  // console.warn("saved to internal storage");
                }
              }
            );

            if (responseJson.userinfo.role === "tenant" || responseJson.userinfo.role === "Tenant")
              Actions.replace("MyHouse");
            else Actions.replace("HomeDashboard");




          }
        })
        .catch(error => {
          // console.error(error);
        });
    }
  }







  // Somewhere in your code
  signIn = async () => {
    console.warn("M IN");
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo });

      // console.error(userInfo);

      Alert.alert("Signed In successfully");

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert("Sign In Cancelled");
        console.warn("1ST CALL");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        Alert.alert("In Progress");
        console.warn("2ND CALL");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert("Play Services Not Available");
        console.warn("3RD CALL");
      } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // play services not available or outdated
        Alert.alert("Sign In Required");
        console.warn("4TH CALL");
      } else {
        // some other error happened
        Alert.alert("Last Call");
        console.warn("LAST CALL");
      }
    }
  };


  async submitemailForPassword() {


    await this.setState({ forgetPasswordloader: true })

    fetch(CHANGE_PASSWORD, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        phoneOrEmail: this.state.emailForgotPassword,
      }),

    }).then(response => response.json())
      .then((responseJson) => {
        // console.error({ responseJson })

        this.setState({ forgetPasswordModal: false })
        Alert.alert(responseJson.msg, (responseJson.msg === "error" ? responseJson.errorInfo : responseJson.info))

      }



      )
      .catch(error => {
        // console.error(error);
      });

  }




  render() {
    let { email } = this.state;
    let { password } = this.state;

    var radio_props = [
      { label: 'Landlord', value: 'landlord' },
      { label: 'Tenant', value: "tenant" },
    ];

    let emailForgotPassword = this.state

    return (
      <SafeAreaView style={globalstyles.safearea}>



        {/* MODAL FOR LOADING AFTER DATA INSERT */}
        <Modal
          // onBackdropPress={() => this.setState({ isProgrees1: false })}
          isVisible={this.state.isProgrees1}
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



        {/* MODAL FOR LOADING AFTER DATA INSERT */}
        <Modal
          onBackdropPress={() => this.setState({ forgetPasswordModal: false })}
          onBackButtonPress={() => this.setState({ forgetPasswordModal: false })}
          isVisible={this.state.forgetPasswordModal}>

          {this.state.forgetPasswordloader === false ?
            <View style={globalstyles.mainview_propertyDetailsModal}>



              <View style={globalstyles.titleView_propertyDetailsModal}>

                <View style={globalstyles.titleTxtView_propertyDetailsModal}>
                  <Text style={globalstyles.titleTxt_propertyDetailsModal}>
                    Forget Password
      </Text>
                </View>

                <TouchableOpacity
                  style={globalstyles.titlecloseImgView_propertyDetailsModal}
                  onPress={() => this.setState({ forgetPasswordModal: false })}
                >
                  <Image
                    source={require("../Assets/Images/close_gray.png")}
                    style={globalstyles.titleCloseImg_propertyDetailsModal}
                  />
                </TouchableOpacity>



              </View>



              <TextField
                label="Email Address"
                placeholder="exp:- samwilson001@gmail.com"
                value={emailForgotPassword}
                onChangeText={emailForgotPassword => this.setState({ emailForgotPassword })}
                style={{ marginLeft: 10, marginRight: 10 }}
              />





              <TouchableOpacity
                style={globalstyles.bottomView_propertyDetailsModal}
                onPress={() => this.submitemailForPassword()}
              >
                <Text style={globalstyles.proceedTxt_propertyDetailsModal}>
                  SUBMIT
    </Text>
                <Image
                  source={require("../Assets/Images/right_arrow_org.png")}
                  style={globalstyles.right_arrowImg_addPropertyModal}
                />
              </TouchableOpacity>



            </View>
            :

            <View style={globalstyles.mainview_propertyDetailsModal}>

              <View style={{ padding: 20, backgroundColor: "#ffffff", }}>

                <Text style={{ fontSize: 20, fontWeight: "500" }}>Loading</Text>

                <View style={{ flexDirection: "row", backgroundColor: "#ffffff", alignItems: "center" }}>
                  <ActivityIndicator size="large" color={bluemain} />
                  <Text style={{ margin: 20, fontSize: 15 }}> Under Progress </Text>
                </View>
              </View>


            </View>}





        </Modal>











        {/* MODAL FOR SUCCES MESSAGE */}
        <Modal
          // onBackdropPress={() =>
          //   this.setState({ RoleChooseDialog: false })
          // }
          isVisible={this.state.RoleChooseDialog}
        >
          <View style={{ padding: 20, backgroundColor: "#ffffff" }}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>Choose Your Role</Text>

            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#ffffff",
                alignItems: "center"
              }}
            >

              <View style={{ margin: 20 }}>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  buttonColor="#aaaaaa"
                  selectedButtonColor={orangemain}
                  buttonSize={15}
                  labelStyle={{ margin: 10 }}
                  // style={{ margin: 10 }}
                  onPress={(value) => { this.setState({ roleChosen: value }) }}
                />
              </View>





            </View>

            <View style={{ marginTop: 50 }}>

              <TouchableOpacity
                onPress={() => {
                  this.signUpFinal()
                  this.setState({ RoleChooseDialog: false })
                }
                }
                style={{ justifyContent: "center", alignItems: "center", height: 50, borderRadius: 100, backgroundColor: orangemain }}>
                <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
              </TouchableOpacity>
            </View>


          </View>
        </Modal>











        <ImageBackground
          source={require("../Assets/Images/backgroundImagePic.jpg")}

          style={globalstyles.container_signIn}>
          {/* HEADER */}
          <View style={globalstyles.headercontainer_signIn}>
            <Text style={globalstyles.titleTxt_signIn}>Sign In</Text>
            <Text>{this.state.userInfo}</Text>
          </View>

          {/* IMAGE  */}
          <View style={globalstyles.imgcontainer_signIn}>
            <Image
              resizeMode="contain"
              source={require("../Assets/Images/img_tick.png")}
              style={globalstyles.tickImg_signIn}
            />
          </View>

          {/* MAIN BODY */}
          <View style={globalstyles.mainbodycontainer_signIn}>
            {/* EMAIL FIELD */}
            <View style={globalstyles.editFieldView_signIn}>
              <Image
                source={require("../Assets/Images/email.png")}
                style={globalstyles.icon_signIn}
              />

              <View style={{ flex: 1, marginLeft: 22 }}>
                <TextField
                  label="Email"
                  value={email}
                  textColor="#fff"
                  tintColor="#fff"
                  baseColor="#fff"
                  fontSize={18}
                  onChangeText={email => this.setState({ email: email.trim() })}
                />
              </View>
            </View>

            {/* PASSWORD EMAIL */}
            <View style={globalstyles.editFieldView_signIn}>
              <Image
                source={require("../Assets/Images/password.png")}
                style={globalstyles.icon_signIn}
              />

              <View style={{ flex: 1, marginLeft: 22 }}>
                <TextField
                  label="Password"
                  value={password}
                  textColor="#fff"
                  tintColor="#fff"
                  baseColor="#fff"
                  fontSize={18}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                />
              </View>
            </View>




            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text
                onPress={() => { this.setState({ forgetPasswordModal: true }) }}
                style={{ color: "white", fontSize: 18 }}>Forget Password ?</Text>
            </View>



            {/* SIGN IN BUTTON*/}
            <TouchableOpacity
              style={globalstyles.signinTxtTouchView_signIn}
              onPress={() => {
                this.signinSimple();
              }}
            >
              <Text style={globalstyles.signinTxt_signIn}>Sign In</Text>
            </TouchableOpacity>







            {/* GOOGLE SIGN IN BUTTON*/}
            <TouchableOpacity
              onPress={() => this._signIn()}
              style={{ marginTop: 10, width: "100%", backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center", borderRadius: 50, height: 55 }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../Assets/Images/googleSearchLogo.png")}
                />
                <Text style={{ fontSize: 20, color: bluemain, marginLeft: 10 }}>Google Sign In</Text>
              </View>
            </TouchableOpacity>




            {/* <GoogleSigninButton
              // style={globalstyles.signinTxtTouchView_signIn}
              style={{ width: 48, height: 48, borderRadius: 200 }}
              size={GoogleSigninButton.Size.Icon}
              color={GoogleSigninButton.Color.Light}
              
            //disabled={this.state.isSigninInProgress} 
            /> */}



            {/* CLICK TO NEW ACCOUNT-SIGN UP TEXT*/}
            <View style={globalstyles.bottomcontainer_signIn}>
              <View>
                <Text>{}</Text>
              </View>
              <View style={globalstyles.leftTxtView_signIn}>
                <Text style={{ textAlign: "right", color: "#fff9", marginRight: 10 }}>
                  Don't have an account?
                </Text>
              </View>

              <TouchableOpacity style={globalstyles.rightTxtView_signIn}>
                <Text
                  onPress={() => Actions.SignUp()}
                  style={{ color: "#fff" }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>

              {/* 
              <TouchableOpacity style={globalstyles.rightTxtView_signIn}>
                <Text
                  onPress={() => this._signOut()}
                  style={{ color: "#fff" }}
                >
                  Sign Out
                </Text>
              </TouchableOpacity> */}

            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
