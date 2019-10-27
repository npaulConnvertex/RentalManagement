import { SIGNUP_LANDLORD, SIGNUP_TENANT, SENDONESIGNALID } from "../logic/ApiConfig";


export const RegisterLogicCall =
    (SIGNUPAPIUSER, emailParams, nameParams, mobileParams, passwordParams) => fetch(SIGNUPAPIUSER, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            //'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            email: emailParams,
            userName: nameParams,
            phone: mobileParams,
            password: passwordParams
        }),

    }).then(response => response.json());




// saveOneSignalApp_Token




export const setOneSignalId =
    (token, deviceid) => fetch(SENDONESIGNALID, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            //'Content-Type': 'application/json',
            token: token
        },

        body: JSON.stringify({
            app_token: deviceid
        }),

    }).then(response => response.json());

