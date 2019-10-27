import { StyleSheet } from "react-native";
import { Fonts } from '../utils/fonts'



export var bluemain = "#019ae8";
export var bluedark = "#0076bf";
export var orangemain = "#ff5722";
export var whitecolor = "#ffffff";
export var greenmain = "#00b33c";




export default StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },


  safearea: {
    flex: 1,
    backgroundColor: bluemain
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  whitecontainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },

  headercontainer: {
    height: 50,
    backgroundColor: bluemain,
    flexDirection: "row"
  },

  menuicons_navigationdrawer: {
    width: 20,
    height: 20,
    marginLeft: 20
  },
  menuitems_navigationdrawer: {
    //backgroundColor: "#ff0000",
    height: 60,
    flex: 1,
    paddingTop: 10,
    flexDirection: "row",
    alignContent: "center"
    //justifyContent:"center"
  },
  imgheader_navigationdrawer: {
    width: "100%"
  },
  container_navigationdrawer: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#f1f1f1"
  },
  textspace_navigationdrawer: {
    color: "#3f3f3f",
    fontSize: 14,
    marginLeft: 20
  },
  headerimagecontainer_navigationdrawer: {
    width: "100%",
    height: 190,
    backgroundColor: bluemain
  },
  menucontainer_navigationdrawer: {
    flex: 1,
    backgroundColor: "#f9f9f9"
  },
  userdetails_navigationdrawer: {
    zIndex: 10,
    paddingTop: 40,
    paddingLeft: 20,
    position: "absolute"
  },
  profilepic_navigationdrawer: {
    height: 70,
    width: 70,
    // backgroundColor:"#ffffff",
    borderRadius: 200
  },
  textdetails_navigationdrawer: {
    marginTop: 20
    //backgroundColor:"#ff0000",
  },
  name_navigationdrawer: {
    color: "white",
    fontSize: 20
  },
  email_navigationdrawer: {
    color: "white",
    fontSize: 15
  },

  // SignIn
  container_signIn: {
    flex: 1,
    backgroundColor: "#3499e7"
  },

  headercontainer_signIn: {
    flex: 0.12
  },

  imgcontainer_signIn: {
    flex: 0.32,
    justifyContent: "center"
  },

  mainbodycontainer_signIn: {
    flex: 0.6,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },

  titleTxt_signIn: {
    color: "#fff",
    fontSize: 30,
    marginTop: 20,
    paddingLeft: 30
  },

  tickImg_signIn: {
    backgroundColor: "#ff0000",
    height: 100,
    width: 140,
    alignSelf: "center"
  },

  emailpassView_signIn: {
    height: "20%",
    flexDirection: "row",
    paddingRight: 10
  },

  emailImgView_signIn: {
    flex: 0.2,
    justifyContent: "center",
    paddingBottom: 10
  },

  emailImg_signIn: {
    height: 26,
    width: 26,
    alignSelf: "center"
  },

  TextInputView_signIn: {
    flex: 0.8,
    paddingRight: 25
  },

  line_signIn: {
    backgroundColor: "#fff",
    height: 1,
    width: "100%"
  },

  passwordImgView_signIn: {
    flex: 0.2,
    justifyContent: "flex-end",
    paddingBottom: 10
  },

  passwordImg_signIn: {
    height: 26,
    width: 26,
    alignSelf: "center"
  },

  signinTxtTouchView_signIn: {
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    paddingRight: 20,
    paddingLeft: 20,
    // flexDirection: "row"
  },



  signinTxtTouchView2_signIn: {
    marginTop: 50,
    width: "100%",
    justifyContent: "center",
    paddingRight: 25,
    paddingLeft: 25
  },


  signinTxt_signIn: {
    fontSize: 20,
    color: "#3499e7",
    backgroundColor: "#fff",
    textAlign: "center",
    height: 55,
    borderRadius: 30,
    textAlignVertical: "center"
  },

  //Help

  container_help: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  secondinnercontainer_help: {
    flex: 0.8,
    width: "100%",
    height: "80%"
  },

  view: {
    height: 50,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },

  collapseView_help: {
    flexDirection: "row",
    padding: 20
  },

  des_help: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    backgroundColor: "#00000011",
    marginLeft: 30,
    marginRight: 20,
    marginBottom: 30
  },
  desView_help: {
    margin: 20,
    height: 100
  },
  desTxt_help: {
    fontSize: 16
  },
  closeWhiteImgView_help: {
    flex: 0.15,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "flex-start"
  },

  closeWhiteImg_help: {
    width: 25,
    height: 25
  },

  titleTxtView_help: {
    flex: 0.65,
    justifyContent: "center",
    alignItems: "flex-start"
  },

  titleTxt_help: {
    fontSize: 22,
    color: "#fff"
  },

  searchImgView_help: {
    flex: 0.15,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center"
  },

  searchImg_help: {
    width: 20,
    height: 20
  },

  dotsmenuImgView_help: {
    flex: 0.15,
    justifyContent: "center",
    alignContent: "center"
  },

  dotsmenuImg_help: {
    width: 20,
    height: 20
  },

  subtitleTxt_help: {
    fontSize: 18,
    color: "#00000055",
    marginLeft: 30,
    marginBottom: 20,
    marginTop: 30
  },
  subContainer_help: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20
  },

  imgView_help: {
    flex: 0.1,
    justifyContent: "center",
    marginRight: 10
  },

  img_help: {
    width: 20,
    height: 20,
    alignSelf: "center"
  },

  textView_help: {
    flex: 0.8,
    marginLeft: 2
  },

  txt_help: {
    fontSize: 18
  },
  collapseImgView_help: {
    flex: 0.1
  },

  line_help: {
    backgroundColor: "#00000055",
    height: 1,
    width: "100%",
    marginTop: 10
  },

  largeTxt_help: {
    fontSize: 18,
    color: "#4f83f3",
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20
  },

  //HOME
  //HOMEDASHBOARD
  marginRight_homedashboard: {
    flex: 0.05
    // backgroundColor:"#ff0000"
  },
  marginLeft_homedashboard: {
    flex: 0.05
  },
  centerview_homedashboard: {
    flex: 0.9
  },
  maincontainer_homedashboard: { flex: 1, flexDirection: "row" },

  totalrentedCard_homedashboard: {
    // alignItems: "center",
    marginTop: 20,
    backgroundColor: "#ffffff"
  },


  totalrentedCard2_homedashboard: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#ffffff"
  },


  rentedincTxtStyle_homedashboard: {
    color: bluemain,
    fontSize: 30
  },

  rentedincTxtStyle2_homedashboard: {
    color: bluemain,
    fontSize: 25
  },

  totalrentcardmainview_homedashboard: {
    // borderRadius: 6,
    // borderColor: "#bbbbbb",
    // borderWidth: 2,

    padding: 20
  },
  rentedhouses_homedashboard: {
    flex: 1,
    flexDirection: "row"
  },
  housemain_homedashboard: {
    flex: 1,
    flexDirection: "row"
  },
  graph1_homedashboard: {
    marginTop: 20,
    width: "100%"
  },
  graph1card_homedashboard: {
    marginBottom: 10,
    padding: 10
  },
  graph1card2_homedashboard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: bluemain,
  },
  graphtitle_homedashboard: {
    fontSize: 30,
    color: "#ffffff",
    fontFamily: Fonts.RobotoRegular,
  },
  graph1subtitle_homedashboard: {
    fontSize: 15,
    color: "#ffffff",
    marginBottom: 10,
  },
  orangependinftext_homedashboard: {
    color: orangemain
  },
  sdfsdfsdfsdf: {
    flex: 1,
    flexDirection: "row",
    height: 70,
    marginTop: 10,
    marginBottom: 10
  },

  //service request
  container_servicerequest: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  headercontainer_serviceRequest: {
    height: 50,
    flexDirection: "row",
    backgroundColor: bluemain,
    paddingLeft: 20
  },

  mainbodycontainer_serviceRequest: {
    // flex: 0.9,
    // height: "90%",
    width: "100%",
    // backgroundColor:"#ffff00",
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 50
  },

  menuImgView_serviceRequest: {
    flex: 0.1,
    justifyContent: "center",
    alignContent: "flex-start"
  },
  menuImg_serviceRequest: {
    width: 20,
    height: 20
  },
  TitleTextView_serviceRequest: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  TitleTxt_serviceRequest: {
    fontSize: 22,
    color: "#fff"
  },
  searchImgView_serviceRequest: {
    flex: 0.1,
    justifyContent: "center",
    alignContent: "flex-start"
  },
  searchImg_serviceRequest: {
    width: 20,
    height: 20
  },
  dotsmenuImgView_serviceRequest: {
    flex: 0.1,
    justifyContent: "center",
    alignContent: "flex-start"
  },
  dotsmenuImg_serviceRequest: {
    width: 20,
    height: 20
  },

  //service request cardview

  cardview_serviceRequest: {
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff"
  },

  TitleView_serviceRequestCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  TitleInfoImgView_serviceRequestCard: {
    flex: 0.1,
    height: 40,
    justifyContent: "center"
  },

  TitleInfoImg_serviceRequestCard: {
    width: 30,
    height: 30,
    alignItems: "center"
  },

  NameTextView_serviceRequestCard: {
    flex: 0.65,
    marginLeft: 20
  },

  NameTxt_serviceRequestCard: {
    fontSize: 20,
    color: "#000"
  },

  AccDecTextView_serviceRequestCard: {
    flex: 0.25,
    // backgroundColor: "#ff4400",
    alignContent: "flex-end"
  },

  Line_serviceRequestCard: {
    backgroundColor: "#00000055",
    height: 1,
    width: "100%",
    marginTop: 12,
    marginBottom: 8
  },

  AddrTxt_servicerequestCard: {
    fontSize: 16,
    color: "#000"
  },

  CityTxt_serviceRequestCard: {
    fontSize: 16
  },

  detailTxt_serviceRequestCard: {
    marginBottom: 20,
    marginTop: 8,
    fontSize: 16,
    color: "#00000088"
  },

  //service request modal
  mainview_serviceRequestModal: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15
  },

  TitleView_serviceRequestModal: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    marginBottom: 20,
    height: 40
  },

  TitleTextView_serviceRequestModal: {
    width: "90%",
    justifyContent: "center"
  },

  TitleText_serviceRequestModal: {
    fontSize: 20,
    color: "#000"
  },

  TitlecloseImageView_serviceRequestModal: {
    justifyContent: "center",
    alignContent: "center",
    width: "10%"
  },

  TitleCloseImg: {
    width: 20,
    height: 20,
    alignContent: "center"
  },

  DetailText_serviceRequestModal: {
    textAlign: "justify",
    marginTop: 20,
    marginBottom: 30,
    fontSize: 16
  },

  BottomView_serviceRequestModal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30
  },

  AcceptText_serviceRequestModal: {
    color: "#31a559",
    fontSize: 18,
    textAlign: "center"
  },

  DeclineText_serviceRequestModal: {
    color: "#d93f3f",
    fontSize: 18,
    textAlign: "center"
  },

  //Home People Page
  peoplebg_homepeople: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    padding: 7
  },
  peoplelisttouch_homepeople: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderColor: "#cccccc",
    borderWidth: 1,
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
    //height:100,
  },
  peopleicon_homepeople: {
    //backgroundColor: "#ff0000",
    width: 30,
    height: 30,
    marginLeft: 20
  },
  peoplenameTxtstyle_homepeople: {
    fontSize: 20,
    color: bluemain
  },
  propertyTxtstyle_homepeople: {
    fontSize: 13,
    color: "#999999"
  },
  callicon_homepeople: {
    //backgroundColor: "#ff0000",
    width: 25,
    height: 25,
    margin: 10
  },
  msgicon_homepeople: {
    //backgroundColor: "#ff0000",
    width: 25,
    height: 25,
    margin: 10
  },

  //Notice
  safearea_notice: {
    flex: 1,
    backgroundColor: "#f3f3f3"
  },

  fabAddNotice_notice: {},
  propertyname_notice: {
    fontSize: 17,
    color: "#333333"
  },
  headingmessage_notice: {
    fontSize: 22,
    color: bluemain
  },
  noticetime_notice: {
    fontSize: 20,
    color: "#333333"
  },

  noticedate_notice: {
    fontSize: 14,
    color: "#e08213"
  },

  // Property List

  container_propertylist: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    paddingTop: 15
  },

  orangeround_propertylist: {
    backgroundColor: orangemain,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    width: 80,
    height: 20
  },

  greeneround_propertylist: {
    backgroundColor: greenmain,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    width: 80,
    height: 20
  },


  orangerountext_propertylist: {
    fontSize: 13,
    color: "#ffffff"
  },
  propertyiconview_propertylist: {
    flex: 1.5,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignContent: "center"
  },
  piconsty_propertylist: {
    width: 40,
    height: 40,
    borderRadius: 200,
    //backgroundColor:"#ff0000"
  },

  piconsty2_propertylist: {
    marginLeft: 10,
    width: 20,
    height: 20
    //backgroundColor:"#ff0000"
  },
  addpropertybtn_propertylist: {
    backgroundColor: orangemain,
    paddingTop: 10,
    height: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 200,
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  viewicon_propertylist: {
    width: 20,
    height: 20
    //backgroundColor:"#ff0000"
  },
  pnamesty_propertylist: {
    fontWeight: "500",
    fontSize: 18,
    color: "#6b6b6b"
  },
  paddresssty_propertylist: {
    fontSize: 14,
    color: "#6666"
  },
  unitnumberview_propertylist: {
    flex: 1.5,
    //backgroundColor:"#2222",
    height: 35
  },

  arrow_propertylist: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "flex-end"
    //backgroundColor:"#777777"
  },
  plistitemsview_propertylist: {
    flex: 5.5
    //backgroundColor:"#5555"
  },
  piconview_propertylist: {
    flex: 1.5,
    // borderRadius: 200,
    //backgroundColor:"#9999",
  },

  singleListItemView_propertylist: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15
  },

  floatingbutton_propertylist: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#f65418",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    position: "absolute",
    bottom: 40,
    right: 20,
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#f65418",
    borderRadius: 100
  },

  floatingbtntext_propertylist: {
    color: "#fff",
    marginRight: 15,
    fontSize: 16,
    fontWeight: "bold"
  },
  floatingbtnicon_propertylist: {
    width: 18,
    height: 18
  },

  addpropertybutton_propertyList: {
    flexDirection: "row",
    width: 100,
    padding: 10,
    backgroundColor: "#ff0000",
    zIndex: 10,
    position: "absolute",
    bottom: 20,
    right: 20
  },
  addpropertybutton1_propertyList: {
    backgroundColor: "#444444"
  },

  //AddProperty

  headercontainer_addProperty: {
    height: 50,
    flexDirection: "row",
    backgroundColor: bluemain,
    paddingLeft: 20
  },

  mainbodycontainer_addproperty: {
    height: "80%",
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    marginBottom: 20
  },

  buttomcontainer_addproperty: {
    height: "10%",
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 20
  },


  buttomcontainer2_addproperty: {
    height: "10%",
    // marginLeft: 10,
    // marginRight: 10,
    paddingBottom: 20
  },



  Left_arrowImgView_addProperty: {
    justifyContent: "center",
    alignContent: "center"
  },

  Left_arrowImg_addProperty: {
    width: 22,
    height: 22
  },

  TitleTxt_addProperty: {
    fontSize: 22,
    color: "#fff",
    marginLeft: 20,
    textAlignVertical: "center"
  },

  enterAllDetailsTxt_addProperty: {
    fontSize: 18,
    color: "#3499e7",
    marginBottom: 10
  },

  saveTextView_addProperty: {
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: "#f65418",
    borderRadius: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  saveTxt_addProperty: {
    fontSize: 18,
    color: "#fff"
  },

  // AddProperty modal
  mainView_addPropertyModal: {
    backgroundColor: "#fff",
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    borderRadius: 5
  },

  homeImgView_addPropertyModal: {
    backgroundColor: "#EBEBEB",
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20
  },

  homeImg_addPropertyModal: {
    width: 50,
    height: 50
  },

  bottomView_addPropertyModal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginLeft: 45,
    marginRight: 45,
    height: 60,
    paddingBottom: 20,
    marginTop: 30
  },

  proceedTxt_addPropertyModal: {
    fontSize: 20,
    flex: 0.6,
    color: "#f65418",
    textAlign: "right"
  },

  right_arrowImg_addPropertyModal: {
    width: 18,
    height: 18,
    flex: 0.1,
    alignSelf: "center",
    marginRight: 25,
    marginLeft: 20
  },

  // Reports
  formcard_report: {
    margin: 20
    //backgroundColor:bluemain,
  },
  downloadview_report: {
    //backgroundColor:bluemain,
    // height:100,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },

  Touchdownloadview_report: {
    backgroundColor: bluemain,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  getreportbtn_report: {
    marginLeft: 20,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 50,
    backgroundColor: orangemain,
    borderRadius: 200
  },
  getreporttext_report: {
    fontSize: 20,
    color: "#ffffff"
  },

  //SignUp

  container_signUp: {
    flex: 1,
    backgroundColor: "#3499e7"
  },

  headercontainer_signUp: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20
  },

  mainformcontainer_signUp: {
    height: "80%",
    alignContent: "flex-end"
  },

  bottomcontainer_signUp: {
    height: "10%"
  },

  left_arrowImgView_SignUp: {
    justifyContent: "center",
    alignContent: "flex-start"
  },

  left_arrowImg_SignUp: {
    width: 22,
    height: 22
  },

  titleTxt_SignUp: {
    fontSize: 22,
    color: "#fff",
    marginLeft: 20
  },

  cameraImgView_SignUp: {
    backgroundColor: "#ffffff55",
    width: 115,
    height: 115,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 60,
    marginBottom: 30
  },


  cameraImgView2_SignUp: {
    backgroundColor: "#cecece",
    width: 115,
    height: 115,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 60,
    marginBottom: 30
  },



  cameraImg_SignUp: {
    width: 30,
    height: 30,
    alignSelf: "center"
  },

  editFieldView_signUp: {
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: "center"
  },

  imgView_SignUp: {
    width: 25,
    height: 25,
    alignSelf: "flex-end",
    marginBottom: 10
  },

  radiogrp_signUp: {
    flexDirection: "row",
    paddingLeft: 40,
    marginTop: 20
  },

  radioTxt_signIn: {
    color: "#fff",
    fontSize: 15
  },

  signupView_signUp: {
    height: "20%",
    justifyContent: "center",
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 20
  },

  signUpTextView_signUp: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#9922"
  },

  signUpTxt_signUp: {
    fontSize: 18,
    color: "#3499e7",
    backgroundColor: "#fff",
    textAlign: "center",
    height: 55,
    borderRadius: 200,
    textAlignVertical: "center"
  },

  // SignIn

  titleTxt_signIn: {
    color: "#fff",
    fontSize: 30,
    marginTop: 20,
    paddingLeft: 30
  },

  tickImg_signIn: {
    marginTop: 30,
    marginBottom: 30,
    height: 120,
    width: 140,
    alignSelf: "center"
  },

  editFieldView_signIn: {
    flexDirection: "row",
    alignItems: "center"
  },

  icon_signIn: {
    width: 25,
    height: 25,
    alignSelf: "flex-end",
    marginBottom: 12
  },

  signinTxtTouchView_signIn: {
    marginTop: 60,
    justifyContent: "center"
  },

  signinTxt_signIn: {
    fontSize: 20,
    color: "#3499e7",
    backgroundColor: "#fff",
    textAlign: "center",
    height: 55,
    borderRadius: 200,
    textAlignVertical: "center"
  },

  bottomcontainer_signIn: {
    height: "10%",
    flexDirection: "row"
  },

  leftTxtView_signIn: {
    flex: 0.6,
    justifyContent: "space-evenly"
  },

  rightTxtView_signIn: {
    flex: 0.4,
    justifyContent: "space-evenly"
  },

  //PropertyDetails

  headercontainer_propertydetails: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: bluemain
  },


  headercontainer_2_propertydetails: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "#ffffff00",
    position: "absolute",
    zIndex: 10,
    top: 0,
  },



  floatingbtn_propertydetails: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#f65418",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    position: "absolute",
    bottom: 40,
    right: 20,
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#f65418",
    borderRadius: 100
  },

  floatingbtnTxt_propertydetails: {
    color: "#fff",
    marginRight: 15,
    fontSize: 16,
    fontWeight: "bold"
  },

  floatingbtnicon_propertydetails: {
    width: 18,
    height: 18
  },

  menuImgView_propertyDetails: {
    justifyContent: "center",
    alignContent: "flex-start"
  },
  menuImg_propertyDetails: {
    width: 22,
    height: 22
  },
  titleTextView_propertyDetails: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  titleTxt_propertyDetails: {
    fontSize: 22,
    color: "#fff",
    marginLeft: 20
  },
  searchImgView_propertyDetails: {
    flex: 0.1,
    justifyContent: "center",
    alignContent: "flex-start"
  },
  searchImg_propertyDetails: {
    width: 20,
    height: 20
  },
  dotsmenuImgView_propertyDetails: {
    flex: 0.1,
    justifyContent: "center",
    alignContent: "flex-start"
  },
  dotsmenuImg_propertyDetails: {
    width: 20,
    height: 20
  },

  mainbodyTitleView_propertyDetails: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },

  mainbodyTitleTxt_propertyDetails: {
    color: "#3499e7",
    fontSize: 15,
    marginTop: 10
  },

  propertyNameView_peropertyDetails: {
    flexDirection: "row",
    marginTop: 20
  },

  propertyNameImg_propertydetails: {
    width: 22,
    height: 22
  },

  propertyNameTxt_propertyDetails: {
    fontSize: 22,
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: "bold"
  },

  propertyAddressView_propertyDetails: {
    backgroundColor: "#ececec",
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10
  },

  propertyAddressTxt_propertyDetails: {
    color: "#00000055",
    fontSize: 22
  },

  propertyAddressCityTxt_propertyDetails: {
    color: "#00000099",
    fontSize: 22,
    fontWeight: "bold"
  },

  propertyAddressZipTxt_propertyDetails: {
    color: "#00000088",
    fontSize: 32
  },

  //propertyDetails UnitView

  mainView_propertyDetailsUnit: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30
  },

  mainViewTitleTxt_propertyDetailsUnit: {
    color: "#3499e7",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 20
  },

  //propertyDetails Cardview

  cardview_propertyDetailsCardview: {
    width: "100%",
    padding: 10,
    backgroundColor: "#ffffff99",
    marginBottom: 20,
    // height: 55
  },


  cardview_propertyDetailsCardviewVac: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#ffffff99",
    marginBottom: 20,
    height: 55
  },

  mainView_propertyDetailsCardview: {
    flexDirection: "column"
    // justifyContent:'center',
    // alignItems:'center'
  },

  mainView_propertyDetailsCardviewVac: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center"
  },
  cardviewTitleTxt_propertyDetailsCardview: {
    color: "#3499e7",
    // flex: 0.5,
    fontWeight: "bold"
  },

  cardviewtxt_propertyDetailsCardview: {
    marginLeft: 10,
    flex: 0.5,
    fontWeight: "bold"
  },

  rightArrowGray_propertyDetailsCardview: {
    width: 12,
    height: 12,
    flex: 0.1
  },

  //propertyDetails Modal
  mainview_propertyDetailsModal: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15
  },

  titleView_propertyDetailsModal: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    marginBottom: 10
  },

  titleTxtView_propertyDetailsModal: {
    width: "90%",
    justifyContent: "center"
  },

  titleTxt_propertyDetailsModal: {
    fontSize: 22,
    color: "#3499e7",
    fontWeight: "bold"
  },

  titlecloseImgView_propertyDetailsModal: {
    justifyContent: "center",
    alignContent: "center",
    width: "10%"
  },

  titleCloseImg_propertyDetailsModal: {
    width: 20,
    height: 20,
    alignContent: "center"
  },

  bottomView_propertyDetailsModal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginLeft: 45,
    marginRight: 45,
    height: 60,
    paddingBottom: 20,
    marginTop: 30
  },

  proceedTxt_propertyDetailsModal: {
    fontSize: 20,
    flex: 0.6,
    color: "#f65418",
    textAlign: "right"
  },

  right_arrowImg_propertyDetailsModal: {
    width: 18,
    height: 18,
    flex: 0.1,
    alignSelf: "center",
    marginRight: 25,
    marginLeft: 20
  },

  //UnitsDetails
  container_unitsDetails: {
    flex: 1,
    backgroundColor: "#ffffff"
  },

  headercontainer_unitsDetails: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: bluemain
  },

  mainbodycontainer_unitsDetails: {
    height: "90%",
    marginBottom: 20
  },

  menuImgView_unitsDetails: {
    justifyContent: "center",
    alignContent: "flex-start"
  },
  menuImg_unitsDetails: {
    width: 22,
    height: 22
  },
  titleTextView_unitsDetails: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  titleTxt_unitsDetails: {
    fontSize: 22,
    color: "#fff",
    marginLeft: 20
  },
  searchImgView_unitsDetails: {
    flex: 0.1,
    justifyContent: "center",
    alignContent: "flex-start"
  },
  searchImg_unitsDetails: {
    width: 20,
    height: 20
  },
  dotsmenuImgView_unitsDetails: {
    flex: 0.1,
    justifyContent: "center",
    alignContent: "flex-start"
  },
  dotsmenuImg_unitsDetails: {
    width: 20,
    height: 20
  },




  paybtnview2_unitsDetails: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 40,
    borderWidth: 1, borderColor: "#333333",
    borderRadius: 200,
    marginTop: 10,
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },


  paybtnview3_unitsDetails: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1ba026",
    height: 40,
    // borderWidth: 1, borderColor: "#333333",
    borderRadius: 200,
    marginTop: 10,
    flex: 0.5,
    marginLeft: 20,
    marginRight: 20,
  },


  // unitsDetails mainbody
  mainview_unitsDetails: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },

  title_unitsDetails: {
    color: "#3499e7",
    fontWeight: "bold",
    fontSize: 16
  },

  subtitleTxt_unitsDetails: {
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16
  },

  largetxt_unitsDetails: {
    fontWeight: "bold",
    fontSize: 35
  },

  mediumtxt_unitsDetails: {
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 10,
    fontSize: 20
  },

  //unitsDetails button
  btnTxtView_unitsDetails: {
    backgroundColor: "#f65418",
    width: 100,

    height: 38,
    borderRadius: 50,
    justifyContent: "center",
    marginTop: 50,
    marginLeft: 10,
    marginBottom: 10
  },


  btnTxtView2_unitsDetails: {
    backgroundColor: "#f65418",
    width: 100,

    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10
  },




  btnTxtViewInActive_unitsDetails: {
    backgroundColor: "#aaaaaa",
    width: 100,
    height: 38,
    borderRadius: 50,
    justifyContent: "center",
    marginTop: 50,
    marginLeft: 10,
    marginBottom: 10
  },

  btnTxt_unitsDetails: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13
  },

  //UnitsDetails Lease Cardview

  mainview_unitsDetailsLeaseCardview: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5
  },

  cardview_unitsDetailsLeaseCardview: {
    width: "100%",
    padding: 10,
    backgroundColor: "#ececec",
    justifyContent: "center"
  },
  cardview1_unitsDetailsLeaseCardview: {
    width: "100%",
    // padding: 10,
    backgroundColor: "#ffffff",
    justifyContent: "center"
  },

  titleTxt_unitsDetailsLeaseCardview: {
    color: "#3499e7",
    fontWeight: "bold",
    fontSize: 16
  },

  line_unitsDetailsLeaseCardview: {
    height: 2,
    backgroundColor: "#00000033",
    marginTop: 10,
    marginBottom: 10
  },

  subtitleTxt_unitsDetailsLeaseCardview: {
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16
  },

  txt_unitsDetailsLeaseCardview: {
    marginLeft: 10,
    fontSize: 16
  },

  //unitsDetails Blur TitleText

  tenantTxt_unitsDetailsBlurTxt: {
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 20,
    fontSize: 20,
    color: "#00000055"
  },

  paymentTxt_unitsDetailsBlurTxt: {
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    color: "#00000055"
  },

  //UnitsDetails tenantDetails Cardview

  cardview_unitsDetailsTenantcardview: {
    width: "100%",
    padding: 10,
    backgroundColor: "#ececec",
    justifyContent: "center",
    marginBottom: 10,
  },

  tenantNameTxt_unitsDetailsTenantcardview: {
    color: "#3499e7",
    fontWeight: "bold",
    fontSize: 20
  },

  tenantEmailTxt_unitsDetailsTenantcardview: {
    fontSize: 16,
    marginTop: 12
  },

  tenantphoneTxt_unitsDetailsTenantcardview: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5
  },

  // unitsDetails flatlist paymentlog subheading
  dateTxt_unitsDetailFlatlistHeading: {
    flex: 0.2,
    fontWeight: "bold",
    fontSize: 16
  },

  paymentTxt_unitsDetailsFlatlistHeading: {
    flex: 0.4,
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 16
  },

  messageTxt_unitsDetailsFlatListHeading: {
    flex: 0.4,
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 16
  },

  // unitsDetails flatlist paymentlog

  dateTxt_unitsDetailFlatlist: {
    flex: 0.2,
    fontSize: 16
  },

  paymentTxt_unitsDetailsFlatlist: {
    flex: 0.4,
    textAlign: "right",
    fontSize: 16
  },

  messageTxt_unitsDetailsFlatList: {
    flex: 0.4,
    textAlign: "right",
    fontSize: 16
  },

  // AddLeaseToProperty
  headercontainer_addLeaseToProperty: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: bluemain
  },

  mainbodycontainer_addLeaseToProperty: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },

  savebtncontainer_addLeaseToProperty: {
    justifyContent: "center",
    // alignItems: "center",

    height: "10%"
  },

  Left_arrowImgView_addLeaseToProperty: {
    justifyContent: "center",
    alignContent: "flex-start"
  },

  Left_arrowImg_addLeaseToProperty: {
    width: 22,
    height: 22
  },

  TitleTxt_addLeaseToProperty: {
    fontSize: 22,
    color: "#fff",
    marginLeft: 20
  },

  enterAllDetailsTxt_addLeaseToProperty: {
    fontSize: 18,
    color: "#3499e7",
    marginBottom: 10
  },

  saveTxtView_addLeaseToProperty: {
    height: 50,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    backgroundColor: "#f65418",
    justifyContent: "center",
    alignItems: "center"
  },

  saveTxt_addLeaseToProperty: {
    fontSize: 18,
    color: "#fff"
  },

  //TenantSearchList
  container_tenantsearchlist: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },

  headercontainer_tenantsearchlist: {
    height: "12%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20
  },

  mainbodycontainer_tenantsearchlist: {
    height: "88%"
  },

  //Tenants Page
  //TenantCurrent

  floatingbtn_tenantcurrent: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#f65418",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 40,
    right: 20,
    height: 70,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#f65418",
    borderRadius: 100
  },

  floatingbtnicon_tenantcurrent: {
    width: 18,
    height: 18
  },

  nodatacontainer_tenantcurrent: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    paddingTop: 15,
    justifyContent: "center",
    alignItems: "center"
  },

  datacontainer_tenantcurrent: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    paddingTop: 15
  },

  //TenantCurrent Flatlist

  mainView_tenantcurrentflatlist: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15
  },

  tenantIconView_tenantcurrentflatlist: {
    flex: 1.5
  },

  tenantIconstyle_tenantcurrentflatlist: {
    width: 40,
    height: 40
  },

  tenantListTxtView_tenantcurrentflatlist: {
    flex: 5.5
  },

  nametxt_tenantcurrentflatlist: {
    fontWeight: "500",
    fontSize: 18,
    color: "#6b6b6b"
  },

  addrtxt_tenantcurrentflatlist: {
    fontSize: 16,
    color: "#6666"
  },

  rightarrow_tenantcurrentflatlist: {
    width: 20,
    height: 20
  },

  //TenantCurrent Modal
  mainview_tenantcurrentModal: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15
  },

  titleView_tenantcurrentModal: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    marginBottom: 10
  },

  titleTxtView_tenantcurrentModal: {
    width: "90%",
    justifyContent: "center"
  },

  titleTxt_tenantcurrentModal: {
    fontSize: 22,
    color: "#3499e7",
    fontWeight: "bold"
  },

  titlecloseImgView_tenantcurrentModal: {
    justifyContent: "center",
    alignContent: "center",
    width: "10%"
  },

  titleCloseImg_tenantcurrentModal: {
    width: 20,
    height: 20,
    alignContent: "center"
  },

  txtfieldStyle_tenantcurrentModal: {
    marginLeft: 10,
    marginRight: 10
  },

  submitBtnView_tenantcurrentModal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: orangemain,
    marginLeft: 45,
    marginRight: 45,
    height: 50,
    borderRadius: 200,
    marginTop: 30,
    marginBottom: 20
  },

  submitTxt_tenantcurrentModal: {
    color: "#fff",
    fontSize: 20
  },

  Line_tenantcurrentModal: {
    backgroundColor: "#00000055",
    height: 1,
    width: "100%",
    marginTop: 12,
    marginBottom: 8
  },

  mobtxt_tenantcurrentModal: {
    fontWeight: "500",
    fontSize: 20,
    color: "#6b6b6b"
  },

  emailtxt_tenantcurrentModal: {
    fontSize: 18,
    color: "#6666"
  },

  // transactionlandlord

  flex3_transactionlandlord: {
    flex: 0.3,
    justifyContent: "space-between",
    alignItems: "flex-end"
  },

  eventtext_transactionlandlord: { color: orangemain, fontSize: 25 },

  amount_transactionlandlord: { color: bluemain, fontSize: 14 },

  flat_transactionlandlord: { marginRight: 10 },

  propertyname_transactionlandlord: {},

  nametext_transactionlandlord: {
    fontSize: 20,
    fontWeight: "300",
    color: bluemain
  },

  datetext_transactionlandlord: { fontWeight: "500" },

  // T
  // E
  // N
  // A
  // N
  // T
  // S

  // T
  // E
  // N
  // A
  // N
  // T
  // S

  // T
  // E
  // N
  // A
  // N
  // T
  // S

  // Navigatiobn Drawer Tenant
  menuicons_navigationdrawertenant: {
    width: 20,
    height: 20,
    marginLeft: 20
  },
  menuitems_navigationdrawertenant: {
    //backgroundColor: "#ff0000",
    height: 60,
    flex: 1,
    paddingTop: 10,
    flexDirection: "row",
    alignContent: "center"
    //justifyContent:"center"
  },
  container_navigationdrawertenant: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#ffffff"
  },
  textspace_navigationdrawertenant: {
    color: "#3f3f3f",
    fontSize: 14,
    marginLeft: 20
  },
  headerimagecontainer_navigationdrawertenant: {
    width: "100%",
    height: 200,
    backgroundColor: "#ffffff"
  },
  menucontainer_navigationdrawertenant: {
    flex: 1,
    backgroundColor: "#f9f9f9"
  },
  userdetails_navigationdrawertenant: {
    zIndex: 10,
    paddingTop: 40,
    paddingLeft: 20,
    position: "absolute"
  },
  profilepic_navigationdrawertenant: {
    height: 70,
    width: 70,
    // backgroundColor:"#ff0000",
    borderRadius: 200
  },
  textdetails_navigationdrawertenant: {
    marginTop: 20
    //backgroundColor:"#ff0000",
  },
  name_navigationdrawertenant: {
    color: bluemain,
    fontSize: 25,
    fontWeight: "500"
  },
  email_navigationdrawertenant: {
    marginTop: 10,
    color: "#818181",
    fontSize: 15
  },

  // Timeline Tenant
  header_timelinetenant: {
    width: "100%",
    flexDirection: "row",
    height: 200,
    backgroundColor: bluemain
  },
  headerimagestyle_timelinetenant: {
    width: "100%",
    height: "100%"
  },
  notimelineimagestyle_timelinetenant: {
    height: 200,
    width: 200
  },
  notimelineview_timelinetenant: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  notimelineview_timelinetenant: {
    flex: 1
  },
  notimelinetext_timelinetenant: {
    marginTop: 20,
    color: "#aaaaaa",
    fontSize: 18
  },
  titlebarmain_timelinetenant: {
    height: 50,
    backgroundColor: bluemain,
    flexDirection: "row"
  },
  menuicon_timelintenant: {
    flex: 0.1,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  titleview_timelinetenant: {
    flex: 0.8,
    justifyContent: "center",
    paddingLeft: 20
  },
  timelindetails_timelinetenants: {
    zIndex: 10,
    position: "absolute",
    bottom: 20,
    left: 20
  },
  username_timelintenant: {
    color: "#ffffff",
    fontSize: 30,
    fontFamily: Fonts.RobotoLight
  },
  username2_timelintenant: {
    color: "#ffffff",
    fontSize: 15
  },
  time1_timelinetenant: { fontSize: 40, color: bluemain },

  itemflat1_timelinetenant: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10
  },

  flex3_timelinetenant: {
    marginLeft: 10,
    flex: 0.6,
    // backgroundColor:"#aaaa",
    justifyContent: "center"
  },

  flex4_timelinetenant: { flex: 0.15, backgroundColor: "#0000" },

  notimelineview2_timelinetenant: {
    marginTop: 40,
    marginBottom: 40
  },

  // NotificationsScrens

  backstyle_notificationtenant: {
    width: 20,
    height: 20
  },
  notificationlist_notificationtenant: { width: "100%" },

  listview_notificationtenant: { marginTop: 20, marginLeft: 20 },

  text1_notificationtenant: { fontSize: 18, fontWeight: "400" },

  text2_notificationtenant: { fontSize: 13, color: "#aaaa" },

  // Search Properties
  header_searchproperties: {
    width: "100%",
    flexDirection: "row",
    height: 200,
    backgroundColor: bluemain
  },
  headerimagestyle_searchproperties: {
    width: "100%"
  },
  listcardview_searchproperties: {
    flex: 1,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#ffffff"
  },
  vacantrow_searchproperties: {
    flexDirection: "row",
    //justifyContent:"center"
    //  backgroundColor:"#2222",
    alignItems: "center"
  },
  vactext1_searchproperties: {
    marginRight: 10,
    fontWeight: "100",
    color: bluemain,
    fontSize: 17
  },
  vactext2_searchproperties: {
    marginRight: 10,
    //fontWeight:"100",
    color: orangemain,
    fontSize: 17
  },
  vactext3_searchproperties: {
    marginRight: 10,
    // fontWeight:"100",
    color: orangemain,
    fontSize: 17
  },
  namebannerview_searchproperties: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10
  },
  imagepr_searchproperties: {
    height: 50,
    width: 50,
    backgroundColor: orangemain,
    borderRadius: 200
  },
  viewarrow_searchproperties: {
    height: 20,
    width: 20
  },

  flex015_searchproperties: {
    flex: 0.15,
    //backgroundColor:"#1111",
    justifyContent: "center"
  },

  flex08_searchproperties: {
    flex: 0.8,
    // backgroundColor:"#3333",
    justifyContent: "center"
  },

  nametextst_searchproperties: {
    fontSize: 20,
    fontWeight: "300",
    color: bluemain
  },

  flex05_searchproperties: {
    flex: 0.05,
    marginTop: 10,
    //backgroundColor:"#6666",
    justifyContent: "center"
  },

  titlebar_searchpropertyunits: {
    width: "100%",
    height: 50,
    backgroundColor: "#121212"
  },

  // UnitDetailsProperty

  headertextstyle_unitdetailsproperty: { color: "#9f9f9f" },

  bluecontenttextstyle_unitdetailsproperty: {
    color: bluemain,
    fontWeight: "500",
    fontSize: 20
  },

  contextmainview_unitdetailsproperty: {
    flex: 9,
    backgroundColor: "#ffff",
    marginTop: 30
  },

  addresstextstyle2_unitdetailsproperty: { color: "#444444", fontSize: 20 },

  contextsubview_unitdetailsproperty: { marginBottom: 30 },

  contextsubview2_unitdetailsproperty: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  calllandlord_unitdetailsproperty: {
    borderRadius: 100,
    width: 50,
    height: 50,
    position: "absolute",
    right: 15,
    bottom: 15,
    backgroundColor: orangemain
  },

  callLand_unitdetailsproperty: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff0000",
    borderRadius: 200,
    position: "absolute",
    bottom: 15,
    right: 15,
    zIndex: 10
  },

  //MyHouse
  headercontainer_myhouse: {
    height: 50,
    flexDirection: "row",
    backgroundColor: bluemain,
    paddingLeft: 20
  },

  mainbodycontainer_myhouse: {
    // height: "80%",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10
  },

  mainbodycontainer2_myhouse: {
    // height: "80%",
    width: "100%",
  },

  menuImgView_myhouse: {
    flex: 0.1,
    justifyContent: "center",
    alignContent: "flex-start"
  },
  menuImg_myhouse: {
    width: 20,
    height: 20
  },
  TitleTextView_myhouse: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  TitleTxt_myhouse: {
    fontSize: 22,
    color: "#fff"
  },
  //TitleTextView_filtersearchProperties

  cardview_myhouse: {
    padding: 20,
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff"
  },

  titletxt_myhouse: {
    color: "#3499e7",
    fontSize: 22,
    fontWeight: "500"
  },

  smalltxtview_myhouse: {
    fontSize: 18,
    color: "#00000088"
  },

  largetxtview_myhouse: {
    color: "#3499e7",
    fontSize: 30,
    fontWeight: "500"
  },

  sendbtnview_myhouse: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f65418",
    height: 45,
    marginTop: 30,
    borderRadius: 200,
    marginRight: 80
  },

  paybtnview_myhouse: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f65418",
    height: 40,
    borderRadius: 200,
    marginTop: 10,
    flex: 0.5
  },

  paybtnview2_myhouse: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 40,
    borderWidth: 1, borderColor: "#333333",
    borderRadius: 200,
    marginTop: 10,
    flex: 1
  },

  cardviewbtntxt_myhouse: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 5
  },

  sendmsgwhiteImg_myhouse: {
    width: 18,
    height: 18,
    marginLeft: 15
  },

  right_arrowImg_myhouse: {
    width: 10,
    height: 10,
    alignSelf: "center",
    marginRight: 25,
    marginLeft: 20
  },

  bottomView_myhouse: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3499e7",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 200,
    marginTop: 30,
    marginTop: 30,
    height: 50
  },


  bottomView2_myhouse: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3499e7",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 200,
    height: 50
  },


  bottomView2_Disabled_myhouse: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#999999",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 200,
    height: 50
  },


  bottomTxt_myhouse: {
    fontSize: 20,
    flex: 0.6,
    color: "#fff",
    textAlign: "right",
    textAlignVertical: "center"
  },

  vacateImg_myhouse: {
    width: 25,
    height: 25,
    alignSelf: "center",
    marginRight: 25,
    marginLeft: 20
  },

  dollarImg_myhouse: {
    width: 18,
    height: 18,
    marginLeft: 15
  },

  //MyHouse Modal
  mainview_myhouseModal: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20
  },

  txtfield_myhouseModal: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10
  },

  sendtxt_myhouseModal: {
    textAlign: "center",
    color: "#f65418",
    fontSize: 20,
    marginTop: 40,
    marginBottom: 30,
    fontWeight: "500"
  },




  //payscreentenant
  bottomTxt_payscreentenant: {
    fontSize: 20,
    color: "#fff",
    textAlign: "right",
    textAlignVertical: "center"
  },


  bottomView_payscreentenant: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: orangemain,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 200,
    marginTop: 30,
    marginTop: 30,
    height: 50
  },





  //Transactions

  container_transactions: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },

  headercontainer_transactions: {
    height: 50,
    flexDirection: "row",
    backgroundColor: bluemain,
    paddingLeft: 20
  },

  mainbodycontainer_transactions: {
    height: "90%",
    width: "100%",
    paddingTop: 30
  },

  menuImgView_transactions: {
    flex: 0.1,
    justifyContent: "center",
    alignContent: "flex-start"
  },
  menuImg_transactions: {
    width: 20,
    height: 20
  },
  TitleTextView_transactions: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  TitleTxt_transactions: {
    fontSize: 22,
    color: "#fff"
  },

  //Transactions Cardview
  cardview_transactions: {
    padding: 12,
    backgroundColor: "#ffffff",
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20
  },

  mainView_transcationCardview: {
    flexDirection: "row",
    borderColor: "#444444",
    borderRadius: 12,
  },

  datetxt_transcationCardview: {
    color: "#3499e7",
    fontSize: 18
  },

  daytxt_transcationCardview: {
    color: "#6b6b6b",
    fontSize: 18,
    marginLeft: 10
  },

  typetxt_transcationCardview: {
    color: "#6666",
    fontSize: 18,
    marginTop: 10
  },

  amttxt_transcationCardview: {
    color: "#3499e7",
    fontSize: 18
  },

  vaertfourdotsImg_transcationCardview: {
    height: 40,
    width: 4
  },

  //TranscationModal

  mainview_transcationsModal: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30
  },

  imgclosegray_transcationModal: {
    width: 20,
    height: 20,
    marginTop: 20
  },

  //SettingsGeneral

  container_settingsgeneral: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingLeft: 25,
    paddingRight: 25
  },

  mainbodycontainer_settingsgeneral: {
    height: "80%",
    width: "100%",
    paddingTop: 40,
    backgroundColor: "#ffffff"
  },

  btncontainer_settingsgeneral: {
    height: "20%",
    paddingBottom: 20,
    justifyContent: "flex-end"
  },

  txtfield_settingsgeneral: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10
  },

  bottomView_settingsgeneral: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f65418",
    borderRadius: 200,
    height: 50,
    marginTop: 30,
  },

  saveTxt_settingsgeneral: {
    fontSize: 20,
    color: "#fff"
  },

  //SettingsReminder
  container_settingsreminder: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingLeft: 25,
    paddingRight: 25
  },

  mainbodycontainer_settingsreminder: {
    height: "80%",
    width: "100%",
    paddingTop: 40
  },

  btncontainer_settingsreminder: {
    height: "20%",
    paddingBottom: 20,
    justifyContent: "flex-end"
  },

  smalltxt_settingsreminders: {
    fontSize: 16,
    color: "#6666"
  },

  largetxt_settingsreminders: {
    fontSize: 25,
    color: "#6b6b6b"
  },

  addgrayImg_settingsreminders: {
    width: 20,
    height: 20,
    marginLeft: 15
  },

  bottomView_settingsreminders: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f65418",
    borderRadius: 200,
    height: 50
  },

  saveTxt_settingsreminders: {
    fontSize: 20,
    color: "#fff"
  },

  //settingsReminders Modal

  mainview_settingsremindersModal: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 40
  },

  titleView_settingsremindersModal: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },

  titleTxtView_settingsremindersModal: {
    width: "90%"
  },

  titleTxt_settingsremindersModal: {
    fontSize: 22,
    color: "#3499e7",
    fontWeight: "bold"
  },

  titlecloseImgView_settingsremindersModal: {
    width: "10%",
    alignItems: "flex-end",
    justifyContent: "center"
  },

  titleCloseImg_settingsremindersModal: {
    width: 20,
    height: 20
  },

  bottomView_settingsremindersModal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginLeft: 45,
    marginRight: 45,
    height: 60,
    paddingBottom: 20,
    marginTop: 30
  },

  proceedTxt_settingsremindersModal: {
    fontSize: 20,
    flex: 0.6,
    color: "#f65418",
    textAlign: "right"
  },

  right_settingsremindersModal: {
    width: 18,
    height: 18,
    flex: 0.1,
    alignSelf: "center",
    marginRight: 25,
    marginLeft: 20
  },

  //SettingsSocial
  container_settingssocial: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingLeft: 25,
    paddingRight: 25
  },

  mainbodycontainer_settingssocial: {
    height: "80%",
    width: "100%",
    paddingTop: 40
  },

  singleItemView_settingssocial: {
    flex: 1,
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "center"
  },

  btncontainer_settingssocial: {
    height: "20%",
    paddingBottom: 20,
    justifyContent: "flex-end"
  },

  smalltxt_settingssocial: {
    fontSize: 16,
    color: "#6666"
  },

  tenantusergrayImg_settingssocial: {
    width: 20,
    height: 20
  },

  bottomView_settingssocial: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f65418",
    borderRadius: 200,
    height: 50
  },

  saveTxt_settingssocial: {
    fontSize: 20,
    color: "#fff"
  },












  // FilterSearchProperty
  TitleTextView_filtersearchProperties: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  TitleTxt_filtersearchProperties: {
    fontSize: 22,
    color: "#999999"
  },

  headercontainer_filtersearchProperties: {
    height: 70,
    flexDirection: "row",
    backgroundColor: "#ffffff",


  },
  bottomView_filtersearchProperties: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: orangemain,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 200,
    marginTop: 30,
    marginTop: 30,
    height: 50
  },
  bottomTxt_filtersearchProperties: {
    fontSize: 20,
    //flex: 0.6,
    color: "#fff",
  },


});
