const PAYMENT_METHOD_OPTIONS = Object.freeze([
  {
    value: 1,
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
    value: 2,
    logo: 'https://dsvn.vn/images/logo-dvtt-MOM.png',
    title: 'Thanh toán trực tuyến qua ví điện tử MoMo',
    descriptions: ['Nhập mã MOMODSVN giảm đến 100k tại mục Ưu đãi'],
    enabled: true,
  },
  {
    value: 3,
    logo: 'https://dsvn.vn/images/logo-dvtt-ZLP.png',
    title: 'Thanh toán trực tuyến qua ví điện tử ZaloPay',
    descriptions: [
      'Thanh toán bằng hình thức Quét mã QR sử dụng ví điện tử ZaloPay',
      'Nhập mã TAUTET2025 giảm 30.000 VNĐ cho đơn hàng có giá trị thanh toán từ 1.200.000 VNĐ, giảm 70.000 VNĐ cho đơn hàng có giá trị thanh toán từ 2.200.000 VNĐ',
    ],
    enabled: false,
  },
  {
    value: 4,
    logo: 'https://dsvn.vn/images/logo-dvtt-EPA.png',
    title: 'Thanh toán trực tuyến qua cổng thanh toán Epay',
    descriptions: ['Ví điện tử, thẻ nội địa, thẻ quốc tế qua cổng thanh toán EPay'],
    enabled: false,
  },
]);

export { PAYMENT_METHOD_OPTIONS };
