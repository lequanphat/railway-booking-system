import { Button, Card, Col, DatePicker, Flex, Form, Input, Pagination, Radio, Row } from 'antd';
import { useStations } from '~/features/home/api/get-stations';
import { ScheduleItem } from '~/features/home/components/ScheduleItem';

const HomeRoute = () => {
  const { data, isLoading } = useStations({});

  console.log(data);
  console.log(isLoading);

  return (
    <div className="py-6">
      <Card
        className="border-[1px] border-primary rounded-2xl 
      shadow-primary shadow-sm"
      >
        <div>
          <Form form={null} variant="filled" layout="vertical">
            <Radio.Group onChange={null} value={1} className="mb-4">
              <Radio value={1}>One way</Radio>
              <Radio value={2}>Round Trip</Radio>
            </Radio.Group>
            <Row gutter={24}>
              <Col span={24} md={12} xl={6}>
                <Form.Item label="Departure">
                  <Input placeholder="Ho Chi Minh" className="py-3" />
                </Form.Item>
              </Col>
              <Col span={24} md={12} xl={6}>
                <Form.Item label="Destination">
                  <Input placeholder="Ha Noi" className="py-3" />
                </Form.Item>
              </Col>
              <Col span={24} md={12} xl={6}>
                <Form.Item label="Departure Date">
                  <DatePicker
                    format={{
                      format: 'YYYY-MM-DD',
                      type: 'mask',
                    }}
                    onChange={null}
                    className="w-full py-3"
                  />
                </Form.Item>
              </Col>
              <Col span={24} md={12} xl={6}>
                <Form.Item label="Return date">
                  <DatePicker
                    format={{
                      format: 'YYYY-MM-DD',
                      type: 'mask',
                    }}
                    onChange={null}
                    className="w-full py-3"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <Flex justify="center">
          <Button type="primary" className="py-6 px-8 min-w-[220px] rounded-full translate-y-[48px] text-[18px]">
            Find a train
          </Button>
        </Flex>
      </Card>
      <Flex vertical className="py-12" gap={24}>
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
      </Flex>
      <Flex justify="end">
        <Pagination defaultCurrent={1} total={50} />
      </Flex>
    </div>
  );
};

export default HomeRoute;
