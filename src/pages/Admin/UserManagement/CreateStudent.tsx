import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import { createAcademicDepartmentSchema } from "../../../schema/academicMaanagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PHinput from "../../../components/form/PHinput";
import { Button, Col, Divider, Flex, Row } from "antd";
import { toast } from "sonner";
import { useAddAcademicDepartmentMutation } from "../../../redux/features/admin/academinManagementApi";
import { TAcademicDepartment, TCreateResponse } from "../../../types";
import PHselect from "../../../components/form/PHselect";

const CreateStudent = () => {
  //   const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // const formData = new FormData();
    //  formData.append("data", JSON.stringify(data));

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
              <PHinput name="email" type="text" label="Email"></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput name="gender" type="text" label="Gender"></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput name="gender" type="text" label="Gender"></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput name="age" type="text" label="Age"></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="dateOfBirth"
                type="text"
                label="Date Of Birth"
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="contactNo"
                type="text"
                label="Contact No."
              ></PHinput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                name="bloodGroup"
                type="text"
                label="Blood Group"
              ></PHinput>
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
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateStudent;
