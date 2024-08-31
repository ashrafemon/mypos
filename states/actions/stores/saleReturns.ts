import { API_URL } from "@/lib/constants/Links";
import { SaleReturnType } from "@/lib/models/Sale";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const saleReturns = createApi({
    reducerPath: "storeSaleReturnsApi",
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
    tagTypes: ["StoreSaleReturns", "StoreSaleReturn"],
    endpoints: (builder) => ({
        fetchSaleReturns: builder.query({
            query: (params) => `sales/returns?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreSaleReturns"],
        }),
        createSaleReturn: builder.mutation({
            query: (data) => ({
                url: "sales/returns",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreSaleReturns"],
        }),
        fetchSaleReturn: builder.query({
            query: (id) => `sales/returns/${id}`,
            transformResponse: (response: { data: SaleReturnType }) =>
                response.data,
            providesTags: ["StoreSaleReturn"],
        }),
        updateSaleReturn: builder.mutation({
            query: (data) => ({
                url: `sales/returns/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreSaleReturns"],
        }),
        deleteSaleReturn: builder.mutation({
            query: (id) => ({
                url: `sales/returns/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreSaleReturns"],
        }),
    }),
});

export const {
    useFetchSaleReturnsQuery,
    useCreateSaleReturnMutation,
    useFetchSaleReturnQuery,
    useUpdateSaleReturnMutation,
    useDeleteSaleReturnMutation,
} = saleReturns;

export default saleReturns;
