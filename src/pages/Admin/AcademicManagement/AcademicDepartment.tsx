import { Button, Table } from "antd";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academinManagementApi";
import type { TableColumnsType } from "antd";
import { TAcademicDepartment } from "../../../types";
type TableDataType = Pick<TAcademicDepartment, "name">;

const AcademicDepartment = () => {
  const {
    data: departmentsData,
    isLoading,
    isFetching,
  } = useGetAcademicDepartmentsQuery(undefined);
  console.log(departmentsData);

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
  const tableData = departmentsData?.data?.map(({ _id, name }) => ({
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

export default AcademicDepartment;
