import { ACTIONS, AMOUNT_TYPE, PERIOD } from "@customTypes";
import { CURRENCY, DEFUALT_TOP_N_TRANSACTIONS, EMPTY_STRING, TRANSACTION_TYPES, ZERO } from "@constants";

export const defaultDialog = {
    isOpen: false,
    type: ACTIONS.CREATE,
};

export const defaultSettings = {
    sendDailyReports: false
};

export const defaultTransactionFilters = {
    fromDate: EMPTY_STRING,
    toDate: EMPTY_STRING,
    amount: ZERO,
    amountType: AMOUNT_TYPE.EQUAL_TO 
};

export const defaultReportSettings = {
    topNTransaction: DEFUALT_TOP_N_TRANSACTIONS,
    period: PERIOD.MONTH
};

export const defaultTransactionValues = {
    amount: ZERO,
    currency: CURRENCY.USD,       
    type: TRANSACTION_TYPES.INCOME, 
    accountId: EMPTY_STRING,      
    description: EMPTY_STRING,      
};

export const defaultSignInValues = {
    email: EMPTY_STRING,
    password: EMPTY_STRING
};

export const defaultSignUpValues = {
    username: EMPTY_STRING,
    email: EMPTY_STRING,
    password: EMPTY_STRING
};
