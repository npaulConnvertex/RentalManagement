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
  Image,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";

import DatePicker from 'react-native-datepicker'
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import CardView from "react-native-cardview";
import Modal from "react-native-modal";
import globalstyles from "./styles";
import { Actions } from "react-native-router-flux";
import { bluemain, orangemain } from "./styles";
import { GET_ALL_VENDORS } from "../logic/ApiConfig"
import { servicerequestsViewConst } from "../logic/ServiceRequestApiLogic"
import Spinner from 'react-native-loading-spinner-overlay';

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class ServiceRequestsViewDetails extends Component {
  constructor(props) {
    super(props);

    // console.warn(this.props.id)


    this.state = {
      isModalVisible: false,
      modalheader: "",
      isloading: true,
      detailState: {},
      token: this.props.tokenprop,
      propertyNameState: "Greenwoord Aprtments",
      priorityState: "Urgent",
      statusServState: "Pending",
      alertServState: "No",
      vendorNameState: "Ranjit Holkar",
      StartdateState: "11-11-1111",
      DueDateState: "22-22-2222",
      tenantNameState: "Robert Wilson",
      serviceReqTitleState: "Require Plumber",
      serviceReqNotesState: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pharetra nisi quis felis dignissim accumsan. Cras iaculis placerat eros eu mollis. Suspendisse potenti. Phasellus arcu diam, euismod sed diam ut, varius malesuada urna. Pellentesque",
      // VendorListState: []
    };
  }






  async componentWillMount() {

    await servicerequestsViewConst(this.state.token, this.props.id)
      .then((responseJson) => {


        this.setState({ detailState: responseJson[0], isloading: false, })
        // console.error(this.state.listState)
        console.error(this.state.detailState);

      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        this.setState({ isloading: false, })
      });



  }














  render() {
    var acceptstyle = { fontSize: 14, color: "#31a559" };
    var declinestyle = { fontSize: 14, color: "#d93f3f" };
    let taskNamevar = this.state





    var priorityListVar = [

      { value: "Urgent" },
      { value: "High" },
      { value: "Medium" },
      { value: "Low" },
    ]



    var statusRadioButton = [
      { label: 'pending', value: "0" },
      { label: 'Completed', value: "1" },
    ];


    var AlertmeRadioButton = [
      { label: 'yes', value: "0" },
      { label: 'no', value: "1" },
    ];















    return (
      <SafeAreaView style={globalstyles.safearea}>




        <Spinner
          overlayColor="rgba(1, 154, 232, 0.7)"
          visible={this.state.isloading}
          textContent={'Loading Details...'}
          textStyle={{ color: "#ffffff" }}
        />





        <ScrollView>
          <View style={globalstyles.container_servicerequest}>





            {/* HEADER */}
            <View style={globalstyles.headercontainer_serviceRequest}>
              <TouchableOpacity
                onPress={() => {
                  Actions.pop();
                }}

                style={globalstyles.menuImgView_serviceRequest}
              >
                <Image
                  source={require("../Assets/Images/backarrow.png")}
                  style={globalstyles.menuImg_serviceRequest}
                />
              </TouchableOpacity>

              <View style={globalstyles.TitleTextView_serviceRequest}>
                <Text style={globalstyles.TitleTxt_serviceRequest}>
                  Modify Service requests
                  </Text>
              </View>
            </View>




            {/* MAIN BODY */}
            <View style={globalstyles.mainbodycontainer_serviceRequest}>



              <CardView
                style={[globalstyles.cardview_serviceRequest, { backgroundColor: bluemain }]}
                cardElevation={10}
                cardMaxElevation={10}
                cornerRadius={3}
              >



                <Text style={{ marginTop: 20, color: "#ffffff", }}>Title</Text>
                <Text style={{ fontSize: 30, color: "#ffffff", fontWeight: "500", marginTop: 5 }}>{this.state.detailState.title}</Text>



                <Text style={{ marginTop: 20, color: "#ffffff", }}>Tenant Name</Text>
                <Text style={{ fontSize: 20, color: "#ffffff", fontWeight: "500", marginTop: 5 }}>{this.state.detailState.userName}</Text>



                <Text style={{ marginTop: 20, color: "#ffffff", }}>Property Name</Text>
                <Text style={{ fontSize: 20, color: "#ffffff", fontWeight: "500", marginTop: 5 }}>{this.state.detailState.propertyName}</Text>



              </CardView>











              <CardView
                style={globalstyles.cardview_serviceRequest}
                cardElevation={10}
                cardMaxElevation={10}
                cornerRadius={3}
              >

                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between" }}>

                  <View style={{ flex: 0.5 }}>
                    <Text style={{ marginTop: 20 }}>Vendor assigned To</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500", marginTop: 5 }}>{this.state.detailState.name == null ? "Not Assigned" : this.state.detailState.name}</Text>
                  </View>



                  <View
                    style={{ width: 100, height: 50, borderRadius: 30, justifyContent: "center", alignItems: "center", backgroundColor: this.state.detailState.priority == "0" ? "#00cc66" : this.state.detailState.priority == "1" ? "#ff9900" : this.state.detailState.priority == "3" ? "#cccc00" : "#cc3300" }}
                  >
                    <Text style={{ fontSize: 20, color: "#ffffff", fontWeight: "300" }}>
                      {this.state.detailState.priority == "0" ? "Low" : this.state.detailState.priority == "1" ? "High" : this.state.detailState.priority == "3" ? "Medium" : "Urgent"}
                    </Text>
                  </View>
                </View>



                {/* item.priority == "0" ? "#00cc66" : item.priority == "1" ? "#ff9900" : item.priority == "3" ? "#cccc00" : "#cc3300" */}
                <View style={{ flex: 1, flexDirection: "row" }}>


                  <View style={{ flex: 0.5 }}>
                    <Text style={{ marginTop: 20 }}>Start Date</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500", marginTop: 5 }}>{this.state.detailState.start_date}</Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                    <Text style={{ marginTop: 20 }}>Due Date</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500", marginTop: 5 }}>{this.state.detailState.due_date}</Text>
                  </View>


                </View>




                <Text style={{ marginTop: 20, fontWeight: "300" }}>Notes</Text>
                <Text style={{ marginTop: 10 }}>{this.state.detailState.notes}</Text>



                <View style={{ flex: 1, flexDirection: "row" }}>


                  <View style={{ flex: 0.5 }}>
                    <Text style={{ marginTop: 20 }}>Status</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500", marginTop: 5, color: this.state.detailState.status == "1" ? "#00cc66" : this.state.detailState.status === "0" ? "#cccc00" : "#cc3300" }}>
                      {this.state.detailState.status === "0" ? "Pending" : this.state.detailState.status === "1" ? "Complete" : "Decline"}
                    </Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                    <Text style={{ marginTop: 20 }}>Alert</Text>
                    <Text style={{ fontSize: 20, fontWeight: "500", marginTop: 5, color: this.state.detailState.alert_status == "0" ? "#ff0000" : "#00cc66" }}>{this.state.detailState.alert_status == "0" ? "No" : "Yes"}</Text>
                  </View>


                </View>







                {/* SAVE BUTTON */}
                <View>
                  <TouchableOpacity
                    style={{ justifyContent: "center", borderRadius: 200, alignItems: "center", height: 50, width: "100%", backgroundColor: orangemain, marginTop: 30, marginBottom: 20 }}
                    onPress={() => {
                      Actions.ServiceRequestsAdd({ "tokenprop": this.state.token, "id": this.props.id, "Alert": this.state.detailState.alert_status, "priority": this.state.detailState.priority, "status": this.state.detailState.status, "duedate": this.state.detailState.due_date, "notes": this.state.detailState.notes, "vendorid": this.state.detailState.id, "vendorname": this.state.detailState.name })
                      // console.error("tokenprop", this.state.token, "id", this.props.id, "Alert", this.state.detailState.alert_status, "priority", this.state.detailState.priority, "status", this.state.detailState.status, "duedate", this.state.detailState.due_date, "notes", this.state.detailState.notes)
                    }
                    }
                  >
                    <Text style={globalstyles.saveTxt_addLeaseToProperty}>Update Service Request</Text>
                  </TouchableOpacity>

                </View>



              </CardView>



            </View>






          </View>

        </ScrollView>


      </SafeAreaView>
    );
  }
}
