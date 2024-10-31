import { Card, Divider, Flex } from 'antd';
import Title from 'antd/lib/typography/Title';
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
    <Card className="rounded-xl border-[1px] border-[#ddd]">
      <Title level={5}>THÔNG TIN ĐẶT VÉ</Title>
      <Flex vertical gap={12} className="pt-2 text-[16px]">
        {selectedSeats.map((seat) => (
          <Flex key={seat.id} justify="space-between">
            <p>{seat.code}</p>
            <p className="text-red-500">{convertToVnCurrency(seat?.seatType?.original_price_per_km * totalDistance)}</p>
          </Flex>
        ))}

        <Flex vertical>
          <Divider />
          <Flex justify="space-between">
            <p>Tổng giá:</p>
            <h1 className="text-red-500 font-semibold">{convertToVnCurrency(totalPrice)}</h1>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TicketInformation;
