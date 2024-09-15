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
        title: "Phone number",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Role",
        key: "role",
        dataIndex: "role",
        render: (_, { role }) => (
          <>
            <Tag color={role === "ADMIN" ? "red" : "blue"}>{role}</Tag>
          </>
        ),
      },
    ],
    []
  );
  const data = useMemo(() => {
    return employees.map((employee) => ({
      key: employee.id,
      id: employee.id,
      name: employee.name,
      username: employee.username,
      email: employee.email,
      phone: employee.phone,
      role: Math.random() > 0.5 ? "ADMIN" : "USER",
    }));
  }, [employees]);

  return <Table columns={columns} dataSource={data} />;
};

EmployeeTable.propTypes = {
  employees: PropTypes.array.isRequired,
};
