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
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import globalstyles from "./styles";
import { Actions } from "react-native-router-flux";
import { bluemain } from "./styles";
import CollapseView from "react-native-collapse-view";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      helpInfo: [
        {
          title: "Cancel your KodiPlus Subscription or trial",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus, nibh nec ultricies facilisis, enim velit venenatis augue, eget tincidunt sem massa vitae tortor. Sed posuere sagittis orci luctus maximus. "
        },
        {
          title: "How to add properties",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus, nibh nec ultricies facilisis, enim velit venenatis augue, eget tincidunt sem massa vitae tortor. Sed posuere sagittis orci luctus maximus. "
        },
        {
          title: "How to create a lease",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus, nibh nec ultricies facilisis, enim velit venenatis augue, eget tincidunt sem massa vitae tortor. Sed posuere sagittis orci luctus maximus. "
        },
        {
          title: "How payments work",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus, nibh nec ultricies facilisis, enim velit venenatis augue, eget tincidunt sem massa vitae tortor. Sed posuere sagittis orci luctus maximus. "
        }
      ]
    };
  }

  _renderView(title, collapse) {
    return (
      <View style={globalstyles.collapseView_help}>
        <View style={globalstyles.imgView_help}>
          <Image
            source={require("../Assets/Images/textform.png")}
            style={globalstyles.img_help}
          />
        </View>

        <View style={globalstyles.textView_help}>
          <Text style={{ fontSize: 18 }}>{title}</Text>
        </View>

        <View style={globalstyles.collapseImgView_help}>
          {collapse ? (
            <Image
              source={require("../Assets/Images/arrowup.png")}
              style={globalstyles.img_help}
            />
          ) : (
            <Image
              source={require("../Assets/Images/arrowdown.png")}
              style={globalstyles.img_help}
            />
          )}
        </View>
      </View>
    );
  }

  _renderCollapseView(description) {
    return (
      <View style={globalstyles.des_help}>
        <View style={globalstyles.desView_help}>
          <Text style={globalstyles.desTxt_help}>{description}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={globalstyles.safearea}>
        <View style={globalstyles.container_help}>
          {/* HEADER */}
          <View style={globalstyles.headercontainer}>
            <TouchableOpacity
              onPress={() => Actions.drawerOpen()}
              style={globalstyles.closeWhiteImgView_help}
            >
              <Image
                source={require("../Assets/Images/menu.png")}
                style={globalstyles.closeWhiteImg_help}
              />
            </TouchableOpacity>

            <View style={globalstyles.titleTxtView_help}>
              <Text style={globalstyles.titleTxt_help}>Help </Text>
            </View>

            <TouchableOpacity style={globalstyles.searchImgView_help}>
              <Image
                source={require("../Assets/Images/search.png")}
                style={globalstyles.searchImg_help}
              />
            </TouchableOpacity>

            <TouchableOpacity style={globalstyles.dotsmenuImgView_help}>
              <Image
                source={require("../Assets/Images/dotsmenu.png")}
                style={globalstyles.dotsmenuImg_help}
              />
            </TouchableOpacity>
          </View>

          {/* MAIN BODY */}
          <View style={globalstyles.secondinnercontainer_help}>
            <Text style={globalstyles.subtitleTxt_help}>Popular</Text>

            <FlatList
              data={this.state.helpInfo}
              keyExtractor={(item, index) => item.title}
              renderItem={({ item }) => (
                <CollapseView
                  renderView={collapse =>
                    this._renderView(item.title, collapse)
                  }
                  renderCollapseView={() =>
                    this._renderCollapseView(item.description)
                  }
                />
              )}
            />

            <View style={globalstyles.line_help} />
            <Text style={globalstyles.largeTxt_help}>BROWSE ALL ARTICLES</Text>
            <View style={globalstyles.line_help} />

            <Text style={globalstyles.subtitleTxt_help}>Contact us</Text>
            <View style={globalstyles.subContainer_help}>
              <View style={globalstyles.imgView_help}>
                <Image
                  source={require("../Assets/Images/callback.png")}
                  style={globalstyles.img_help}
                />
              </View>

              <View style={globalstyles.textView_help}>
                <Text style={globalstyles.txt_help}>Request callback</Text>
              </View>
            </View>

            <View style={globalstyles.subContainer_help}>
              <View style={globalstyles.imgView_help}>
                <Image
                  source={require("../Assets/Images/feedback.png")}
                  style={globalstyles.img_help}
                />
              </View>

              <View style={globalstyles.textView_help}>
                <Text style={globalstyles.txt_help}>Send feedback</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
