import { VIEW_TRANSACTION, } from '../logic/ApiConfig'


export const showAllTransactions = (token) => fetch(VIEW_TRANSACTION, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },

})
    .then(response => response.json());

