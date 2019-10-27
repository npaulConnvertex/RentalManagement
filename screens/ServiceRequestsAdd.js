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
import { serviceRequestModificationConst } from "../logic/ServiceRequestApiLogic"


const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class ServiceRequestsAdd extends Component {
  constructor(props) {
    super(props);

    console.error(this.props.tokenprop, this.props.Alert, this.props.status, this.props.priority, this.props.notes, this.props.duedate, this.props.vendorid, this.props.vendorname)



    this.state = {
      vendorid: "",
      VendorList: [],
      isModalVisible: false,
      modalheader: "",
      modificationmodal: false,
      StartdateState: "",
      notesState: this.props.notes,
      DueDateState: this.props.duedate,
      AlertStatus: this.props.Alert === "1" ? "Yes" : "No",
      servReqStatus: this.props.status === "0" ? "Pending" : this.props.status === "1" ? "Complete" : "Decline",
      priorityState: this.props.priority === "0" ? "Low" : this.props.priority === "1" ? "High" : this.props.priority === "3" ? "Medium" : "Urgent",

      // VendorListState: []
    };
  }


  async componentWillMount() {


    await fetch(GET_ALL_VENDORS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.props.tokenprop
      },
    }).then(response => response.json())
      .then((responseJson) => {

        // console.error(responseJson);

        var VendorArray = responseJson.map(item => {



          var obj = {
            value: item.name,
            id: item.id
          };

          return obj;


        });


        this.setState({ VendorList: VendorArray })
      })
      .catch(error => {
        console.error(error);
      });

    var arrayvar = this.state.VendorList;

    // console.warn(arrayvar)
    // for (index = 0; index < arrayvar.length; index++) {
    //   // console.warn(arrayvar[index].id, this.props.vendorid)
    //   if (arrayvar[index].id === this.props.vendorid)
    //     await this.setState({ indexVendor: index })
    // }
  }



  // 	"service_request_id":"20",
  // "vendor_id":"0",
  // "description":"best app ever!!",
  // "due_date":"2019-06-19",
  // "priority":"Low",
  // "status":"Pending",
  // "alert_status":"Yes"



  async editservicereq() {

    // console.error(this.state.vendorid)
    // console.warn(this.state.AlertStatus, this.state.servReqStatus, this.state.DueDateState, this.state.notesState, this.state.priorityState, this.state.vendorid)

    await serviceRequestModificationConst(this.props.tokenprop, this.props.id, this.state.vendorid, this.state.notesState, this.state.DueDateState, this.state.priorityState, this.state.servReqStatus, this.state.AlertStatus)
      .then((responseJson) => {

        // console.error(responseJson)

        if (responseJson.status === "Updated successfully")
          this.setState({ modificationmodal: true })
        else
          Alert.alert("Not")
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });


  }




  setStatusRadio() {
    return parseInt(this.props.status)
  }




  setAlertStatsuRadio() {
    return parseInt(this.props.Alert)
  }




  render() {
    var acceptstyle = { fontSize: 14, color: "#31a559" };
    var declinestyle = { fontSize: 14, color: "#d93f3f" };
    let taskNamevar = this.state.notesState





    var priorityListVar = [

      { value: "Urgent" },
      { value: "High" },
      { value: "Medium" },
      { value: "Low" },
    ]



    var statusRadioButton = [
      { label: 'Pending', value: "Pending" },
      { label: 'Complete', value: "Complete" },
      { label: 'Decline', value: "Decline" }
    ];


    var AlertmeRadioButton = [

      { label: 'No', value: "No" },
      { label: 'Yes', value: "Yes" },
    ];




    return (
      <SafeAreaView style={globalstyles.safearea}>






        <Modal
          onBackdropPress={() => this.setState({ modificationmodal: false })}
          onBackButtonPress={() => this.setState({ modificationmodal: false })}
          isVisible={this.state.modificationmodal}>
          <View style={{ padding: 20, backgroundColor: "#ffffff" }}>


            <View
              style={{

                backgroundColor: "#ffffff",
                alignItems: "center"
              }}
            >
              <Image
                style={{ height: 60, width: 60, margin: 30 }}
                source={require("../Assets/Images/correctMark.png")}
              />
              <Text style={{ margin: 20, fontSize: 15 }}>
                Property Added Successfully
              </Text>


              <Text
                onPress={() => {
                  this.setState({ modificationmodal: false })
                }}
                style={{ margin: 12, color: orangemain, fontSize: 15 }}>
                OK
              </Text>
            </View>
          </View>
        </Modal>




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




              {/* CHOOSE VENDOR */}
              <Dropdown
                value={this.props.vendorname !== null ? this.props.vendorname : ""}
                label="Choose Vendor"
                data={this.state.VendorList}
                onChangeText={(VendorNameState, index) =>
                  // console.warn(this.state.VendorList[index].id)
                  this.setState({ vendorid: this.state.VendorList[index].id })

                }
              />


              {/* START DATE DUE DATE */}
              <View style={{ flexDirection: "row", flex: 1 }}>

                <DatePicker
                  onDateChange={(date) => { this.setState({ DueDateState: date }) }}
                  ref='DueDate'
                  style={{ width: '100%', marginTop: 10, marginLeft: 0, }}
                  date={this.state.DueDateState}
                  mode="date"
                  // iconSource={require('../../images/calendar.png')}
                  placeholder="Enter Due Date"
                  format="YYYY-MM-DD"
                  // minDate="1900-01-01"
                  // maxDate="2018-10-15"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                      width: 30,
                      height: 30,
                    },
                    dateInput: {
                      marginLeft: 45,
                      borderWidth: 0,
                      alignItems: 'flex-start',
                      borderBottomWidth: 1,
                      borderBottomColor: '#5C96CC'
                    },
                    dateText: {
                      marginLeft: 8,
                      color: '#555555',
                      fontSize: 15,
                    },
                    placeholderText: {
                      marginLeft: 8,
                      color: '#555555',
                      fontSize: 15,
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  returnKeyType="next"
                  onSubmitEditing={(event) => {
                    this.refs.Password.focus();
                  }}
                />
              </View>




              <View style={{ height: 20, width: "100%", backgroundColor: "#ececec" }}></View>





              <View style={{ height: 20, width: "100%", backgroundColor: "#ececec" }}></View>



              <View style={{ height: 20, width: "100%", backgroundColor: "#ececec" }}></View>


              {/* PRIORITY CHOOSE */}
              <Dropdown
                label="Choose Priority"
                value={this.state.priorityState}
                data={priorityListVar}
                onChangeText={priorityState => this.setState({ priorityState })}
              />



              {/* STATUS STATUS */}
              <Text style={{ marginTop: 20, fontWeight: "300" }}>Service Request Status</Text>
              <View style={{ marginTop: 20 }}>
                <RadioForm

                  radio_props={statusRadioButton}
                  initial={this.setStatusRadio()}
                  buttonColor="#aaaaaa"
                  selectedButtonColor={orangemain}
                  buttonSize={20}
                  formHorizontal={true}
                  labelStyle={{ margin: 10 }}
                  // style={{ margin: 10 }}
                  onPress={(value) => {
                    this.setState({ servReqStatus: value })
                  }}
                />
              </View>



              {/* ALERT  */}
              <Text style={{ marginTop: 20, fontWeight: "300" }}>Alert me</Text>
              <View style={{ marginTop: 20 }}>
                <RadioForm

                  radio_props={AlertmeRadioButton}
                  initial={this.setAlertStatsuRadio()}
                  buttonColor="#aaaaaa"
                  selectedButtonColor={orangemain}
                  buttonSize={20}
                  formHorizontal={true}
                  labelStyle={{ margin: 10 }}
                  // style={{ margin: 10 }}
                  onPress={(value) => {
                    this.setState({ AlertStatus: value })
                  }}
                />
              </View>



              {/* NOTES */}
              <TextField
                label="Notes"
                value={taskNamevar}
                onChangeText={(value) => this.setState({ notesState: value })}
              />



              {/* SAVE BUTTON */}
              <View style={globalstyles.savebtncontainer_addLeaseToProperty}>
                <TouchableOpacity
                  style={globalstyles.saveTxtView_addLeaseToProperty}
                  onPress={() =>

                    this.editservicereq()

                  }
                >
                  <Text style={globalstyles.saveTxt_addLeaseToProperty}>Save</Text>
                </TouchableOpacity>
              </View>



            </View>
          </View>

        </ScrollView>


      </SafeAreaView>
    );
  }
}
