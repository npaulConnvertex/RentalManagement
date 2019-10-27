import { CHANGE_PASSWORD, CHANGE_MOBILE_AND_NAME } from './ApiConfig'







export const changePassapiconst = (token, pass, currentPass) => fetch(CHANGE_PASSWORD, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },
    body: JSON.stringify({
        pass: pass,
        currentPass: currentPass

    })

})
    .then(response => response.json());






export const changeMobileandNameapiconst = (token, userName, phone) => fetch(CHANGE_MOBILE_AND_NAME, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },
    body: JSON.stringify({
        userName: userName,
        phone: phone,
        country: ""

    })

})
    .then(response => response.json());
