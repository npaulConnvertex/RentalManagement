import { COUNTRY_API, STATE_API, CITY_API } from "../logic/ApiConfig";







export const CountryListAPIcall =
    () => fetch(COUNTRY_API, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            //'Content-Type': 'application/json',
        }

    }).then(response => response.json())




export const StateListAPIcall =
    () => fetch(STATE_API, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            //'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            country_id: "1"
        }),

    }).then(response => response.json())
        .then((responseJson) => {
            console.warn(responseJson)
        });



export const CityListAPIcall =
    () => fetch(CITY_API, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            //'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            country_id: "1"
        }),

    }).then(response => response.json())
        .then((responseJson) => {
            console.warn(responseJson)
        });