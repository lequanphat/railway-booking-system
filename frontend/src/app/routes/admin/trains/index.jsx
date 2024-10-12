import { Button, Flex, Space } from 'antd';
import PageHeader from '~/components/ui/page-header';
import { PlusSquareOutlined } from '@ant-design/icons';
import TrainsTable from '~/features/trains/components/TrainsTable';

const TrainsManagement = () => {
  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader heading="Quản lý tàu hỏa" links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Tàu hỏa' }]} />
        <Space>
          <Button href="trains/create" type="primary" icon={<PlusSquareOutlined />}>
            Thêm mới
          </Button>
        </Space>
      </Flex>
      <TrainsTable />
    </>
  );
};

export default TrainsManagement;
