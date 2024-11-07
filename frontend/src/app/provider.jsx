import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntApp, ConfigProvider } from 'antd';
import AuthProvider from './auth-provider';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');

const queryClient = new QueryClient();
const AppProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Inter',
          borderRadius: 6,
          controlHeight: 34,
          colorPrimary: '#006dae',
          colorLinkHover: '#0050a3',
        },
        components: {
          Table: {
            defaultProps: {
              size: 'middle',
              bordered: true,
              scroll: { x: true },
            },
          },
        },
        hashed: false,
      }}
      locale={viVN}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AntApp>{children}</AntApp>
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default AppProvider;
