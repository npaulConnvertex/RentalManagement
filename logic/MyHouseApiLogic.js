import {
    UPPER_RANGE_API, MY_HOUSE,
    LANDLORD_LIST, PROPERTY_UNDER_LIST,
    GET_ALL_UNITS_FIND_LANDLORD,
    REQUEST_LANDLORD_FORUNIT,
    INVITE_LANDLORD
} from '../logic/ApiConfig'






export const getUpperRangeConst = (token) => fetch(UPPER_RANGE_API, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        // Authorization: token,
    },

})
    .then(response => response.json());










export const getMyhouseBasicConst = (token) => fetch(MY_HOUSE, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },

})
    .then(response => response.json());










export const getLandlordListConst = (token) => fetch(LANDLORD_LIST, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },

})
    .then(response => response.json());









export const propertyunderlandlordConst = (landlord_id) => fetch(PROPERTY_UNDER_LIST, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        // Authorization: token,
    },

    body: JSON.stringify({
        'landlord_id': landlord_id
    }),

})
    .then(response => response.json());






export const unitUnderlandlordConst = (propertyId, token) => fetch(GET_ALL_UNITS_FIND_LANDLORD, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },

    body: JSON.stringify({
        'propertyId': propertyId
    }),

})
    .then(response => response.json());





export const requestLandlordForUnitApiConst = (token, uid, propertyid, landlordid, ) => fetch(REQUEST_LANDLORD_FORUNIT, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },
    body: JSON.stringify({
        property_id: propertyid,
        landlord_id: landlordid,
        unit_id: uid
    })

})
    .then(response => response.json());








export const sendInvitationConst = (token, email) => fetch(INVITE_LANDLORD, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },
    body: JSON.stringify({
        email: email,

    })

})
    .then(response => response.json());






