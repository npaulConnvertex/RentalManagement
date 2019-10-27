/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Image, Text, SafeAreaView, View, TouchableOpacity, Slider } from 'react-native';
import { Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dropdown } from "react-native-material-dropdown";

//imjport screens
import globalstyles from './styles';
import { orangemain } from './styles'





export default class FilterTransactions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      types: [
        { label: 'Single Unit', value: 0 },
        { label: 'Multi Unit', value: 1 }
      ],
      value: 0,
      SliderValue: 0,
    }
    // console.error(props.usertoken)
  }



  setFilterData() {
    AsyncStorage.multiSet(
      [
        ["unitTypeFilter", this.state.value],
        ["locationFilter", this.state.SliderValue],
        ["upperPriceFilter",],
      ],
      function (error) {
        //alert("finished");
        if (error) {
          alert("error!");
        } else {
          console.warn("saved to internal storage");
        }
      }
    );
  }


  render() {

    var upperlimitno = 10000
    var upper_prince_range = 10000
    var lower_prince_range = 0


    var radio_props = [
      { label: 'Single Unit', value: 0 },
      { label: 'Multi Unit', value: 1 }
    ];




    var propertyNames = [
      {
        value: 'Greenwood Apartment',
      }, {
        value: 'Rosewood Apartment',
      }, {
        value: 'Villa Dreams',
      }, {
        value: 'LandMark Residence',
      },
    ];


    var payMethod = [
      {
        value: 'Visa',
      }, {
        value: 'Mastercard',
      }, {
        value: 'MPesa',
      }
    ];

    var unitNo = [
      {
        value: '201',
      }, {
        value: '204',
      }, {
        value: '205',
      }, {
        value: '205',
      },
    ];



    var payType = [
      {
        value: 'Service Request',
      }, {
        value: 'Rent',
      }, {
        value: 'others',
      },
    ];



    return (



      <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>


        {/* HEADER */}
        <View style={globalstyles.headercontainer_filtersearchProperties}>





          <CardView
            style={{ paddingLeft: 20, backgroundColor: "#ffffff", flexDirection: "row", width: "100%", height: 60 }}
            cardElevation={2}
            cardMaxElevation={4}
            cornerRadius={3}>


            <TouchableOpacity
              onPress={() => Actions.pop()}
              style={globalstyles.menuImgView_myhouse}
            >
              <Image
                source={require("../Assets/Images/backarrow2.png")}
                style={globalstyles.menuImg_myhouse}
              />
            </TouchableOpacity>




            <View style={globalstyles.TitleTextView_filtersearchProperties}>
              <Text style={globalstyles.TitleTxt_filtersearchProperties}>Filters</Text>
            </View>
          </CardView>







        </View>




        {/* FILTERS */}

        {/* add filters, property, unit name, payment type, payment method */}

        <View style={{ padding: 20, }}>



          <View style={{ marginTop: 1 }}>

            <Dropdown
              label="Select Property"
              data={propertyNames}
              onChangeText={value => console.warn('selected')}
            />

          </View>


          <View style={{ marginTop: 10 }}>

            <Dropdown
              label="Select Unit"
              data={unitNo}
              onChangeText={value => console.warn('selected')}
            />

          </View>


          <View style={{ marginTop: 1 }}>

            <Dropdown
              label="Select Paymnet Type"
              data={payType}
              onChangeText={value => console.warn('selected')}
            />

          </View>


          <View style={{ marginTop: 10 }}>

            <Dropdown
              label="Select Payment Method"
              data={payMethod}
              onChangeText={value => console.warn('selected')}
            />

          </View>





          <Text style={{ fontSize: 20, marginBottom: 10 }}>Select Unit Type</Text>
          <RadioForm
            buttonSize={10}
            selectedButtonColor={orangemain}
            buttonColor="#c9c9c9"
            radio_props={radio_props}
            initial={0}
            onPress={(value) => {
              this.setState({ value: value })
              console.warn(this.state.value)
            }}
          />



          <View style={{ marginTop: 50 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Choose Upper Price Range:  {this.state.SliderValue}</Text>

            <Slider
              step={1}
              minimumValue={lower_prince_range}
              maximumValue={upper_prince_range}
              thumbTintColor={orangemain}
              maximumTrackTintColor="#888888"
              minimumTrackTintColor={orangemain}
              onValueChange={(ChangedValue) => this.setState({ SliderValue: ChangedValue })}
              style={{ width: '100%' }}
            />
          </View>






          {/* FILTER BUTTON */}
          <TouchableOpacity
            onPress={() => {
              Actions.pop()
              // this.setFilterData()
            }
            }
            style={globalstyles.bottomView_filtersearchProperties}>
            <Text style={globalstyles.bottomTxt_filtersearchProperties}>Apply Filters</Text>

          </TouchableOpacity>


        </View>

      </SafeAreaView>


    );
  }
}
