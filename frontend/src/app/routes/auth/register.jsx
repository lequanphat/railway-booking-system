import { Button, Flex, Form, Input, Typography } from "antd";
import RULES from "~/config/rule";

const RegisterRoute = () => {
  const [form] = Form.useForm();
  return (
    <div
      className="p-8 rounded-[8px] min-w-[460px]"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
      }}
    >
      <Typography className="text-[22px] font-semibold">Sign up</Typography>
      <Form form={form} className="pt-4" onFinish={null} layout="vertical">
        <Flex vertical>
          <Form.Item
            label="Name"
            name="name"
            rules={RULES.register.name}
            required={false}
          >
            <Input placeholder="Enter full name..." />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={RULES.register.username}
            required={false}
          >
            <Input placeholder="Enter username..." />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={RULES.register.email}
            required={false}
          >
            <Input placeholder="Enter email address..." />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={RULES.register.password}
            required={false}
          >
            <Input.Password placeholder="Enter password..." />
          </Form.Item>
        </Flex>
        <Form.Item className="pt-4 m-0">
          <Button
            loading={false}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
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
