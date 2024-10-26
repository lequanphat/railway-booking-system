import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Space } from 'antd';
import { Link } from 'react-router-dom';
import PageHeader from '~/components/ui/page-header';
import TrainsTable from '~/features/trains/components/TrainsTable';

const TrainsManagement = () => {
  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader heading="Quản lý tàu hỏa" links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Tàu hỏa' }]} />
        <Space>
          <Link to="create">
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm mới
            </Button>
          </Link>
        </Space>
      </Flex>
      <TrainsTable />
    </>
  );
};

export default TrainsManagement;
