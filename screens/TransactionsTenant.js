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
  FlatList,
  SafeAreaView
} from "react-native";
import globalstyles from "./styles";
import CardView from "react-native-cardview";
import { bluemain } from "./styles";
import { Actions } from "react-native-router-flux";
import Modal from "react-native-modal";

export default class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transaction: [
        {
          date: "01.02.2019",
          day: "Monday",
          type: "Paid Rent",
          amount: "$ 300"
        },
        {
          date: "01.02.2019",
          day: "Wednesday",
          type: "Electricity Bill",
          amount: "$ 56"
        },
        {
          date: "01.02.2019",
          day: "Saturday",
          type: "Paid Rent",
          amount: "$ 40"
        },
        {
          date: "01.01.2019",
          day: "Tuesday",
          type: "Paid Rent",
          amount: "$ 300"
        },

        {
          date: "01.02.2019",
          day: "Monday",
          type: "Paid Rent",
          amount: "$ 300"
        },
        {
          date: "01.02.2019",
          day: "Wednesday",
          type: "Electricity Bill",
          amount: "$ 56"
        },
        {
          date: "01.02.2019",
          day: "Saturday",
          type: "Paid Rent",
          amount: "$ 40"
        },
        {
          date: "01.01.2019",
          day: "Tuesday",
          type: "Paid Rent",
          amount: "$ 300"
        }
      ],
      isModalVisible: false
    };
  }

  modelshow() {
    this.setState({ isModalVisible: true });
  }

  modelhide() {
    this.setState({ isModalVisible: false });
  }

  render() {
    return (
      <SafeAreaView style={globalstyles.safearea}>
        <View style={globalstyles.container_transactions}>
          {/* HEADER */}
          <View style={globalstyles.headercontainer_transactions}>
            <TouchableOpacity
              onPress={() => {
                Actions.drawerOpen();
              }}
              style={globalstyles.menuImgView_transactions}
            >
              <Image
                source={require("../Assets/Images/menu.png")}
                style={globalstyles.menuImg_transactions}
              />
            </TouchableOpacity>

            <View style={globalstyles.TitleTextView_transactions}>
              <Text style={globalstyles.TitleTxt_transactions}>
                Transactions
              </Text>
            </View>
          </View>

          {/* MAINBODY */}
          <View style={globalstyles.mainbodycontainer_transactions}>
            {/* TRANSCATION LIST */}
            <FlatList
              data={this.state.transaction}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.modelshow()}>
                  <CardView
                    style={globalstyles.cardview_transactions}
                    cardElevation={3}
                    cardMaxElevation={3}
                    cornerRadius={3}
                  >
                    <View style={globalstyles.mainView_transcationCardview}>
                      <View style={{ flex: 0.7 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={globalstyles.datetxt_transcationCardview}
                          >
                            {item.date}
                          </Text>
                          <Text style={globalstyles.daytxt_transcationCardview}>
                            {item.day}
                          </Text>
                        </View>

                        <Text style={globalstyles.typetxt_transcationCardview}>
                          {item.type}
                        </Text>
                      </View>

                      <View style={{ flex: 0.1, justifyContent: "center" }}>
                        <Image
                          source={require("../Assets/Images/vaertfourdots.png")}
                          style={
                            globalstyles.vaertfourdotsImg_transcationCardview
                          }
                        />
                      </View>

                      <View
                        style={{
                          flex: 0.2,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text style={globalstyles.amttxt_transcationCardview}>
                          {item.amount}
                        </Text>
                      </View>
                    </View>
                  </CardView>
                </TouchableOpacity>
              )}
            />

            <Modal
              isVisible={this.state.isModalVisible}
              onBackDropPress={() => this.modelhide()}
              onBackButtonPress={() => this.modelhide()}
            >
              <View style={globalstyles.mainview_transcationsModal}>
                <TouchableOpacity
                  onPress={() => this.modelhide()}
                  style={{ alignItems: "flex-end" }}
                >
                  <Image
                    source={require("../Assets/Images/close_gray.png")}
                    style={globalstyles.imgclosegray_transcationModal}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    marginBottom: 20
                  }}
                >
                  Message
                </Text>
              </View>
            </Modal>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
