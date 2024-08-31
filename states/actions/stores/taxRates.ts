import { API_URL } from "@/lib/constants/Links";
import { TaxRateType } from "@/lib/models/TaxRate";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const taxRates = createApi({
    reducerPath: "storeTaxRatesApi",
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
    tagTypes: ["StoreTaxRates", "StoreTaxRate"],
    endpoints: (builder) => ({
        fetchTaxRates: builder.query({
            query: (params) => `tax-rates?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreTaxRates"],
        }),
        createTaxRate: builder.mutation({
            query: (data) => ({
                url: "tax-rates",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreTaxRates"],
        }),
        fetchTaxRate: builder.query({
            query: (id) => `tax-rates/${id}`,
            transformResponse: (response: { data: TaxRateType }) =>
                response.data,
            providesTags: ["StoreTaxRate"],
        }),
        updateTaxRate: builder.mutation({
            query: (data) => ({
                url: `tax-rates/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreTaxRates"],
        }),
        deleteTaxRate: builder.mutation({
            query: (id) => ({
                url: `tax-rates/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreTaxRates"],
        }),
    }),
});

export const {
    useFetchTaxRatesQuery,
    useCreateTaxRateMutation,
    useFetchTaxRateQuery,
    useUpdateTaxRateMutation,
    useDeleteTaxRateMutation,
} = taxRates;

export default taxRates;
