import { ADD_PROPERTY, GET_PROPERTY_LIST } from "../logic/ApiConfig";







export const AddPropertyLogic =
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






export const GetAllProperties =
    (tokenParams) => fetch(GET_PROPERTY_LIST, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            //'Content-Type': 'application/json',
            Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEwNiIsInJvbGUiOiJsYW5kbG9yZCIsImV4cCI6MTU0OTE3MjQ1OX0.ekOWt_ozobBG21XD2P9AlvbNFZp8ofy_UOtyJrOMy8Y"
        },



    }).then(response => response.json())
        .then((responseJson) => {
            console.warn("hello")
        })
        .catch(error => {
            console.error(error);
        });



