import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Space } from 'antd';
import PageHeader from '~/components/ui/page-header';
import CarriageLayoutTable from '~/features/carriages/components/CarriageLayoutTable';

const CarriagesManagement = () => {
  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader heading="Quản lý toa tàu" links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Toa tàu' }]} />
        <Space>
          <Button href="carriage-layouts/create" type="primary" icon={<PlusOutlined />}>
            Thêm mới
          </Button>
        </Space>
      </Flex>
      <CarriageLayoutTable />
    </>
  );
};

export default CarriagesManagement;
