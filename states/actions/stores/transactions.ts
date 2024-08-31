import { API_URL } from "@/lib/constants/Links";
import { TransactionType } from "@/lib/models/Transaction";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const transactions = createApi({
    reducerPath: "storeTransactionsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + "/stores",
        headers: jsonHeaders,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    keepUnusedDataFor: 5,
    refetchOnReconnect: true,
    tagTypes: ["StoreTransactions", "StoreTransaction"],
    endpoints: (builder) => ({
        fetchTransactions: builder.query({
            query: (params) => `accounting/transactions?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreTransactions"],
        }),
        createTransaction: builder.mutation({
            query: (data) => ({
                url: "accounting/transactions",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreTransactions"],
        }),
        fetchTransaction: builder.query({
            query: (id) => `accounting/transactions/${id}`,
            transformResponse: (response: { data: TransactionType }) =>
                response.data,
            providesTags: ["StoreTransaction"],
        }),
        updateTransaction: builder.mutation({
            query: (data) => ({
                url: `accounting/transactions/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreTransactions"],
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `accounting/transactions/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreTransactions"],
        }),
    }),
});

export const {
    useFetchTransactionsQuery,
    useCreateTransactionMutation,
    useFetchTransactionQuery,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
} = transactions;

export default transactions;
