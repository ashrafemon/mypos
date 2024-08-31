import { API_URL } from "@/lib/constants/Links";
import { IncomeType } from "@/lib/models/Income";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const incomes = createApi({
    reducerPath: "storeIncomesApi",
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
    tagTypes: ["StoreIncomes", "StoreIncome"],
    endpoints: (builder) => ({
        fetchIncomes: builder.query({
            query: (params) => `incomes?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreIncomes"],
        }),
        createIncome: builder.mutation({
            query: (data) => ({
                url: "incomes",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreIncomes"],
        }),
        fetchIncome: builder.query({
            query: (id) => `incomes/${id}`,
            transformResponse: (response: { data: IncomeType }) =>
                response.data,
            providesTags: ["StoreIncome"],
        }),
        updateIncome: builder.mutation({
            query: (data) => ({
                url: `incomes/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreIncomes"],
        }),
        deleteIncome: builder.mutation({
            query: (id) => ({
                url: `incomes/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreIncomes"],
        }),
    }),
});

export const {
    useFetchIncomesQuery,
    useCreateIncomeMutation,
    useFetchIncomeQuery,
    useUpdateIncomeMutation,
    useDeleteIncomeMutation,
} = incomes;

export default incomes;
