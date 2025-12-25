import { Button, Modal, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TCourse } from "../../../types";
import {
  useAssignFacultiesToCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { useState } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagementApi";
import PHselect from "../../../components/form/PHselect";
import PHform from "../../../components/form/PHform";
import { FieldValues, SubmitHandler } from "react-hook-form";
type TableDataType = Pick<TCourse, "prefix" | "title">;
const Courses = () => {
  const {
    data: coursesData,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);

  const columns: TableColumnsType<TableDataType> = [
    {
      title: "Prefix",
      key: "prefix",
      dataIndex: "prefix",
    },
    {
      title: "Course Title",
      key: "title",

      dataIndex: "title",
    },

    {
      title: "Action",
      render: (item) => {
        return <AssignFaculties courseInfo={item} />;
      },
    },
  ];
  const tableData = coursesData?.data?.map(({ _id, prefix, title }) => ({
    key: _id,
    prefix,
    title,
  }));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Table<TableDataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
    />
  );
};

export default Courses;

const AssignFaculties = ({ courseInfo }) => {
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const facultyOptions = facultiesData?.data?.map((faculty) => ({
    value: faculty._id,
    label: `${faculty.fullName}`,
  }));
  const [assignFaculties] = useAssignFacultiesToCourseMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultiesData = {
      courseId: courseInfo.key,
      data,
    };
    assignFaculties(facultiesData);
    handleCancel();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Asssign Faculty
      </Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHform onSubmit={handleSubmit}>
          <PHselect
            mode="multiple"
            options={facultyOptions}
            label="Select Faculties"
            name="faculties"
          />
          <Button htmlType="submit" type="primary" onClick={showModal}>
            Asssign Faculty
          </Button>
        </PHform>
      </Modal>
    </>
  );
};
