import { useGetAcademicSemestersQuery } from "../../../redux/features/admin/academinManagementApi";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const AcademicSemester = () => {
  const { data: semesterData } = useGetAcademicSemestersQuery(undefined);
  console.log(semesterData);
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Year",
      dataIndex: "year",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];

  const tableData = semesterData?.data.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table<DataType>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
