import { API_URL } from "@/lib/constants/Links";
import { ExpenseType } from "@/lib/models/Expense";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const expenses = createApi({
    reducerPath: "storeExpensesApi",
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
    tagTypes: ["StoreExpenses", "StoreExpense"],
    endpoints: (builder) => ({
        fetchExpenses: builder.query({
            query: (params) => `expenses?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreExpenses"],
        }),
        createExpense: builder.mutation({
            query: (data) => ({
                url: "expenses",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreExpenses"],
        }),
        fetchExpense: builder.query({
            query: (id) => `expenses/${id}`,
            transformResponse: (response: { data: ExpenseType }) =>
                response.data,
            providesTags: ["StoreExpense"],
        }),
        updateExpense: builder.mutation({
            query: (data) => ({
                url: `expenses/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreExpenses"],
        }),
        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `expenses/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreExpenses"],
        }),
    }),
});

export const {
    useFetchExpensesQuery,
    useCreateExpenseMutation,
    useFetchExpenseQuery,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
} = expenses;

export default expenses;
