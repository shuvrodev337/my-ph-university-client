import { Button, Dropdown, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";
import {
  useGetAllRegisterdSemestersQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/courseManagementApi";
import { TQueryParam, TRegisteredSemester } from "../../../types";
import moment from "moment";

type TableDataType = Pick<
  TRegisteredSemester,
  "academicSemester" | "startDate" | "endDate" | "status"
>;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];
const RegisteredSemesters = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [semesterId, setSemesterId] = useState("");
  const [updateSemesterRegistrationStatus] =
    useUpdateSemesterRegistrationMutation();
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisterdSemestersQuery(params);
  console.log(semesterData);

  const handleSemesterStatus = (data) => {
    console.log(data);
    const updatedData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterRegistrationStatus(updatedData);
  };
  const menuProps = {
    items,
    onClick: handleSemesterStatus,
  };

  const columns: TableColumnsType<TableDataType> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Start Date",
      key: "startDate",

      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return (
          <div>
            <Tag color={color}>{item}</Tag>
          </div>
        );
      },
    },
    {
      key: "x",
      title: "Action",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];
  // if (!semesterData?.data) return <div>Loading...</div>;
  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );
  // const onChange: TableProps<TableDataType>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   //  console.log("filters=>", filters);
  //   // console.log("extra=>", extra);
  //   const queryParams: TQueryParam[] = [];
  //   if (extra.action === "filter") {
  //     filters.name?.forEach(
  //       (item) => queryParams.push({ name: "name", value: item }) // setting "name" as column name & value as filter selected value
  //     );
  //     filters.year?.forEach(
  //       (item) => queryParams.push({ name: "year", value: item }) // setting "year" as column name & value as filter selected value
  //     );
  //   }
  //   setParams(queryParams);
  // };

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

export default RegisteredSemesters;
