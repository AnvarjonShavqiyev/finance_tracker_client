import { ACTIONS, AMOUNT_TYPE, PERIOD, REPEAT_INTERVAL } from "../types";
import { CURRENCY, TRANSACTION_TYPES } from "./common";

export const amountTypeOptions = [
  {
    label: 'Less than',
    value: AMOUNT_TYPE.LESS_THAN,
  },
  {
    label: 'Higher than',
    value: AMOUNT_TYPE.HIGHER_THAN,
  },
  {
    label: 'Equal to',
    value: AMOUNT_TYPE.EQUAL_TO,
  },
];

export const repeatIntervalOptions = [
    {
        label: 'None',
        value: REPEAT_INTERVAL.NONE,
    },
    {
        label: 'Daily',
        value: REPEAT_INTERVAL.DAILY,
    },
    {
        label: 'Weekly',
        value: REPEAT_INTERVAL.WEEKLY,
    },
    {
        label: 'Monthly',
        value: REPEAT_INTERVAL.MONTHLY,
    }
];

export const currencyOptions = [
    {
        label: 'USD',
        value: CURRENCY.USD,
    },
    {
        label: 'EUR',
        value: CURRENCY.EUR,
    }
];

export const transactionOptions = [
    {
        label: 'Income',
        value: TRANSACTION_TYPES.INCOME,
    },
    {
        label: 'Expense',
        value: TRANSACTION_TYPES.EXPENSE,
    },
    {
        label: 'Transfer',
        value: TRANSACTION_TYPES.TRANSFER,
    },
];

export const categoryActions = [
    {
        label: 'Create',
        type: ACTIONS.CREATE,
    },
    {
        label: 'Edit',
        type: ACTIONS.EDIT,
    },
    {
        label: 'Delete',
        type: ACTIONS.DELETE,
    },
];

export const periodOptions = [
    {
        value: PERIOD.DAY,
        label: 'Day',
    },
    {
        value: PERIOD.MONTH,
        label: 'Month',
    },
    {
        value: PERIOD.WEEK,
        label: 'Week',
    },
    {
        value: PERIOD.YEAR,
        label: 'Year',
    }
];
