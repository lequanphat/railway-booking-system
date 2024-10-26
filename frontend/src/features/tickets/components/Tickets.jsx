import { Card, Col, Divider, Flex, Row } from 'antd';
import TrainIcon from '~/components/icons/TrainIcon';

const Tickets = () => {
  return (
    <Card
      styles={{
        body: {
          padding: 0,
        },
      }}
      className="rounded-md overflow-hidden"
    >
      <Flex className="bg-primary p-4 text-white" justify="space-between" align="center">
        <Flex vertical align="start">
          <h1 className="text-base">Sài Gòn</h1>
          <h2 className="text-lg">10:30</h2>
          <p>Ga Miền Tây</p>
        </Flex>
        <Flex align="center" gap={2}>
          <p>-----</p>
          <TrainIcon />
          <p>-----</p>
        </Flex>
        <Flex vertical align="end">
          <h1 className="text-base">Hà Nội</h1>
          <h2 className="text-lg">19:45</h2>
          <p>Ga Đống Đa</p>
        </Flex>
      </Flex>
      <Row className="p-4" gutter={[12, 12]}>
        <Col span={8}>
          <p className="text-xs opacity-70">Mã tàu</p>
          <h1 className="text-lg">SE01</h1>
        </Col>
        <Col span={8}>
          <p className="text-xs opacity-70">Khởi hành</p>
          <h1 className="text-lg">10:30</h1>
        </Col>
        <Col span={8}>
          <p className="text-xs opacity-70">Đến nơi</p>
          <h1 className="text-lg">19:45</h1>
        </Col>
        <Col span={8}>
          <p className="text-xs opacity-70">Mã ghế</p>
          <h1 className="text-lg">A01</h1>
        </Col>
        <Col span={8}>
          <p className="text-xs opacity-70">Điểm đi</p>
          <h1 className="text-lg">Sài Gòn</h1>
        </Col>
        <Col span={8}>
          <p className="text-xs opacity-70">Điểm đến</p>
          <h1 className="text-lg">Hà Nội</h1>
        </Col>
        <Col span={24}>
          <p className="text-xs opacity-70">Hàng khách</p>
          <h1 className="text-lg">Quan Phat</h1>
        </Col>
        <Col span={24}>
          <Divider className="mb-4 mt-1" />
          <p className="text-xs opacity-70">Giá vé</p>
          <h1 className="text-lg text-red-600">1.240.000đ</h1>
        </Col>
      </Row>
    </Card>
  );
};

export default Tickets;
