import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Flex, Space } from 'antd';
import PageHeader from '~/components/ui/page-header';
import CreateSeatTypeModal from '~/features/seat-types/components/CreateSeatTypeModal';
import SeatTypesTable from '~/features/seat-types/components/SeatTypesTable';
import { useBoolean } from '~/hooks/useBoolean';

const SeatsManagement = () => {
  const { value: isOpenCreateModal, setFalse: closeCreateModal, setTrue: openCreateModal } = useBoolean(false);

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Quản lý ghế ngồi"
          links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Ghế ngồi' }]}
        />
        <Space>
          <Button onClick={openCreateModal} type="primary" icon={<PlusSquareOutlined />}>
            Thêm mới
          </Button>
        </Space>
      </Flex>

      <SeatTypesTable />
      <CreateSeatTypeModal open={isOpenCreateModal} handleCancel={closeCreateModal} />
    </>
  );
};

export default SeatsManagement;
