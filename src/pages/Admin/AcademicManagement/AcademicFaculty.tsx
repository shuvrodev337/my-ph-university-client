import { Button, Table } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academinManagementApi";
import type { TableColumnsType, TableProps } from "antd";
import { TAcademicFaculty } from "../../../types";
type TableDataType = Pick<TAcademicFaculty, "name">;
const AcademicFaculty = () => {
  const {
    data: facultiesData,
    isLoading,
    isFetching,
  } = useGetAcademicFacultiesQuery(undefined);
  console.log(facultiesData);

  const columns: TableColumnsType<TableDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
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
  const tableData = facultiesData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Table<TableDataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicFaculty;
