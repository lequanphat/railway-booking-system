import { Flex } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import logo from '~/assets/images/logo.png';

export default function AuthLayout() {
  return (
    <Flex vertical align="center" justify="center" className="w-[100vw] h-[100vh] relative">
      <AuthBackground />
      <Link to="/">
        <img src={logo} alt="logo" className="w-[160px] h-auto mb-4" />
      </Link>
      <Outlet />
    </Flex>
  );
}

const AuthBackground = () => {
  return (
    <div className="absolute inset-0 z-[-1] blur-[70px] overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-yellow-100 rounded-full opacity-100" />
      <div className="absolute bottom-[180px] w-[250px] h-[250px] bg-green-100 rounded-full ml-20 opacity-100" />
      <div className="absolute bottom-0 left-[-50px] w-[200px] h-[200px] bg-red-200 rounded-full opacity-100" />
    </div>
  );
};
