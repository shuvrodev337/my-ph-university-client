import {
  TCourse,
  TFacultiesOfCourse,
  TQueryParam,
  TRegisteredSemester,
  TResonseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

export const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
      providesTags: ["semesters"],
      transformResponse: (res: TResonseRedux<TRegisteredSemester[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semesters"],
    }),
    updateSemesterRegistration: builder.mutation({
      query: (args) => {
        return {
          url: `/semester-registrations/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["semesters"],
    }),
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (res: TResonseRedux<TCourse[]>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    assignFacultiesToCourse: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["courses"],
    }),
    getFacultiesOfCourse: builder.query({
      query: (courseId) => {
        return {
          url: `/courses/${courseId}/assigned-faculties`,
          method: "GET",
        };
      },
      transformResponse: (res: TResonseRedux<TFacultiesOfCourse>) => {
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["courses"],
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllRegisterdSemestersQuery,
  useUpdateSemesterRegistrationMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useAssignFacultiesToCourseMutation,
  useCreateOfferedCourseMutation,
  useGetFacultiesOfCourseQuery,
} = courseManagementApi;
