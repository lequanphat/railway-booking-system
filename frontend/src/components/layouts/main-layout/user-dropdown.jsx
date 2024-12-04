import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '~/stores/auth-store';

const UserDropdown = () => {
  const navigate = useNavigate();
  const { user, resetUser } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem('token');
    resetUser();
    navigate('/auth/login');
  };
  const items = [
    {
      key: '1',
      label: 'Account info',
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: 'Settings',
      icon: <SettingOutlined />,
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={['click']}
      placement="bottomRight"
      className="cursor-pointer"
      arrow
    >
      <Avatar src={user?.avatar ?? '/default_avatar.jpg'} />
    </Dropdown>
  );
};

export default UserDropdown;
