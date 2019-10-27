
import React, { Component } from 'react';
import { AsyncStorage, Alert, Platform, StyleSheet, Text, SafeAreaView, View, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';




// importing all screens
import globalstyles from './styles';
import HomeScreen from './HomeScreen';
import { } from './Help'
// importing varaibles
import { bluedark } from './styles';
//

import { IMAGE_URL } from "../logic/ApiConfig"




export default class NavigationDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sEmail: "",
            sUsername: "",
            sProfilePicUrl: "",
            imageStateGoogle: false,
        };

    };

    _signOut = async () => {
        //Remove user session from the device.
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await this.setState({ userInfo: ' ' }); // Remove the user from your app's state as well
            // Alert.alert("Logged Out Successfully...");
        } catch (error) {
            console.error(error);
        }
    };


    async logoutLandlord() {

        //var responseFunc= await logoutfunction()
        await AsyncStorage.clear();
        await AsyncStorage.setItem('firsttimeload', 'false');
        this._signOut()

        AsyncStorage.multiSet(
            [
                ["FirstTimeStatus1", "Done"],
                ["FirstTimeStatus", "Done"],
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



        // if(responseFunc === 200)
        Actions.reset("SignIn")




        Alert.alert("Logged out Succesfully")
    }





    async componentDidMount() {
        await AsyncStorage.multiGet(["token", "email_id", "username", "phone", "profile_pic"]).then(response => {
            // console.warn(response[0][1])
            this.setState({ sEmail: response[1][1], sUsername: response[2][1], sProfilePicUrl: response[4][1] })
            // console.warn(response[0][1]) // Value1
            // console.warn(response[1][0]) // Key2
            // console.warn(response[1][1]) // Value2
            // console.warn(response[4][1])

            var pos = response[4][1].indexOf("https:");
            if (pos != -1)
                this.setState({ imageStateGoogle: true })

        });




    }






    render() {
        return (

            <View style={globalstyles.container_navigationdrawer}>

                <StatusBar
                    backgroundColor={bluedark}
                    barStyle="light-content"
                />


                {/* PROFILE HEADER */}
                <View style={globalstyles.headerimagecontainer_navigationdrawer}>


                    {/* USER DETAILS AND PROFILE */}
                    <View style={globalstyles.userdetails_navigationdrawer}>



                        <View
                            style={globalstyles.profilepic_navigationdrawer}
                        >
                            <Image
                                // borderRadius={35}
                                style={globalstyles.profilepic_navigationdrawer}
                                resizeMode="cover"
                                source={this.state.imageStateGoogle === false ? this.state.sProfilePicUrl === "Unavailable" ? require("../Assets/Images/Avatar.png") : { uri: IMAGE_URL + this.state.sProfilePicUrl } : { uri: this.state.sProfilePicUrl }}
                            // source={this.state.imageStateGoogle === false ? { uri: IMAGE_URL + this.state.sProfilePicUrl } : { uri: this.state.sProfilePicUrl }}
                            />

                        </View>



                        <View style={globalstyles.textdetails_navigationdrawer}>
                            <Text style={globalstyles.name_navigationdrawer}>{this.state.sUsername}</Text>
                            <Text style={globalstyles.email_navigationdrawer}>{this.state.sEmail}</Text>
                        </View>
                    </View>


                    <Image
                        resizeMode="cover"
                        style={globalstyles.imgheader_navigationdrawer}
                        source={require("../Assets/Images/navdrawerImgHeader.png")}
                    />

                </View>





                {/* MENU ITEMS INSIDE SCROLLVIEW */}
                <ScrollView style={globalstyles.menucontainer_navigationdrawer}>


                    <View style={{ height: 20, }}></View>
                    <TouchableOpacity
                        onPress={() => { Actions.HomeScreen() }}
                        style={globalstyles.menuitems_navigationdrawer}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawer}
                            source={require("../Assets/Images/homenavicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawer} >Home</Text>
                    </TouchableOpacity>




                    <TouchableOpacity
                        onPress={() => { Actions.Properties() }}
                        style={globalstyles.menuitems_navigationdrawer}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawer}
                            source={require("../Assets/Images/propertynavicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawer} >Properties</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => { Actions.Tenants() }}
                        style={globalstyles.menuitems_navigationdrawer}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawer}
                            source={require("../Assets/Images/tenantnavicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawer} >Tenants</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => { Actions.TransactionsLandlordStack() }}
                        style={globalstyles.menuitems_navigationdrawer}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawer}
                            source={require("../Assets/Images/transactionnavicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawer} >Transactions</Text>
                    </TouchableOpacity>




                    <TouchableOpacity
                        onPress={() => { Actions.RequestsSection() }}
                        style={globalstyles.menuitems_navigationdrawer}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawer}
                            source={require("../Assets/Images/requestsSection.png")} />
                        <Text style={globalstyles.textspace_navigationdrawer} >Request Section</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => { Actions.Reports() }}
                        style={globalstyles.menuitems_navigationdrawer}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawer}
                            source={require("../Assets/Images/reportsnavicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawer} >Reports</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => { Actions.ServiceRequest() }}
                        style={globalstyles.menuitems_navigationdrawer}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawer}
                            source={require("../Assets/Images/servicenavicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawer} >Service Requests</Text>
                    </TouchableOpacity>




                    <TouchableOpacity
                        onPress={() => { Actions.Notice() }}
                        style={globalstyles.menuitems_navigationdrawer}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawer}
                            source={require("../Assets/Images/noticenavicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawer} >Notice Section</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => { Actions.SettingsLandlord() }}
                        style={globalstyles.menuitems_navigationdrawer}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawer}
                            source={require("../Assets/Images/settingsnavicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawer} >Settings</Text>
                    </TouchableOpacity>




                    <TouchableOpacity
                        onPress={() => { Actions.Help() }}
                        style={globalstyles.menuitems_navigationdrawer}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawer}
                            source={require("../Assets/Images/helpnavicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawer} >Help</Text>
                    </TouchableOpacity>





                    {/*  LOGOUT */}

                    <TouchableOpacity
                        onPress={() => { this.logoutLandlord() }}
                        style={globalstyles.menuitems_navigationdrawer}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawer}
                            source={require("../Assets/Images/logoutnavicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawer} >Logout</Text>
                    </TouchableOpacity>



                </ScrollView>



            </View>

        );
    }
}

