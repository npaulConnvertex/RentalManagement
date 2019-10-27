
import React, { Component } from 'react';
import { AsyncStorage, Alert, Platform, StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';



// importing all screens
import globalstyles from './styles';
import HomeScreen from './HomeScreen';
import { } from './Help'
// importing varaibles
import { bluedark } from './styles';
import { IMAGE_URL } from "../logic/ApiConfig"





export default class NavigationDrawerTenant extends Component {
    constructor(props) {
        super(props);

        // console.error(this.props.id)
        this.state = {
            status: "true",
            sEmail: "",
            sUsername: "",
            sProfilePicUrl: "",
            imageStateGoogle: false,
        }

    };

    _signOut = async () => {
        //Remove user session from the device.
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await this.setState({ userInfo: ' ' }); // Remove the user from your app's state as well
            // Alert.alert("Logged Out Successfully...");
        } catch (error) {
            // console.error(error);
        }
    };



    async logoutTenant() {

        //var responseFunc= await logoutfunction()
        await AsyncStorage.clear();
        await AsyncStorage.setItem('firsttimeload', 'false');
        this._signOut()



        // if(responseFunc === 200)
        Actions.reset("SignIn")

        Alert.alert("Logged out Succesfully")
    }


    async componentDidMount() {
        await AsyncStorage.multiGet(["token", "email_id", "username", "profile_pic"]).then(response => {
            // console.error(response[0][1]) 
            this.setState({ sEmail: response[1][1], sUsername: response[2][1], sProfilePicUrl: response[3][1] })
            //  console.warn(response[0][1]) // Value1
            //  console.warn(response[1][0]) // Key2
            // console.warn(response[3][1]) // Value2




            // var pos = response[3][1].indexOf("https:");
            // console.warn(pos)
        });


    }







    render() {
        return (
            <View style={globalstyles.container_navigationdrawertenant}>

                <StatusBar
                    backgroundColor={bluedark}
                    barStyle="light-content"
                />


                {/* PROFILE HEADER */}
                <View style={globalstyles.headerimagecontainer_navigationdrawertenant}>


                    {/* USER DETAILS AND PROFILE */}
                    <View style={globalstyles.userdetails_navigationdrawertenant}>
                        <View
                            style={globalstyles.profilepicview_navigationdrawertenant}
                        >
                            <Image
                                style={globalstyles.profilepic_navigationdrawertenant}
                                resizeMode="cover"
                                source={{ uri: this.state.sProfilePicUrl }}

                                source={this.state.sProfilePicUrl.indexOf("https:") == -1 ? { uri: IMAGE_URL + this.state.sProfilePicUrl } : { uri: this.state.sProfilePicUrl }}
                            // source={this.state.sProfilePicUrl === "Unavailable" ? require("../Assets/Images/Avatar.png") : { uri: IMAGE_URL + this.state.sProfilePicUrl }}
                            />
                        </View>
                        <View style={globalstyles.textdetails_navigationdrawertenant}>
                            <Text style={globalstyles.name_navigationdrawertenant}>{this.state.sUsername}</Text>
                            <Text style={globalstyles.email_navigationdrawertenant}>{this.state.sEmail}</Text>
                        </View>
                    </View>


                </View>



                {/* MENU ITEMS INSIDE SCROLLVIEW */}
                <ScrollView style={globalstyles.menucontainer_navigationdrawertenant}>

                    <Text>{this.state.imageStateGoogle}</Text>

                    <View style={{ height: 20, }}></View>
                    {/* <TouchableOpacity
                        onPress={() => { Actions.TimelineTenant() }}
                        style={globalstyles.menuitems_navigationdrawertenant}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawertenant}
                            source={require("../Assets/Images/timelineicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawertenant} >Timeline</Text>

                    </TouchableOpacity> */}




                    <TouchableOpacity
                        onPress={() => { Actions.MyHouse() }}
                        style={globalstyles.menuitems_navigationdrawertenant}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawertenant}
                            source={require("../Assets/Images/myhouseicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawertenant} >My House</Text>
                    </TouchableOpacity>





                    <TouchableOpacity
                        onPress={() => { Actions.TransactionsTenant() }}
                        style={globalstyles.menuitems_navigationdrawertenant}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawertenant}
                            source={require("../Assets/Images/transactionicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawertenant} >Transaction History</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => { Actions.PaymentMethod() }}
                        style={globalstyles.menuitems_navigationdrawertenant}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawertenant}
                            source={require("../Assets/Images/paymenticon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawertenant} >Payment Method</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => { Actions.People() }}
                        style={globalstyles.menuitems_navigationdrawertenant}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawertenant}
                            source={require("../Assets/Images/peopleicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawertenant} >People</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => { Actions.TenantSettings() }}
                        style={globalstyles.menuitems_navigationdrawertenant}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawertenant}
                            source={require("../Assets/Images/settingsicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawertenant} >Settings</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => { Actions.propertiessearch_root() }}
                        style={globalstyles.menuitems_navigationdrawertenant}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawertenant}
                            source={require("../Assets/Images/searchpropertiesicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawertenant} >Search Properties</Text>
                    </TouchableOpacity>







                    {/*  LOGOUT */}

                    <TouchableOpacity
                        onPress={() => { this.logoutTenant() }}
                        style={globalstyles.menuitems_navigationdrawertenant}>
                        <Image
                            style={globalstyles.menuicons_navigationdrawertenant}
                            source={require("../Assets/Images/logoutnavicon.png")} />
                        <Text style={globalstyles.textspace_navigationdrawertenant} >Logout</Text>
                    </TouchableOpacity>



                </ScrollView>



            </View>
        );
    }
}

