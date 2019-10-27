import { SET_ONE_SIGNAL_ID } from './ApiConfig';

export const setOneSignalId = (token, oneSignalId) => fetch(SET_ONE_SIGNAL_ID, {
    method: 'POST',
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': token,
    }),
    body: JSON.stringify({
        'onesignald': oneSignalId,
    }),
}).then(response => response.json());

export default setOneSignalId;