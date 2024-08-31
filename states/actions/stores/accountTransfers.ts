import { API_URL } from "@/lib/constants/Links";
import { AccountTransferType } from "@/lib/models/AccountTransfer";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const accountTransfers = createApi({
    reducerPath: "storeAccountTransfersApi",
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
    tagTypes: ["StoreAccountTransfers", "StoreAccountTransfer"],
    endpoints: (builder) => ({
        fetchAccountTransfers: builder.query({
            query: (params) => `accounting/transfers?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreAccountTransfers"],
        }),
        createAccountTransfer: builder.mutation({
            query: (data) => ({
                url: "accounting/transfers",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreAccountTransfers"],
        }),
        fetchAccountTransfer: builder.query({
            query: (id) => `accounting/transfers/${id}`,
            transformResponse: (response: { data: AccountTransferType }) =>
                response.data,
            providesTags: ["StoreAccountTransfer"],
        }),
        updateAccountTransfer: builder.mutation({
            query: (data) => ({
                url: `accounting/transfers/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreAccountTransfers"],
        }),
        deleteAccountTransfer: builder.mutation({
            query: (id) => ({
                url: `accounting/transfers/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreAccountTransfers"],
        }),
    }),
});

export const {
    useFetchAccountTransfersQuery,
    useCreateAccountTransferMutation,
    useFetchAccountTransferQuery,
    useUpdateAccountTransferMutation,
    useDeleteAccountTransferMutation,
} = accountTransfers;

export default accountTransfers;
