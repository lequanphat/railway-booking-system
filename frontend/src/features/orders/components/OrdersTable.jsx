import { Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { convertToVnCurrency } from '~/utils/convert';
import { useOrders } from '../api/get-orders';

const expandColumns = [
  { title: 'Mã vé', dataIndex: 'code', key: 'code' },
  {
    title: 'Hành khách',
    key: 'info',
    render: ({ fullName, object, identity }) => (
      <div>
        <p>Họ tên: {fullName}</p>
        <p>
          Đối tượng: {object?.parent?.name} - {object.name}
        </p>
        <p>Định danh: {identity}</p>
      </div>
    ),
  },
  {
    title: 'Tuyến đường',
    key: 'schedule',
    render: ({ arrivalStation, departureStation, departureTime, arrivalTime }) => (
      <div>
        <p>
          Tuyến: {departureStation} - {arrivalStation}
        </p>
        <p>
          Thời gian: {departureTime} - {arrivalTime}
        </p>
      </div>
    ),
  },
  {
    title: 'Chỗ ngồi',
    key: 'seat',
    render: ({ seatType, carriageType }) => (
      <div>
        <p>Ghế: {seatType}</p>
        <p>Toa {carriageType}</p>
      </div>
    ),
  },
  {
    title: 'Giá',
    key: 'arrivalStation',
    render: ({ originalPrice, price }) => (
      <div>
        <p>
          Giá gốc: <del>{convertToVnCurrency(originalPrice)}</del>
        </p>
        <p>
          Giá: <strong className="text-red-500">{convertToVnCurrency(price)}</strong>
        </p>
      </div>
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
    title: 'Khách hàng',
    key: 'info',
    render: ({ fullName, email, phoneNumber, identity }) => (
      <div>
        <p>Họ tên: {fullName}</p>
        <p>Email: {email}</p>
        <p>SDT: {phoneNumber}</p>
        <p>Định danh: {identity}</p>
      </div>
    ),
  },
  {
    title: 'Thanh toán',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    render: (value) => <Tag color="cyan">{value}</Tag>,
  },
  {
    title: 'Tổng giá',
    dataIndex: 'totalPrice',
    key: 'paymentMethod',
    render: (value) => <strong className="text-red-500">{convertToVnCurrency(value)}</strong>,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (value) => <Tag color="green">{value}</Tag>,
  },
  {
    title: 'Date',
    key: 'createdAt',
    render: ({ createdAt }) => <p>{dayjs(createdAt).format('HH:mm:ss DD/MM/YYYY')}</p>,
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
