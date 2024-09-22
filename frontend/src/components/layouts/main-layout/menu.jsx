import { Flex, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "~/config/main-menu";

const Menu = () => {
  const location = useLocation();

  return (
    <Flex gap={50}>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          title={item.title}
          href={item.href}
          active={location?.pathname === item.href}
        />
      ))}
    </Flex>
  );
};

const MenuItem = ({ title, href, active = false }) => {
  const nagivate = useNavigate();

  return (
    <Typography
      level={5}
      className={`relative uppercase cursor-pointer  font-semibold hover:text-white ${
        active ? "text-white" : "text-[#e9e9e9]"
      }`}
      onClick={() => {
        nagivate(href);
      }}
    >
      {title}
      {active && (
        <div className="absolute bottom-[-10px] left-[50%] bg-[#e9e9e9] w-[80px] h-[2px] translate-x-[-50%]"></div>
      )}
    </Typography>
  );
};
export default Menu;
