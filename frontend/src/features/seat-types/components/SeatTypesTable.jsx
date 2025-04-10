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
        title: 'Mã ghế',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
      },
      {
        title: 'Giá gốc / km',
        dataIndex: 'original_price_per_km',
        key: 'original_price_per_km',
        align: 'center',
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
        width: '32%',
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
            <Button size="small" onClick={null} icon={<EditOutlined />} iconPosition={'end'} title="Chỉnh sửa" />
            <Button
              size="small"
              onClick={null}
              icon={data?.active ? <DeleteOutlined /> : <ToolOutlined />}
              iconPosition={'end'}
              title="Xóa / Khôi phục"
            />
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
        dataSource={seatTypes?.items}
        size="middle"
        rowKey={(record) => record.id}
        pagination={{
          current: seatTypes?.meta.current_page,
          pageSize: seatTypes?.meta.per_page,
          total: seatTypes?.meta.total_elements,
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
