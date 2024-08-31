import { API_URL } from "@/lib/constants/Links";
import { IncomeCategoryType } from "@/lib/models/IncomeCategory";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const incomeCategories = createApi({
    reducerPath: "storeIncomeCategoriesApi",
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
    tagTypes: ["StoreIncomeCategories", "StoreIncomeCategory"],
    endpoints: (builder) => ({
        fetchIncomeCategories: builder.query({
            query: (params) => `incomes/categories?${params}`,
            transformResponse: (response: {
                data: PaginateResponseType | IncomeCategoryType[] | any;
            }) => response.data,
            providesTags: ["StoreIncomeCategories"],
        }),
        createIncomeCategory: builder.mutation({
            query: (data) => ({
                url: "incomes/categories",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreIncomeCategories"],
        }),
        fetchIncomeCategory: builder.query({
            query: (id) => `incomes/categories/${id}`,
            transformResponse: (response: { data: IncomeCategoryType }) =>
                response.data,
            providesTags: ["StoreIncomeCategory"],
        }),
        updateIncomeCategory: builder.mutation({
            query: (data) => ({
                url: `incomes/categories/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreIncomeCategories"],
        }),
        deleteIncomeCategory: builder.mutation({
            query: (id) => ({
                url: `incomes/categories/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreIncomeCategories"],
        }),
    }),
});

export const {
    useFetchIncomeCategoriesQuery,
    useCreateIncomeCategoryMutation,
    useFetchIncomeCategoryQuery,
    useUpdateIncomeCategoryMutation,
    useDeleteIncomeCategoryMutation,
} = incomeCategories;

export default incomeCategories;
