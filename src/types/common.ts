import { REPORTS_DIALOG_TYPE, TRANSACTION_TYPES } from "../constants";

export type Nullable<T> = T | null;

export interface JwtPayload {
  exp?: number;
  iat?: number;
  userId: string;
  email: string;
};

export enum ACTIONS {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  DELETE = 'DELETE'
};

export interface Dialog {
  isOpen: boolean;
  id?: number;
  type?: ACTIONS | REPORTS_DIALOG_TYPE;
};


export interface Option {
  value: string | number;
  label: string;
};

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  currency: string;
  type: TRANSACTION_TYPES;
  category: {
    name: string;
  }
};

export interface Column<T> {
  header: string;                
  accessor: (row: T) => React.ReactNode;
};

export interface User {
  id: number,
  username: string,
};

export interface Category {
  id: string;
  name: string;
};

export interface Budget {
  id: number;
  usage: number;
  currency: string;
  limit: number;
  completeness: number;
  categoryId: number;
  userId: number;
  category: Category;
};

export interface CategorySpends {
  category: number;
  amount: number;
  count: number;
};

export interface SpendsVsIncome {
  income: number;
  expense: number;
  period: string;
};

export enum PERIOD {
  DAY = 'Day',
  WEEK = 'Week',
  MONTH = 'Month',
  YEAR = 'Year'
};

export enum AMOUNT_TYPE  {
  LESS_THAN = 'LESS_THAN',
  HIGHER_THAN = 'HIGHER_THAN',
  EQUAL_TO = 'EQUAL_TO'
}

export interface TransactionFilters {
  fromDate?: Date,
  toDate?: Date,
  categoryId?: number,
  amount?: number,
  amountType?: AMOUNT_TYPE
}

export enum REPEAT_INTERVAL { 
  NONE = 'NONE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export interface SpendsVsIncomeGrouped {
  periods: string[];
  incomes: number[];
  expenses: number[];
};