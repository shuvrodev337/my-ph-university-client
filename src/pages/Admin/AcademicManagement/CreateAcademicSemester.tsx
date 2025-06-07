import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import { Button, Col, Flex } from "antd";
import PHselect from "../../../components/form/PHselect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSemesterSchema } from "../../../schema/academicMaanagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academinManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));
const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const notificationId = toast.loading("Loading..");
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse;
      console.log({ res });
      if (res.error) {
        toast.error(res.error.data.message, { id: notificationId });
      } else {
        toast.success(res.data.message, { id: notificationId });
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
          resolver={zodResolver(createSemesterSchema)}
        >
          <PHselect name="name" label="Name:" options={semesterOptions} />
          <PHselect name="year" label="Year:" options={yearOptions} />

          <PHselect
            name="startMonth"
            label="Start Month:"
            options={monthOptions}
          />
          <PHselect name="endMonth" label="End Month:" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
