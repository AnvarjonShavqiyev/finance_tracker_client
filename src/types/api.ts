import { CURRENCY } from "@constants";
import { PERIOD } from "./common";
import { SettingsForm } from "./form";

export interface ApiResponse<T> {
    statusCode: number;
    errorMessage: string;
    errorDescription: string;
    payload: T;
}

export interface ErrorMessage {
    status: number,
    data: {
        error: string,
        message: string,
        statusCode: string,
    }
}

export interface Register {
    Request: {
        username: string;
        email: string;
        password: string;
    },
    Response: ApiResponse<object>
}

export interface LoginResponse extends ApiResponse<{ token: string }> {
    token: string;
}

export interface Login {
    Request: {
        email: string;
        password: string;
    },
    Response: LoginResponse
}

export interface Transactions {
    Request: {
        amount: number;
        description: string;
        currency: CURRENCY;
        categoryId: number;
        isRecurring: boolean
    }
    Response: ApiResponse<object>
}

export interface EditTransaction {
    Request: {
        id: number,
        body: Transactions['Request']
    }
    Response: ApiResponse<object>
}

export interface CreateCategory {
    Request: {
        name: string,
    },
    Response: ApiResponse<object>
}

export interface EditCategory {
    Request: {
        id: number,
        body: CreateCategory['Request']
    },
    Response: ApiResponse<object>
}

export interface BudgetRequest {
    Request: {
        limit: number,
        currency: CURRENCY,
        categoryId: number,
    },
    Response: ApiResponse<object>
}

export interface EditBudget {
    Request: {
        id: number,
        body: BudgetRequest['Request'],
    },
    Response: ApiResponse<object>
}

export interface DownloadReports {
    Request: {
        n: number,
        period: PERIOD, 
    },
    Response: ApiResponse<string>
}

export interface Settings {
    Request: void,
    Response: SettingsForm,
}

export interface SaveSettings {
    Request: SettingsForm,
    Response: ApiResponse<object>
}