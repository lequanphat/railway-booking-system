import { Table, Tag } from "antd";
import PropTypes from "prop-types";
import { useMemo } from "react";

export const EmployeeTable = ({ employees }) => {
  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Role",
        key: "userRole",
        dataIndex: "userRole",
        render: (_, { userRole }) => (
          <>
            <Tag color={userRole === "ADMIN" ? "red" : "blue"}>{userRole}</Tag>
          </>
        ),
      },
    ],
    []
  );
  return <Table columns={columns} dataSource={employees} />;
};

EmployeeTable.propTypes = {
  employees: PropTypes.array.isRequired,
};
