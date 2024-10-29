import { Card, Checkbox, Flex, Form, Input } from 'antd';
import Title from 'antd/lib/typography/Title';

const PersonalInformation = () => {
  return (
    <Card className="rounded-xl border-[1px] border-[#ddd]">
      <Title level={5}>THÔNG TIN CÁ NHÂN</Title>
      <Form form={null} className="pt-4" onFinish={null} layout="vertical">
        <Flex vertical>
          <Form.Item label="Name" name="name" rules={null} required={false}>
            <Input placeholder="Enter full name..." />
          </Form.Item>
          <Form.Item label="Phone number" name="phone" rules={null} required={false}>
            <Input placeholder="Enter phone number..." />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={null} required={false}>
            <Input placeholder="Enter email..." />
          </Form.Item>
          <Form.Item label="" name="email" rules={null} required={false}>
            <Checkbox>Accept our policies</Checkbox>
          </Form.Item>
        </Flex>
      </Form>
    </Card>
  );
};

export default PersonalInformation;
