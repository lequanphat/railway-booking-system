import { Button, Flex, Input, Table, Tag } from "antd";
import PropTypes from "prop-types";
import { useMemo } from "react";
import {ExportOutlined} from "@ant-design/icons";

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
  return (
    <Table
      columns={columns}
      dataSource={employees}
      size="middle"
      title={() => (
        <Flex justify="space-between">
          <Input.Search
            placeholder="Tìm kiếm nhân viên"
            className="w-[250px]"
            allowClear
          />
          <Button icon={<ExportOutlined />}>Export</Button>
        </Flex>
      )}
    />
  );
};

EmployeeTable.propTypes = {
  employees: PropTypes.array.isRequired,
};
