import { API_URL } from "@/lib/constants/Links";
import { PurchaseType } from "@/lib/models/Purchase";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const purchases = createApi({
    reducerPath: "storePurchasesApi",
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
    tagTypes: ["StorePurchases", "StorePurchase"],
    endpoints: (builder) => ({
        fetchPurchases: builder.query({
            query: (params) => `purchases?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StorePurchases"],
        }),
        createPurchase: builder.mutation({
            query: (data) => ({
                url: "purchases",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StorePurchases"],
        }),
        fetchPurchase: builder.query({
            query: (id) => `purchases/${id}`,
            transformResponse: (response: { data: PurchaseType }) =>
                response.data,
            providesTags: ["StorePurchase"],
        }),
        updatePurchase: builder.mutation({
            query: (data) => ({
                url: `purchases/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StorePurchases"],
        }),
        deletePurchase: builder.mutation({
            query: (id) => ({
                url: `purchases/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StorePurchases"],
        }),
    }),
});

export const {
    useFetchPurchasesQuery,
    useCreatePurchaseMutation,
    useFetchPurchaseQuery,
    useUpdatePurchaseMutation,
    useDeletePurchaseMutation,
} = purchases;

export default purchases;
