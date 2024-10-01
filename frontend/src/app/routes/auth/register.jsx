import { Button, Flex, Form, Input, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import RULES from '~/config/rule';
import { useRegisterMutation } from '~/features/auth/api/register';

const RegisterRoute = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const mutation = useRegisterMutation({
    mutationConfig: {
      onSuccess: (data) => {
        navigate('/auth/verify-account?email=' + data?.email);
      },
      onError: ({ response }) => {
        message.error(response?.data?.detail || 'Something went wrong!');
      },
    },
  });

  const handleRegister = () => {
    mutation.mutate({ data: form.getFieldsValue() });
  };
  return (
    <div
      className="p-8 rounded-[8px] w-[90%] md:w-[460px]"
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
      }}
    >
      <Typography className="text-[22px] font-semibold">Sign up</Typography>
      <Form form={form} className="pt-4" onFinish={handleRegister} layout="vertical">
        <Flex vertical>
          <Form.Item label="Name" name="name" rules={RULES.register.name} required={false}>
            <Input placeholder="Enter full name..." />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={RULES.register.email} required={false}>
            <Input placeholder="Enter email address..." />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={RULES.register.password} required={false}>
            <Input.Password placeholder="Enter password..." />
          </Form.Item>
        </Flex>
        <Form.Item className="pt-4 m-0">
          <Button loading={mutation.isPending} type="primary" htmlType="submit" className="w-full">
            Create Account
          </Button>
          <Typography className="text-center mt-6">
            You already have an account? <a href="login">Login</a>
          </Typography>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterRoute;
