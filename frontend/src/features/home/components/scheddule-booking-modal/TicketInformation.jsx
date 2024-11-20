import { Card, Col, Divider, Empty, Flex, Row } from 'antd';
import { useMemo } from 'react';
import useBookingStore from '~/stores/booking-store';
import { convertToVnCurrency } from '~/utils/convert';

const TicketInformation = () => {
  const { getTotalDistance, getSelectedSeats } = useBookingStore();

  const totalDistance = getTotalDistance();
  const selectedSeats = getSelectedSeats();

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((acc, seat) => {
      return acc + seat.seatType.original_price_per_km * totalDistance;
    }, 0);
  }, [selectedSeats, totalDistance]);

  return (
    <Card title="Thông tin đặt vé">
      <Flex vertical gap={12} className="pt-2 text-[16px] max-h-[350px] overflow-y-auto overflow-x-hidden">
        {selectedSeats.length > 0 ? (
          <Row gutter={[8, 8]}>
            {selectedSeats.map((seat) => (
              <Col span={24} className="mt-2" key={seat.id}>
                <ChildTicketItem
                  code={seat.code}
                  price={seat?.seatType?.original_price_per_km * totalDistance}
                  seatName={seat?.seatType?.name}
                  carriageName={`${seat?.carriagePosition}: ${seat?.carriageName}`}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa chọn ghế" />
        )}
      </Flex>
      <Flex vertical>
        <Divider />
        <Flex justify="space-between">
          <p>Tổng giá:</p>
          <h1 className="text-red-500 font-semibold">{convertToVnCurrency(totalPrice)}</h1>
        </Flex>
      </Flex>
    </Card>
  );
};

export const ChildTicketItem = ({ code, price, carriageName, seatName }) => {
  return (
    <Flex vertical className="border border-primary p-2 rounded-md relative overflow-hidden">
      <div className="absolute top-0 left-0 border-[8px] border-l-primary border-t-primary border-r-transparent border-b-transparent "></div>
      <Flex justify="space-between" className="w-full">
        <h1 className="text-base font-normal">{code}</h1>
        <p className="text-xs font-medium text-red-500">{convertToVnCurrency(price)}</p>
      </Flex>
      <p className="text-xs">Loại: {seatName}</p>
      <p className="text-xs">Toa: {carriageName}</p>
    </Flex>
  );
};

export default TicketInformation;
