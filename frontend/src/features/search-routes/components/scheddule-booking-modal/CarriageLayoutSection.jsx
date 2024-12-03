import { Card, Col, Flex, Row, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import SeatIcon from '~/components/icons/SeatIcon';
import { SEAT_TYPE } from '~/config/constants';
import useBookingStore from '~/stores/booking-store';
import { convertToVnCurrency } from '~/utils/convert';
import { useReserveTicket } from '../../api/reserve-ticket';
import { useCancelTicket } from '../../api/cancel-ticket';

const CarriageLayoutSection = ({ name, row_count, floors, seats = [] }) => {
  const {
    getScheduleId,
    getTotalDistance,
    getSelectedSeats,
    setSelectedSeats,
  } = useBookingStore();
  const totalDistance = getTotalDistance();
  const selectedSeats = getSelectedSeats();

  const reserveTicketMutation = useReserveTicket({});
  const cancelTicketMutation = useCancelTicket({});

  const renderSeatType = (seat) => {
    if (seat.is_occupied) {
      return SEAT_TYPE.UNAVAILABLE;
    }
    if (selectedSeats.find((item) => item.carriageId === seat.carriageId && item.id === seat.id)) {
      return SEAT_TYPE.SELECTED;
    }
    return SEAT_TYPE.AVAILABLE;
  };

  const handleSelectSeat = (seat) => {
    if (seat.is_occupied) return;

    const scheduleId = getScheduleId();
    if (selectedSeats.find((item) => item.carriageId === seat.carriageId && item.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter((item) => item.carriageId !== seat.carriageId || item.id !== seat.id));

      console.log('__cancel_reservation', { scheduleId, carriageId: seat.carriageId, seatId: seat.id });
      cancelTicketMutation.mutate({ scheduleId, carriageId: seat.carriageId, seatId: seat.id });
      return;
    }

    console.log('__reservation', { scheduleId, carriageId: seat.carriageId, seatId: seat.id });
    reserveTicketMutation.mutate({ scheduleId, carriageId: seat.carriageId, seatId: seat.id });
    setSelectedSeats([...selectedSeats, seat]);
  };

  return (
    <Card>
      <Flex vertical align="center" gap={18}>
        <h1 className="text-base font-semibold">{name}</h1>
        <Row gutter={[10, 10]} className="w-[440px]">
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
                  <div
                    className="relative cursor-pointer"
                    onClick={() => {
                      handleSelectSeat(seat);
                    }}
                  >
                    <SeatIcon type={renderSeatType(seat)} />
                    <h1 className="absolute top-[20%] left-[50%] translate-x-[-50%] text-base font-semibold text-white">
                      {seat?.position}
                    </h1>
                  </div>
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
