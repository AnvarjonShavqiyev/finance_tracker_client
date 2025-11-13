import { ACTIONS, REPEAT_INTERVAL, TransactionForm } from "@customTypes";
import { EMPTY_STRING } from "@constants";

export const getTransactionTitle = (type: ACTIONS) => {
    switch (type) {
        case ACTIONS.CREATE:
            return 'Create transaction'
        case ACTIONS.EDIT: 
            return 'Edit transaction'
        case ACTIONS.DELETE:
            return 'Are you sure about deleting this transaction?'
        default:
            return EMPTY_STRING;
    }
};

export const getTransactionBody = (data: TransactionForm) => {
    return {
        ...data,
        amount: +data.amount,
        isRecurring: data.repeatInterval !== REPEAT_INTERVAL.NONE ? true : false,
    }
};
