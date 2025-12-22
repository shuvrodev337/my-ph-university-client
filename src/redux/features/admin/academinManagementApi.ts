import {
  TAcademicFaculty,
  TAcademicSemester,
  TQueryParam,
  TResonseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

export const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
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

    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAcademicFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/academic-faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TResonseRedux<TAcademicFaculty[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
    getAcademicDepartments: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/academic-departments",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TResonseRedux<TAcademicFaculty[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
  }),
});

export const {
  useGetAcademicSemestersQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAcademicFacultiesQuery,
  useAddAcademicDepartmentMutation,
  useGetAcademicDepartmentsQuery,
} = academicManagementApi;
