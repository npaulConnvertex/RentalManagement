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
  SafeAreaView
} from "react-native";
import globalstyles from "./styles";
import { Dropdown } from "react-native-material-dropdown";
import Modal from "react-native-modal";

export default class SettingsReminders extends Component {
  constructor(Props) {
    super(Props);

    this.state = {
      isSmsModalVisible: false,
      isEmailModalVisible: false,
      smsReminderDays: "",
      emailsReminderDays: "",
      smsModalTitle: "Sms Reminder",
      emailModalTitle: "Email Reminder"
    };
  }

  modelshow() {
    this.setState({ isSmsModalVisible: true });
  }

  modelhide() {
    this.setState({ isSmsModalVisible: false });
  }

  modelhidewithSmsdata(modalvar) {
    this.setState({ isSmsModalVisible: false });
    this.setState({ smsReminderDays: modalvar });
    // console.warn(`Selected value: ${modalvar}`);
  }

  emailmodelshow() {
    this.setState({ isEmailModalVisible: true });
  }
  emailmodelhide() {
    this.setState({ isEmailModalVisible: false });
  }

  modelhidewithEmaildata(modalvar) {
    this.setState({ isEmailModalVisible: false });
    this.setState({ emailsReminderDays: modalvar });
  }

  render() {
    var apidate = 8;
    var arr = [];

    for (var i = 1; i <= apidate; i++) {
      arr.push({
        value: i + "Days Before"
      });
    }

    return (
      <SafeAreaView style={globalstyles.safearea}>
        <View style={globalstyles.container_settingsreminder}>
          {/* MAINBODY */}
          <View style={globalstyles.mainbodycontainer_settingsreminder}>
            <Text style={globalstyles.smalltxt_settingsreminders}>
              Rent Due Date
            </Text>
            <Text style={globalstyles.largetxt_settingsreminders}>
              Date {apidate}
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 40,
                justifyContent: "center"
              }}
            >
              <View style={{ flex: 0.4 }}>
                <Text style={globalstyles.smalltxt_settingsreminders}>
                  SMS Reminder
                </Text>
              </View>

              <View
                style={{
                  flex: 0.6,
                  flexDirection: "row",
                  justifyContent: "flex-end"
                }}
              >
                <Text style={globalstyles.smalltxt_settingsreminders}>
                  {this.state.smsReminderDays}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    this.modelshow();
                  }}
                >
                  <Image
                    source={require("../Assets/Images/add_gray.png")}
                    style={globalstyles.addgrayImg_settingsreminders}
                  />
                </TouchableOpacity>
              </View>

              <Modal
                isVisible={this.state.isSmsModalVisible}
                onBackdropPress={() => this.modelhide()}
                onBackButtonPress={() => this.modelhide()}
              >
                <View style={globalstyles.mainview_settingsremindersModal}>
                  <View style={globalstyles.titleView_settingsremindersModal}>
                    <View
                      style={globalstyles.titleTxtView_settingsremindersModal}
                    >
                      <Text
                        style={globalstyles.titleTxt_settingsremindersModal}
                      >
                        {this.state.smsModalTitle}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => this.modelhide()}
                      style={
                        globalstyles.titlecloseImgView_settingsremindersModal
                      }
                    >
                      <Image
                        source={require("../Assets/Images/close_gray.png")}
                        style={
                          globalstyles.titleCloseImg_settingsremindersModal
                        }
                      />
                    </TouchableOpacity>
                  </View>

                  <Dropdown
                    label="Select Date"
                    data={arr}
                    onChangeText={value => this.modelhidewithSmsdata(value)}
                  />
                </View>
              </Modal>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 40,
                justifyContent: "center"
              }}
            >
              <View style={{ flex: 0.4 }}>
                <Text style={globalstyles.smalltxt_settingsreminders}>
                  Email Reminder
                </Text>
              </View>

              <View
                style={{
                  flex: 0.6,
                  flexDirection: "row",
                  justifyContent: "flex-end"
                }}
              >
                <Text style={globalstyles.smalltxt_settingsreminders}>
                  {this.state.emailsReminderDays}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    this.emailmodelshow();
                  }}
                >
                  <Image
                    source={require("../Assets/Images/add_gray.png")}
                    style={globalstyles.addgrayImg_settingsreminders}
                  />
                </TouchableOpacity>
              </View>

              <Modal
                isVisible={this.state.isEmailModalVisible}
                onBackdropPress={() => this.emailmodelhide()}
                onBackButtonPress={() => this.emailmodelhide()}
              >
                <View style={globalstyles.mainview_settingsremindersModal}>
                  <View style={globalstyles.titleView_settingsremindersModal}>
                    <View
                      style={globalstyles.titleTxtView_settingsremindersModal}
                    >
                      <Text
                        style={globalstyles.titleTxt_settingsremindersModal}
                      >
                        {this.state.emailModalTitle}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => this.emailmodelhide()}
                      style={
                        globalstyles.titlecloseImgView_settingsremindersModal
                      }
                    >
                      <Image
                        source={require("../Assets/Images/close_gray.png")}
                        style={
                          globalstyles.titleCloseImg_settingsremindersModal
                        }
                      />
                    </TouchableOpacity>
                  </View>

                  <Dropdown
                    label="Select Date"
                    data={arr}
                    onChangeText={value => this.modelhidewithEmaildata(value)}
                  />
                </View>
              </Modal>
            </View>
          </View>

          {/* SAVE BUTTON */}
          <View style={globalstyles.btncontainer_settingsreminder}>
            <TouchableOpacity style={globalstyles.bottomView_settingsreminders}>
              <Text style={globalstyles.saveTxt_settingsreminders}>
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
