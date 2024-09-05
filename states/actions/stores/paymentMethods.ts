import { API_URL } from "@/lib/constants/Links";
import { PaymentMethodType } from "@/lib/models/PaymentMethod";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const paymentMethods = createApi({
    reducerPath: "storePaymentMethodsApi",
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
    tagTypes: ["StorePaymentMethods", "StorePaymentMethod"],
    endpoints: (builder) => ({
        fetchPaymentMethods: builder.query({
            query: (params) => `payment-methods?${params}`,
            transformResponse: (response: {
                data: PaginateResponseType | PaymentMethodType[] | any;
            }) => response.data,
            providesTags: ["StorePaymentMethods"],
        }),
        createPaymentMethod: builder.mutation({
            query: (data) => ({
                url: "payment-methods",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StorePaymentMethods"],
        }),
        fetchPaymentMethod: builder.query({
            query: (id) => `payment-methods/${id}`,
            transformResponse: (response: { data: PaymentMethodType }) =>
                response.data,
            providesTags: ["StorePaymentMethod"],
        }),
        updatePaymentMethod: builder.mutation({
            query: (data) => ({
                url: `payment-methods/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StorePaymentMethods"],
        }),
        deletePaymentMethod: builder.mutation({
            query: (id) => ({
                url: `payment-methods/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StorePaymentMethods"],
        }),
    }),
});

export const {
    useFetchPaymentMethodsQuery,
    useCreatePaymentMethodMutation,
    useFetchPaymentMethodQuery,
    useUpdatePaymentMethodMutation,
    useDeletePaymentMethodMutation,
} = paymentMethods;

export default paymentMethods;
