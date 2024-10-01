import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Space, Table, Tag } from "antd";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useEmployees } from "../api/get-employees";
import { ROW_PER_PAGE } from "~/config/constants";

export const EmployeeTable = ({ handleDeleteItem, handleUpdateItem }) => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const { data: employees, isLoading } = useEmployees({
    page,
    keyword,
    size: ROW_PER_PAGE,
  });

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
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        render: (text) => (text ? text : 'N/A'),
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        render: (text) => (text ? text : 'N/A'),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (text) => (text ? text : 'N/A'),
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
      {
        title: "Action",
        key: "action",
        render: (data) => (
          <Space>
            <Button
              onClick={() => {
                handleUpdateItem(data);
              }}
              icon={<EditOutlined />}
              iconPosition={"end"}
            />
            <Button
              onClick={() => handleDeleteItem(data)}
              icon={<DeleteOutlined />}
              iconPosition={"end"}
            />
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={employees?.content}
        size="middle"
        pagination={{
          current: page,
          pageSize: employees?.size,
          total: employees?.totalElements,
        }}
        loading={isLoading}
        onChange={(e) => {
          setPage(e?.current);
        }}
        title={() => (
          <Flex justify="space-between">
            <Input.Search
              placeholder="Search employee..."
              className="w-[250px]"
              allowClear
              onSearch={(value) => {
                setKeyword(value);
                setPage(1);
              }}
            />
            <Button icon={<ExportOutlined />}>
              Export<Tag color="blue">Coming Soon</Tag>
            </Button>
          </Flex>
        )}
      />
    </>
  );
};

EmployeeTable.propTypes = {
  handleDeleteItem: PropTypes.func,
  handleUpdateItem: PropTypes.func,
};
