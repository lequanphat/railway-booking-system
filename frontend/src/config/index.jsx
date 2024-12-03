const PAYMENT_METHOD_OPTIONS = Object.freeze([
  {
    value: 'VNPAY',
    title: 'Thanh toán trực tuyến qua cổng thanh toán VNPAY',
    logo: 'https://dsvn.vn/images/logo-dvtt-VNP.png',
    descriptions: [
      'QR Pay trên ứng dụng Mobile Banking của các ngân hàng và Ví VNPAY (quét mã VNPAY-QR để thanh toán)',
      'Thẻ quốc tế phát hành trong nước và nước ngoài: Visa, Master, JCB, UnionPay, Amex, Google Pay, Apple Pay, Samsung Pay',
      'Thẻ ATM/Tài khoản nội địa',
    ],
    enabled: true,
  },
  {
    value: 'PAYPAL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/1200px-PayPal_logo.svg.png',
    title: 'Thanh toán trực tuyến qua PayPal',
    descriptions: [
      'Thanh toán bằng cách sử dụng tài khoản PayPal hoặc thẻ quốc tế Visa, MasterCard, American Express, Discover',
    ],
    enabled: true,
  },
  // {
  //   value: 'MOMO',
  //   logo: 'https://dsvn.vn/images/logo-dvtt-MOM.png',
  //   title: 'Thanh toán trực tuyến qua ví điện tử MoMo',
  //   descriptions: ['Nhập mã MOMODSVN giảm đến 100k tại mục Ưu đãi'],
  //   enabled: false,
  // },
  // {
  //   value: 'ZALOPAY',
  //   logo: 'https://dsvn.vn/images/logo-dvtt-ZLP.png',
  //   title: 'Thanh toán trực tuyến qua ví điện tử ZaloPay',
  //   descriptions: [
  //     'Thanh toán bằng hình thức Quét mã QR sử dụng ví điện tử ZaloPay',
  //     'Nhập mã TAUTET2025 giảm 30.000 VNĐ cho đơn hàng có giá trị thanh toán từ 1.200.000 VNĐ, giảm 70.000 VNĐ cho đơn hàng có giá trị thanh toán từ 2.200.000 VNĐ',
  //   ],
  //   enabled: false,
  // },
  // {
  //   value: 'EPAY',
  //   logo: 'https://dsvn.vn/images/logo-dvtt-EPA.png',
  //   title: 'Thanh toán trực tuyến qua cổng thanh toán Epay',
  //   descriptions: ['Ví điện tử, thẻ nội địa, thẻ quốc tế qua cổng thanh toán EPay'],
  //   enabled: false,
  // },
]);

const OBJECT_TYPE_OPTIONS = [
  {
    label: <span>Người Việt Nam</span>,
    title: 'Vietnamese',
    options: [
      {
        label: <span>Người lớn</span>,
        value: '1',
      },
      {
        label: <span>Trẻ em</span>,
        value: '2',
      },
      {
        label: <span>Sinh viên</span>,
        value: '3',
      },
      {
        label: <span>Người cao tuổi</span>,
        value: '4',
      },
    ],
  },
  {
    label: <span>Người nước ngoài</span>,
    title: 'Foreigner',
    options: [
      {
        label: <span>Người lớn</span>,
        value: '5',
      },
      {
        label: <span>Trẻ em</span>,
        value: '6',
      },
    ],
  },
];

export { PAYMENT_METHOD_OPTIONS, OBJECT_TYPE_OPTIONS };
