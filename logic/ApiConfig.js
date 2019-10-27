import { Component } from "react";

// export const BASE_URL = "http://portfolio.theaxontech.com/CI/property_management/php_server/api/";
export const BASE_URL = "http://192.168.100.25/property_management/api/";

export const IMAGE_URL = "http://192.168.100.25/property_management/";
// export const IMAGE_URL = "http://portfolio.theaxontech.com/CI/property_management/php_server/";
// export const IMAGE_URL = "https://almost4x4.com/forum/download/file.php?avatar=27_1528096357.jpg"




// other apis
export const COUNTRY_API = BASE_URL + "get_countries_list";
export const STATE_API = BASE_URL + "get_all_state";
export const CITY_API = BASE_URL + "get_all_city";
export const GET_TRANSACTION_TYPE = BASE_URL + "getincomeandexpense";
export const GET_ALL_VENDORS = BASE_URL + "getallvendors";
export const GET_ALL_PROPS_TRANSACTION = BASE_URL + "getallproperties";
export const GET_ALL_UNITS_TRANSACTION = BASE_URL + "getallunits";
export const GET_TENANT_LIST_TRANSACTION = BASE_URL + "gettenant";
export const UPPER_RANGE_API = BASE_URL + "getupperrenge";

export const MY_HOUSE = BASE_URL + "myhouse";
export const LANDLORD_LIST = BASE_URL + "listlandlord";
export const PROPERTY_UNDER_LIST = BASE_URL + "propertyunderlandlord";

export const GET_ALL_UNITS_FIND_LANDLORD = BASE_URL + "getallUnitswithoutstatus";

export const GET_TENANT_THAT_NOT_LINKED = BASE_URL + "getTenantList";


export const INVITE_LANDLORD = BASE_URL + "invite_landlord";

export const SENDONESIGNALID = BASE_URL + "saveOneSignalApp_Token";







// service requwest



export const COMPLETED_SERVICE_REQUEST = BASE_URL + "getcompletedrequest";
export const PENDING_SERVICE_REQUEST = BASE_URL + "getpendingqequest";
export const DECLINE_SERVICE_REQUEST = BASE_URL + "getdeclineqequest";
export const SERVICE_REQUEST_VIEW = BASE_URL + "showservicerequest";


export const SERVICE_REQUEST_MODIFY = BASE_URL + "updateservicerequestdetails";





export const LOGINUSER = BASE_URL + "login";
export const SIGNUP_LANDLORD = BASE_URL + "signUpAsLandlordNew";
export const SIGNUP_TENANT = BASE_URL + "signUpAsTenantNew";
export const ADD_PROPERTY = BASE_URL + "addNewProperties";
export const GET_PROPERTY_LIST = BASE_URL + "getPropertyCrByLand";
export const GET_TENANT_LIST = BASE_URL + "getTenantListCrByLand";
export const ADD_TENANT = BASE_URL + "addTenantByLand";
export const GET_ALL_UNITS = BASE_URL + "get_unit_property"
export const ADD_UNIT_TO_PROPERTY = BASE_URL + "add_unit_property"
export const CHECKUSEREXISTING = BASE_URL + "checkexistinguser";
export const CHECKUSEREXISTING2_API_2 = BASE_URL + "googlesignup";
export const ADDTRANSACTION_TYPE = BASE_URL + "addtractiontype";
export const SEARCH_PROPERTY = BASE_URL + "searchproperty";
export const SEARCH_PROPERTY_TEXT = BASE_URL + "searchpropertybynameorunit";

export const UNIT_DETAILS_TEN_API = BASE_URL + "unitdetails";
export const REQUEST_LANDLORD_FORUNIT = BASE_URL + "requestfromlandlord";

export const REQUEST_DETAILS = BASE_URL + "requestdetails";
export const UPDATE_REQUEST_DETAILS = BASE_URL + "updaterequestdetails";



// multitenant
export const VIEW_MULTITENANT = BASE_URL + "viewmultitenant";
export const TOGGLE_MULTITENANT = BASE_URL + "multitenanttoggle";


export const GET_PROPERTY_DETAILS_WITH_UNTS = BASE_URL + "get_all_unitDetails_vacant";
export const GET_PROPERTY_DETAILS_WITH_UNTS_OCC = BASE_URL + "get_all_unitDetails";

export const GET_PROP_VACANT_LIST = BASE_URL + "get_vaccant_Property_list";
export const GET_PROP_OCCUP_LIST = BASE_URL + "get_occupied_Property_list";

export const GET_UNIT_DETAILS = BASE_URL + "get_unitANDteanatDetails";

export const LINK_TENANT_TO_UNIT = BASE_URL + "linkUnitTenants";
export const VACATE_TENANT = BASE_URL + "remove_tenant_unit";
export const ADDUNIT_IMAGE = BASE_URL + "add_unit_imges";


export const UPDATE_PROFILE_IMAGE = BASE_URL + "uploadProfileImage";


export const ADD_LEASE_TO_UNIT = BASE_URL + "add_lease_unit";
export const EDIT_LEASE = BASE_URL + "edit_lease_unit";
export const REMOVE_LEASE = BASE_URL + "remove_lease";


// get unit list under particular property
//http://192.168.100.25/property_management/api/get_unit_property			
export const GET_UNITS_PROPERTY = BASE_URL + "get_unit_property";

//Notice
export const SEND_NOTICE = BASE_URL + "sendNotice";
export const VIEW_NOTICES_TENANT = BASE_URL + "getNotice";
export const VIEW_NOTICES_LANDLORD = BASE_URL + "getNoticeLandlord";


// payment apis

export const ADD_TRANSACTION_LANDLORD = BASE_URL + "addtransaction";
export const TRANSACTION_LIST_LANDLORD = BASE_URL + "alltransaction";
export const VIEW_TRANSACTION = BASE_URL + "viewtransaction";

// ADD SERVICE REQUEST
export const ADD_SERVICE_REQUEST = BASE_URL + "addservicerequest";




export const CHANGE_PASSWORD = BASE_URL + "forgotPassword";
export const CHANGE_MOBILE_AND_NAME = BASE_URL + "updateProfileInfoMobile";