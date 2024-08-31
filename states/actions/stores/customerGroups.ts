import { API_URL } from "@/lib/constants/Links";
import { CustomerGroupType } from "@/lib/models/CustomerGroup";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const customerGroups = createApi({
    reducerPath: "storeCustomerGroupsApi",
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
    tagTypes: ["StoreCustomerGroups", "StoreCustomerGroup"],
    endpoints: (builder) => ({
        fetchCustomerGroups: builder.query({
            query: (params) => `customers/groups?${params}`,
            transformResponse: (response: {
                data: PaginateResponseType | CustomerGroupType[] | any;
            }) => response.data,
            providesTags: ["StoreCustomerGroups"],
        }),
        createCustomerGroup: builder.mutation({
            query: (data) => ({
                url: "customers/groups",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCustomerGroups"],
        }),
        fetchCustomerGroup: builder.query({
            query: (id) => `customers/groups/${id}`,
            transformResponse: (response: { data: CustomerGroupType }) =>
                response.data,
            providesTags: ["StoreCustomerGroup"],
        }),
        updateCustomerGroup: builder.mutation({
            query: (data) => ({
                url: `customers/groups/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCustomerGroups"],
        }),
        deleteCustomerGroup: builder.mutation({
            query: (id) => ({
                url: `customers/groups/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreCustomerGroups"],
        }),
    }),
});

export const {
    useFetchCustomerGroupsQuery,
    useCreateCustomerGroupMutation,
    useFetchCustomerGroupQuery,
    useUpdateCustomerGroupMutation,
    useDeleteCustomerGroupMutation,
} = customerGroups;

export default customerGroups;
