import { DatePicker, Flex, Input, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import PageHeader from '~/components/ui/page-header';
import OrdersTable from '~/features/orders/components/OrdersTable';
import {
  DATE_FILTER_OPTIONS,
  PAYMENT_METHOD_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from '~/features/orders/utils/constants';

const { RangePicker } = DatePicker;

const OrderManagement = () => {
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState(DATE_FILTER_OPTIONS[0].value);
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().startOf('week').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('week').format('YYYY-MM-DD'),
  });
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD_FILTER_OPTIONS[0].value);
  const [status, setStatus] = useState(STATUS_FILTER_OPTIONS[0].value);

  useEffect(() => {
    switch (filter) {
      case 'WEEK':
        setDateRange({
          startDate: dayjs().startOf('week').format('YYYY-MM-DD'),
          endDate: dayjs().endOf('week').format('YYYY-MM-DD'),
        });
        break;
      case 'MONTH':
        setDateRange({
          startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
          endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
        });
        break;
      case 'CUSTOM':
        break;
      default:
        break;
    }
  }, [filter]);

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader heading="Quản lý hoá đơn" links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Hóa đơn' }]} />
        <Space>
          <Space>
            <Input.Search
              placeholder="Tìm kiếm"
              style={{ width: 200 }}
              onSearch={(value) => {
                setKeyword(value);
              }}
            />
            <Select
              defaultValue={STATUS_FILTER_OPTIONS[0].value}
              style={{
                width: 160,
              }}
              options={STATUS_FILTER_OPTIONS}
              value={status}
              onChange={(value) => setStatus(value)}
            />
            <Select
              defaultValue={PAYMENT_METHOD_FILTER_OPTIONS[0].value}
              style={{
                width: 120,
              }}
              options={PAYMENT_METHOD_FILTER_OPTIONS}
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value)}
            />
            <Select
              defaultValue={DATE_FILTER_OPTIONS[0].value}
              style={{
                width: 120,
              }}
              options={DATE_FILTER_OPTIONS}
              value={filter}
              onChange={(value) => setFilter(value)}
            />
            <RangePicker
              disabled={filter !== 'CUSTOM'}
              value={[dayjs(dateRange.startDate), dayjs(dateRange.endDate)]}
              onChange={(dates) => {
                setDateRange({
                  startDate: dates[0]?.format('YYYY-MM-DD'),
                  endDate: dates[1]?.format('YYYY-MM-DD'),
                });
              }}
            />
          </Space>
        </Space>
      </Flex>
      <OrdersTable filters={{ dateRange, keyword, paymentMethod, status }} />
    </>
  );
};

export default OrderManagement;
