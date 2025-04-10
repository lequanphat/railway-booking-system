import { Col, Flex, Row, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';
import { formatSeatCode } from '../../utils/helpers';
import { convertToVnCurrency } from '~/utils/convert';

const CarriageLayout = ({ id, name, row_count, floors, seats = [] }) => {
  const { totalDistance, selectedSeats, setSelectedSeats } = useContext(ScheduleDetailContext);

  const renderSeatColor = (seat) => {
    if (seat.is_occupied) {
      return 'bg-gray-300';
    }
    if (selectedSeats.find((item) => item.carriageId === seat.carriageId && item.id === seat.id)) {
      return 'bg-primary text-white';
    }
    return '';
  };

  return (
    <Flex vertical align="center" gap={18} className="border rounded-md p-6">
      <h1 className="text-base font-semibold">{name}</h1>
      <Row gutter={[20, 20]}>
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
                  className={`${renderSeatColor(seat)} w-[100px] h-[60px] border p-2 rounded-md cursor-pointer`}
                  onClick={() => {
                    if (seat.is_occupied) return;
                    setSelectedSeats((prev) => {
                      if (prev.find((item) => item.carriageId === seat.carriageId && item.id === seat.id)) {
                        return prev.filter((item) => item.carriageId !== seat.carriageId || item.id !== seat.id);
                      }
                      return [
                        ...prev,
                        {
                          ...seat,
                          code: formatSeatCode({ layoutId: id, code: seat?.seatType?.code, position: seat?.position }),
                        },
                      ];
                    });
                  }}
                >
                  <h1 className="font-semibold text-lg">{seat?.position}</h1>
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
  );
};

CarriageLayout.propTypes = {
  name: PropTypes.string,
  row_count: PropTypes.number,
  floors: PropTypes.number,
  seats: PropTypes.array,
};

export default CarriageLayout;
