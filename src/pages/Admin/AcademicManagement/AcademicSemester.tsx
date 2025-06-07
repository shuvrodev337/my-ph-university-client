import { useGetAcademicSemestersQuery } from "../../../redux/features/admin/academinManagementApi";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemester, TQueryParam } from "../../../types";
import { useState } from "react";

type TableDataType = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;
const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAcademicSemestersQuery(params);
  const columns: TableColumnsType<TableDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      defaultSortOrder: "descend",
      filters: [
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
        {
          text: "2028",
          value: "2028",
        },
        {
          text: "2029",
          value: "2029",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];
  // if (!semesterData?.data) return <div>Loading...</div>;
  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );
  const onChange: TableProps<TableDataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    //  console.log("filters=>", filters);
    // console.log("extra=>", extra);
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
    <Table<TableDataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
