import { Flex } from 'antd';
import { Outlet } from 'react-router-dom';
import logo from '~/assets/images/logo.png';

export default function AuthLayout() {
  return (
    <Flex vertical align="center" justify="center" className="w-[100vw] h-[100vh]">
      <a href="/">
        <img src={logo} alt="logo" className="w-[160px] h-auto mb-4" />
      </a>
      <Outlet />
    </Flex>
  );
}
