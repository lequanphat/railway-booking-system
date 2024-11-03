import { Card, Col, Divider, Flex, Row } from 'antd';
import TrainIcon from '~/components/icons/TrainIcon';
import { convertToVnCurrency } from '~/utils/convert';

const Tickets = ({
  departureStation,
  arrivalStation,
  departureTime,
  arrivalTime,
  originalPrice,
  price,
  fullName,
  seatType,
}) => {
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
          <h1 className="text-base">{departureStation}</h1>
          <h2 className="text-base">{departureTime.split(' ')?.[0]}</h2>
          <p>Ga {departureStation}</p>
        </Flex>
        <Flex align="center" gap={2}>
          <p>-----</p>
          <TrainIcon />
          <p>-----</p>
        </Flex>
        <Flex vertical align="end">
          <h1 className="text-base">{arrivalStation}</h1>
          <h2 className="text-base">{arrivalTime.split(' ')?.[0]}</h2>
          <p>Ga {arrivalStation}</p>
        </Flex>
      </Flex>
      <Row className="p-4" gutter={[12, 12]}>
        <Col span={8}>
          <p className="text-xs opacity-70">Mã tàu</p>
          <h1 className="text-base">SE01</h1>
        </Col>
        <Col span={8}>
          <p className="text-xs opacity-70">Khởi hành</p>
          <h1 className="text-base">{departureTime.split(' ')?.[0]}</h1>
        </Col>
        <Col span={8}>
          <p className="text-xs opacity-70">Đến nơi</p>
          <h1 className="text-base">{arrivalTime.split(' ')?.[0]}</h1>
        </Col>
        <Col span={8}>
          <p className="text-xs opacity-70">Mã ghế</p>
          <h1 className="text-base">{seatType.split(' ')?.[0]}</h1>
        </Col>
        <Col span={8}>
          <p className="text-xs opacity-70">Điểm đi</p>
          <h1 className="text-base">{departureStation}</h1>
        </Col>
        <Col span={8}>
          <p className="text-xs opacity-70">Điểm đến</p>
          <h1 className="text-base">{arrivalStation}</h1>
        </Col>
        <Col span={24}>
          <p className="text-xs opacity-70">Hàng khách</p>
          <h1 className="text-base">{fullName}</h1>
        </Col>
        <Col span={24}>
          <Divider className="mb-4 mt-1" />
          <p className="text-xs opacity-70">Giá vé</p>
          <h1 className="text-base">
            <del className="text-gray-500 mr-4">{convertToVnCurrency(originalPrice)}</del>
            <strong className="text-red-600">{convertToVnCurrency(price)}</strong>
          </h1>
        </Col>
      </Row>
    </Card>
  );
};

export default Tickets;
