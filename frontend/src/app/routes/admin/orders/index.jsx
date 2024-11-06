import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Space } from 'antd';
import { Link } from 'react-router-dom';
import PageHeader from '~/components/ui/page-header';
import OrdersTable from '~/features/my-orders/components/MyOrdersTable';

const OrderManagement = () => {
  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader heading="Quản lý hoá đơn" links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Hóa đơn' }]} />
        <Space>
          <Link to="create">
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm mới
            </Button>
          </Link>
        </Space>
      </Flex>
      <OrdersTable />
    </>
  );
};

export default OrderManagement;
