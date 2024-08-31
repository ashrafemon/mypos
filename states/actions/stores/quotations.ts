import { API_URL } from "@/lib/constants/Links";
import { QuotationType } from "@/lib/models/Quotation";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const quotations = createApi({
    reducerPath: "storeQuotationsApi",
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
    tagTypes: ["StoreQuotations", "StoreQuotation"],
    endpoints: (builder) => ({
        fetchQuotations: builder.query({
            query: (params) => `quotations?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreQuotations"],
        }),
        createQuotation: builder.mutation({
            query: (data) => ({
                url: "quotations",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreQuotations"],
        }),
        fetchQuotation: builder.query({
            query: (id) => `quotations/${id}`,
            transformResponse: (response: { data: QuotationType }) =>
                response.data,
            providesTags: ["StoreQuotation"],
        }),
        updateQuotation: builder.mutation({
            query: (data) => ({
                url: `quotations/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreQuotations"],
        }),
        deleteQuotation: builder.mutation({
            query: (id) => ({
                url: `quotations/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreQuotations"],
        }),
    }),
});

export const {
    useFetchQuotationsQuery,
    useCreateQuotationMutation,
    useFetchQuotationQuery,
    useUpdateQuotationMutation,
    useDeleteQuotationMutation,
} = quotations;

export default quotations;
