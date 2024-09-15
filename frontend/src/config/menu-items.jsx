import {
  HomeOutlined,
  ScheduleOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  FileSearchOutlined,
  DollarOutlined,
  BarChartOutlined,
  SafetyOutlined,
  NotificationOutlined,
  QuestionCircleOutlined,
  GiftOutlined,
} from "@ant-design/icons";

const menuItems = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: "Trang chủ",
    path: "/admin",
  },
  {
    key: "2",
    icon: <ScheduleOutlined />,
    label: "Quản lý lịch trình",
    children: [
      {
        key: "2-1",
        label: "Tuyến đường",
        path: "/schedules/routes",
      },
      {
        key: "2-2",
        label: "Lịch trình tàu",
        path: "/schedules/trains",
      },
      {
        key: "2-3",
        label: "Ga tàu",
        path: "/schedules/stations",
      },
      {
        key: "2-4",
        label: "Quản lý toa tàu",
        path: "/schedules/carriages",
      },
    ],
  },
  {
    key: "3",
    icon: <FileSearchOutlined />,
    label: "Quản lý đặt vé",
    children: [
      {
        key: "3-1",
        label: "Đặt vé mới",
        path: "/bookings/new",
      },
      {
        key: "3-2",
        label: "Danh sách đặt vé",
        path: "/bookings/list",
      },
      {
        key: "3-3",
        label: "Hủy/Đổi vé",
        path: "/bookings/change",
      },
    ],
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: "Quản lý khách hàng",
    children: [
      {
        key: "4-1",
        label: "Danh sách khách hàng",
        path: "/customers/list",
      },
      {
        key: "4-2",
        label: "Thẻ thành viên",
        path: "/customers/membership",
      },
    ],
  },
  {
    key: "5",
    icon: <DollarOutlined />,
    label: "Quản lý thanh toán",
    children: [
      {
        key: "5-1",
        label: "Giao dịch",
        path: "/payments/transactions",
      },
      {
        key: "5-2",
        label: "Hoàn tiền",
        path: "/payments/refunds",
      },
    ],
  },
  {
    key: "6",
    icon: <TeamOutlined />,
    label: "Quản lý nhân viên",
    children: [
      {
        key: "6-1",
        label: "Danh sách nhân viên",
        path: "/employees/list",
      },
      {
        key: "6-2",
        label: "Phân công công việc",
        path: "/employees/assignments",
      },
    ],
  },
  {
    key: "7",
    icon: <BarChartOutlined />,
    label: "Báo cáo & Thống kê",
    children: [
      {
        key: "7-1",
        label: "Doanh thu",
        path: "/reports/revenue",
      },
      {
        key: "7-2",
        label: "Lượng khách",
        path: "/reports/passengers",
      },
      {
        key: "7-3",
        label: "Hiệu suất tuyến đường",
        path: "/reports/route-performance",
      },
    ],
  },
  {
    key: "8",
    icon: <SafetyOutlined />,
    label: "An toàn & Bảo mật",
    path: "/security",
  },
  {
    key: "9",
    icon: <NotificationOutlined />,
    label: "Thông báo",
    path: "/notifications",
  },
  {
    key: "10",
    icon: <SettingOutlined />,
    label: "Cài đặt hệ thống",
    children: [
      {
        key: "10-1",
        label: "Quản lý tài khoản",
        path: "/settings/accounts",
      },
      {
        key: "10-2",
        label: "Cấu hình hệ thống",
        path: "/settings/system",
      },
      {
        key: "10-3",
        label: "Quản lý giá vé",
        path: "/settings/pricing",
      },
    ],
  },
  {
    key: "11",
    icon: <QuestionCircleOutlined />,
    label: "Hỗ trợ",
    path: "/support",
  },
  {
    key: "12",
    icon: <GiftOutlined />,
    label: "Khuyến mãi",
    children: [
      {
        key: "12-1",
        label: "Tạo khuyến mãi",
        path: "/promotions/create",
      },
      {
        key: "12-2",
        label: "Quản lý mã giảm giá",
        path: "/promotions/discount-codes",
      },
      {
        key: "12-3",
        label: "Chương trình theo mùa",
        path: "/promotions/seasonal",
      },
    ],
  },
];

export default menuItems;
