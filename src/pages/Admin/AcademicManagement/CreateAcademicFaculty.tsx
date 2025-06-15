import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import { createAcademicFacultySchema } from "../../../schema/academicMaanagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PHinput from "../../../components/form/PHinput";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academinManagementApi";
import { TAcademicFaculty, TCreateResponse } from "../../../types";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const notificationId = toast.loading("Loading..");

    try {
      const res = (await addAcademicFaculty(
        data
      )) as TCreateResponse<TAcademicFaculty>;
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
          resolver={zodResolver(createAcademicFacultySchema)}
        >
          <PHinput
            name="name"
            type="text"
            label="Academic faculty name"
          ></PHinput>
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
