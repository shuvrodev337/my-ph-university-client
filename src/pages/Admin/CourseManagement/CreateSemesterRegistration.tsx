import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import { Button, Col, Flex } from "antd";
import PHselect from "../../../components/form/PHselect";
import { semesterRegistrationStatusOptoipns } from "../../../constants/semester";
import { useGetAcademicSemestersQuery } from "../../../redux/features/admin/academinManagementApi";
import { toast } from "sonner";
import { TCreateResponse } from "../../../types/global.type";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagementApi";
import PHdatePicker from "../../../components/form/PHdatePicker";
import PHinput from "../../../components/form/PHinput";

const CreateSemesterRegistration = () => {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();
  const academicSemesters = useGetAcademicSemestersQuery(undefined);
  const academicsemesterOptoins = academicSemesters?.data?.data?.map(
    (academicSemester) => ({
      value: academicSemester._id,
      label: `${academicSemester.name} ${academicSemester.year}`,
    })
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const notificationId = toast.loading("Loading..");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    console.log(semesterData);
    try {
      const res = (await addSemesterRegistration(
        semesterData
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

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          <PHselect
            name="academicSemester"
            label="Name:"
            options={academicsemesterOptoins}
          />
          <PHselect
            name="status"
            label="Status"
            options={semesterRegistrationStatusOptoipns}
          />
          <PHdatePicker name="startDate" label="Start date" />
          <PHdatePicker name="endDate" label="End date" />
          <PHinput name="minCredit" type="text" label="Min credit" />
          <PHinput name="maxCredit" type="text" label="Max credit" />

          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateSemesterRegistration;
