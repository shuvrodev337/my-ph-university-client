import {
  TAcademicFaculty,
  TAcademicSemester,
  TOfferedCourse,
  TQueryParam,
  TResonseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

export const courseRelatedtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // addAcademicSemester: builder.mutation({
    //   query: (data) => ({
    //     url: "/academic-semesters/create-academic-semester",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    getMyOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TResonseRedux<TOfferedCourse[]>) => {
        //    console.log("inside redux", res);
        return {
          data: res.data,
          meta: res.meta,
        };
      },
    }),
  }),
});

export const { useGetMyOfferedCoursesQuery } = courseRelatedtApi;
