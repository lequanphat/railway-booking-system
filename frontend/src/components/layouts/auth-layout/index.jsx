import { Flex } from "antd";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      className="w-[100vw] h-[100vh]"
    >
      <img src="/logo.png" alt="logo" className="w-[160px] h-auto mb-4" />
      <Outlet />
    </Flex>
  );
}
