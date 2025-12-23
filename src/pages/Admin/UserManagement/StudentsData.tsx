import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TQueryParam, TStudent } from "../../../types";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagementApi";

type TableDataType = Pick<TStudent, "fullName" | "id">;
const StudentsData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(2);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "limit", value: 3 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  console.log(studentData);
  const metadata = studentData?.meta;
  const columns: TableColumnsType<TableDataType> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },

    {
      title: "Student Id",
      dataIndex: "id",
    },

    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];
  const tableData = studentData?.data?.map(({ _id, id, fullName }) => ({
    key: _id,
    id,
    fullName,
  }));
  const onChange: TableProps<TableDataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    const queryParams: TQueryParam[] = [];
    if (extra.action === "filter") {
      filters.name?.forEach(
        (item) => queryParams.push({ name: "name", value: item }) // setting "name" as column name & value as filter selected value
      );
      filters.year?.forEach(
        (item) => queryParams.push({ name: "year", value: item }) // setting "year" as column name & value as filter selected value
      );
    }
    setParams(queryParams);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Table<TableDataType>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        onChange={(page) => setPage(page)}
        pageSize={metadata?.limit}
        total={metadata?.totalDocuments}
      />
    </>
  );
};

export default StudentsData;
