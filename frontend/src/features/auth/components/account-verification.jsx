import { Button, Flex } from 'antd';

export const AccountVerificationSuccess = () => {
  return (
    <Flex vertical gap={10}>
      <h1 className="text-center">
        Chúc mừng bạn đã xác nhận tài khoản thành công, giờ bạn đã có thể đăng nhập tài khoản của mình
      </h1>
      <Button type="primary" href="/auth/login">
        Back to login
      </Button>
    </Flex>
  );
};

export const AccountVerificationFail = () => {
  return <div>Error</div>;
};
