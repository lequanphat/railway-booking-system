import {
  Card,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Tabs,
} from "antd";
import Title from "antd/es/typography/Title";
import { useMemo } from "react";
import DetailsTab from "~/features/schedules/components/DetailsTab";
import RouteTab from "~/features/schedules/components/RouteTab";
import SeatsTab from "~/features/schedules/components/SeatsTab";

const ScheduleDetailsPage = () => {
  const items = useMemo(
    () => [
      {
        key: "1",
        label: <p className="text-[16px]">Schedule</p>,
        children: <RouteTab />,
      },
      {
        key: "2",
        label: <p className="text-[16px]">Seats</p>,
        children: <SeatsTab />,
      },
      {
        key: "3",
        label: <p className="text-[16px]">Details</p>,
        children: <DetailsTab />,
      },
      {
        key: "4",
        label: <p className="text-[16px]">Description</p>,
        children: "Description tab",
      },
    ],
    []
  );
  return (
    <div className="py-8 bg-[#f3f3f5]">
      <Title level={4} className="text-center">
        SAI GON - HA NOI
      </Title>
      <Row gutter={24} className="mt-8 ">
        <Col span={24} md={12} xl={16} className="mb-6">
          <Card className="rounded-xl border-[1px] border-[#ddd]">
            <Title level={5}>SCHEDULE INFORMATION</Title>
            <Row gutter={20}>
              <Col span={8} className="mt-2">
                <p className="text-[16px]">Route:</p>
              </Col>
              <Col span={16} className="mt-2">
                <p className="text-[16px]">SAI GON - HA NOI</p>
              </Col>
              <Col span={8} className="mt-2">
                <p className="text-[16px]">Departure date:</p>
              </Col>
              <Col span={16} className="mt-2">
                <p className="text-[16px]">11:45 12/09/2024</p>
              </Col>
              <Col span={8} className="mt-2">
                <p className="text-[16px]">Arrival date:</p>
              </Col>
              <Col span={16} className="mt-2">
                <p className="text-[16px]">03:20 15/09/2024</p>
              </Col>
            </Row>
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={null}
              className="pt-4 text-[16px]"
            />
          </Card>
        </Col>
        <Col span={24} md={12} xl={8}>
          <Flex vertical gap={20}>
            <Card className="rounded-xl border-[1px] border-[#ddd]">
              <Title level={5}>ORDER INFORMATION</Title>
              <Form
                form={null}
                className="pt-4"
                onFinish={null}
                layout="vertical"
              >
                <Flex vertical>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={null}
                    required={false}
                  >
                    <Input placeholder="Enter full name..." />
                  </Form.Item>
                  <Form.Item
                    label="Phone number"
                    name="phone"
                    rules={null}
                    required={false}
                  >
                    <Input placeholder="Enter phone number..." />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={null}
                    required={false}
                  >
                    <Input placeholder="Enter email..." />
                  </Form.Item>

                  <Form.Item
                    label=""
                    name="email"
                    rules={null}
                    required={false}
                  >
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
