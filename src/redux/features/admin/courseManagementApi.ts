import {
  TQueryParam,
  TRegisteredSemester,
  TResonseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

export const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
    getAllRegisterdSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TResonseRedux<TRegisteredSemester[]>) => {
        //    console.log("inside redux", res);
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllRegisterdSemestersQuery,
} = courseManagementApi;
