import { Card, Checkbox, Col, Divider, Flex, Form, Input, Row, Tabs } from 'antd';
import Title from 'antd/es/typography/Title';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetScheduleDetails } from '~/features/schedules/api/get-schedule-details';
import DetailsTab from '~/features/schedules/components/details-tab/DetailsTab';
import RouteTab from '~/features/schedules/components/routes-tab/RouteTab';
import SeatsTab from '~/features/schedules/components/seats-tab/SeatsTab';

const ScheduleDetailsPage = () => {
  const { id } = useParams();
  console.log('id', id);
  const { data: scheduleDetails } = useGetScheduleDetails({ id, queryConfig: { enabled: !!id } });

  const items = useMemo(
    () => [
      {
        key: '1',
        label: <p className="text-[16px]">Chọn ghế</p>,
        children: <SeatsTab train={scheduleDetails?.train} />,
      },
      {
        key: '2',
        label: <p className="text-[16px]">Lộ trình di chuyển</p>,
        children: <RouteTab routeSegments={scheduleDetails?.train?.routeSegments} />,
      },

      {
        key: '3',
        label: <p className="text-[16px]">Bảng giá vé</p>,
        children: <DetailsTab train={scheduleDetails?.train} />,
      },
      {
        key: '4',
        label: <p className="text-[16px]">Giảm giá</p>,
        children: 'Discount tab',
        disabled: true,
      },
    ],
    [scheduleDetails],
  );
  return (
    <div className="py-8 bg-[#f3f3f5]">
      <Title level={4} className="text-center">
        {scheduleDetails?.train?.route?.name}
      </Title>
      <Row gutter={24} className="mt-8 ">
        <Col span={24} md={12} xl={16} className="mb-6">
          <Card className="rounded-xl border-[1px] border-[#ddd]">
            <Title level={5}>THÔNG TIN CHUYẾN TÀU</Title>
            <Row gutter={20}>
              <Col span={8} className="mt-2">
                <p className="text-[16px]">Route:</p>
              </Col>
              <Col span={16} className="mt-2">
                <p className="text-[16px]">{scheduleDetails?.train?.route?.name}</p>
              </Col>
              <Col span={8} className="mt-2">
                <p className="text-[16px]">Departure date:</p>
              </Col>
              <Col span={16} className="mt-2">
                <p className="text-[16px]">
                  {scheduleDetails?.train?.routeSegments?.[0]?.departure_time} {scheduleDetails?.departureDate}
                </p>
              </Col>
              <Col span={8} className="mt-2">
                <p className="text-[16px]">Arrival date:</p>
              </Col>
              <Col span={16} className="mt-2">
                <p className="text-[16px]">
                  {
                    scheduleDetails?.train?.routeSegments?.[scheduleDetails?.train?.routeSegments?.length - 1]
                      ?.arrival_time
                  }{' '}
                  {scheduleDetails?.departureDate}
                </p>
              </Col>
            </Row>
            <Tabs defaultActiveKey="1" items={items} onChange={null} className="pt-4 text-[16px]" />
          </Card>
        </Col>
        <Col span={24} md={12} xl={8}>
          <Flex vertical gap={20}>
            <Card className="rounded-xl border-[1px] border-[#ddd]">
              <Title level={5}>THÔNG TIN ĐẶT VÉ</Title>
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
            <Card className="rounded-xl border-[1px] border-[#ddd]">
              <Title level={5}>PRICE DETAILS</Title>
              <Flex vertical gap={12} className="pt-2 text-[16px]">
                <Flex justify="space-between">
                  <p>A01 Seat</p>
                  <p>$100.00</p>
                </Flex>
                <Flex justify="space-between">
                  <p>A02 Seat</p>
                  <p>$120.00</p>
                </Flex>
                <Flex justify="space-between">
                  <p>S01 Seat</p>
                  <p>$125.05</p>
                </Flex>
                <Divider />
                <Flex justify="space-between">
                  <p>Total</p>
                  <p className="text-[red]">$345.05</p>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default ScheduleDetailsPage;
