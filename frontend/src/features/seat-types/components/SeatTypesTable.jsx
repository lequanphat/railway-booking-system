import { DeleteOutlined, EditOutlined, ExportOutlined, ToolOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Space, Table, Tag } from 'antd';
import { useMemo, useState } from 'react';
import { ROW_PER_PAGE } from '~/config/constants';
import { useSeatTypes } from '../api/get-seat-types';

const SeatTypesTable = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const { data: seatTypes, isLoading } = useSeatTypes({
    page,
    keyword,
    size: ROW_PER_PAGE,
  });

  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Tên ghế',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Kích thước',
        dataIndex: 'size',
        key: 'size',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'active',
        key: 'active',
        render: (value) => <Tag color={value ? 'green' : 'red'}>{value ? 'ACTIVE' : 'DISABLED'}</Tag>,
      },
      {
        title: 'Hành động',
        key: 'action',
        render: (data) => (
          <Space>
            <Button onClick={null} icon={<EditOutlined />} iconPosition={'end'} />
            <Button onClick={null} icon={data?.active ? <DeleteOutlined /> : <ToolOutlined />} iconPosition={'end'} />
          </Space>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={seatTypes?.content}
        size="middle"
        pagination={{
          current: page,
          pageSize: seatTypes?.size,
          total: seatTypes?.totalElements,
        }}
        loading={isLoading}
        onChange={(e) => {
          setPage(e?.current);
        }}
        title={() => (
          <Flex justify="space-between">
            <Input.Search
              placeholder="Tìm kiếm..."
              className="w-[250px]"
              allowClear
              onSearch={(value) => {
                setKeyword(value);
                setPage(1);
              }}
            />
            <Button icon={<ExportOutlined />}>
              Export<Tag color="blue">Coming Soon</Tag>
            </Button>
          </Flex>
        )}
      />
    </>
  );
};

export default SeatTypesTable;
