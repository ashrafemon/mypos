import { API_URL } from "@/lib/constants/Links";
import { PurchaseReturnType } from "@/lib/models/Purchase";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const purchaseReturns = createApi({
    reducerPath: "storePurchaseReturnsApi",
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
    tagTypes: ["StorePurchaseReturns", "StorePurchaseReturn"],
    endpoints: (builder) => ({
        fetchPurchaseReturns: builder.query({
            query: (params) => `purchases/returns?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StorePurchaseReturns"],
        }),
        createPurchaseReturn: builder.mutation({
            query: (data) => ({
                url: "purchases/returns",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StorePurchaseReturns"],
        }),
        fetchPurchaseReturn: builder.query({
            query: (id) => `purchases/returns/${id}`,
            transformResponse: (response: { data: PurchaseReturnType }) =>
                response.data,
            providesTags: ["StorePurchaseReturn"],
        }),
        updatePurchaseReturn: builder.mutation({
            query: (data) => ({
                url: `purchases/returns/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StorePurchaseReturns"],
        }),
        deletePurchaseReturn: builder.mutation({
            query: (id) => ({
                url: `purchases/returns/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StorePurchaseReturns"],
        }),
    }),
});

export const {
    useFetchPurchaseReturnsQuery,
    useCreatePurchaseReturnMutation,
    useFetchPurchaseReturnQuery,
    useUpdatePurchaseReturnMutation,
    useDeletePurchaseReturnMutation,
} = purchaseReturns;

export default purchaseReturns;
