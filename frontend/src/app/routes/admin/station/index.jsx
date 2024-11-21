
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Flex,  Space } from 'antd';
import PageHeader from '~/components/ui/page-header';
import StationTable from '~/features/station/components/StationTable';
import CreateStation from '~/features/station/components/CreateStationModel'
import { useBoolean } from '~/hooks/useBoolean';

const StationPage = () => {
  const { value: isOpenCreateModal, setFalse: closeCreateModal, setTrue: openCreateModal } = useBoolean(false);
  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader heading="Quản lý ga tàu" links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Ga tàu' }]} />
        <Space>
          <Button  onClick={openCreateModal} type="primary" icon={<PlusSquareOutlined />}>
            Thêm mới
          </Button>
        </Space>
      </Flex>
      <StationTable/>
      <CreateStation open={isOpenCreateModal} handleCancel={closeCreateModal}/>
    </>
  );
};

export default StationPage;
