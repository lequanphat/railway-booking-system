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
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { useMemo } from "react";
import RouteTab from "~/features/schedules/components/RouteTab";

const ScheduleDetailsPage = () => {
  const items = useMemo(
    () => [
      {
        key: "1",
        label: <Typography className="text-[16px]">Schedule</Typography>,
        children: <RouteTab />,
      },
      {
        key: "2",
        label: <Typography className="text-[16px]">Seats</Typography>,
        children: "Seats tab",
      },
      {
        key: "3",
        label: <Typography className="text-[16px]">Details</Typography>,
        children: "Details tab",
      },
      {
        key: "4",
        label: <Typography className="text-[16px]">Description</Typography>,
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
      <Row gutter={24} className="mt-8">
        <Col span={24} md={12} xl={16}>
          <Card className="rounded-xl border-[1px] border-[#ddd]">
            <Title level={5}>SCHEDULE INFORMATION</Title>
            <Row gutter={20}>
              <Col span={24} md={12} xl={8} className="mt-2">
                <Typography className="text-[16px]">Route:</Typography>
              </Col>
              <Col span={24} md={12} xl={16} className="mt-2">
                <Typography className="text-[16px]">
                  SAI GON - HA NOI
                </Typography>
              </Col>
              <Col span={24} md={12} xl={8} className="mt-2">
                <Typography className="text-[16px]">Departure date:</Typography>
              </Col>
              <Col span={24} md={12} xl={16} className="mt-2">
                <Typography className="text-[16px]">
                  11:45 12/09/2024
                </Typography>
              </Col>
              <Col span={24} md={12} xl={8} className="mt-2">
                <Typography className="text-[16px]">Arrival date:</Typography>
              </Col>
              <Col span={24} md={12} xl={16} className="mt-2">
                <Typography className="text-[16px]">
                  03:20 15/09/2024
                </Typography>
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
              <Flex vertical gap={12} className="pt-2">
                <Flex justify="space-between">
                  <Typography className="text-[16px]">A01 Seat</Typography>
                  <Typography className="text-[16px]">$100.00</Typography>
                </Flex>
                <Flex justify="space-between">
                  <Typography className="text-[16px]">A02 Seat</Typography>
                  <Typography className="text-[16px]">$120.00</Typography>
                </Flex>
                <Flex justify="space-between">
                  <Typography className="text-[16px]">S01 Seat</Typography>
                  <Typography className="text-[16px]">$125.05</Typography>
                </Flex>
                <Divider />
                <Flex justify="space-between">
                  <Typography className="text-[16px]">Total</Typography>
                  <Typography className="text-[16px] text-[red]">
                    $345.05
                  </Typography>
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
