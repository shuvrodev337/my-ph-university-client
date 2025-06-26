import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import { createAcademicDepartmentSchema } from "../../../schema/academicMaanagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PHinput from "../../../components/form/PHinput";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academinManagementApi";
import { TAcademicDepartment, TCreateResponse } from "../../../types";
import PHselect from "../../../components/form/PHselect";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: facultiesData } = useGetAcademicFacultiesQuery(undefined);
  const facultyOptions =
    facultiesData?.data?.map((faculty) => ({
      value: faculty._id,
      label: faculty.name,
    })) ?? [];
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const notificationId = toast.loading("Loading..");

    try {
      const res = (await addAcademicDepartment(
        data
      )) as TCreateResponse<TAcademicDepartment>;
      console.log({ res });
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
        <PHform
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicDepartmentSchema)}
        >
          <PHinput
            name="name"
            type="text"
            label="Academic department name"
          ></PHinput>
          <PHselect
            name="academicFaculty"
            label="Academic faculty:"
            options={facultyOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
