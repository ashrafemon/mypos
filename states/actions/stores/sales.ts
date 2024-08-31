import { API_URL } from "@/lib/constants/Links";
import { SaleType } from "@/lib/models/Sale";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const sales = createApi({
    reducerPath: "storeSalesApi",
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
    tagTypes: ["StoreSales", "StoreSale"],
    endpoints: (builder) => ({
        fetchSales: builder.query({
            query: (params) => `sales?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreSales"],
        }),
        createSale: builder.mutation({
            query: (data) => ({
                url: "sales",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreSales"],
        }),
        fetchSale: builder.query({
            query: (id) => `sales/${id}`,
            transformResponse: (response: { data: SaleType }) => response.data,
            providesTags: ["StoreSale"],
        }),
        updateSale: builder.mutation({
            query: (data) => ({
                url: `sales/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreSales"],
        }),
        deleteSale: builder.mutation({
            query: (id) => ({
                url: `sales/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreSales"],
        }),
    }),
});

export const {
    useFetchSalesQuery,
    useCreateSaleMutation,
    useFetchSaleQuery,
    useUpdateSaleMutation,
    useDeleteSaleMutation,
} = sales;

export default sales;
