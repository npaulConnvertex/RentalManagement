/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, SafeAreaView, Alert, AsyncStorage, Image, Switch, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import { TextField } from 'react-native-material-textfield';
import ImagePicker from "react-native-image-picker";

import { UPDATE_PROFILE_IMAGE } from "../logic/ApiConfig"

//imjport screens
import globalstyles, { bluemain } from './styles';
import { changePassapiconst, changeMobileandNameapiconst } from "../logic/settingsApiLogic"





export default class SettingsProfile extends Component {

  constructor(props) {
    super(props)

    this.state = {

      name: '',
      email: '',
      currentpwd: '',
      newpwd: '',
      confirmpwd: '',
      mobile: '',
      switch1Value: true,
      switch2Value: true,
      token: ""
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
        // console.error(source.uri);
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
        }).then((response) => response.json())
          .then((responseJson) => {


            console.error(responseJson);


            if (responseJson.msg === "success") {
              Alert.alert("Profile Picture Updated")
              this._storeData(responseJson.profilephoto)
            }
            else
              Alert.alert("Error Updating ! Try Later")

          })
          .catch((error) => {
            console.error(error);
          });


      }

    }
  }


  // profile_pic


  _storeData = async (value) => {
    try {
      await AsyncStorage.setItem('profile_pic', value);
    } catch (error) {
      // Error saving data
    }
  };








  async componentDidMount() {

    await this._retrieveData()
    // console.error(this.state.token)

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
        <View style={styles.container}>

          <ScrollView style={{ padding: 20 }}>


            {/* MAINBODY */}
            <View style={styles.mainbodycontainer}>



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
                  <Text style={{ paddingLeft: 20, paddingRight: 20, color: "white" }}>Update Profile Photo</Text>
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











              <View style={{ marginTop: 30 }}>

                <View style={{ flexDirection: "row" }}>
                  <Switch
                    onValueChange={() => this.setState({ switch1Value: !this.state.switch1Value })}
                    onTintColor="#f6541855"
                    thumbTintColor="#f65418"
                    tintColor="#00000022"
                    value={this.state.switch1Value} />

                  <Text >Notify Me when i receive funds from Tenants</Text>
                </View>

                {/* <View>
                                  <Switch
                                  onValueChange={() => this.setState({ switch2Value: !this.state.switch1Value})}
                                  onTintColor="#f6541855"
                                  thumbTintColor="#f65418"
                                  tintColor="#00000022"
                                  value={this.state.switch2Value} />

                                  <Text>Enable fingerprint</Text>
                              </View>   */}
              </View>
            </View>


            <View style={{ flex: 1, flexDirection: "row", height: 30 }}></View>



            {/* SAVE BUTTON */}
            {/* <View style={styles.btncontainer}>

              <TouchableOpacity style={globalstyles.bottomView_settingsgeneral}
                onPress={() => { this.validation() }}>
                <Text style={globalstyles.saveTxt_settingsgeneral}>Save Changes</Text>
              </TouchableOpacity>



            </View> */}

          </ScrollView>






        </View>
      </SafeAreaView>
    );



  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  mainbodycontainer: {

    width: "100%",
    paddingTop: 40,

  },

  btncontainer: {

    paddingBottom: 20,

  },



});

