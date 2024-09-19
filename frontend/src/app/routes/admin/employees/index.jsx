import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, message, Space } from "antd";
import { useState } from "react";
import ConfirmModal from "~/components/ui/modals/ConfirmModal";
import PageHeader from "~/components/ui/page-header";
import { useDeleteEmployee } from "~/features/employees/api/delete-employee";
import CreateEmployeeModal from "~/features/employees/components/CreateEmployeeModal";
import { EmployeeTable } from "~/features/employees/components/EmployeeTable";
import UpdateEmployeeModal from "~/features/employees/components/UpdateEmployeeModal";

const EmployeePage = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const mutation = useDeleteEmployee({
    mutationConfig: {
      onSuccess: () => {
        message.success("Delete employee successfully");
        setOpenDeleteModal(false);
      },
      onError: () => {
        message.error("Something went wrong!");
      },
    },
  });

  // handle
  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setOpenDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteOk = () => {
    mutation.mutate({ data: { id: selectedEmployee?.id } });
  };

  const handleCreate = () => {
    setOpenCreateModal(true);
  };

  const handleCreateCancel = () => {
    setOpenCreateModal(false);
  };

  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
    setOpenUpdateModal(true);
  };

  const handleUpdateCancel = () => {
    setOpenUpdateModal(false);
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Quản lý nhân viên"
          links={[{ title: "Home", href: "/" }, { title: "Nhân viên" }]}
        />
        <Space>
          <Button
            onClick={handleCreate}
            type="primary"
            icon={<PlusSquareOutlined />}
          >
            Thêm mới
          </Button>
        </Space>
      </Flex>
      <div style={{ paddingTop: 20 }}>
        <EmployeeTable
          handleDeleteItem={handleDelete}
          handleUpdateItem={handleUpdate}
        />
      </div>
      <ConfirmModal
        title={`Are you sure to delete employee ${selectedEmployee?.name}?`}
        // content={<Tag color="blue">Coming Soon</Tag>}
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={handleDeleteOk}
      />
      <CreateEmployeeModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />
      <UpdateEmployeeModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedEmployee={selectedEmployee}
      />
    </>
  );
};
export default EmployeePage;
