import { Button, Col, Divider, Flex, Form, Input, message, Row, Typography } from 'antd';
import RULES from '~/config/rule';
import { useLoginMutation } from '~/features/auth/api/login';
import fb from '~/assets/svg/fb.svg';
import gg from '~/assets/svg/gg.svg';
import wt from '~/assets/svg/wt.svg';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '~/stores/auth-store';

const LoginRoute = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const [form] = Form.useForm();
  const mutation = useLoginMutation({
    mutationConfig: {
      onSuccess: (data) => {
        localStorage.setItem('token', data?.token);
        setUser(data?.user);
        navigate('/');
      },
      onError: ({ response }) => {
        message.error(response?.data?.detail || 'Something went wrong!');
      },
    },
  });

  const handleLogin = () => {
    mutation.mutate({ data: form.getFieldsValue() });
  };

  return (
    <div
      className="p-8 rounded-[8px] w-[90%] md:w-[460px]"
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
      }}
    >
      <Typography className="text-[22px] font-semibold">Login</Typography>
      <Form form={form} className="pt-4" onFinish={handleLogin} layout="vertical">
        <Flex vertical>
          <Form.Item label="Email" name="email" rules={RULES.login.email} required={false} validateTrigger="onBlur">
            <Input placeholder="Enter email..." />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={RULES.login.password}
            required={false}
            validateTrigger="onBlur"
          >
            <Input.Password placeholder="Enter password..." />
          </Form.Item>
        </Flex>
        <Form.Item className="pt-4 m-0">
          <a href="forgot-password" className="block text-end mb-3 ">
            Forgot password?
          </a>
          <Button loading={false} type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form.Item>
        <Form.Item className="pt-4 m-0">
          <Divider>
            <Typography className="text-[#333] mb-2">Login with</Typography>
          </Divider>
          <Row gutter={12}>
            <Col span={8}>
              <Button className="w-full">
                <img src={gg} alt="" />
                Google
              </Button>
            </Col>
            <Col span={8}>
              <Button className="w-full">
                <img src={wt} alt="" />
                Twitter
              </Button>
            </Col>
            <Col span={8}>
              <Button className="w-full">
                <img src={fb} alt="" />
                Facebook
              </Button>
            </Col>
          </Row>
          <Typography className="text-center mt-6">
            You do not have an account? <a href="register">Register</a>
          </Typography>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginRoute;
