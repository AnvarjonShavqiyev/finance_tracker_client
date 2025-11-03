import { ApiResponse, EditTransaction, Transaction, TransactionFiltersForm, Transactions } from "../types";
import { api } from "./api";

export const transactionApi = api.injectEndpoints({
    endpoints: ({mutation, query}) => ({
        createTransaction: mutation<Transactions['Response'], Transactions['Request']>({
            query: (body) => ({
                url: '/transaction',
                method: 'POST',
                body
            }),
            invalidatesTags: ['transactions']
        }),
        getTransactions: query<Transaction[], TransactionFiltersForm>({
            query: (filters) => ({
                url: '/transaction',
                params: filters || {}
            }),
            providesTags: ['transactions']
        }),
        getTransaction: query<Transaction, number>({
            query: (id: number) => ({
                url: `/transaction/${id}`
            })
        }),
        updateTransaction: mutation<EditTransaction['Response'], EditTransaction['Request']>({
            query: ({body, id}) => ({
                url: `/transaction/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['transactions']
        }),
        deleteTransaction: mutation<ApiResponse<object>, number>({
            query: (id: number) => ({
                url: `/transaction/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['transactions']
        })
    })
})

export const { 
    useCreateTransactionMutation, 
    useGetTransactionsQuery, 
    useGetTransactionQuery, 
    useUpdateTransactionMutation, 
    useDeleteTransactionMutation 
} = transactionApi;