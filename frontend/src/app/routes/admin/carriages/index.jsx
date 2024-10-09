import { Button, Flex, Input, Space, Table, Tag } from 'antd';
import PageHeader from '~/components/ui/page-header';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

const CarriagesManagement = () => {
  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Tên toa tàu',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Số lượng ghế',
        dataIndex: 'number_of_seats',
        key: 'number_of_seats',
      },
      {
        title: 'Trống',
        dataIndex: 'is_empty',
        key: 'is_empty',
        render: (value) => (value ? <Tag color="success">Trống</Tag> : <Tag color="default">Sử dụng</Tag>),
      },
    ],
    [],
  );

  const rows = useMemo(
    () => [
      {
        id: 1,
        name: 'Toa giường nằm có máy lạnh',
        number_of_seats: 32,
        is_empty: true,
      },
      {
        id: 2,
        name: 'Toa giường nằm không máy lạnh',
        number_of_seats: 36,
        is_empty: false,
      },
    ],
    [],
  );
  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader heading="Quản lý toa tàu" links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Toa tàu' }]} />
        <Space>
          <Button href="carriages/create" type="primary" icon={<PlusSquareOutlined />}>
            Thêm mới
          </Button>
        </Space>
      </Flex>
      <Table
        columns={columns}
        dataSource={rows}
        size="middle"
        title={() => (
          <Flex justify="space-between">
            <Input.Search placeholder="Tìm kiếm..." className="w-[250px]" allowClear onSearch={null} />
          </Flex>
        )}
      />
    </>
  );
};

export default CarriagesManagement;
