import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Flex, Space } from 'antd';
import { Link } from 'react-router-dom';
import PageHeader from '~/components/ui/page-header';
import CarriageLayoutTable from '~/features/carriages/components/CarriageLayoutTable';

const CarriagesManagement = () => {
  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader heading="Quản lý toa tàu" links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Toa tàu' }]} />
        <Space>
          <Link to="create">
            <Button type="primary" icon={<PlusSquareOutlined />}>
              Thêm mới
            </Button>
          </Link>
        </Space>
      </Flex>
      <CarriageLayoutTable />
    </>
  );
};

export default CarriagesManagement;
