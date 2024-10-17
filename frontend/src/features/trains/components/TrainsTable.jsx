import { ExportOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Space, Table, Tag } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTrains } from '../api/get-trains';
import { useTable } from '~/hooks/useTable';

const TrainsTable = () => {
  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Tên tàu hỏa',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Số toa tàu',
        dataIndex: 'carriages',
        key: 'carriages',
        render: (carriages) => `${carriages?.length} toa`,
      },
      {
        title: 'Số chỗ',
        dataIndex: 'carriages',
        key: 'carriages',
        render: (carriages) => {
          const totalSeats = carriages?.reduce((acc, cur) => acc + cur.carriageLayout.seats.length, 0);
          return `${totalSeats} chỗ`;
        },
      },
      {
        title: 'Mức giá trung bình',
        dataIndex: 'seatPrices',
        key: 'seatPrices',
        render: (seatPrices) => {
          const totalPrices = seatPrices?.reduce((acc, cur) => acc + cur.original_price_per_km, 0) / seatPrices.length;
          return `${totalPrices}đ / km`;
        },
      },
      {
        title: 'Trạng thái',
        dataIndex: 'is_active',
        key: 'is_active',
        align: 'center',
        render: (value) => (value ? <Tag color="success">Hoạt động</Tag> : <Tag color="red">Vô hiệu</Tag>),
      },
      {
        title: 'Hành động',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: (value) => (
          <Space>
            <Link to={`${value}`} type="default">
              <Button size="small" icon={<QuestionCircleOutlined />} iconPosition={'end'} />
            </Link>
          </Space>
        ),
      },
    ],
    [],
  );

  const { tableProps, handleSearch, keyword } = useTable({
    fetchData: useTrains,
    columns,
    defaultPageSize: 10,
  });

  return (
    <Table
      rowKey="id"
      title={() => (
        <Flex justify="space-between">
          <Input.Search
            placeholder="Tìm kiếm..."
            className="w-[250px]"
            allowClear
            onSearch={handleSearch}
            value={keyword}
          />
          <Button icon={<ExportOutlined />}>
            Export<Tag color="blue">Coming Soon</Tag>
          </Button>
        </Flex>
      )}
      {...tableProps}
    />
  );
};

export default TrainsTable;
