import { Table } from 'antd';
import { useGetAllPersonTypes } from '~/features/booking/api/get-all-person-types';

const expandColumns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    width: '50%',
  },
  {
    title: 'Phần trăm giảm giá',
    dataIndex: 'percentage',
    key: 'percentage',
    align: 'center',
  },
];

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    width: '50%',
  },
  {
    title: 'Phần trăm giảm giá',
    dataIndex: 'percentage',
    key: 'percentage',
    align: 'center',
  },
];

const ObjectsTable = () => {
  const { data: personTypes } = useGetAllPersonTypes({});
  const expandedRowRender = (record) => {
    return <Table rowKey="id" columns={expandColumns} dataSource={record.children} pagination={false} />;
  };

  return (
    <Table
      rowKey="id"
      columns={columns}
      expandable={{
        expandedRowRender,
      }}
      dataSource={personTypes}
    />
  );
};

export default ObjectsTable;
