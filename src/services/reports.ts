import { CategorySpends, DownloadReports, PERIOD, SpendsVsIncome, Transaction } from "@customTypes";
import { api } from "./api";

export const reportsApi = api.injectEndpoints({
    endpoints: ({query}) => ({
        getTopNTransactions: query<Transaction[], number>({
            query: (n) => ({
                url: `/reports/${n}/transactions`,
            }),
        }),
        getSpendsByCategory: query<CategorySpends[], void>({
            query: () => ({
                url: `/reports/spendsByCategory`
            })
        }),
        getSpendingVsIncome: query<SpendsVsIncome[], PERIOD>({
            query: (period) => ({
                url: `/reports/spendsVsIncome/${period}`
            })
        }),
        downloadReport: query<DownloadReports['Response'], DownloadReports['Request']>({
            query: ({n, period}) => ({
                url: `/reports/topNTransaction/${n}/period/${period}`,
                responseHandler: (response) => response.blob(),
            }),
        })
    })
})

export const { 
    useGetTopNTransactionsQuery,
    useGetSpendsByCategoryQuery,
    useGetSpendingVsIncomeQuery,
    useLazyDownloadReportQuery
} = reportsApi;