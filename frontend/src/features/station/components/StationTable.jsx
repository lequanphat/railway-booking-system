import { DeleteOutlined, EditOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Space, Table, Tag } from 'antd';
import { useMemo, useState } from 'react';
import { ROW_PER_PAGE } from '~/config/constants';
import { useStations } from '~/features/station/api/get-stations';

const StationTable = () => {
  // const dataSource = stations
  //   ? stations.map((station) => ({
  //       key: station.id,
  //       id: station.id,
  //       name: station.name,
  //       province_id: station.province_id,
  //     }))
  //   : [];
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const { data: stations, isLoading } = useStations({
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
          title: 'Tên ga tàu',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Tỉnh',
          key: 'province.name',
          render: ({province}) => <a>{province.name}</a>,
        },
        {
          title: 'Hành động',
          key: 'action',
          render: () => (
            <Space>
              <Button onClick={null} icon={<EditOutlined />} iconPosition={'end'} />
              <Button onClick={null} icon={<DeleteOutlined />} iconPosition={'end'} />
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
        dataSource={stations?.items}
        size="middle"
        rowKey={(record) => record.id}
        pagination={{
          current: stations?.meta.current_page,
          pageSize: stations?.meta.per_page,
          total: stations?.meta.total_elements,
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

export default StationTable;