/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Image, ScrollView, Text, SafeAreaView, View, TouchableOpacity, AsyncStorage, Slider } from 'react-native';
import { Actions, Scene, Router, Tabs, } from 'react-native-router-flux';
import CardView from 'react-native-cardview'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dropdown } from "react-native-material-dropdown";
import { UPPER_RANGE_API } from "../logic/ApiConfig"
import Spinner from 'react-native-loading-spinner-overlay';



//imjport screens
import globalstyles from './styles';
import { orangemain, bluemain } from './styles'
import Searchproperties from './SearchProperties';




var upperrange_var;


export default class FilterSearchProperty extends Component {

  constructor(props) {
    super(props)
    this.state = {

      value: 0,
      isloading1: true,
      SliderValue: this.props.upperrange_filter,
      sliderPerc: 0,
      unittype_filterstate: this.props.unitype_filter,
      furnish_filterstate: this.props.furnish_filter,
      property_filterstate: this.props.propertype_filter,

    }


    // console.error(props.usertoken)
    console.error(this.props.unitype_filter, this.props.furnish_filter, this.props.propertype_filter, this.props.upperrange_filter)

  }





  async applyfiltersfunc() {
    AsyncStorage.multiSet(
      [
        ["unitype_filter", this.state.unittype_filterstate],
        ["furnish_filter", this.state.furnish_filterstate],
        ["propertype_filter", this.state.property_filterstate],
        ["upperrange_filter", this.state.SliderValue.toString()],
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

    // console.error(this.state.unittype_filterstate, this.state.furnish_filterstate, this.state.property_filterstate, this.state.SliderValue)
    Actions.replace("Searchproperties")
  }



  componentWillMount() {


    fetch(UPPER_RANGE_API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        // Authorization: ,
      },
      body: JSON.stringify({

      })

    })
      .then(response => response.json())
      .then((ResponseJson) => {
        console.error(ResponseJson.upperrenge)
        upperrange_var = parseInt(ResponseJson.upperrenge)
        this.setState({ isloading1: false })

        // var number1 = parseInt(this.props.upperrange_filter) / upperrange_var
        // number1 = parseInt(number1 * 100)
        // // console.warn(number1, upperrange_var, this.props.upperrange_filter)
        // this.setState({ sliderPerc: number1 })

        // console.error(number1)
      }
      )

  }


  setPropertyInitial() {

    // console.warn(this.props.propertype_filter)
    var value = this.props.propertype_filter === "singleunit" ? 0 : (this.props.propertype_filter === "multiunit" ? 1 : 2)
    console.warn(value)
    return value;
  }

  setUnitTypeStateinitial() {
    console.warn(this.props.unitype_filter)
    return this.props.unitype_filter === "1 RK" ? 0 : (this.props.unitype_filter === "1 BHK" ? 1 : (this.props.unitype_filter === "2 BHK" ? 2 : (this.props.unitype_filter === "3 BHK" ? 3 : 4)))

  }

  setFurnishTypeInitial() {
    console.warn(this.props.unitype_filter)
    return this.props.furnish_filter === "Semi Furnished" ? 0 : (this.props.furnish_filter === "Fully Furnished" ? 1 : (this.props.furnish_filter === "UnFurnished" ? 2 : 3))

  }
  render() {

    // var upperlimitno = 10000
    var upper_prince_range = upperrange_var == null ? 0 : upperrange_var;
    var lower_prince_range = 0


    var radio_props_unit_size = [
      { label: '1 RK', value: "1 RK" },
      { label: '1 BHK', value: "1 BHK" },
      { label: '2 BHK', value: "2 BHK" },
      { label: '3 BHK', value: "3 BHK" },
      { label: 'all', value: "all" },
    ];

    var radio_props_roomtype = [
      { label: 'Single Unit', value: "singleunit" },
      { label: 'Multi Unit', value: "multiunit" },
      { label: 'both', value: "both" },
    ];


    var radio_props_furnish = [
      { label: 'Semi Furnished', value: "Semi Furnished" },
      { label: 'Fully Furnished', value: "Fully Furnished" },
      { label: "Unfurnished", value: "UnFurnished" },
      { label: "all", value: "all" }
    ];




    var locationNames = [{
      value: 'Newyork',
    }, {
      value: 'Louisiana',
    }, {
      value: 'Rhode Island',
    }, {
      value: 'Oregon',
    }, {
      value: 'Louisiana',
    }, {
      value: 'Mango',
    }, {
      value: 'Alabama',
    }, {
      value: 'Guam',
    }, {
      value: 'Indiana',
    }, {
      value: 'Nevada',
    }, {
      value: 'Guam',
    }, {
      value: 'North Carolina',
    }, {
      value: 'Indiana',
    }];





    return (



      <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>





        <Spinner
          overlayColor="rgba(0, 0, 0, 0.3)"
          visible={this.state.isloading1}
          textContent={'Loading Data...'}
          textStyle={{ color: bluemain }}
        />




        {/* HEADER */}
        <View style={globalstyles.headercontainer_filtersearchProperties}>



          <CardView
            style={{ paddingLeft: 20, backgroundColor: "#ffffff", flexDirection: "row", width: "100%", height: 60 }}
            cardElevation={2}
            cardMaxElevation={4}
            cornerRadius={3}>


            <TouchableOpacity
              onPress={() => Actions.replace("Searchproperties")}
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



        <ScrollView style={{ padding: 20, flex: 1 }}>

          <Text style={{ fontSize: 20, marginBottom: 10 }}>Select Unit Type</Text>
          <RadioForm
            buttonSize={10}
            selectedButtonColor={orangemain}
            buttonColor="#c9c9c9"
            // formHorizontal={true}

            radio_props={radio_props_unit_size}
            initial={this.setUnitTypeStateinitial()}
            onPress={async (unittype_filterstate) => {
              await this.setState({ unittype_filterstate })
              // console.warn(this.state.value)
            }}
          />



          <Text style={{ fontSize: 20, marginBottom: 20 }}>Select Furnish Type</Text>
          <RadioForm
            // formHorizontal={true}
            buttonSize={10}
            selectedButtonColor={orangemain}
            buttonColor="#c9c9c9"
            radio_props={radio_props_furnish}
            initial={this.setFurnishTypeInitial()}
            onPress={async (furnish_filterstate) => {
              await this.setState({ furnish_filterstate })
              // console.warn(this.state.value)
            }}
          />




          <Text style={{ fontSize: 20, marginBottom: 20 }}>Select Property Type</Text>
          <RadioForm
            buttonSize={10}
            // formHorizontal={true}
            selectedButtonColor={orangemain}
            buttonColor="#c9c9c9"
            radio_props={radio_props_roomtype}
            initial={this.setPropertyInitial()}
            onPress={async (property_filterstate) => {
              await this.setState({ property_filterstate })
              // console.warn(this.state.value)
            }}
          />



          <View style={{ marginTop: 50 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Choose Upper Price Range:  {this.state.SliderValue}</Text>

            <Slider
              step={100}
              minimumValue={lower_prince_range}
              maximumValue={upper_prince_range}
              thumbTintColor={orangemain}
              value={parseInt(this.props.upperrange_filter === null ? "0" : this.props.upperrange_filter)}
              maximumTrackTintColor="#888888"
              minimumTrackTintColor={orangemain}
              onValueChange={(ChangedValue) => this.setState({ SliderValue: ChangedValue })}
              style={{ width: '100%' }}
            />
          </View>







          {/* VACATE BUTTON */}
          <TouchableOpacity
            onPress={() => {
              this.applyfiltersfunc()
              // this.setFilterData()
            }
            }
            style={globalstyles.bottomView_filtersearchProperties}>
            <Text style={globalstyles.bottomTxt_filtersearchProperties}>Apply Filters</Text>

          </TouchableOpacity>


        </ScrollView>

      </SafeAreaView>


    );
  }
}
