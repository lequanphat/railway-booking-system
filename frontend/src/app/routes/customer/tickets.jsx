import { Button, Card, Col, Flex, Form, Input, Row } from 'antd';
import { useState } from 'react';
import Tickets from '~/features/tickets/components/Tickets';

const TicketsPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLockup = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert('Chưa làm xong');
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div className="py-8">
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Card>
            <h1 className="text-center text-lg font-semibold">Tra cứu thông tin vé</h1>
            <Form form={null} className="pt-4 w-[90%] md:w-[460px] mx-auto" onFinish={handleLockup} layout="vertical">
              <Flex vertical>
                <Form.Item label="Phone number" name="phone" rules={null} required={false}>
                  <Input placeholder="Enter phone number..." />
                </Form.Item>
                <Form.Item label="Ticket ID" name="ticket_id" rules={null} required={false}>
                  <Input placeholder="Enter ticket ID..." />
                </Form.Item>
              </Flex>
              <Form.Item className="m-0">
                <Flex justify="center">
                  <Button loading={isLoading} type="primary" htmlType="submit" className="rounded-full px-12">
                    Look up
                  </Button>
                </Flex>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={24}>
          <Row gutter={[20, 20]} className="py-4">
            <Col span={8}>
              <Tickets />
            </Col>
            <Col span={8}>
              <Tickets />
            </Col>
            <Col span={8}>
              <Tickets />
            </Col>
            <Col span={8}>
              <Tickets />
            </Col>
            <Col span={8}>
              <Tickets />
            </Col>
            <Col span={8}>
              <Tickets />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TicketsPage;
