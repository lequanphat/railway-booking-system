import { Button, Flex, Space } from 'antd';
import PageHeader from '~/components/ui/page-header';
import { PlusSquareOutlined } from '@ant-design/icons';

const TrainsManagement = () => {
  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Quản lý tàu hỏa"
          links={[
            { title: 'Trang chủ', href: '/admin' },
            { title: 'Tàu hỏa', href: '/admin/trains' },
            { title: 'Tạo tàu hỏa' },
          ]}
        />
        <Space>
          <Button href="trains/create" type="primary" icon={<PlusSquareOutlined />}>
            Thêm mới
          </Button>
        </Space>
      </Flex>
      <div>123</div>
    </>
  );
};

export default TrainsManagement;
