const DATE_FILTER_OPTIONS = [
  {
    value: 'WEEK',
    label: 'Tuần này',
  },
  {
    value: 'MONTH',
    label: 'Tháng này',
  },
  {
    value: 'CUSTOM',
    label: 'Tùy chỉnh',
  },
];

const PAYMENT_METHOD_FILTER_OPTIONS = [
  {
    value: null,
    label: 'Tất cả',
  },
  {
    value: 'VNPAY',
    label: 'VNPAY',
  },
  {
    value: 'PAYPAL',
    label: 'PAYPAL',
  },
  {
    value: 'ZALOPAY',
    label: 'ZALOPAY',
  },
  {
    value: 'MOMO',
    label: 'MOMO',
  },
];

const STATUS_FILTER_OPTIONS = [
  {
    value: null,
    label: 'Tất cả',
  },
  {
    value: 'COMPLETED',
    label: 'COMPLETED',
  },
  {
    value: 'PENDING',
    label: 'PENDING',
  },
];

export { DATE_FILTER_OPTIONS, PAYMENT_METHOD_FILTER_OPTIONS, STATUS_FILTER_OPTIONS };
