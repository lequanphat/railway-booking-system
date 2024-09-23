import { Button, Col, Divider, Flex, Form, Input, Row, Typography } from "antd";
import RULES from "~/config/rule";

const LoginRoute = () => {
  const [form] = Form.useForm();

  return (
    <div
      className="p-8 rounded-[8px] w-[90%] md:w-[460px]"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
      }}
    >
      <Typography className="text-[22px] font-semibold">Login</Typography>
      <Form form={form} className="pt-4" onFinish={null} layout="vertical">
        <Flex vertical>
          <Form.Item
            label="Username"
            name="username"
            rules={RULES.login.username}
            required={false}
          >
            <Input placeholder="Enter username..." />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={RULES.login.password}
            required={false}
          >
            <Input.Password placeholder="Enter password..." />
          </Form.Item>
        </Flex>
        <Form.Item className="pt-4 m-0">
          <a href="forgot-password" className="block text-end mb-3 ">
            Forgot password?
          </a>
          <Button
            loading={false}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
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
                <img src="/gg.svg" alt="" />
                Google
              </Button>
            </Col>
            <Col span={8}>
              <Button className="w-full">
                <img src="/wt.svg" alt="" />
                Twitter
              </Button>
            </Col>
            <Col span={8}>
              <Button className="w-full">
                <img src="/fb.svg" alt="" />
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
