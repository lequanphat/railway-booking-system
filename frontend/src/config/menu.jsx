import {
  HomeOutlined,
  ScheduleOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  FileSearchOutlined,
  DollarOutlined,
  BarChartOutlined,
  TruckOutlined,
} from '@ant-design/icons';

const adminMenu = Object.freeze([
  {
    key: '1',
    icon: <HomeOutlined />,
    label: 'Trang chủ',
    path: '/admin',
  },
  {
    key: '2',
    icon: <ScheduleOutlined />,
    label: 'Quản lý lịch trình',
    children: [
      // {
      //   key: '2-1',
      //   label: 'Tuyến đường',
      //   path: '/admin/schedules/routes',
      // },
      {
        key: '2-5',
        label: 'Tạo lịch trình',
        path: '/admin/generate-schedules',
      },
      {
        key: '2-2',
        label: 'Lịch trình tàu',
        path: '/admin/train-schedules',
      },
      // {
      //   key: '2-3',
      //   label: 'Ga tàu',
      //   path: '/admin/schedules/stations',
      // },
      {
        key: '2-4',
        label: 'Generate Route',
        path: '/admin/schedules/generate-route-segments',
      },
    ],
  },
  {
    key: '3',
    icon: <FileSearchOutlined />,
    label: 'Quản lý đặt vé',
    children: [
      // {
      //   key: '3-1',
      //   label: 'Đặt vé mới',
      //   path: '/bookings/new',
      // },
      {
        key: '3-2',
        label: 'Quản lý hóa đơn',
        path: '/admin/orders',
      },
      {
        key: '3-3',
        label: 'Quản lý hành khách',
        path: '/admin/passengers',
      },
      // {
      //   key: '3-4',
      //   label: 'Hủy/Đổi vé',
      //   path: '/bookings/change',
      // },
    ],
  },
  {
    key: '4',
    icon: <UserOutlined />,
    label: 'Quản lý khách hàng',
    path: '/admin/customers',
    // children: [
    //   {
    //     key: '4-1',
    //     label: 'Danh sách khách hàng',
    //   },
    //   {
    //     key: '4-2',
    //     label: 'Thẻ thành viên',
    //     path: '/customers/membership',
    //   },
    // ],
  },
  // {
  //   key: '5',
  //   icon: <DollarOutlined />,
  //   label: 'Quản lý thanh toán',
  //   children: [
  //     {
  //       key: '5-1',
  //       label: 'Giao dịch',
  //       path: '/payments/transactions',
  //     },
  //     {
  //       key: '5-2',
  //       label: 'Hoàn tiền',
  //       path: '/payments/refunds',
  //     },
  //   ],
  // },
  {
    key: '6',
    icon: <TeamOutlined />,
    label: 'Quản lý nhân viên',
    path: '/admin/employees',
  },
  {
    key: '7',
    icon: <TruckOutlined />,
    label: 'Quản lý tàu hỏa',
    children: [
      {
        key: '7-1',
        label: 'Quản lý loại ghế',
        path: '/admin/seats',
      },
      {
        key: '7-2',
        label: 'Quản lý loại toa tàu',
        path: '/admin/carriage-layouts',
      },
      {
        key: '7-3',
        label: 'Quản lý tàu hỏa',
        path: '/admin/trains',
      },
    ],
  },
  {
    key: '8',
    icon: <BarChartOutlined />,
    label: 'Báo cáo & Thống kê',
    path: '/admin/reports/tickets',
  },
  // {
  //   key: '9',
  //   icon: <SafetyOutlined />,
  //   label: 'An toàn & Bảo mật',
  //   path: '/security',
  // },
  // {
  //   key: '10',
  //   icon: <NotificationOutlined />,
  //   label: 'Thông báo',
  //   path: '/notifications',
  // },
  {
    key: '11',
    icon: <SettingOutlined />,
    label: 'Cài đặt hệ thống',
    children: [
      {
        key: '11-1',
        label: 'Quản lý đối tượng',
        path: '/admin/settings/objects',
      },
      // {
      //   key: '11-2',
      //   label: 'Cấu hình hệ thống',
      //   path: '/settings/system',
      // },
    ],
  },
  // {
  //   key: '12',
  //   icon: <QuestionCircleOutlined />,
  //   label: 'Hỗ trợ',
  //   path: '/support',
  // },
  // {
  //   key: '13',
  //   icon: <GiftOutlined />,
  //   label: 'Khuyến mãi',
  //   children: [
  //     {
  //       key: '13-1',
  //       label: 'Tạo khuyến mãi',
  //       path: '/promotions/create',
  //     },
  //     {
  //       key: '13-2',
  //       label: 'Quản lý mã giảm giá',
  //       path: '/promotions/discount-codes',
  //     },
  //     {
  //       key: '13-3',
  //       label: 'Chương trình theo mùa',
  //       path: '/promotions/seasonal',
  //     },
  //   ],
  // },
]);

const userMenu = Object.freeze([
  { title: 'Trang chủ', href: '/' },
  { title: 'Lịch trình', href: '/schedules' },
  { title: 'Vé tàu', href: '/tickets' },
  { title: 'Đơn hàng', href: '/orders' },
  { title: 'Liên hệ', href: '/contacts' },
  { title: 'Về chúng tôi', href: '/about' },
]);

export { adminMenu, userMenu };
