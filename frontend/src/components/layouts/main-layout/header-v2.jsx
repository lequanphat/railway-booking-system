import { Button, Flex, Layout, Menu } from 'antd';
import logo from '~/assets/logo-dsvn.png';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '~/stores/auth-store';
import UserDropdown from '~/components/layouts/main-layout/user-dropdown';
const { Header: AntHeader } = Layout;

const items = [
  {
    key: 'HOME',
    label: 'Trang chủ',
    url: '/',
  },
  // {
  //   key: 'SCHEDULE',
  //   label: 'Lịch trình',
  //   url: '/search',
  // },
  {
    key: 'TICKETS',
    label: 'Vé tàu',
    url: '/tickets',
  },
  {
    key: 'ORDERS',
    label: 'Hóa đơn',
    url: '/orders',
  },
];

const HeaderV2 = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const onClick = (e) => {
    navigate(items.find((item) => item.key === e.key).url);
  };

  return (
    <AntHeader className="sticky top-0 z-50  bg-white px-4 shadow-sm">
      <div className="flex items-center justify-between w-[90%] md:w-[90%] xl:w-[1228px] 2xl:w-[1228px] mx-auto">
        <Flex align="center" gap={40} className="flex-1">
          <Link to="/">
            <img src={logo} alt="logo" className="h-16 w-auto object-cover" />
          </Link>
          <Menu
            onClick={onClick}
            rootClassName="header-main-layout"
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items}
            className="flex-1"
          />
        </Flex>
        {isAuthenticated ? (
          <UserDropdown />
        ) : (
          <Button
            variant="filled"
            color="primary"
            shape="round"
            icon={<UserOutlined />}
            onClick={() => navigate('/auth/login')}
          >
            Đăng nhập
          </Button>
        )}
      </div>
    </AntHeader>
  );
};
export default HeaderV2;
