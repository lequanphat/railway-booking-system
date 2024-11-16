import { Button, Flex, Layout, Menu } from 'antd';
import logo from '~/assets/logo-dsvn.png';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
const { Header: AntHeader } = Layout;

const items = [
  {
    key: '1',
    label: 'Trang chủ',
    url: '/',
  },
  {
    key: '2',
    label: 'Lịch trình',
    url: '/quiz',
  },
  {
    key: '3',
    label: 'Vé tàu',
    url: '/activities',
  },
  {
    key: '4',
    label: 'Tra cứu',
    url: '/activities',
  },
];

const HeaderV2 = () => {
  const navigate = useNavigate();

  return (
    <AntHeader className="sticky top-0 z-50  bg-white border-b px-4 shadow-sm">
      <div className="flex items-center justify-between w-[90%] md:w-[90%] xl:w-[1228px] 2xl:w-[1228px] mx-auto">
        <Flex align="center" gap={40} className="flex-1">
          <Link to="/">
            <img src={logo} alt="logo" className="h-16 w-auto object-cover" />
          </Link>
          <Menu
            rootClassName="header-main-layout"
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items}
            className="flex-1"
          />
        </Flex>
        <Button
          variant="filled"
          color="primary"
          shape="round"
          icon={<UserOutlined />}
          onClick={() => navigate('/auth/login')}
        >
          Đăng nhập
        </Button>
      </div>
    </AntHeader>
  );
};
export default HeaderV2;
