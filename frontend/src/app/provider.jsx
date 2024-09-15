import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { App as AntApp } from "antd";

const queryClient = new QueryClient();
const AppProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter",
          borderRadius: 4,
          controlHeight: 37,
        },
        components: {
          Table: {
            defaultProps: {
              size: "middle",
              bordered: true,
              scroll: { x: true },
            },
          },
        },
        hashed: false,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AntApp>{children}</AntApp>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default AppProvider;
