export const EMPTY_STRING = '';
export const HYPHEN = '-';
export const SNACKBAR_ERROR = 'error';

export const FIRST_ELEMENT = 1;
export const ZERO = 0;
export const MULTILINE_COUNT = 3;
export const DEFUALT_TOP_N_TRANSACTIONS = 5;
export const THOUSAND = 1000;
export const SIX = 6;
export const TWO = 2;

export const SUCCES_CODE = 200;
export const CREATED_CODE = 201;
export const CONFLICT_CODE = 409;
export const NOT_FOUND_CODE = 404;

export const AUTO_HIDE_SNACKS = 2000;

export const SIDEBAR_ROUTES = [
    {
        title: "Transactions",
        url: "/dashboard/transactions"
    },
    {
        title: "Budgets",
        url: "/dashboard/budgets"
    },
    {
        title: "Reports",
        url: "/dashboard/reports"
    },
    {
        title: "Settings",
        url: "/dashboard/settings"
    },
];

export const SIGN_IN_URL = '/auth/signIn';

export enum AuthOptions {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP'
};

export enum CURRENCY {
    USD = 'USD',
    EUR = 'EUR'
};

export enum TRANSACTION_TYPES {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
    TRANSFER = 'TRANSFER'
};

export enum REPORTS_DIALOG_TYPE {
    SETTINGS = 'SETTINGS',
    DOWNLOAD = 'DOWNLOAD'
};
