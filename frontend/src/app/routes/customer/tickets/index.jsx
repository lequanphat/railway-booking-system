import { Button, Card, Col, Flex, Form, Input, Pagination, Row } from 'antd';
import { useState } from 'react';
import { useMyTickets } from '~/features/tickets/api/get-my-tickets';
import Tickets from '~/features/tickets/components/Tickets';

const TicketsPage = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  const {
    data: { items, meta },
    isLoading,
  } = useMyTickets({ keyword, page, size: 9 });

  const handleLookup = () => {
    const { phone } = form.getFieldsValue();
    setKeyword(phone);
  };

  return (
    <div className="py-8">
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Card>
            <h1 className="text-center text-lg font-semibold">Tra cứu thông tin vé</h1>
            <Form
              form={form}
              initialValues={{
                phone: '',
              }}
              className="pt-4 w-[90%] md:w-[460px] mx-auto"
              layout="vertical"
              onFinish={handleLookup}
            >
              <Flex vertical>
                <Form.Item label="Phone number" name="phone" rules={null} required={false}>
                  <Input placeholder="Enter phone number..." />
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
            {items?.map((ticket) => (
              <Col span={8} key={ticket.id}>
                <Tickets {...ticket} />
              </Col>
            ))}
          </Row>
        </Col>
        <Flex className="w-full" align="center" justify="center">
          <Pagination
            defaultCurrent={meta?.current_page}
            total={meta?.total_pages}
            onChange={(value) => {
              setPage(value);
            }}
          />
        </Flex>
      </Row>
    </div>
  );
};

export default TicketsPage;
