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
  FlatList,
  AsyncStorage,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import { orangemain, bluemain } from "./styles.android"
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker'
import globalstyles from "./styles";
import RadioForm from 'react-native-simple-radio-button';
import { Actions } from "react-native-router-flux";
import ImagePicker from "react-native-image-picker";
import { GET_TRANSACTION_TYPE, GET_TENANT_LIST_TRANSACTION, GET_ALL_PROPS_TRANSACTION, GET_ALL_VENDORS, GET_ALL_UNITS_TRANSACTION } from "../logic/ApiConfig"
import { addTransaction } from '../logic/AddTransactionApi';




import Autocomplete from "react-native-autocomplete-input";




const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});




export default class AddTransaction1 extends Component {
  constructor(props) {
    super(props);



    this.state = {
      // stateList: [],
      // countrList: [],
      // countryMap: [],
      // stateMap: [],
      // countryId: "",
      // flat: "",
      // streetaddress: "",
      // city: " ",
      // state: "",
      // country: "",
      // propertyType: "",
      // zip: "",
      // suburbs: "",
      // landmarks: "",
      // notes: "",
      // isLoading: false,
      // isModalVisible: false,
      // token: "",
      // avatarSource: require("../Assets/Images/home.png"),
      // propertyname: "",
      // stateId: "",
      // cityList: "",
      // citiesMap: [],




      amountAdd: [],
      showTransactionModal: false,
      TenantListState: [],
      isAddTransactionLoader: false,
      amountDeduct: [],
      transactionState: "",
      typeName: "",
      type: '$',
      VendorList: [],
      typenumber: 0,
      totalAmount: -1,
      numericValue: 0,
      rentAmt: "",
      isProgrees: false,
      // paymentType: "",
      transactionType: "",
      tenantIdState: 0,
      addTypeState: "",
      isAddTransactionSucess: false,
      AmountState: 0,
      StartdateState: "",
      EndDateState: "",
      paymentTypeState: "1",
      ModalAddition: false,
      PaymentDateState: "",
      chooseTenantState: "null",
      paymentStatus: 1,
      VendorNameState: "",
      Notes: "",
      otherpaymentTypeStatus: true,






    };
  }

  async componentWillMount() {

    await fetch(GET_ALL_VENDORS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.props.usertoken
      },
    }).then(response => response.json())
      .then((responseJson) => {

        // console.error(responseJson);

        var VendorArray = responseJson.map(item => {
          var obj = {
            value: item.name
          };
          return obj;
        });


        this.setState({ VendorList: VendorArray })
      })
      .catch(error => {
        console.error(error);
      });



    await fetch(GET_ALL_PROPS_TRANSACTION, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.props.usertoken
      },
    }).then(response => response.json())
      .then((responseJson) => {

        // console.error(responseJson);

        var PropertyListArray = responseJson.map(item => {
          var obj = {
            value: item.propertyName,
            id: item.id
          };
          return obj;
        });

        // console.error(PropertyListArray)

        this.setState({ PropertyListArrayState: PropertyListArray, propertyListFull: responseJson })
      })
      .catch(error => {
        console.error(error);
      });


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

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          path: response.uri,
          imgselected: true
        });
      }
    });
  }



  async choosePaymentType(value) {
    await this.setState({ paymentTypeState: value })

    // Alert.alert(this.state.paymentTypeState)
  }







  async addTransactionMethod() {

    // await this.setPaymentType()
    var vaildateResponse = await this.validate()

    if (vaildateResponse === 200) {


      // console.error(this.state.AmountState,
      //   this.state.PaymentDateState,
      //   this.state.StartdateState,
      //   this.state.EndDateState,
      //   this.state.transactionTypeCategory,
      //   this.state.transactionTypeState,
      //   this.state.paymentTypeState,
      //   this.state.VendorNameState,
      //   this.state.propertyNameState,
      //   this.state.UnitNameState,
      //   this.state.tenantIdState
      // )





      var validateResponse2 = await this.validate2()
      if (validateResponse2 == 100) {

        // Alert.alert("Error", "Transaction Total amount cannot be empty" + this.state.totalAmount)

      }
      else {
        this.setState({ showTransactionModal: true })
      }








    }
    else {

    }


  }

  async validate2() {





    var tempAmount = parseFloat(this.state.AmountState)
    var CalculateSum = 0.0
    const addamountvar = this.state.amountAdd


    await addamountvar.forEach((item) => {
      if (item.add_type == "0") {

        // tempAmount = tempAmount + (item.digit / 100) * tempAmount
        if (item.add_digit > 100)
          Alert.alert("CAnnot be more than 100")
        else {
          var percentageValue = item.add_digit / 100
          CalculateSum = CalculateSum + (tempAmount * percentageValue)
        }

      }
      else
        CalculateSum = CalculateSum + item.add_digit
    })


    var CalculateSum2 = 0.0
    const deductAmountVAr = this.state.amountDeduct



    await deductAmountVAr.forEach((item) => {
      if (item.remove_type == "0") {

        // tempAmount = tempAmount + (item.digit / 100) * tempAmount
        if (item.remove_digit > 100)
          Alert.alert("CAnnot be more than 100")
        else {
          var percentageValue = item.remove_digit / 100
          CalculateSum2 = CalculateSum2 + (tempAmount * percentageValue)
        }

      }
      else
        CalculateSum2 = CalculateSum2 + item.remove_digit
    })


    tempAmount = tempAmount - CalculateSum2 + CalculateSum

    await this.setState({ totalAmount: tempAmount })


    if (this.state.totalAmount == 0) {
      Alert.alert("Error", "Transaction Total amount cannot be empty" + this.state.totalAmount)
      return 100
    }
    else
      return 200



  }









  validate() {


    if (this.state.Amount === "") {
      Alert.alert("Enter Paid Amount");
      return 100
    }
    else if (this.state.StartdateState === "" || this.state.EndDateState === "") {
      Alert.alert("Enter Billing Details")
      return 100
    }
    else if (this.state.PaymentDateState === "") {
      Alert.alert("Enter Payment Date")
      return 100
    }

    else {
      resp = 200
    }
    return resp

  }








  async additionModal() {
    if (this.state.AmountState !== "" && this.state.typeName != "" && this.state.addTypeState !== "") {
      if (parseFloat(this.state.numericValue) > 100.0 && this.state.addTypeState === "0")
        Alert.alert("Error", "percentage Value cannot be greater than 100")
      else {

        var data = {}
        data.add_text = this.state.typeName;
        data.add_type = this.state.addTypeState;
        data.add_digit = parseFloat(this.state.numericValue);
        await this.setState({ amountAdd: [...this.state.amountAdd, data] })
        console.error(this.state.amountAdd, this.state.amountDeduct)


      }
    }
    else {
      if (this.state.AmountState == "")
        Alert.alert("Please enter an amount First")
      else if (this.state.typeName == "")
        Alert.alert("Please enter  Name")
      else if (this.state.addTypeState == "")
        Alert.alert("Please enter a Type")
    }

  }













  async deductionModal() {



    if (this.state.AmountState !== "" && this.state.typeName != "" && this.state.addTypeState !== "") {

      if (parseFloat(this.state.numericValue) > 100.0 && this.state.addTypeState === "0")
        Alert.alert("Error", "percentage Value cannot be greater than 100")
      else {
        var data = {}
        data.remove_text = this.state.typeName;
        data.remove_type = this.state.addTypeState;
        data.remove_digit = parseInt(this.state.numericValue);
        await this.setState({ amountDeduct: [...this.state.amountDeduct, data] })
        // console.error(this.state.amountDeduct)
      }

    }
    else {
      if (this.state.AmountState == "")
        Alert.alert("Please enter an amount First")
      else if (this.state.typeName == "")
        Alert.alert("Please enter  Name")
      else if (this.state.addTypeState == "")
        Alert.alert("Please enter a Type")
    }





    // var data = {}
    // data.text = this.state.typeName;
    // data.remove_type = this.state.addTypeState;
    // data.digit = parseInt(this.state.numericValue);
    // await this.setState({ amountDeduct: [...this.state.amountDeduct, data] })
    // console.error(this.state.amountDeduct)
  }


  removeAddedMoney(e) {
    var array = [...this.state.amountAdd]; // make a separate copy of the array
    if (e !== -1) {
      array.splice(e, 1);
      this.setState({ amountAdd: array });
    }
  }
  removeDeductedMoney(e) {
    var array = [...this.state.amountDeduct]; // make a separate copy of the array
    if (e !== -1) {
      array.splice(e, 1);
      this.setState({ amountDeduct: array });
    }
  }















  async apicallTransactionType() {

    var transactionCategoryInput = this.state.transactionTypeCategory
    // console.error(transactionTypeInput)
    await fetch(GET_TRANSACTION_TYPE, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.props.usertoken
      },
    }).then(response => response.json())
      .then((responseJson) => {

        console.error(responseJson)


        var IncomeArray = responseJson.income.map(item => {
          var obj = {
            value: item.type_name,
            id: item.id
          };
          return obj;
        });


        var ExpenseArray = responseJson.expense.map(item => {
          var obj = {
            value: item.type_name,
            id: item.id
          };
          return obj;
        });


        // console.warn(ExpenseArray + IncomeArray)

        if (transactionCategoryInput === "income")
          this.setState({ transactionTypeStateArray: IncomeArray });
        else
          this.setState({ transactionTypeStateArray: ExpenseArray });

      })
      .catch(error => {
        console.error(error);
      });
  }



  async setUnitsList(index) {

    var property = this.state.propertyListFull[index]

    var propertyId = this.state.propertyListFull[index].id


    // console.error(propertyId)

    await fetch(GET_ALL_UNITS_TRANSACTION, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.props.usertoken
      },
      body: JSON.stringify({
        'propertyId': propertyId,
      }),

    }).then(response => response.json())
      .then((responseJson) => {

        console.error(responseJson)
        if (responseJson.length == 0)
          Alert.alert("No Units Available", "Either add unit or add lease to a unit")
        else {
          var UnitListArray = responseJson.map(item => {
            var obj = {
              value: item.flatHoseNo
            };
            return obj;
          });


          this.setState({ UnitListArrayState: UnitListArray, unitDetailsFull: responseJson, propertyIDState: propertyId })
        }
        console.error(responseJson);


      })
      .catch(error => {
        console.error(error);
      });

  }







  async setTenantNameList(indexid) {

    var unitid = this.state.unitDetailsFull[indexid].id
    await this.setState({ unitIdstate: unitid })
    console.warn(indexid, this.state.unitIdstate)

    await fetch(GET_TENANT_LIST_TRANSACTION, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: this.props.usertoken
      },
      body: JSON.stringify({
        'unit_id': unitid,
      }),

    }).then(response => response.json())
      .then((responseJson) => {



        // console.error(responseJson)



        if (responseJson.length == 0) {
          Alert.alert("No Tenant has been Linked to this unit")
          this.setState({ TenantListState: [] })

        }
        else {


          var tenantListArray = responseJson.map(item => {
            var obj = {
              value: item.userName,
              tenant_id: item.tenant_id
            };
            return obj;
          });

          // console.error(tenantListArray)
          this.setState({ TenantListState: tenantListArray })

        }



      })
      .catch(error => {
        console.error(error);
      });

  }









  async setTenantId(value, index) {


    await this.setState({ tenantIdState: this.state.TenantListState[index].tenant_id })

    // console.error(this.state.TenantListState[index].tenant_id + index + value)


  }

  applyTransactionTypeId(value1, value2) {
    // console.warn(value2)
    // console.error(this.state.transactionTypeStateArray[value2].id)
    this.setState({ transactionState: this.state.transactionTypeStateArray[value2].id })
  }












  addTrasnactionMethodFinal() {



    // Alert.alert(this.state.transactionState)

    // isAddTransactionLoader
    this.setState({ isAddTransactionLoader: true })

    addTransaction(this.props.usertoken, this.state.AmountState, this.state.PaymentDateState, this.state.paymentTypeState, this.state.StartdateState, this.state.EndDateState, this.state.unitIdstate, this.state.paymentStatus, this.state.transactionState, this.state.Notes, this.state.totalAmount, this.state.vendorNameState, this.state.propertyIDState, this.state.tenantIdState, this.state.amountAdd, this.state.amountDeduct)
      .then((responseJson) => {

        // console.error(responseJson);

        this.setState({ isAddTransactionLoader: false, isAddTransactionSucess: true })
        // Alert.alert("Transaction Added Successfully...");

      })
      .catch((error) => {
        this.setState({ isAddTransactionLoader: false, isAddTransactionSucess: true })
        console.error(`Error: ${error}`);
      });



  }















































  render() {
    // let { flat } = this.state;
    // let { streetaddress } = this.state;
    // let { city } = this.state;
    // let { state } = this.state;
    // let { country } = this.state;
    // let { zip } = this.state;
    // let { suburbs } = this.state;
    // let { landmarks } = this.state;
    // let { notes } = this.state;
    // let { propertyname } = this.state;

    // let unitTypeMap = [{ value: "multiunit" }, { value: "singleunit" }];

    // var defautprofileImgstyle = {
    //   width: 30,
    //   height: 30,
    //   alignSelf: "center"
    // };

    // var profileImgstyle = {
    //   width: 115,
    //   height: 115,
    //   borderRadius: 200,
    //   alignSelf: "center"
    // };




    let Amount = this.state
    let Notes = this.state





    let transactionType = [
      { value: "expense" },
      { value: "income" },
    ];




    var paymentTypeProps = [
      { label: 'Cash', value: "1" },
      { label: 'Check', value: "2" },
      { label: 'Other', value: "3" },
    ];



    var addTypeRadioProps = [
      { label: "%", value: "0" },
      { label: "Digit", value: "1" },
    ];



    let paymentType = [
      { value: "M-PESA" },
      { value: "Bank Slip" },
      { value: "Cash" },
      { value: "Bank Transfer" },
      { value: "Other" },
    ];



    var radio_props = [
      { label: 'Yes', value: "Yes" },
      { label: 'No', value: "No" },
    ];

    var radio_props2 = [
      { label: 'paid', value: "1" },
      { label: 'partially paid', value: "2" },
      { label: 'Unpaid', value: "0" },
    ];





    return (
      <SafeAreaView style={globalstyles.safearea}>







        <Modal
          // onBackdropPress={() => this.setState({ isAddTransactionLoader: false })}
          isVisible={this.state.isAddTransactionLoader}
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
              <Text style={{ margin: 20, fontSize: 15 }}> Under Progress </Text>
            </View>
          </View>
        </Modal>



        {/* MODAL FOR SUCCES MESSAGE */}
        <Modal
          backdropColor={"#009933"}
          onBackdropPress={() =>
            this.setState({ showTransactionModal: false })
          }
          isVisible={this.state.showTransactionModal}
        >
          <View style={{ flex: 1, padding: 20, backgroundColor: "#ffffff", alignItems: "center" }}>



            <ScrollView >

              <Text style={{ fontSize: 20, fontWeight: "500" }}>Confirm Transaction</Text>

              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#ffffff",
                  alignItems: "center"
                }}
              >
                <Text style={{ marginTop: 20, fontSize: 15 }}>
                  Please view the Transaction and confirm by pressing Yes
                </Text>
              </View>


              <View>


                <Text style={{ marginTop: 10 }}>PaymentDate: <Text style={{ fontSize: 30, fontWeight: "500" }}>{this.state.totalAmount}</Text></Text>

                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ flex: 0.5 }}>
                    <Text style={{ marginTop: 10 }}>Start Date: </Text>
                    <Text style={{ fontSize: 15, fontWeight: "500" }}>{this.state.StartdateState}</Text>
                  </View>

                  <View style={{ flex: 0.5 }}>
                    <Text style={{ marginTop: 10 }}>Start Date: </Text>
                    <Text style={{ fontSize: 15, fontWeight: "500" }}>{this.state.StartdateState}</Text>
                  </View>


                </View>

                <Text style={{ marginTop: 10, fontSize: 30, }}>PaymentDate: <Text style={{ fontSize: 30, fontWeight: "500" }}>{this.state.PaymentDateState}</Text></Text>


                <Text style={{ marginTop: 10 }}>Transaction Category: <Text style={{ fontSize: 15, fontWeight: "500" }}>{this.state.transactionTypeCategory}</Text></Text>

                <Text style={{ marginTop: 10 }}>Transaction Type: <Text style={{ fontSize: 15, fontWeight: "500" }}>{this.state.transactionType}</Text></Text>


                <Text style={{ marginTop: 10 }}>Payment Method: <Text style={{ fontSize: 15, fontWeight: "500" }}>{this.state.paymentTypeState}</Text></Text>

                <Text style={{ marginTop: 10 }}>Property Name: <Text style={{ fontSize: 15, fontWeight: "500" }}>{this.state.propertyNameState}</Text></Text>

                <Text style={{ marginTop: 10 }}>Unit Name: <Text style={{ fontSize: 15, fontWeight: "500" }}>{this.state.UnitNameState}</Text></Text>


                <Text style={{ marginTop: 10 }}>Tenant Name: <Text style={{ fontSize: 15, fontWeight: "500" }}>{this.state.UnitNameState}</Text></Text>





                <View style={{ flex: 1, flexDirection: "row", marginTop: 50 }}>

                  <View style={{ flex: 0.5 }} >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ showTransactionModal: false })
                      }}
                      style={{ width: 120, height: 50, backgroundColor: "#cc3300", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ color: "white" }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>


                  <View style={{ flex: 0.5 }} >
                    <TouchableOpacity
                      onPress={async () => {
                        await this.setState({ showTransactionModal: false })
                        this.addTrasnactionMethodFinal()
                      }}
                      style={{ width: 120, height: 50, backgroundColor: "#009900", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ color: "white" }}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>


              </View>
            </ScrollView>
          </View>
        </Modal>




        <View style={globalstyles.whitecontainer}>




          {/* HEADER */}
          <View style={globalstyles.headercontainer_addLeaseToProperty}>
            <TouchableOpacity
              style={globalstyles.Left_arrowImgView_addLeaseToProperty}
              onPress={() => {
                Actions.pop();
              }}
            >
              <Image
                source={require("../Assets/Images/left-arrow.png")}
                style={globalstyles.Left_arrowImg_addLeaseToProperty}
              />
            </TouchableOpacity>

            <Text style={globalstyles.TitleTxt_addLeaseToProperty}>
              Add Transaction
                </Text>
          </View>























          <View style={globalstyles.mainbodycontainer_addLeaseToProperty}>

            <ScrollView>




              <Text style={globalstyles.enterAllDetailsTxt_addLeaseToProperty}>
                Add Transaction Timings
              </Text>


              <DatePicker
                ref='PaymentDate'
                style={{ width: '100%', marginTop: 10, marginLeft: 0, }}
                date={this.state.PaymentDateState}
                mode="date"
                // iconSource={require('../../images/calendar.png')}
                placeholder="Enter Payment Date"
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
                    fontSize: 25,
                  },
                  placeholderText: {
                    marginLeft: 8,
                    color: '#555555',
                    fontSize: 25,
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ PaymentDateState: date }) }}
                returnKeyType="next"
                onSubmitEditing={(event) => {
                  this.refs.Password.focus();
                }}
              />





              <Text style={{ fontWeight: "500", marginTop: 40 }}>Enter Billing Period</Text>
              <View style={{ flexDirection: "row" }}>




                <View style={{ flex: 0.5, marginRight: 10 }}>

                  <DatePicker
                    ref='StartDate'
                    style={{ width: '100%', marginTop: 10, marginLeft: 0 }}
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
                    onDateChange={(date) => { this.setState({ StartdateState: date }) }}
                    returnKeyType="next"
                    onSubmitEditing={(event) => {
                      this.refs.Password.focus();
                    }}
                  />


                </View>

                <View style={{ flex: 0.5 }}>
                  <DatePicker
                    ref='EndDate'
                    style={{ width: '100%', marginTop: 10, marginLeft: 0 }}
                    date={this.state.EndDateState}
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
                    onDateChange={(date) => { this.setState({ EndDateState: date }) }}
                    returnKeyType="next"
                    onSubmitEditing={(event) => {
                      this.refs.Password.focus();
                    }}
                  />
                </View>


              </View>



              <View style={{ height: 1, backgroundColor: "#333333", marginTop: 20, marginBottom: 10 }}></View>
              <Text style={globalstyles.enterAllDetailsTxt_addLeaseToProperty}>
                Add Transaction Details
              </Text>




              <Dropdown
                label="Transaction Category"
                data={transactionType}
                onChangeText={
                  transactionTypeCategory => {
                    this.setState({ transactionTypeCategory })
                    this.apicallTransactionType()
                  }


                }
              />


              <Dropdown
                label="Transaction Type"
                data={this.state.transactionTypeStateArray}
                onChangeText={(value1, value2) => {
                  this.applyTransactionTypeId(value1, value2)
                  // if (this.state.transactionType === "Others")
                  //   this.setState({ otherpaymentTypeStatus: false })
                  // else
                  //   this.setState({ otherpaymentTypeStatus: true })
                }


                }
              />










              <Text style={{ marginTop: 30, }}> Payment Method</Text>

              <View style={{ marginTop: 20 }}>
                <RadioForm
                  radio_props={paymentTypeProps}
                  initial={0}
                  buttonColor="#aaaaaa"
                  selectedButtonColor={orangemain}
                  buttonSize={20}
                  formHorizontal={true}
                  labelStyle={{ margin: 10 }}
                  // style={{ margin: 10 }}
                  onPress={(value) => this.choosePaymentType(value)}
                />
              </View>








              <Dropdown
                label="Choose Vendor"
                data={this.state.VendorList}
                onChangeText={VendorNameState => {
                  // if (this.state.VendorList.length == 0) {
                  //   Alert.alert("Not Available, Vendors Not available in your system, add Vendors from Web panel")
                  // }
                  // else {
                  this.setState({ VendorNameState })
                }
                }
              />

              <Dropdown
                label="Choose Property"
                data={this.state.PropertyListArrayState}
                onChangeText={(propertyNameState, index) => {
                  // selectedIndex = -1
                  this.setState({ propertyNameState })
                  this.setUnitsList(index)
                }
                }
              />

              <Dropdown
                label="Choose Unit"
                data={this.state.UnitListArrayState}
                onChangeText={(UnitNameState, index) => {
                  this.setState({ UnitNameState })
                  this.setTenantNameList(index)
                }
                }
              />



              {/* <Text style={{ marginTop: 10, }}> Select Tenant</Text> */}

              <Dropdown
                label="Select Tenant"
                data={this.state.TenantListState}
                onChangeText={(value, index) => {
                  this.setTenantId(value, index)
                }
                }
              />






              <View style={{ height: 1, backgroundColor: "#333333", marginTop: 20, marginBottom: 10 }}></View>
              <Text style={globalstyles.enterAllDetailsTxt_addLeaseToProperty}>
                Add Amount Details
              </Text>

              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>Amount Section</Text>
              </View>


              <View style={{ width: "100%", borderRadius: 10, borderWidth: 2, borderColor: orangemain, padding: 10 }}>

                <TextField
                  label="Amount"
                  keyboardType="numeric"
                  value={Amount}
                  onChangeText={(value) => this.setState({ AmountState: value })}
                />

              </View>


              <View style={{ marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: "#999999", borderRadius: 10 }}>
                <View style={{ margin: 10 }}>
                  <TextField
                    label="Type"
                    value={this.state.typeName}
                    onChangeText={(value) => this.setState({ typeName: value })}
                  />

                  <Dropdown
                    label="Choose Digit or Percentage"
                    data={addTypeRadioProps}
                    onChangeText={addTypeState => this.setState({ addTypeState })}
                  />

                  <TextField
                    label="Digits Only"
                    keyboardType="numeric"
                    value={this.state.numericValue}
                    onChangeText={(value) => this.setState({ numericValue: value })}
                  />
                </View>


              </View>


              <View style={{ flex: 1, flexDirection: "row" }}>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => this.additionModal()}
                    style={{ flex: 0.5, padding: 10, backgroundColor: "#00cc66" }}>
                    <Text style={{ color: "white" }}>ADDITION (+)</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => this.deductionModal()}
                    style={{ flex: 0.5, padding: 10, backgroundColor: "#cc0000" }}>
                    <Text style={{ color: "white" }}>DEDUCTION (-)</Text>
                  </TouchableOpacity>
                </View>


              </View>

              {/* 
              data.typeValue = this.state.typeName;
    data.type = this.state.type;
    data.valuenumeric = this.state.numericValue;
    data.addordeduct = "Deduct";

 */}



              <View style={{ marginTop: 20 }}>
                <FlatList
                  data={this.state.amountAdd}
                  extraData={this.state.amountAdd}
                  renderItem={({ item, index }) => (
                    <View style={{ marginBottom: 10, flexDirection: "row", padding: 10, justifyContent: "space-between", borderWidth: 1, borderColor: "#00cc66" }}>
                      <Text style={{ marginLeft: 10 }}>{item.add_text}</Text>
                      <Text style={{ marginLeft: 10 }}>{item.add_type === "1" ? "Digit" : "%"}</Text>
                      <Text style={{ marginRight: 10 }}>{item.add_digit}</Text>
                      <TouchableOpacity
                        onPress={() => this.removeAddedMoney(index)}
                      >
                        <Text style={{ color: "#cc0000" }}>( - )</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />



                <FlatList
                  data={this.state.amountDeduct}
                  extraData={this.state.amountDeduct}
                  renderItem={({ item, index }) => (
                    <View style={{ marginBottom: 10, flexDirection: "row", padding: 10, justifyContent: "space-between", borderWidth: 1, borderColor: "#cc0000" }}>
                      <Text style={{ marginLeft: 10 }}>{item.remove_text}</Text>
                      <Text style={{ marginLeft: 10 }}>{item.remove_type === "1" ? "Digit" : "%"}</Text>
                      <Text style={{ marginRight: 10 }}>{item.remove_digit}</Text>
                      <TouchableOpacity
                        onPress={() => this.removeDeductedMoney(index)}
                      >
                        <Text style={{ color: "#cc0000" }}>( - )</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>



              <Text style={{ marginTop: 20, fontWeight: "500" }}>Payment Status</Text>

              <View style={{ marginTop: 20 }}>
                <RadioForm
                  radio_props={radio_props2}
                  initial={0}
                  buttonColor="#aaaaaa"
                  selectedButtonColor={orangemain}
                  buttonSize={20}
                  formHorizontal={true}
                  labelStyle={{ margin: 10 }}
                  // style={{ margin: 10 }}
                  onPress={(value) => { this.setState({ paymentStatus: value }) }}
                />
              </View>




              <TextField
                label="Notes"
                value={Notes}
                multiline={true}
                onChangeText={(value) => this.setState({ Notes: value })}
              />








            </ScrollView>

            {/* SAVE BUTTON */}
            <View style={globalstyles.savebtncontainer_addLeaseToProperty}>
              <TouchableOpacity
                style={globalstyles.saveTxtView_addLeaseToProperty}
                onPress={() =>
                  this.addTransactionMethod()

                  // console.error(this.state.paymentTypeState)

                }
              >
                <Text style={globalstyles.saveTxt_addLeaseToProperty}>Save</Text>
              </TouchableOpacity>

              <View style={{ height: 10, marginTop: 10 }}></View>


            </View>






          </View>



















          {/* MODAL ADD NEW PROPERTY */}
          <Modal isVisible={this.state.isAddTransactionSucess}>
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
                  Transaction Added Successfully
              </Text>


                <Text
                  onPress={() => this.setState({ isAddTransactionSucess: false })}
                  style={{ margin: 12, color: orangemain, fontSize: 15 }}>
                  OK
              </Text>
              </View>
            </View>
          </Modal>






        </View>

      </SafeAreaView>
    );
  }
}
