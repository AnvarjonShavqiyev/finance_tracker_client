import { ApiResponse, Budget, BudgetRequest, EditBudget } from "@customTypes";
import { api } from "./api";

const budgetApi = api.injectEndpoints({
    endpoints: ({mutation, query}) => ({
        getBudgets: query<Budget[], void>({
            query: () => ({
                url: '/budgets',
            }),
            providesTags: ['budgets']
        }),
        getBudget: query<Budget, number>({
            query: (id: number) => ({
                url: `budgets/${id}`,
            }),
        }),
        createBudget: mutation<BudgetRequest['Response'], BudgetRequest['Request']>({
            query: (body) => ({
                url: 'budgets',
                method: 'POST',
                body
            }),
            invalidatesTags: ['budgets']
        }),
        editBudget: mutation<EditBudget['Response'], EditBudget['Request']>({
            query: ({id, body}) => ({
                url: `budgets/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['budgets']
        }),
        deleteBudget: mutation<ApiResponse<object>, number>({
            query: (id) => ({
                url: `budgets/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['budgets']
        })
    })
})

export const {
    useGetBudgetsQuery,
    useCreateBudgetMutation,
    useGetBudgetQuery, 
    useEditBudgetMutation,
    useDeleteBudgetMutation
} = budgetApi;