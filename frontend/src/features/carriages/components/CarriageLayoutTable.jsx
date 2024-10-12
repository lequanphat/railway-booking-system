import { ExportOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Space, Table, Tag } from 'antd';
import { useMemo, useState } from 'react';
import { ROW_PER_PAGE } from '~/config/constants';
import { Link } from 'react-router-dom';
import { useCarriageLayouts } from '../api/get-layouts';

const CarriageLayoutTable = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const { data: carriageLayouts, isLoading } = useCarriageLayouts({ page: page, size: ROW_PER_PAGE, keyword });

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
        title: 'Kết cấu toa',
        key: 'floors',
        render: (value) => `${value.floors} tầng, ${value.row_count} hàng`,
      },
      {
        title: 'Số chỗ',
        dataIndex: 'seats',
        key: 'seats',
        render: (seats) => `${seats.length} chỗ`,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'active',
        key: 'active',
        align: 'center',
        render: (value) => (value ? <Tag color="success">Hoạt động</Tag> : <Tag color="default">Vô hiệu</Tag>),
      },
      {
        title: 'Hành động',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        render: (value) => (
          <Space>
            <Link to={`${value}`} type="default">
              <Button onClick={null} icon={<QuestionCircleOutlined />} iconPosition={'end'} />
            </Link>
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
        dataSource={carriageLayouts?.content}
        size="middle"
        pagination={{
          current: page,
          pageSize: carriageLayouts?.size,
          total: carriageLayouts?.totalElements,
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
                console.log(value);
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

export default CarriageLayoutTable;
