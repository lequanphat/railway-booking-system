import { Layout } from 'antd';
import Footer from './footer';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderV2 from '~/components/layouts/main-layout/header-v2';
import HomeBanner from '~/components/ui/HomeBanner';

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <Layout className="bg-background">
      <HeaderV2 />
      {isHomePage && <HomeBanner />}
      <div className="w-[90%] md:w-[90%] xl:w-[1228px] 2xl:w-[1228px] mx-auto">
        <Outlet />
      </div>
      <Footer style={{ textAlign: 'center' }} />
    </Layout>
  );
};

export default MainLayout;
