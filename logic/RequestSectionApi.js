


import {
    UPDATE_REQUEST_DETAILS,
    REQUEST_DETAILS
} from '../logic/ApiConfig'




export const requestDetailsSectionConst = (token) => fetch(REQUEST_DETAILS, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },


})
    .then(response => response.json());






export const updaterequestDetailsConst = (token, tenant_id, id, status) => fetch(UPDATE_REQUEST_DETAILS, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },
    body: JSON.stringify({
        request_id: id,
        status: status
    })

})
    .then(response => response.json());






