import { COMPLETED_SERVICE_REQUEST, SERVICE_REQUEST_MODIFY, PENDING_SERVICE_REQUEST, DECLINE_SERVICE_REQUEST, SERVICE_REQUEST_VIEW } from './ApiConfig'

// body: JSON.stringify({
//     propertyType: "multiunit",
//     unitType: "all",
//     furnishing: "all",
//     rentAmount: "20000"
// })




export const completeServiceApiConst = (token) => fetch(COMPLETED_SERVICE_REQUEST, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },


})
    .then(response => response.json());





export const declinedServiceApiConst = (token) => fetch(DECLINE_SERVICE_REQUEST, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },


})
    .then(response => response.json());






export const pendingServiceApiConst = (token) => fetch(PENDING_SERVICE_REQUEST, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },


})
    .then(response => response.json());









export const servicerequestsViewConst = (token, serviceRequestId) => fetch(SERVICE_REQUEST_VIEW, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },
    body: JSON.stringify({
        serviceRequestId: serviceRequestId
    })


})
    .then(response => response.json());







export const serviceRequestModificationConst = (token, service_request_id, vendor_id, description, due_date, priority, status, alert_status) => fetch(SERVICE_REQUEST_MODIFY, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },
    body: JSON.stringify({
        service_request_id: service_request_id,
        vendor_id: vendor_id,
        description: description,
        due_date: due_date,
        priority: priority,
        status: status,
        alert_status: alert_status
    })


})
    .then(response => response.json());


