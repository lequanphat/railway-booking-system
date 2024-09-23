import { Button, Flex, Form, Input } from "antd";
import Title from "antd/es/typography/Title";

const TicketsPage = () => {
  return (
    <div className="py-8 bg-white">
      <Title level={4} className="text-center">
        LOOK UP TICKETS INFORMATION
      </Title>
      <Form
        form={null}
        className="pt-4 w-[90%] md:w-[460px] mx-auto"
        onFinish={null}
        layout="vertical"
      >
        <Flex vertical>
          <Form.Item
            label="Phone number"
            name="phone"
            rules={null}
            required={false}
          >
            <Input placeholder="Enter phone number..." />
          </Form.Item>
          <Form.Item
            label="Ticket ID"
            name="ticket_id"
            rules={null}
            required={false}
          >
            <Input.Password placeholder="Enter ticket ID..." />
          </Form.Item>
        </Flex>
        <Form.Item className="m-0">
          <Flex justify="center">
            <Button
              loading={false}
              type="primary"
              htmlType="submit"
              className="rounded-full px-12"
            >
              Look up
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TicketsPage;
