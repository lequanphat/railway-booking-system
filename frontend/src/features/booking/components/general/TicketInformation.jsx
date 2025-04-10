import { Card, Divider, Empty, Flex } from 'antd';
import { useContext, useMemo } from 'react';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';
import { convertToVnCurrency } from '~/utils/convert';

const TicketInformation = () => {
  const { totalDistance, selectedSeats } = useContext(ScheduleDetailContext);

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((acc, seat) => {
      return acc + seat.seatType.original_price_per_km * totalDistance;
    }, 0);
  }, [selectedSeats, totalDistance]);

  return (
    <Card title="Thông tin đặt vé">
      <div className="overflow-y-auto max-h-[300px]">
        <Flex vertical gap={12} className="pt-2 text-[16px]">
          {selectedSeats.length > 0 ? (
            selectedSeats.map((seat) => (
              <ChildTicketItem
                key={seat.id}
                code={seat.code}
                price={seat?.seatType?.original_price_per_km * totalDistance}
                seatName={seat?.seatType?.name}
                carriageName={`${seat?.carriagePosition}: ${seat?.carriageName}`}
              />
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa chọn ghế" />
          )}
        </Flex>
      </div>
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
    <Flex vertical className="border border-primary p-2 rounded-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 border-[8px] border-l-primary border-t-primary border-r-transparent border-b-transparent "></div>
      <Flex justify="space-between" className="w-full">
        <h1 className="text-base font-medium">{code}</h1>
        <h2 className="text-base text-red-500">{convertToVnCurrency(price)}</h2>
      </Flex>
      <p className="text-xs">Loại: {seatName}</p>
      <p className="text-xs">Toa: {carriageName}</p>
    </Flex>
  );
};

export default TicketInformation;
