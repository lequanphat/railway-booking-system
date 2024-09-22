import { Button, Col, Flex, Row, Typography } from "antd";

export const ScheduleItem = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      gap={10}
      className="border-[1px] border-[#ccc] p-4 rounded-xl"
    >
      <Flex vertical>
        <Typography level={3} className="text-[24px] font-bold text-primary">
          SE06
        </Typography>
        <Typography
          level={3}
          className="text-[18px] font-semibold text-[#5e5e5e]"
        >
          #123123123
        </Typography>
      </Flex>
      <Flex vertical>
        <Flex align="center">
          <Typography className="text-[22px] font-medium">07:45</Typography>
          <Flex align="center" className="mx-4">
            <img src="/pickup.svg" alt="" />
            <div className="border-b-[2px] border-[#ccc] border-dotted w-[100px]"></div>
            <Flex vertical justify="center" align="center">
              <Typography className="text-[16px]">12 hours</Typography>
              <Typography>(Asian/Ho Chi Minh)</Typography>
            </Flex>
            <div className="border-b-[2px] border-[#ccc] border-dotted w-[100px]"></div>
            <img src="/station.svg" alt="" />
          </Flex>
          <Typography className="text-[22px] font-medium">03:50</Typography>
        </Flex>
        <Row className="pt-4" gutter={24}>
          <Col span={24} md={12} xl={8}>
            <Typography>Type 01: 45 seats</Typography>
          </Col>
          <Col span={24} md={12} xl={8}>
            Type 02: 02 seats
          </Col>
          <Col span={24} md={12} xl={8}>
            Type 03: 14 seats
          </Col>
        </Row>
      </Flex>
      <div>
        <Flex gap={8} align="center" className="mb-2">
          <Typography className="text-[18px] font-medium">Discount</Typography>
          <Typography className="text-[24px] font-medium text-primary">
            {Math.floor(Math.random() * 100)}%
          </Typography>
        </Flex>
        <Button
          type="primary"
          className="rounded-full"
          onClick={() => {
            alert("=))");
          }}
        >
          CHOOSE ROUTE
        </Button>
      </div>
    </Flex>
  );
};
