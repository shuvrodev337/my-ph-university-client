import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import PHinput from "../../../components/form/PHinput";
import { Button, Col, Divider, Flex, Row } from "antd";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicDepartmentsQuery,
  useGetAcademicSemestersQuery,
} from "../../../redux/features/admin/academinManagementApi";

import PHselect from "../../../components/form/PHselect";
import PHdatePicker from "../../../components/form/PHdatePicker";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagementApi";

const CreateStudent = () => {
  const [addStudent] = useAddStudentMutation();
  const { data: semesterData, isLoading: semesterIsloading } =
    useGetAcademicSemestersQuery(undefined);
  const { data: academicDepartmentData, isLoading: departmentIsloading } =
    useGetAcademicDepartmentsQuery(undefined); // in case of depended query=> pass { skip: semesterIsloading } object
  const semesterOptions = semesterData?.data?.map((academicSemester) => ({
    value: academicSemester._id,
    label: `${academicSemester.name} ${academicSemester.year}`,
  }));
  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (academicDepartment) => ({
      value: academicDepartment._id,
      label: academicDepartment.name,
    })
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    console.log(studentData);
    addStudent(formData);
    //! for development purpose
    // console.log(Object.fromEntries(formData));
    /* 
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
        */
  };

  /*
  {
    "password":"kichuakta",
    "student": {
        "name": {
            "firstName": "Studentone",
            "middleName": "Dev",
            "lastName": "Mondal"
        },

        "email": "studentone@example.com",
        "gender": "female",
        "age": 22,
        "dateOfBirth": "2002-08-07",
        "avatar": "https://example.com/avatars/sophiawilliams.png",
        "contactNo": "+14155552673",
        "bloodGroup": "B+",
        "emergencyContactNo": "+14155553783",
        "presentAddress": "321 Cedar Lane, San Diego, CA",
        "permanentAddress": "321 Cedar Lane, Austin, TX",
        "guardian": {
            "fatherName": "Thomas Williams",
            "fatherOccupation": "Architect",
            "fatherContactNo": "+14155554983",
            "motherName": "Emma Williams",
            "motherOccupation": "Chef",
            "motherContactNo": "+14155555233"
        },
        "localGuardian": {
            "name": "Liam Brown",
            "occupation": "Business Analyst",
            "contactNo": "+14155556893",
            "address": "789 Spruce Avenue, San Diego, CA"
        },
        "admissionSemester": "67659864bd30956707f8a38b",
        "academicDepartment": "6767206341b1c41957001b2c"
     
    }
}

  */

  return (
    <Flex justify="center" align="center">
      <Col span={24}>
        <PHform
          onSubmit={onSubmit}
          //    resolver={zodResolver(createAcademicDepartmentSchema)}
        >
          <Row gutter={4}>
            <Divider>Personal Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="name.firstName"
                type="text"
                label="First Name"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="name.middleName"
                type="text"
                label="Middle Name"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="name.lastName"
                type="text"
                label="Last Name"
              ></PHinput>
            </Col>
            <Divider>Contact Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput name="email" type="email" label="Email"></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHselect
                name="gender"
                options={genderOptions}
                label="Gender"
              ></PHselect>
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHdatePicker
                name="dateOfBirth"
                label="Date Of Birth"
              ></PHdatePicker>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="contactNo"
                type="text"
                label="Contact No."
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHselect
                name="bloodGroup"
                options={bloodGroupOptions}
                label="Blood Group"
              ></PHselect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="emergencyContactNo"
                type="text"
                label="Emergency ContactNo"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="presentAddress"
                type="text"
                label="Present Address"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="permanentAddress"
                type="text"
                label="Permanent Address"
              ></PHinput>
            </Col>
            <Divider>Guardian Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="guardian.fatherName"
                type="text"
                label="Father's Name"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="guardian.fatherOccupation"
                type="text"
                label="Father's Occupation"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="guardian.fatherContactNo"
                type="text"
                label="Father's Contact No."
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="guardian.motherName"
                type="text"
                label="Mother's Name"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="guardian.motherOccupation"
                type="text"
                label="Mother's Occupation"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="guardian.motherContactNo"
                type="text"
                label="Mother's Contact No."
              ></PHinput>
            </Col>
            <Divider>Local Guardian Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="localGuardian.name"
                type="text"
                label="Local guardian's name"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="localGuardian.occupation"
                type="text"
                label="Local guardian's occupation"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="localGuardian.contactNo"
                type="text"
                label="Local guardian's contact No."
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="localGuardian.address"
                type="text"
                label="Local guardian's address"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHselect
                disabled={semesterIsloading}
                name="admissionSemester"
                options={semesterOptions}
                label="Admission semester"
              ></PHselect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHselect
                disabled={departmentIsloading}
                name="academicDepartment"
                options={academicDepartmentOptions}
                label="Academic department"
              ></PHselect>
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateStudent;
