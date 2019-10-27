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

export default class AddLeaseToProperty extends Component {
  constructor(props) {
    super(props);

    // console.error(props.Action)
    // console.error(props.flat_id)
    this.state = {
      rentAmt: "",
      overdueRem: "",
      tenantRem: "",
      StartdateState: null,
      depositAmt: "",
      EnddateState: null,
      paymentfreq: "",
      rentAmt: "",
      tokenState: "",
      paymentday: "",
      isProgrees: "",
      propstoken: this.props.tokenProps,
      unitIDScreen: this.props.flat_id,
    };
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem("usertoken");

    // console.warn(this.props.flat_id);

    if (value !== null) {
      // We have data!!
      this.setState({ tokenState: value });
      console.warn(value);
    } else {
      console.warn("no value");
    }
  }

  validateDetails() {
    if (this.state.rentAmt === "") {
      Alert.alert("Rent Amount caanot be empty");
      return 100;
    }
    else if (this.state.depositAmt === "") {
      Alert.alert("Deposit caanot be empty");
      return 100;
    }
    else if (this.state.StartdateState === this.state.EnddateState) {
      Alert.alert("Start Date and End Date cannot be Same");
      return 100;
    }
    else if (this.state.paymentday === "") {
      Alert.alert("Please select payment day");
      return 100;
    }
    else if (this.state.paymentfreq === "") {
      Alert.alert("Please select payment frequency");
      return 100;
    }
    else if (this.state.tenantRem === "") {
      Alert.alert("Please select reminder day for tenant");
      return 100;
    }

    else return 200;
  }

  async addleaseToUnitMethod() {
    // Alert.alert(this.state.paymentfreq)
    if (this.props.Action === "Edit") {
      var validate = await this.validateDetails();
      if (validate === 200) {
        // console.error(this.state.StartdateState, this.state.depositAmt, this.state.overdueRem, this.state.paymentday,
        //   this.state.paymentfreq, this.state.rentAmt)
        this.setState({ isProgrees: true });

        fetch(EDIT_LEASE, {
          method: "POST",
          headers: {
            Accept: "application/json",
            //'Content-Type': 'application/json',
            Authorization: this.state.tokenState
          },

          body: JSON.stringify({
            start_date: this.state.EnddateState,
            end_date: this.state.StartdateState,
            rent: this.state.rentAmt,
            payment_frequency: this.state.paymentfreq,
            payment_day: this.state.paymentday,
            deposite_amount: this.state.depositAmt,
            tenant_reminder: this.state.tenantRem,
            overview_reminder: this.state.overdueRem,
            unit_id: this.props.flat_id
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            this.setState({ isProgrees: false });

            if (responseJson.msg === "success") {
              Alert.alert(
                "Alert",
                "Lease has been Updated",
                [
                  // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  // {
                  //   text: "Cancel",
                  //   onPress: () => console.warn("Cancel Pressed")
                  //   // style: 'cancel',
                  // },
                  {
                    text: "OK",
                    onPress: () => {
                      // console.warn("OK Pressed");
                      this.setState({ isProgrees: false });
                      // Actions.UnitsDetailsVacant();
                      Actions.replace("UnitsDetailsVacant", {
                        flat_id: this.state.unitIDScreen,
                        tokenProps: this.state.propstoken,
                      });
                    }
                  }
                ],
                { cancelable: false }
              );

              //Alert.alert("Lease has been Updated");
            } else Alert.alert("Error Updating Lease");
          })
          .catch(error => {
            console.error(error);
          });



      }
    } else {
      // ADD LEASE
      var validate = await this.validateDetails();

      if (validate === 200) {
        this.setState({ isProgrees: true });

        fetch(ADD_LEASE_TO_UNIT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            //'Content-Type': 'application/json',
            Authorization: this.state.tokenState
          },

          body: JSON.stringify({
            start_date: this.state.EnddateState,
            end_date: this.state.StartdateState,
            rent: this.state.rentAmt,
            payment_frequency: this.state.paymentfreq,
            payment_day: this.state.paymentday,
            deposite_amount: this.state.depositAmt,
            tenant_reminder: this.state.tenantRem,
            overview_reminder: this.state.overdueRem,
            unit_id: this.props.flat_id
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            // console.error(responseJson);

            if (responseJson.msg === "success") {
              this.setState({ isProgrees: false });
              // Alert.alert("Lease has been added")
              // this.setState({ isProgrees: false })
              // Actions.pop()

              Alert.alert(
                "Alert",
                "Lease has been added",
                [
                  // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  // {
                  //   text: "Cancel",
                  //   onPress: () => console.warn("Cancel Pressed")
                  //   // style: 'cancel',
                  // },
                  {
                    text: "OK",
                    onPress: () => {
                      // console.warn("OK Pressed");
                      this.setState({ isProgrees: false });
                      // Actions.UnitsDetailsVacant();
                      Actions.replace("UnitsDetailsVacant", {
                        flat_id: this.state.unitIDScreen,
                        tokenProps: this.state.propstoken,
                      });
                    }
                  }
                ],
                { cancelable: false }
              );

            }

            else

              Alert.alert(responseJson);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }

  render() {
    // const { rentAmt } = this.state

    let depositAmt = this.state;
    let rentAmt = this.state;

    let data = [
      { value: "1" },
      { value: "2" },
      { value: "3" },
      { value: "4" },
      { value: "5" }
    ];

    let paymentfreq = [
      { value: "Yearly" },
      { value: "Monthly" },
      { value: "Quarterly" }
    ];

    let paymentday = [
      { value: "1" },
      { value: "2" },
      { value: "3" },
      { value: "4" },
      { value: "5" }
    ];

    return (
      <SafeAreaView style={globalstyles.safearea}>
        <View style={globalstyles.container}>
          {/* MODAL FOR LOADING AFTER DATA INSERT */}
          <Modal
            onBackdropPress={() => this.setState({ isProgrees: false })}
            isVisible={this.state.isProgrees}
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

          {/* HEADER */}
          <View style={globalstyles.headercontainer_addLeaseToProperty}>
            <TouchableOpacity
              style={globalstyles.Left_arrowImgView_addLeaseToProperty}
              onPress={() => {
                // Actions.UnitsDetailsVacant({
                //   flat_id: this.state.unitIDScreen,
                //   tokenProps: this.state.propstoken,
                // });
                Actions.pop();
              }}
            >
              <Image
                source={require("../Assets/Images/left-arrow.png")}
                style={globalstyles.Left_arrowImg_addLeaseToProperty}
              />
            </TouchableOpacity>

            <Text style={globalstyles.TitleTxt_addLeaseToProperty}>
              {this.props.Action} Lease To Property
            </Text>
          </View>

          {/* MAIN FORM */}
          <View style={globalstyles.mainbodycontainer_addLeaseToProperty}>
            <ScrollView>
              <Text style={globalstyles.enterAllDetailsTxt_addLeaseToProperty}>
                Enter Lease Details
              </Text>

              <TextField
                label="Rent Amount"
                value={rentAmt}
                onChangeText={value => this.setState({ rentAmt: value })}
              />

              <TextField
                label="Deposit Amount"
                value={depositAmt}
                onChangeText={depositAmt => this.setState({ depositAmt })}
              />


              <DatePicker
                ref="StartDate"
                style={{ width: "100%", marginTop: 10, marginLeft: 0 }}
                date={this.state.StartdateState}
                mode="date"
                // iconSource={require('../../images/calendar.png')}
                placeholder="Enter Start Date"
                format="YYYY-MM-DD"
                // minDate="1900-01-01"
                // maxDate="2018-10-15"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    width: 30,
                    height: 30
                  },
                  dateInput: {
                    marginLeft: 45,
                    borderWidth: 0,
                    alignItems: "flex-start",
                    borderBottomWidth: 1,
                    borderBottomColor: "#5C96CC"
                  },
                  dateText: {
                    marginLeft: 8,
                    color: "#555555",
                    fontSize: 15
                  },
                  placeholderText: {
                    marginLeft: 8,
                    color: "#555555",
                    fontSize: 15
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({ StartdateState: date });
                }}
                returnKeyType="next"
                onSubmitEditing={event => {
                  this.refs.Password.focus();
                }}
              />

              <DatePicker
                ref="EndDate"
                style={{ width: "100%", marginTop: 10, marginLeft: 0 }}
                date={this.state.EnddateState}
                mode="date"
                // iconSource={require('../../images/calendar.png')}
                placeholder="Enter End Date"
                format="YYYY-MM-DD"
                // minDate="1900-01-01"
                // maxDate="2018-10-15"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    width: 30,
                    height: 30
                  },
                  dateInput: {
                    marginLeft: 45,
                    borderWidth: 0,
                    alignItems: "flex-start",
                    borderBottomWidth: 1,
                    borderBottomColor: "#5C96CC"
                  },
                  dateText: {
                    marginLeft: 8,
                    color: "#555555",
                    fontSize: 15
                  },
                  placeholderText: {
                    marginLeft: 8,
                    color: "#555555",
                    fontSize: 15
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({ EnddateState: date });
                }}
                returnKeyType="next"
                onSubmitEditing={event => {
                  Alert.alert(this.state.EnddateState);
                }}
              />

              <Dropdown
                label="Payment Day"
                data={paymentday}
                onChangeText={paymentday => this.setState({ paymentday })}
              />

              {/* <Text style={{marginLeft:20,marginTop:10,marginBottom:10,marginRight:20}}>{this.state.paymentday}</Text> */}

              <Dropdown
                label="Payment Frequency"
                data={paymentfreq}
                onChangeText={paymentfreq => this.setState({ paymentfreq })}
              />

              {/* <Text style={{marginLeft:20,marginTop:10,marginBottom:10,marginRight:20}}>{this.state.paymentfreq}</Text>  */}



              {/* <Text style={{marginLeft:20,marginTop:10,marginBottom:10,marginRight:20}}>{this.state.depositAmt}</Text> */}

              <Dropdown
                label="Tenant Reminder"
                data={data}
                onChangeText={tenantRem => this.setState({ tenantRem })}
              />

              {/* <Text style={{marginLeft:20,marginTop:10,marginBottom:10,marginRight:20}}>{this.state.tenantRem}</Text> */}
              <Dropdown
                label="Overdue Reminder"
                data={data}
                onChangeText={overdueRem => this.setState({ overdueRem })}
              />

              {/* <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, marginRight: 20 }}>
              {this.state.overdueRem}
              </Text> */}
            </ScrollView>
          </View>

          {/* SAVE BUTTON */}
          <View style={globalstyles.savebtncontainer_addLeaseToProperty}>
            <TouchableOpacity
              style={globalstyles.saveTxtView_addLeaseToProperty}
              onPress={() => this.addleaseToUnitMethod()}
            >
              <Text style={globalstyles.saveTxt_addLeaseToProperty}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
