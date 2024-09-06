import { API_URL } from "@/lib/constants/Links";
import { CustomerType } from "@/lib/models/Customer";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const customers = createApi({
    reducerPath: "storeCustomersApi",
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
    tagTypes: ["StoreCustomers", "StoreCustomer"],
    endpoints: (builder) => ({
        fetchCustomers: builder.query({
            query: (params) => `customers?${params}`,
            transformResponse: (response: {
                data: PaginateResponseType | CustomerType[] | any;
            }) => response.data,
            providesTags: ["StoreCustomers"],
        }),
        createCustomer: builder.mutation({
            query: (data) => ({
                url: "customers",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCustomers"],
        }),
        fetchCustomer: builder.query({
            query: (id) => `customers/${id}`,
            transformResponse: (response: { data: CustomerType }) =>
                response.data,
            providesTags: ["StoreCustomer"],
        }),
        updateCustomer: builder.mutation({
            query: (data) => ({
                url: `customers/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCustomers"],
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `customers/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCustomers"],
        }),
    }),
});

export const {
    useFetchCustomersQuery,
    useCreateCustomerMutation,
    useFetchCustomerQuery,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = customers;

export default customers;
