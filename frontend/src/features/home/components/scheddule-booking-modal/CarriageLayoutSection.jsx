import { Card, Col, Flex, Row, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { formatSeatCode } from '~/features/booking/utils/helpers';
import useBookingStore from '~/stores/booking-store';
import { convertToVnCurrency } from '~/utils/convert';

const CarriageLayoutSection = ({ id, name, row_count, floors, seats = [] }) => {
  const { totalDistance, selectedSeats, setSelectedSeats } = useBookingStore();

  const renderSeatColor = (seat) => {
    if (seat.is_occupied) {
      return 'bg-gray-300';
    }
    if (selectedSeats.find((item) => item.carriageId === seat.carriageId && item.id === seat.id)) {
      return 'bg-primary text-white';
    }
    return '';
  };

  const handleSelectSeat = (seat) => {
    if (seat.is_occupied) return;

    if (selectedSeats.find((item) => item.carriageId === seat.carriageId && item.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter((item) => item.carriageId !== seat.carriageId || item.id !== seat.id));
      return;
    }

    setSelectedSeats([
      ...selectedSeats,
      {
        ...seat,
        code: formatSeatCode({ layoutId: id, code: seat?.seatType?.code, position: seat?.position }),
      },
    ]);
  };

  return (
    <Card>
      <Flex vertical align="center" gap={18}>
        <h1 className="text-base font-semibold">{name}</h1>
        <Row gutter={[10, 10]}>
          {seats?.map((seat) => (
            <Col key={seat.id} span={24 / (floors * row_count)}>
              <Flex vertical align="center">
                <Tooltip
                  placement="top"
                  title={
                    <Flex vertical>
                      <h1>{seat?.seatType?.name}</h1>
                      <h2>
                        Giá:{' '}
                        <strong className="text-red-500">
                          {convertToVnCurrency(seat?.seatType?.original_price_per_km * totalDistance)}
                        </strong>
                      </h2>
                    </Flex>
                  }
                >
                  <Flex
                    vertical
                    align="center"
                    className={`${renderSeatColor(
                      seat,
                    )} w-[80px] h-[60px] border border-[#ccc] p-2 rounded-md cursor-pointer`}
                    onClick={() => {
                      handleSelectSeat(seat);
                    }}
                  >
                    <h1 className="font-semibold text-base">{seat?.position}</h1>
                    <p className="text-xs">
                      {formatSeatCode({ layoutId: id, code: seat?.seatType?.code, position: seat?.position })}
                    </p>
                  </Flex>
                </Tooltip>
              </Flex>
            </Col>
          ))}
        </Row>
      </Flex>
    </Card>
  );
};

CarriageLayoutSection.propTypes = {
  name: PropTypes.string,
  row_count: PropTypes.number,
  floors: PropTypes.number,
  seats: PropTypes.array,
};

export default CarriageLayoutSection;
