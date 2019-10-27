/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


// import all libraries
import React, { Component } from 'react';
import { Router, TouchableOpacity, Image, Scene, Actions, Drawer, Tabs } from 'react-native-router-flux';
import { BackHandler } from 'react-native'








// import all screens
// import AddTransaction from "./AddTransaction"
import welcomePage from "./welcomePage"
import AddTransaction1 from "./AddTransaction1"
import RequestsSection from "./RequestsSection"
import HomeScreen from './HomeScreen';
import NavigationDrawer from './NavigationDrawer';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Help from './Help';
import ServiceRequestsAdd from './ServiceRequestsAdd'
import ServiceRequestsViewDetails from './ServiceRequestViewDetails'
import HomeDashboard from './HomeDashboard';
import HomePeople from './HomePeople';
import HomeChats from './HomeChats';
import MyChatScreen from './MyChatScreen';
import ServiceRequest from './ServiceRequests';
import PropertyListOccupied from './PropertyListOccupied';
import PropertyListVacant from './PropertyListVacant';
import Notice from './Notice';
import Reports from './Reports';
import NavigationDrawerTenant from './NavigationDrawerTenant';
import TimelineTenant from './TimelineTenant';
import NotificationsTenant from './NotificationsTenant';
import PropertyDetailsVacant from './PropertyDetailsVacant';
import PropertyDetailsOccupied from './PropertyDetailsOccupied';
import UnitsDetailsOccupied from './UnitsDetailsOccupied';
import UnitsDetailsVacant from './UnitsDetailsVacant'
import AddLeaseToProperty from './AddLeaseToProperty';
import TenantSearchList from './TenantSearchList';
import AddProperty from './AddProperty';
import TenantCurrent from './TenantCurrent';
import TenantPrevious from './TenantPrevious';
import Searchproperties from './SearchProperties';
import UnitDetailsPropertyTenant from './UnitDetailsPropertyTenant';
import MyHouse from './MyHouse'
import SettingsGeneral from './SettingsGeneral'
import SettingsReminders from './SettingsReminders'
import SettingsProfile from './SettingsProfile'
import TransactionsTenant from './TransactionsTenant'
import TransactionsLandlord from './TransactionsLandlord'
import PeopleLandlord from './PeopleLandlord'
import PeopleNeighbours from './PeopleNeighbours'
import PaymentMethod from './PaymentMethod'
import SettingsPaymentLandlord from './SettingsPaymentLandlord'
import SettingsTransactionLandlord from './SettingsTransactionLandlord'
import SettingsSocial from './SettingsSocial'
import FilterSearchProperty from './FilterSearchProperty'
import PayScreenTenant from './PayScreenTenant'
import FilterTransactions from './FilterTransactions'
import WalkthorughLandlord from './WalkthorughLandlord'
import WalkthorughTenant from './WalkthorughTenant'
//import componetns









// importing all values
import { bluemain } from './styles'





const App = () => {


    return (



        <Router
            navigationBarStyle={{ backgroundColor: bluemain }}
            titleStyle={{ color: "#ffffff" }}

            backAndroidHandler={() => {
                const scene = Actions.currentScene;
                if (scene === "SignIn" || scene === "_HomeScreen") {
                    BackHandler.exitApp();
                    return true;
                }
                Actions.pop();
                return true;
            }}



        >


            <Scene key="root">


                <Scene key="welcomPage"
                    component={welcomePage}
                    title="Welcome PAge"
                    hideNavBar
                    initial
                />


                <Scene key="SignIn"
                    component={SignIn}
                    title="SignIn"
                    hideNavBar
                // initial
                />

                <Scene key="SignUp"
                    component={SignUp}
                    title="SignUp"
                    hideNavBar
                />




                <Scene key="WalkthorughLandlord"
                    component={WalkthorughLandlord}
                    // title="SignUp"
                    hideNavBar

                />


                <Scene key="WalkthorughTenant"
                    component={WalkthorughTenant}
                    // title="SignUp"
                    hideNavBar

                />








                <Drawer
                    // hideDrawerButton
                    key="drawerMenu"
                    hideNavBar
                    contentComponent={NavigationDrawer}
                    drawerWidth={300}
                    drawerPosition="left"
                    navBarButtonColor="#ffffff"
                    drawerImage={require("../Assets/Images/menu.png")}
                    leftButtonStyle={{ left: -40 }}
                    leftButtonImage={require('../Assets/Images/menu.png')}
                >

                    <Scene key="HomeScreen" title="Home"
                    >

                        <Tabs
                            lazy
                            tabBarPosition="top"
                            indicatorStyle={{ backgroundColor: "#ffffff", height: 5, }}
                            tabBarStyle={{ backgroundColor: bluemain }}
                        >
                            <Scene key="HomeDashboard"
                                component={HomeDashboard}
                                title="Dashboard"
                                hideNavBar


                            />

                            <Scene key="HomePeople"
                                component={HomePeople}
                                title="People"
                                hideNavBar

                            />

                            <Scene key="HomeChats"
                                component={MyChatScreen}
                                title="Chats"
                                hideNavBar
                            />
                        </Tabs>




                    </Scene>



                    <Scene key="SettingsLandlord" title="Settings">

                        <Tabs
                            lazy
                            tabBarPosition="top"
                            indicatorStyle={{ backgroundColor: "#ffffff", height: 5, }}
                            tabBarStyle={{ backgroundColor: bluemain }}
                        >

                            <Scene key="SettingsProfile"
                                component={SettingsProfile}
                                title="Profile"
                                hideNavBar
                                initial
                            />

                            <Scene key="SettingsPaymentLandlord"
                                component={SettingsPaymentLandlord}
                                title="Payments"
                                hideNavBar
                            />


                            <Scene key="SettingsTransactionLandlord"
                                component={SettingsTransactionLandlord}
                                title="Payments"
                                hideNavBar
                            />



                        </Tabs>


                    </Scene>



                    <Scene key="AddProperty"
                        component={AddProperty}
                        title="Add Property"
                        hideNavBar
                    />






                    <Scene key="PropertyDetailsVacantStack">




                        <Scene key="PropertyDetailsVacant"
                            component={PropertyDetailsVacant}
                            title="PropertyDetailsVacant"
                            hideNavBar
                            initial
                        />

                        <Scene key="UnitsDetailsVacant"
                            component={UnitsDetailsVacant}
                            title="Unit Details"
                            hideNavBar
                        />

                        {/* <Scene key="AddTransaction"
                            component={AddTransaction}
                            title="Add Transaction"
                            hideNavBar
                        // initial

                        /> */}
                        <Scene key="AddLeaseToProperty"
                            component={AddLeaseToProperty}
                            title="Add lease"
                            hideNavBar
                        />





                        <Scene key="TenantSearchList"
                            component={TenantSearchList}
                            title=" Search"
                            hideNavBar
                        />

                    </Scene>



                    <Scene key="PropertyDetailsOccupiedStack">

                        <Scene key="PropertyDetailsOccupied"
                            component={PropertyDetailsOccupied}
                            title="PropertyDetailsOccupied"
                            hideNavBar
                            initial
                        />

                        <Scene key="UnitsDetailsVacant"
                            component={UnitsDetailsVacant}
                            title="Unit Details"
                            hideNavBar

                        />

                        <Scene key="AddLeaseToProperty"
                            component={AddLeaseToProperty}
                            title="Add lease"
                            hideNavBar
                        />
                        <Scene key="TenantSearchList"
                            component={TenantSearchList}
                            title=" Search"
                            hideNavBar
                        />

                    </Scene>





                    <Scene key="Properties"
                        title="Properties"
                    >

                        <Tabs
                            lazy
                            tabBarPosition="top"
                            indicatorStyle={{ backgroundColor: "#ffffff", height: 5, }}
                            tabBarStyle={{ backgroundColor: bluemain }}
                        >


                            <Scene key="OccupiedProperty"
                                component={PropertyListOccupied}
                                title="Occupied"
                                hideNavBar
                            />

                            <Scene key="VacantProperty"
                                component={PropertyListVacant}
                                title="Vacant"
                                hideNavBar
                            />





                        </Tabs>


                    </Scene>



                    <Scene key="Tenants"
                        title="Tenants"
                    >

                        <Tabs
                            lazy
                            tabBarPosition="top"
                            indicatorStyle={{ backgroundColor: "#ffffff", height: 5, }}
                            tabBarStyle={{ backgroundColor: bluemain }}
                        >
                            <Scene key="TenantCurrent"
                                component={TenantCurrent}
                                title="Current"
                                hideNavBar
                                initial
                            />

                            <Scene key="TenantPrevious"
                                component={TenantPrevious}
                                title="Previous"
                                hideNavBar
                            />
                        </Tabs>


                    </Scene>



                    <Scene key="Notice"
                        component={Notice}
                        title="Notice"
                        hideNavBar
                    />


                    <Scene key="Reports"
                        component={Reports}
                        title="Notice"
                        hideNavBar

                    />


                    <Scene key="Help"
                        component={Help}
                        title="Help"
                        hideNavBar
                    />

                    <Scene key="RequestsSection"
                        component={RequestsSection}
                        title="Requests"
                        hideNavBar
                    />



                    <Scene key="ServiceRequest"
                        hideNavBar
                    >

                        <Scene key="ServiceRequestPending"
                            component={ServiceRequest}
                            title="Service Requests"
                            hideNavBar
                        />

                        <Scene key="ServiceRequestsViewDetails"
                            component={ServiceRequestsViewDetails}
                            title="Details"
                            hideNavBar
                        />



                        <Scene key="ServiceRequestsAdd"
                            component={ServiceRequestsAdd}
                            title="Service Requests Completed"
                            hideNavBar
                        />
                    </Scene>


                    <Scene
                        key="TransactionsLandlordStack"
                        hideNavBar
                    >

                        <Scene key="TransactionsLandlord"
                            component={TransactionsLandlord}
                            title="Transaction"
                            hideNavBar
                            initial
                        />

                        <Scene key="AddTransaction1"
                            component={AddTransaction1}
                            title="Add Transaction"
                            hideNavBar
                        // initial
                        />

                        <Scene key="FilterTransactions"
                            component={FilterTransactions}
                            title="FilterTransactions"
                            hideNavBar
                        />

                    </Scene>



                </Drawer>


                <Drawer
                    //hideNavBar
                    key="drawerMenu1"
                    contentComponent={NavigationDrawerTenant}
                    hideNavBar
                    drawerWidth={300}
                    drawerPosition="left"
                    navBarButtonColor="#ffffff"
                    drawerImage={require("../Assets/Images/menu.png")}
                    leftButtonStyle={{ left: -40 }}
                    leftButtonImage={require('../Assets/Images/menu.png')}
                >


                    <Scene key="MyHouse"
                        hideNavBar
                    >

                        <Scene key="MyHouse2"
                            component={MyHouse}
                            title="MyHouse"
                            hideNavBar />


                        <Scene key="PayScreenTenant"
                            component={PayScreenTenant}
                            title="PayScreenTenant"
                            hideNavBar
                        />

                        <Scene key="NotificationsTenant"
                            component={NotificationsTenant}
                            title="NotificationsTenant"
                            hideNavBar />

                    </Scene>




                    {/* 
                    <Scene key="TimelineTenant"
                        component={TimelineTenant}
                        title="TimelineTenant"
                        hideNavBar
                        initial /> */}







                    <Scene key="TenantSettings"
                        title="Settings"
                    >

                        <Tabs
                            lazy
                            tabBarPosition="top"
                            indicatorStyle={{ backgroundColor: "#ffffff", height: 5, }}
                            tabBarStyle={{ backgroundColor: bluemain }}
                        >
                            <Scene key="SettingsGeneral"
                                component={SettingsGeneral}
                                title="GENERAL"
                                hideNavBar
                                initial
                            />

                            <Scene key="SettingsReminders"
                                component={SettingsReminders}
                                title="REMINDERS"
                                hideNavBar
                            />

                            <Scene key="SettingsSocial"
                                component={SettingsSocial}
                                title="SOCIAL"
                                hideNavBar
                            />
                        </Tabs>


                    </Scene>



                    <Scene key="People"
                        title="People"
                    >

                        <Tabs
                            lazy
                            tabBarPosition="top"
                            indicatorStyle={{ backgroundColor: "#ffffff", height: 5, }}
                            tabBarStyle={{ backgroundColor: bluemain }}
                        >

                            <Scene key="PeopleLandlord"
                                component={PeopleLandlord}
                                title="Landlord"
                                hideNavBar
                                initial

                            />

                            <Scene key="PeopleNeighbours"
                                component={PeopleNeighbours}
                                title="Neighbours"
                                hideNavBar
                            />

                        </Tabs>

                    </Scene>





                    <Scene key="TransactionsTenant"
                        component={TransactionsTenant}
                        title="Transactions"
                        hideNavBar />



                    <Scene key="PaymentMethod"
                        component={PaymentMethod}
                        title="PaymentMethod"
                        hideNavBar />



                    <Scene key="propertiessearch_root">

                        <Scene
                            key="SearchpropertiesStack"
                            hideNavBar
                        >

                            <Scene key="Searchproperties"
                                component={Searchproperties}
                                title="Search properties"
                                hideNavBar
                                initial
                            />

                            <Scene key="FilterSearchProperty"
                                component={FilterSearchProperty}
                                title="Search properties"
                                hideNavBar
                            />
                        </Scene>





                        <Scene key="UnitDetailsPropertyTenant"
                            component={UnitDetailsPropertyTenant}
                            title="UnitDetailsProperty"
                            hideNavBar
                        //initial
                        />
                    </Scene>

                </Drawer>










            </Scene>
        </Router>
    );
}

export default App;



