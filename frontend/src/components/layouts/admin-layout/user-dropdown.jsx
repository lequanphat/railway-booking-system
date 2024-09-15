import { Avatar, Dropdown } from "antd";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const UserDropdown = () => {
  const items = [
    {
      key: "1",
      label: "Account info",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
      placement="bottomLeft"
      arrow
    >
      <Avatar
        size="default"
        src={"https://avatars.githubusercontent.com/u/45101901?v=4"}
        className="cursor-pointer"
      />
    </Dropdown>
  );
};

export default UserDropdown;
