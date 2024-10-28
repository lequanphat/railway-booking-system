import { Col, Flex, Row } from 'antd';
import PropTypes from 'prop-types';

const CarriageLayout = ({ name, row_count, floors, seats = [] }) => {
  return (
    <Flex vertical align="center" gap={18} className="border border-[#ccc] rounded-md p-6">
      <h1 className="text-base font-semibold">{name}</h1>
      <Row gutter={[20, 20]}>
        {seats?.map((seat) => (
          <Col key={seat.id} span={24 / (floors * row_count)}>
            <Flex vertical align="center">
              <Flex vertical align="center" className="w-[120px] h-[60px] border border-[#ccc] p-2 rounded-md">
                <h1 className="font-semibold text-lg">{seat?.position}</h1>
                <p className="text-xs">{seat?.seatType?.code}CODE</p>
              </Flex>
            </Flex>
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

CarriageLayout.propTypes = {
  name: PropTypes.string,
  row_count: PropTypes.number,
  floors: PropTypes.number,
  seats: PropTypes.array,
};

export default CarriageLayout;
