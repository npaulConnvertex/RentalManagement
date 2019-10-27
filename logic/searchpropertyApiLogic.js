import { SEARCH_PROPERTY, SEARCH_PROPERTY_TEXT, UNIT_DETAILS_TEN_API, REQUEST_LANDLORD_FORUNIT } from '../logic/ApiConfig'







export const searchpropertyapiconst = (token, skip, propertyType, unitType, furnishing, rentAmount) => fetch(SEARCH_PROPERTY, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },
    body: JSON.stringify({
        skip: skip,
        limit: 10,
        propertyType: propertyType,
        unitType: unitType,
        furnishing: furnishing,
        rentAmount: rentAmount
    })

})
    .then(response => response.json());


// propertyType: "both",
// unitType: "all",
// furnishing: "all",
// rentAmount: "20000"

// propertyType: propertyType,
//         unitType: unitType,
//         furnishing: furnishing,
//         rentAmount: rentAmount





export const newSearchPropertyConst = (token, textchange, propertyType, unitType, furnishing, rentAmount) => fetch(SEARCH_PROPERTY_TEXT, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },
    body: JSON.stringify({

        nameorunitno: textchange,
        propertyType: propertyType,
        unitType: unitType,
        furnishing: furnishing,
        rentAmount: rentAmount

    })

})
    .then(response => response.json());









export const unitDetailsapiconst = (unitid) => fetch(UNIT_DETAILS_TEN_API, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',

    },
    body: JSON.stringify({
        id: unitid,
    })

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













// UNIT_DETAILS_TEN_API
// UPPER_RANGE_API
// {

//     console.error(token, uid, propertyid, landlordid)
// }

