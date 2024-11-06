import { Card } from 'antd';
import MyOrdersTable from '~/features/my-orders/components/MyOrdersTable';

const OrdersPage = () => {
  return (
    <div className="py-6">
      <h1 className="text-lg font-semibold text-center text-primary mb-4">Đơn hàng của tôi</h1>
      <Card>
        <MyOrdersTable />
      </Card>
    </div>
  );
};

export default OrdersPage;
