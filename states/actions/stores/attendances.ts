import { API_URL } from "@/lib/constants/Links";
import { AttendanceType } from "@/lib/models/Attendance";
import { PaginateResponseType } from "@/lib/types/types";
import { RootState } from "@/states";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jsonHeaders } from "../options";

const attendances = createApi({
    reducerPath: "storeAttendancesApi",
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
    tagTypes: ["StoreAttendances", "StoreAttendance"],
    endpoints: (builder) => ({
        fetchAttendances: builder.query({
            query: (params) => `attendances?${params}`,
            transformResponse: (response: { data: PaginateResponseType }) =>
                response.data,
            providesTags: ["StoreAttendances"],
        }),
        createAttendance: builder.mutation({
            query: (data) => ({
                url: "attendances",
                method: "POST",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreAttendances"],
        }),
        fetchAttendance: builder.query({
            query: (id) => `attendances/${id}`,
            transformResponse: (response: { data: AttendanceType }) =>
                response.data,
            providesTags: ["StoreAttendance"],
        }),
        updateAttendance: builder.mutation({
            query: (data) => ({
                url: `attendances/${data.id}`,
                method: "PATCH",
                body: JSON.stringify(data),
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreAttendances"],
        }),
        deleteAttendance: builder.mutation({
            query: (id) => ({
                url: `attendances/${id}`,
                method: "DELETE",
            }),
            transformErrorResponse: (response) => response.data,
            invalidatesTags: ["StoreAttendances"],
        }),
    }),
});

export const {
    useFetchAttendancesQuery,
    useCreateAttendanceMutation,
    useFetchAttendanceQuery,
    useUpdateAttendanceMutation,
    useDeleteAttendanceMutation,
} = attendances;

export default attendances;
