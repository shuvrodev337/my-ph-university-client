import { baseApi } from "../../api/baseApi";

export const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemesters: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
      transformResponse: (res) => {
        //  console.log("inside redux", res);
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
