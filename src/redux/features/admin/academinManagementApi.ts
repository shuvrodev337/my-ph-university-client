import { TAcademicSemester, TQueryParam, TResonseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

export const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemesters: builder.query({
      query: (args) => {
        /**
             // example args will be:  
             [{name: 'name', value: 'Summer'} , {name: 'year', value: '2025'}]
        */
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TResonseRedux<TAcademicSemester[]>) => {
        //    console.log("inside redux", res);
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAcademicSemestersQuery, useAddAcademicSemesterMutation } =
  academicManagementApi;
