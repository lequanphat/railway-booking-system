import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Space } from 'antd';
import { Link } from 'react-router-dom';
import PageHeader from '~/components/ui/page-header';
import ObjectsTable from '~/features/settings/objects/components/ObjectTable';

const ObjectsManagement = () => {
  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Quản lý đối tượng"
          links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Đối tượng' }]}
        />
        <Space>
          <Link to="create">
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm mới
            </Button>
          </Link>
        </Space>
      </Flex>
      <ObjectsTable />
    </>
  );
};

export default ObjectsManagement;
