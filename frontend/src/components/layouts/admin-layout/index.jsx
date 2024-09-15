import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout, Space, theme } from "antd";
import { Outlet } from "react-router-dom";
import FooterAdmin from "~/components/layouts/admin-layout/footer";
import SiderResponsive from "~/components/layouts/admin-layout/sider-responsive";
import UserDropdown from "~/components/layouts/admin-layout/user-dropdown";
import useMenuStore from "~/stores/menu-store";
const { Header, Content } = Layout;

const AdminLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { siderVisible, setSiderVisible } = useMenuStore();

  return (
    <Layout hasSider>
      <SiderResponsive />
      <Layout>
        <Header className="p-0 bg-white sticky top-0 z-50 shadow-sm flex justify-between items-center px-5">
          <Space>
            <Button
              type="text"
              icon={
                siderVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              }
              onClick={() => setSiderVisible(!siderVisible)}
            />
            <Input
              placeholder="Tìm kiếm..."
              variant="filled"
              suffix={<SearchOutlined />}
            />
          </Space>
          <UserDropdown />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <FooterAdmin />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
