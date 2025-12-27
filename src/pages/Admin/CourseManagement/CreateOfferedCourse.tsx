import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import { Button, Col, Flex } from "antd";
import PHselect from "../../../components/form/PHselect";
import { toast } from "sonner";
import {
  useAddCourseMutation,
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisterdSemestersQuery,
  useGetFacultiesOfCourseQuery,
} from "../../../redux/features/admin/courseManagementApi";
import PHinput from "../../../components/form/PHinput";
import { TCreateResponse } from "../../../types";
import PHselectWithWatch from "../../../components/form/PHselectWithWatch";
import { useState } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagementApi";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academinManagementApi";
import { daysOptions } from "../../../constants/global";
import PHTimePicker from "../../../components/form/PHTimePicker";
import moment from "moment";

const CreateOfferedCourse = () => {
  const [courseId, setId] = useState("");
  const [createOfferedCourse] = useCreateOfferedCourseMutation();
  const { data: registeredSemestersData } =
    useGetAllRegisterdSemestersQuery(undefined);
  const { data: academicFacultiesData } =
    useGetAcademicFacultiesQuery(undefined);
  const { data: academicDepartmentsData } =
    useGetAcademicDepartmentsQuery(undefined);
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const { data: assignedFacultiesData } = useGetFacultiesOfCourseQuery(
    courseId,
    {
      skip: !courseId,
    }
  );

  const registeredSemesterOptions = registeredSemestersData?.data?.map(
    (semester) => ({
      value: semester._id,
      label: `${semester.academicSemester.name} ${semester.academicSemester.year}`,
    })
  );
  const academicFacultyOptions = academicFacultiesData?.data?.map(
    (academicFaculty) => ({
      value: academicFaculty._id,
      label: `${academicFaculty.name}`,
    })
  );
  const academicDepartmentOptions = academicDepartmentsData?.data?.map(
    (department) => ({
      value: department._id,
      label: `${department.name}`,
    })
  );
  const assignedFacultiesOptions = assignedFacultiesData?.data?.faculties?.map(
    (faculty) => ({
      value: faculty._id,
      label: `${faculty.fullName}`,
    })
  );

  const courseOptoins = courses?.data?.map((course) => ({
    value: course._id,
    label: `${course.prefix} ${course.title}`,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const notificationId = toast.loading("Loading..");

    const offeredCourseData = {
      ...data,
      section: Number(data.section),
      maxCapacity: Number(data.maxCapacity),
      startTime: moment(new Date(data.startTime)).format("hh:mm"),
      endTime: moment(new Date(data.endTime)).format("hh:mm"),
    };
    console.log(offeredCourseData);
    try {
      const res = (await createOfferedCourse(
        offeredCourseData
      )) as TCreateResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: notificationId });
      } else {
        toast.success(res?.data?.message, { id: notificationId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!", { id: notificationId });
    }
  };
  /*
{
  "semesterRegistration": "6783e9068f82e672f81081ab",
  "academicFaculty": "67670e0166506b0a2834aef0",
  "academicDepartment": "6767206341b1c41957001b2c",
  "course": "6772f6a9769bb84f6ec43d34",
  "faculty": "678bed394a96964a41502ac5",
  "section": 1,
  "maxCapacity": 8,
  "days": ["Wed","Fri"],
  "startTime": "12:30",
  "endTime": "14:30"
}


*/
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          <PHselect
            name="semesterRegistration"
            label="Registered semester"
            options={registeredSemesterOptions}
          />

          <PHselect
            name="academicFaculty"
            label="Academic faculty"
            options={academicFacultyOptions}
          />
          <PHselect
            name="academicDepartment"
            label="Academic department"
            options={academicDepartmentOptions}
          />
          <PHselectWithWatch
            onValueChange={setId}
            name="course"
            label="Course"
            options={courseOptoins}
          />
          <PHselect
            name="faculty"
            label="Faculty"
            disabled={!courseId}
            options={assignedFacultiesOptions}
          />
          <PHinput name="section" type="text" label="Section"></PHinput>
          <PHinput
            name="maxCapacity"
            type="text"
            label="Maximum apacity"
          ></PHinput>
          <PHselect
            mode="multiple"
            name="days"
            label="Days"
            options={daysOptions}
          />
          <PHTimePicker name="startTime" label="Start time" />
          <PHTimePicker name="endTime" label="End time" />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateOfferedCourse;

/**
 * Logic of depended query here
 * Faulties select input is depended on the course select input.
 * 
 * we get the id of the selected course by using the specially made PHselectWithWatch input
 * inside PHselectWithWatch, we 'watch' the 'select' input with the help of useWatch provided by react hook form
 * we get and set the id(inside PHselectWithWatch) and then then pass the id (here) to Get Faculties Of selected Course
 
 */
