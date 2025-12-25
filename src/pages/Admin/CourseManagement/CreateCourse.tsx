import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import { Button, Col, Flex } from "antd";
import PHselect from "../../../components/form/PHselect";
import { toast } from "sonner";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import PHinput from "../../../components/form/PHinput";
import { TCreateResponse } from "../../../types";

const CreateCourse = () => {
  const [addCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const courseOptoins = courses?.data?.map((course) => ({
    value: course._id,
    label: `${course.prefix} ${course.title}`,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const notificationId = toast.loading("Loading..");

    const courseData = {
      ...data,
      isDeleted: false,
      code: Number(data.code),
      credits: Number(data.credits),
      prereQuisiteCourses: data?.prereQuisiteCourses
        ? data?.prereQuisiteCourses.map((item: string) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    console.log(courseData);
    try {
      const res = (await addCourse(courseData)) as TCreateResponse<any>;
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

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          <PHinput name="prefix" type="text" label="Course Prefix" />
          <PHinput name="code" type="text" label="Course Code" />
          <PHinput name="title" type="text" label="Course Title" />
          <PHinput name="credits" type="text" label="Course credits" />
          <PHselect
            mode="multiple"
            name="prereQuisiteCourses"
            label="Pre-requisite Courses"
            options={courseOptoins}
          />

          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
