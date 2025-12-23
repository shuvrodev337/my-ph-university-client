import { TQueryParam, TResonseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TResonseRedux<TStudent[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
  }),
});
export const { useAddStudentMutation, useGetAllStudentsQuery } =
  userManagementApi;
