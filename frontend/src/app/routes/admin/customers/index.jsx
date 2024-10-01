import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Flex, Space } from 'antd';
import PageHeader from '~/components/ui/page-header';
import { CustomerTable } from '~/features/customers/components/CustomerTable';

const CustomerPage = () => {
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
        <CustomerTable />
      </div>
    </>
  );
};
export default CustomerPage;
