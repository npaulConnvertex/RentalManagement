/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
    AsyncStorage,
    Platform,
    Alert,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    Image, Text,
    View, FlatList,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import Modal from "react-native-modal";
import ProgressCircle from 'react-native-progress-circle'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import OneSignal from 'react-native-onesignal';
import { SENDONESIGNALID } from "../logic/ApiConfig"



import { LineChart, PieChart, Path, AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
// import OfflineNotice from './OfflineNotice'

//imjport screens
import globalstyles from './styles';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { bluemain } from './styles.android';
import setOneSignalId from '../logic/LoginRegister_Logic'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});




const barWidth = Dimensions.get('screen').width - 30;

export default class HomeDashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loginsttatus: true,
            sEmail: "",
            sPassword: "",
            tokenState: "",
            sUsername: "",
            stoken: '',
            progreebarWidth: "100%",
            progressBarProgress: "30%"
        };


        OneSignal.init('3e17eaa4-be56-4fe5-8c17-996faaad4de9');
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        OneSignal.inFocusDisplaying(2);
        // Setting enableVibrate
        OneSignal.enableVibrate(true);
        // Setting enableSound
        OneSignal.enableSound(true);
        OneSignal.configure();

    }



    async  componentWillUnmount() {

        await this._retrieveData()
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }





    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                // We have data!!
                // Alert.alert(value)
                console.warn(value)
                this.setState({ tokenState: value })
            }
        } catch (error) {
            // Error retrieving data
        }
    };




    onReceived() {
        // console.log("Notification received: ", notification);
    }

    // eslint-disable-next-line class-methods-use-this
    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    // eslint-disable-next-line class-methods-use-this
    async  onIds(device) {

        // console.log('Device info: ', device);

        // console.warn(device.userId);
        // console.warn(device.userId);

        // Alert.alert(device.userId)

        const value = await AsyncStorage.getItem('token')
        // console.error(value)


        await fetch(SENDONESIGNALID, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                //'Content-Type': 'application/json',
                Authorization: value
            },

            body: JSON.stringify({
                app_token: device.userId
            }),

        }).then(response => response.json())
            .then((responseJson) => {
                // console.error(responseJson);
                // console.error(device.userId);
                // this.setState({ spinner: !this.state.spinner });

                // if (responseList.status) {
                //   this.setState({ tripdata: responseList.data });
                // }
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
            });


    }





    async componentDidMount() {

        // await this._retrieveData()
        await AsyncStorage.multiGet(["token", "email_id", "username", "phone"]).then(response => {
            // console.warn(response[0][1])
            this.setState({ sEmail: response[1][1], sUsername: response[2][1], stoken: response[0][1] })
            // console.error(response[0][1]) // Value1
            //  console.warn(response[1][0]) // Key2
            //  console.warn(response[1][1]) // Value2


            // Saving a key to recognize at signin process
            if (response[0][1] !== null) {
                // console.error(response[0][1]);
                AsyncStorage.multiSet([['usertoken', response[0][1]], ['usertoken2', 'landlord']],
                    function (error) {
                        //alert("finished");
                        if (error) {
                            alert("error!");
                        } else {
                            // console.warn("saved to internal storage")
                        }
                    }
                );
            }
        })






        // await fetch("http://192.168.100.25/property_management/api/addProperties", {
        //     method: "POST",
        //     headers: {
        //         // Accept: "application/json",
        //         // "Content-Type": "application/json",
        //         Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY5Iiwicm9sZSI6ImxhbmRsb3JkIiwiZXhwIjoxNTQ4NDE2MjE1fQ.WtCi86XgobAJMoi2UmV511N5JeGT6RknbL35nYarYFE'
        //     },

        //     body: JSON.stringify({
        //         propertyName: "sia ambiance",
        //         propertyType: "singlunit",
        //         country: "india",
        //         streetName: "mg Road",
        //         city: "pune",
        //         state: "Maha",
        //         pincode: "411612",
        //         suburb: "abc",
        //         landmark: "KK chouck",
        //         price: "5200",
        //         flatHoseNo: "209"
        //     }),
        // })
        //     .then(response => response.text())
        //     .then(responseJson => {
        //         console.error(responseJson)
        //     })
        //     .catch(error => {
        //         //console.error(error);
        //     });








    }





    render() {



        const dataLineChart = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

        var totalRentedIncVar = "$ 123,000";
        var serviceReqPending = 12
        var serviceReqCompleted = 34

        const Shadow = ({ line }) => (
            <Path
                key={'shadow'}
                y={2}
                d={line}
                fill={'none'}
                strokeWidth={4}
                stroke={'rgba(134, 65, 244, 0.2)'}
            />
        )

        const data = [
            {
                key: 1,
                amount: 50,
                svg: { fill: '#600080' },
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                amount: 40,
                svg: { fill: '#c61aff' }
            },
            {
                key: 4,
                amount: 95,
                svg: { fill: '#d966ff' }
            },
            {
                key: 5,
                amount: 35,
                svg: { fill: '#ecb3ff' }
            }
        ]

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </Text>
                )
            })
        }
        const colorspie = ['#4444', '#6666', '#1111', '#aaaa', '#bbbb']
        return (

            // MAIN SCROLLVIEW
            <ScrollView style={{ flex: 1, backgroundColor: "#fafafa" }}>





                {/* MAIN CONTAINER */}
                <View style={globalstyles.maincontainer_homedashboard}>



                    {/* MODAL FOR SUCCFESS MESSAGE */}
                    {/* <Modal
                        onBackButtonPress={() => this.setState({ loginsttatus: false })}
                        onBackdropPress={() => this.setState({ loginsttatus: false })}
                        isVisible={this.state.loginsttatus}
                    >
                        <View style={{ padding: 20, backgroundColor: bluemain, justifyContent: "center", alignItems: "center" }}>


                            <Image
                                style={{ height: 100, width: 100, margin: 30, marginTop: 60 }}
                                source={require("../Assets/Images/successWhite.png")}
                            />




                            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>LOGIN SUCCESSFULL !!</Text>


                            <View style={{ margin: 20, width: 250, }}>
                                <Text style={{ color: "#ffffff", fontSize: 15, textAlign: "center" }}>You have looged in as a user. please proceed to view the app</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => this.setState({ loginsttatus: false })}
                                style={{ borderWidth: 2, borderColor: "white", height: 60, width: 250, marginTop: 30, justifyContent: "center", alignItems: "center", }}>
                                <Text style={{ color: "#ffffff", fontSize: 15 }}>PROCEED TO APP</Text>
                            </TouchableOpacity>

                        </View>
                    </Modal> */}






                    {/* FLEX MARGIN .5 RIGHT */}
                    <View style={globalstyles.marginRight_homedashboard}></View>


                    {/* CENTER CONTENT */}
                    <View style={globalstyles.centerview_homedashboard}>


                        {/* TOTAL RENTED INCOME */}
                        <View
                            // cardElevation={2}
                            // cornerRadius={1}
                            style={globalstyles.totalrentedCard_homedashboard}
                        >
                            <View style={globalstyles.totalrentcardmainview_homedashboard}>
                                <Text>Total Annual Income</Text>
                                <Text style={globalstyles.rentedincTxtStyle_homedashboard} >{totalRentedIncVar}</Text>

                                <View style={{ borderRadius: 2, marginTop: 10, width: "100%", justifyContent: "center", flexDirection: "row", alignContent: "center", backgroundColor: "#1ba026", padding: 10 }}>
                                    <Text style={{ color: "white" }}>2019</Text>
                                </View>


                            </View>




                        </View>



                        {/* MONTH INCOME EXPENSE */}
                        <View style={globalstyles.housemain_homedashboard}>

                            <View style={{ flex: 0.5, marginRight: 10, }}>
                                <View
                                    // cardElevation={2}
                                    // cornerRadius={1}
                                    style={globalstyles.totalrentedCard_homedashboard}
                                >
                                    <View style={globalstyles.totalrentcardmainview_homedashboard}>
                                        <Text>This Month Income</Text>
                                        <Text style={globalstyles.rentedincTxtStyle2_homedashboard} >{totalRentedIncVar}</Text>
                                        <View style={{ borderRadius: 2, marginTop: 10, width: "100%", justifyContent: "center", flexDirection: "row", alignContent: "center", backgroundColor: "#6aa300", padding: 10 }}>
                                            <Text style={{ color: "white" }}>February</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>




                            <View style={{ flex: 0.5, marginLeft: 10, }}>
                                <View
                                    // cardElevation={2}
                                    // cornerRadius={1}
                                    style={globalstyles.totalrentedCard_homedashboard}
                                >
                                    <View style={globalstyles.totalrentcardmainview_homedashboard}>
                                        <Text>This month Expense</Text>
                                        <Text style={globalstyles.rentedincTxtStyle2_homedashboard} >{totalRentedIncVar}</Text>
                                        <View style={{ borderRadius: 2, marginTop: 10, width: "100%", justifyContent: "center", flexDirection: "row", alignContent: "center", backgroundColor: "#ce442f", padding: 10 }}>
                                            <Text style={{ color: "white" }}>February</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>





                        </View>






                        {/* OTHER INFO */}
                        <View style={globalstyles.housemain_homedashboard}>

                            <View style={{ flex: 0.5, marginRight: 10, }}>
                                <View
                                    // cardElevation={2}
                                    // cornerRadius={1}
                                    style={globalstyles.totalrentedCard_homedashboard}
                                >
                                    <View style={globalstyles.totalrentcardmainview_homedashboard}>
                                        <Text>Service Requests Completed</Text>
                                        <Text style={globalstyles.rentedincTxtStyle2_homedashboard} >{serviceReqCompleted}</Text>
                                        <View style={{ borderRadius: 2, marginTop: 10, width: "100%", justifyContent: "center", flexDirection: "row", alignContent: "center", backgroundColor: "#00c3ea", padding: 10 }}>
                                            <Text style={{ color: "white" }}>February</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>




                            <View style={{ flex: 0.5, marginLeft: 10, }}>
                                <View
                                    cardElevation={2}
                                    cornerRadius={1}
                                    style={globalstyles.totalrentedCard_homedashboard}
                                >
                                    <View style={globalstyles.totalrentcardmainview_homedashboard}>
                                        <Text>Service Requests Pending</Text>
                                        <Text style={globalstyles.rentedincTxtStyle2_homedashboard} >{serviceReqPending}</Text>
                                        <View style={{ borderRadius: 2, marginTop: 10, width: "100%", justifyContent: "center", flexDirection: "row", alignContent: "center", backgroundColor: "#ddaa00", padding: 10 }}>
                                            <Text style={{ color: "white" }}>February</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>





                        </View>




                        {/* OTHER INFO */}
                        <View style={globalstyles.housemain_homedashboard}>

                            <View style={{ flex: 0.5, marginRight: 10, }}>
                                <View
                                    // cardElevation={2}
                                    // cornerRadius={1}
                                    style={globalstyles.totalrentedCard2_homedashboard}
                                >
                                    <View style={globalstyles.totalrentcardmainview_homedashboard}>

                                        <View style={{ justifyContent: "center", marginBottom: 10 }}>
                                            <Text>This Month</Text>
                                            <Text>Due: KSH 2000</Text>
                                        </View>


                                        <ProgressCircle
                                            percent={46}
                                            radius={50}
                                            borderWidth={8}
                                            color="#fb7a53"
                                            shadowColor="#f0d0c5"
                                            bgColor="#ffffff"
                                        >
                                            <Text style={{ fontSize: 30 }}>{'30%'}</Text>
                                        </ProgressCircle>


                                    </View>
                                </View>
                            </View>




                            <View style={{ flex: 0.5, marginLeft: 10, }}>
                                <View
                                    cardElevation={2}
                                    cornerRadius={1}
                                    style={globalstyles.totalrentedCard2_homedashboard}
                                >
                                    <View style={globalstyles.totalrentcardmainview_homedashboard}>

                                        <View style={{ justifyContent: "center", marginBottom: 10 }}>
                                            <Text>Last Month</Text>
                                            <Text>Due: KSH 2000</Text>
                                        </View>

                                        <ProgressCircle
                                            percent={70}
                                            radius={50}
                                            borderWidth={8}
                                            color="#058e4a"
                                            shadowColor="#bcddd2"
                                            bgColor="#ffffff"
                                        >
                                            <Text style={{ fontSize: 30 }}>{'30%'}</Text>
                                        </ProgressCircle>
                                    </View>
                                </View>
                            </View>

                        </View>


                        <View style={{ height: 60, width: 40, backgroundColor: "#ffffff" }}></View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 25, color: bluemain }}>Occupancy</Text>
                            <Text style={{ fontSize: 20, color: "#777777" }}>30 %</Text>
                        </View>
                        <View style={{ height: 20, width: 40, backgroundColor: "#ffffff" }}></View>
                        <View style={globalstyles.housemain_homedashboard}>


                            <ProgressBarAnimated
                                width={barWidth}
                                value={30}
                                backgroundColorOnComplete="#6CC644"
                            />


                        </View>

                        <View style={{ height: 60, width: 40, backgroundColor: "#ffffff" }}></View>
                        <View style={{ height: 60, width: 40, backgroundColor: "#ffffff" }}></View>


                        {/* GRAPHS */}
                        <View style={globalstyles.graph1_homedashboard}>



                            <View
                                style={globalstyles.graph1card2_homedashboard}
                                cardElevation={2}
                                cornerRadius={1}
                            >
                                <Text style={globalstyles.graphtitle_homedashboard}>Graph Name</Text>
                                <Text style={globalstyles.graph1subtitle_homedashboard}>Graph description. This graphs is for illustrating</Text>
                                <CardView
                                    style={globalstyles.graph1card_homedashboard}
                                    cardElevation={2}
                                    cornerRadius={1}
                                >

                                    <LineChart
                                        animate={true}
                                        style={{ height: 200 }}
                                        data={dataLineChart}
                                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                                        contentInset={{ top: 20, bottom: 20 }}
                                    >
                                        <Grid />
                                        <Shadow />
                                    </LineChart>

                                </CardView>
                            </View>




                            <View
                                style={globalstyles.graph1card2_homedashboard}
                                cardElevation={2}
                                cornerRadius={1}
                            >
                                <Text style={globalstyles.graphtitle_homedashboard}>Graph Name</Text>
                                <Text style={globalstyles.graph1subtitle_homedashboard}>Graph description. This graphs is for illustrating</Text>
                                <CardView
                                    style={globalstyles.graph1card_homedashboard}
                                    cardElevation={2}
                                    cornerRadius={1}
                                >

                                    <PieChart
                                        colors={colorspie}
                                        style={{ height: 200 }}
                                        valueAccessor={({ item }) => item.amount}
                                        data={data}
                                        spacing={0}
                                        outerRadius={'95%'}
                                    >
                                        <Labels />
                                    </PieChart>

                                </CardView>
                            </View>




                        </View>


                        {/* PENDING SERVICE REQUESTS */}
                        {/* <View style={{ marginTop:50, marginBottom:50 }}>
                            <Text style={globalstyles.orangependinftext_homedashboard}>
                                    Pending Service Requests
                                </Text>

                            <FlatList
                                data={[{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'}]}
                                renderItem={({item}) => 
                                <CardView
                                cardElevation={2}
                                cornerRadius={3} 
                                style={globalstyles.sdfsdfsdfsdf}>
                                    

                                    <View style={{ flex:0.1, }}>
                                    <Image source={require('../Assets/Images/info.png')}
                                      style={globalstyles.TitleInfoImg_serviceRequestCard}/>
                                    </View>

                                    <View>

                                    </View>



                             </CardView>
                                }
                                /> 
                       </View> */}

                    </View>

                    {/* FLEX MARGIN .5 LEFT */}
                    <View style={globalstyles.marginRight_homedashboard}></View>
                </View>


            </ScrollView>


        );
    }
}

