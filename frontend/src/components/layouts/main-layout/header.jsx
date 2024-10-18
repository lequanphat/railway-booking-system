import { MenuOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useState } from 'react';
import Menu from './menu';
import MobileMenu from './mobile-menu';
import logo from '~/assets/images/logo.png';
import downloadAppIcon from '~/assets/svg/download_app.svg';
import personIcon from '~/assets/svg/person.svg';
import UserDropdown from './user-dropdown';
import useAuthStore from '~/stores/auth-store';
import { Link } from 'react-router-dom';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated } = useAuthStore();

  return (
    <Flex className="bg-primary min-h-[160px]" vertical justify="start" align="center">
      <Flex
        className="h-[100px] mb-2 w-[90%] md:w-[90%] xl:w-[1128px] 2xl:w-[1128px]"
        justify="space-between"
        align="start"
      >
        <div className="py-4 ">
          <Button className="hidden md:inline-flex border-none !p-2 gap-0" shape="round">
            <img src={downloadAppIcon} alt="download" className="w-[24px] h-auto" />
            <span className="px-2">Download app</span>
          </Button>
          <Button
            className="block md:hidden text-white hover:text-white"
            type="text"
            icon={<MenuOutlined />}
            onClick={() => {
              setOpenMenu(true);
            }}
          ></Button>
        </div>
        <div className="hidden md:block bg-white px-24 pt-[60px] rounded-full translate-y-[-50%]">
          <img src={logo} alt="logo" className="w-[120px] h-auto" />
        </div>
        <div className="py-4">
          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <Link to="/auth/login">
              <Button className="!p-2 border-none" shape="round">
                <img src={personIcon} alt="login" className="w-[20px] h-auto" />
                <span className="pr-2 font-medium text-sm">Đăng nhập/Đăng ký</span>
              </Button>
            </Link>
          )}
        </div>
      </Flex>
      <div className="hidden md:block">
        <Menu />
      </div>
      <div className="block md:hidden">
        <MobileMenu
          open={openMenu}
          handleClose={() => {
            setOpenMenu(false);
          }}
        />
      </div>
    </Flex>
  );
};
export default Header;
