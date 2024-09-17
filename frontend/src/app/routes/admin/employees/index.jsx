import { Button, Flex, Space, Spin } from "antd";
import { LoadingOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { EmployeeTable } from "../../../../features/employees/components/EmployeeTable";
import { useEmployees } from "~/features/employees/api/get-employees";
import PageHeader from "~/components/ui/page-header";

const EmployeePage = () => {
  // const { data: employees, isLoading } = useEmployees({ page: 1 });
  const employees = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      userRole: "ADMIN",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith",
      email: "jane.smith@example.com",
      userRole: "USER",
    },
    {
      id: 3,
      name: "Alice Johnson",
      username: "alicej",
      email: "alice.j@example.com",
      userRole: "USER",
    },
    {
      id: 4,
      name: "Bob Brown",
      username: "bobbrown",
      email: "bob.brown@example.com",
      userRole: "ADMIN",
    },
    {
      id: 5,
      name: "Charlie Davis",
      username: "charlied",
      email: "charlie.d@example.com",
      userRole: "USER",
    },
    {
      id: 6,
      name: "David Wilson",
      username: "davidw",
      email: "david.w@example.com",
      userRole: "USER",
    },
    {
      id: 7,
      name: "Eva Thompson",
      username: "evat",
      email: "eva.t@example.com",
      userRole: "USER",
    },
    {
      id: 8,
      name: "Frank Green",
      username: "frankg",
      email: "frank.g@example.com",
      userRole: "ADMIN",
    },
    {
      id: 9,
      name: "Grace Lee",
      username: "gracel",
      email: "grace.l@example.com",
      userRole: "USER",
    },
    {
      id: 10,
      name: "Henry White",
      username: "henryw",
      email: "henry.w@example.com",
      userRole: "ADMIN",
    },
    {
      id: 11,
      name: "Irene Black",
      username: "ireneb",
      email: "irene.b@example.com",
      userRole: "USER",
    },
    {
      id: 12,
      name: "Jack King",
      username: "jackk",
      email: "jack.k@example.com",
      userRole: "USER",
    },
    {
      id: 13,
      name: "Kathy Moore",
      username: "kathym",
      email: "kathy.m@example.com",
      userRole: "ADMIN",
    },
    {
      id: 14,
      name: "Liam Harris",
      username: "liamh",
      email: "liam.h@example.com",
      userRole: "USER",
    },
    {
      id: 15,
      name: "Megan Scott",
      username: "megans",
      email: "megan.s@example.com",
      userRole: "USER",
    },
    {
      id: 16,
      name: "Nathan Baker",
      username: "nathanb",
      email: "nathan.b@example.com",
      userRole: "ADMIN",
    },
    {
      id: 17,
      name: "Olivia Young",
      username: "oliviay",
      email: "olivia.y@example.com",
      userRole: "USER",
    },
    {
      id: 18,
      name: "Paul Walker",
      username: "paulw",
      email: "paul.w@example.com",
      userRole: "USER",
    },
    {
      id: 19,
      name: "Quinn Allen",
      username: "quinna",
      email: "quinn.a@example.com",
      userRole: "ADMIN",
    },
    {
      id: 20,
      name: "Rachel Hill",
      username: "rachelh",
      email: "rachel.h@example.com",
      userRole: "USER",
    },
  ];

  const isLoading = false;

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Quản lý nhân viên"
          links={[{ title: "Home", href: "/" }, { title: "Nhân viên" }]}
        />
        <Space>
          <Button type="primary" icon={<PlusSquareOutlined />}>
            Thêm mới
          </Button>
        </Space>
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
    </>
  );
};
export default EmployeePage;
