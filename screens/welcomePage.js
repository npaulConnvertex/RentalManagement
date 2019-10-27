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
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
import globalstyles from "./styles";
import { bluemain } from "./styles";
import { ADD_LEASE_TO_UNIT, EDIT_LEASE } from "../logic/ApiConfig";
import DatePicker from "react-native-datepicker";
import SplashScreen from 'react-native-splash-screen'






export default class welcomePage extends Component {
    constructor(props) {
        super(props);

        // console.error(props.Action)
        // console.error(props.flat_id)
        this.state = {
            firsttimeload: "",

        };
    }





    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('firsttimeload');
            if (value !== null) {
                // We have data!!
                this.setState({ firsttimeload: value })
                Alert.alert(value)
                // console.error(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };




    navigatToProperScreen(firsttimeload, usertoken, role) {
        if (firsttimeload === null) { Actions.WalkthorughLandlord() }
        else
            if (usertoken === null)
                Actions.SignIn()
            else {
                if (role === "Landlord" || role === "landlord") {
                    Actions.replace("HomeDashboard")
                }
                else {
                    Actions.replace("MyHouse")
                }
            }
        // console.error(firsttimeload, usertoken, role)
    }




    async   componentDidMount() {

        await SplashScreen.hide();

        // const value = await AsyncStorage.getItem('firsttimeload');


        await AsyncStorage.multiGet(["firsttimeload", "usertoken", "usertoken2"]).then(response => {
            // console.warn(response[0][1]);
            this.navigatToProperScreen(response[0][1], response[1][1], response[2][1])

            // if (response[0][1] !== null) {

            //   if (response[1][1] === "landlord" || response[1][1] === "Landlord") {
            //     if (response[2][1] === "Done")
            //       Actions.HomeDashboard();
            //     else
            //       Actions.WalkthorughLandlord();
            //   }
            //   else {
            //     if (response[3][1] === "Done")
            //       Actions.MyHouse();
            //     else
            //       Actions.WalkthorughTenant();
            //   }

            // }

        });










        // Alert.alert(this.state.firsttimeload)
        // Alert.alert(this.state.firsttimeload)
        // if (this.state.firsttimeload === "false") { Actions.SignIn() }
        // else
        //     Actions.WalkthorughLandlord()
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        // setTimeout(() => {
        //     SplashScreen.hide();
        // }, 2000)
    }



    render() {


        return (
            <SafeAreaView style={globalstyles.safearea}>
                <View
                    style={{ flex: 1 }}>
                    <Image
                        source={require("../Assets/Images/backgroundImagePic.jpg")}
                        style={{ width: "100%", height: "100%", }}
                    />
                </View>
            </SafeAreaView>
        );
    }






}
