import { Table } from 'antd';
import { useOrders } from '../api/get-orders';

const expandColumns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tuyến đường',
    key: 'arrivalStation',
    render: ({ arrivalStation, departureStation }) => (
      <p>
        {arrivalStation} - {departureStation}
      </p>
    ),
  },
  {
    title: 'Thời gian',
    key: 'arrivalStation',
    render: ({ departureTime, arrivalTime }) => (
      <p>
        {departureTime} - {arrivalTime}
      </p>
    ),
  },
];

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Họ tên',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Thanh toán',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];
const OrdersTable = () => {
  const { data } = useOrders({
    page: 1,
    size: 10,
    keyword: '',
  });
  return (
    <Table
      rowKey="id"
      columns={columns}
      expandable={{
        expandedRowRender,
      }}
      dataSource={data?.items}
    />
  );
};

const expandedRowRender = ({ tickets }) => {
  console.log(tickets);
  return <Table columns={expandColumns} dataSource={tickets} pagination={false} />;
};

export default OrdersTable;
