import { API_URL } from "@/lib/constants/Links";
import { EmployeeType } from "@/lib/models/User";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const employees = createApi({
    reducerPath: "storeEmployeesApi",
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
    tagTypes: ["StoreEmployees", "StoreEmployee"],
    endpoints: (builder) => ({
        fetchEmployees: builder.query({
            query: (params) => `employees?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreEmployees"],
        }),
        createEmployee: builder.mutation({
            query: (data) => ({
                url: "employees",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreEmployees"],
        }),
        fetchEmployee: builder.query({
            query: (id) => `employees/${id}`,
            transformResponse: (response: { data: EmployeeType }) =>
                response.data,
            providesTags: ["StoreEmployee"],
        }),
        updateEmployee: builder.mutation({
            query: (data) => ({
                url: `employees/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreEmployees"],
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `employees/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreEmployees"],
        }),
    }),
});

export const {
    useFetchEmployeesQuery,
    useCreateEmployeeMutation,
    useFetchEmployeeQuery,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employees;

export default employees;
