import { API_URL } from "@/lib/constants/Links";
import { CurrencyType } from "@/lib/models/Currency";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const currencies = createApi({
    reducerPath: "storeCurrenciesApi",
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
    tagTypes: ["StoreCurrencies", "StoreCurrency"],
    endpoints: (builder) => ({
        fetchCurrencies: builder.query({
            query: (params) => `currencies?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreCurrencies"],
        }),
        createCurrency: builder.mutation({
            query: (data) => ({
                url: "currencies",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCurrencies"],
        }),
        fetchCurrency: builder.query({
            query: (id) => `currencies/${id}`,
            transformResponse: (response: { data: CurrencyType }) =>
                response.data,
            providesTags: ["StoreCurrency"],
        }),
        updateCurrency: builder.mutation({
            query: (data) => ({
                url: `currencies/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCurrencies"],
        }),
        deleteCurrency: builder.mutation({
            query: (id) => ({
                url: `currencies/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCurrencies"],
        }),
    }),
});

export const {
    useFetchCurrenciesQuery,
    useCreateCurrencyMutation,
    useFetchCurrencyQuery,
    useUpdateCurrencyMutation,
    useDeleteCurrencyMutation,
} = currencies;

export default currencies;
