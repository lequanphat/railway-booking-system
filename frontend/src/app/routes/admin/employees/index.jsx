import { Button, Flex, Spin } from "antd";
import Search from "antd/es/input/Search";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useQuery } from "@tanstack/react-query";
import { EmployeeTable } from "./section/EmployeeTable";

const EmployeePage = () => {
  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.json();
    },
  });

  return (
    <div>
      <Title level={4}>Employee Management</Title>
      <Flex justify="space-between" align="center">
        <Search
          placeholder="Search employee..."
          allowClear
          onSearch={null}
          style={{ marginRight: 200 }}
        />
        <Button type="primary" icon={<PlusOutlined />} iconPosition={"end"}>
          Create new employee
        </Button>
      </Flex>
      <div style={{ paddingTop: 20 }}>
        {isLoading ? (
          <Flex justify="center">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </Flex>
        ) : (
          <EmployeeTable employees={employees} />
        )}
      </div>
    </div>
  );
};
export default EmployeePage;
