import { PlusSquareOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Button, Flex, Space,  message } from 'antd';
import PageHeader from '~/components/ui/page-header';
import ConfirmModal from '~/components/ui/modals/ConfirmModal';
import { CustomerTable } from '~/features/customers/components/CustomerTable';
import { useUpdateCustomer } from '~/features/customers/api/update-customer';
import { useBoolean } from '~/hooks/useBoolean';

const CustomerPage = () => {
  const {
    value: isOpenUpdateStatusModal,
    setFalse: closeUpdateStatusModal,
    setTrue: openUpdateStatusModal,
  } = useBoolean(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const updateMutation = useUpdateCustomer({
    mutationConfig: {     
      onSuccess: () => {
        message.success('Cập nhật thành công!');
      },
      onError: (error) => {
        message.error(error?.response?.data?.detail);
      },
    },
  });

  const handleUpdateStatus = (employee) => {
    setSelectedCustomer(employee);
    openUpdateStatusModal();
  };

  const handleChangeStatus = () => {
    if (selectedCustomer) {
      updateMutation.mutate({
        data: {
          ...selectedCustomer,
          address: selectedCustomer?.address || 'nullllll', 
          phone: selectedCustomer?.phone || 'nullllll',  
          is_deleted: !selectedCustomer?.is_deleted,
        },
      });
      closeUpdateStatusModal();
    }
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader heading="Quản lý khách hàng" links={[{ title: 'Trang chủ', href: '/' }, { title: 'Khách hàng' }]} />
        <Space>
          <Button disabled type="primary" icon={<PlusSquareOutlined />}>
            Thêm mới
          </Button>
        </Space>
      </Flex>
      <div style={{ paddingTop: 20 }}>
        <CustomerTable handleUpdateStatus={handleUpdateStatus} />
      </div>
      <ConfirmModal
        title={
          selectedCustomer?.is_deleted
            ? `Bạn chắc chắn muốn khôi phục tài khoản ${selectedCustomer?.name}?`
            : `Bạn chắc chắn muốn vô hiệu tài khoản ${selectedCustomer?.name}?`
        }
        open={isOpenUpdateStatusModal}
        handleCancel={closeUpdateStatusModal}
        handleOk={handleChangeStatus}
      />
    </>
  );
};
export default CustomerPage;
