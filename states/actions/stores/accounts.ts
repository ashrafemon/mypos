import { API_URL } from "@/lib/constants/Links";
import { AccountType } from "@/lib/models/Account";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const accounts = createApi({
    reducerPath: "storeAccountsApi",
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
    tagTypes: ["StoreAccounts", "StoreAccount"],
    endpoints: (builder) => ({
        fetchAccounts: builder.query({
            query: (params) => `accounting/accounts?${params}`,
            transformResponse: (response: {
                data: PaginateResponseType | AccountType[] | any;
            }) => response.data,
            providesTags: ["StoreAccounts"],
        }),
        createAccount: builder.mutation({
            query: (data) => ({
                url: "accounting/accounts",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreAccounts"],
        }),
        fetchAccount: builder.query({
            query: (id) => `accounting/accounts/${id}`,
            transformResponse: (response: { data: AccountType }) =>
                response.data,
            providesTags: ["StoreAccount"],
        }),
        updateAccount: builder.mutation({
            query: (data) => ({
                url: `accounting/accounts/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreAccounts"],
        }),
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `accounting/accounts/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreAccounts"],
        }),
    }),
});

export const {
    useFetchAccountsQuery,
    useCreateAccountMutation,
    useFetchAccountQuery,
    useUpdateAccountMutation,
    useDeleteAccountMutation,
} = accounts;

export default accounts;
