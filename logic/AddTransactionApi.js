import { ADD_TRANSACTION_LANDLORD } from "../logic/ApiConfig";

export const addTransaction = (token, paymentAmount, paymentDate, paymentType, startDate, endDate, unitId, paymentStatus, transactionType, Notes, totalAmountparam, vendorNameState, propertyIDState, tenantIdState, amountAdd, amountDeduct) => fetch(ADD_TRANSACTION_LANDLORD, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        //'Content-Type': 'application/json',
        Authorization: token,
    },
    body: JSON.stringify({
        // 'amount': paymentAmount,
        // 'payment_date': paymentDate,
        // 'payment_type': paymentType,
        // 'start_period': startDate,
        // 'end_period': endDate,
        // 'unit_id': unitId,
        // 'payment_status': paymentStatus,
        // 'transaction_type': transactionType,
        // 'other': other,

        // "additional_transaction":[]
        add_transaction:
        {
            amount: paymentAmount,
            payment_date: paymentDate,
            payment_type: paymentType,
            start_period: startDate,
            end_period: endDate,
            unit_id: unitId,
            transaction_type: transactionType,
            tenant_id: tenantIdState,
            vender_name: vendorNameState,
            property_id: propertyIDState,
            note: Notes,
            totalAmount: totalAmountparam,
            payment_status: paymentStatus
        },

        additional_transaction: amountAdd,
        deduction_transaction: amountDeduct

    }),


}).then(response => response.json());