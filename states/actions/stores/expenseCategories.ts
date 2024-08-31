import { API_URL } from "@/lib/constants/Links";
import { ExpenseCategoryType } from "@/lib/models/ExpenseCategory";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const expenseCategories = createApi({
    reducerPath: "storeExpenseCategoriesApi",
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
    tagTypes: ["StoreExpenseCategories", "StoreExpenseCategory"],
    endpoints: (builder) => ({
        fetchExpenseCategories: builder.query({
            query: (params) => `expenses/categories?${params}`,
            transformResponse: (response: {
                data: PaginateResponseType | ExpenseCategoryType[] | any;
            }) => response.data,
            providesTags: ["StoreExpenseCategories"],
        }),
        createExpenseCategory: builder.mutation({
            query: (data) => ({
                url: "expenses/categories",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreExpenseCategories"],
        }),
        fetchExpenseCategory: builder.query({
            query: (id) => `expenses/categories/${id}`,
            transformResponse: (response: { data: ExpenseCategoryType }) =>
                response.data,
            providesTags: ["StoreExpenseCategory"],
        }),
        updateExpenseCategory: builder.mutation({
            query: (data) => ({
                url: `expenses/categories/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreExpenseCategories"],
        }),
        deleteExpenseCategory: builder.mutation({
            query: (id) => ({
                url: `expenses/categories/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreExpenseCategories"],
        }),
    }),
});

export const {
    useFetchExpenseCategoriesQuery,
    useCreateExpenseCategoryMutation,
    useFetchExpenseCategoryQuery,
    useUpdateExpenseCategoryMutation,
    useDeleteExpenseCategoryMutation,
} = expenseCategories;

export default expenseCategories;
