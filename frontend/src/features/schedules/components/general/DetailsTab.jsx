import { useContext, useMemo } from 'react';
import { Flex } from 'antd';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';
import SeatPricesTable from './SeatPriceTable';

const DetailsTab = () => {
  const { train } = useContext(ScheduleDetailContext);
  const seatPricesData = useMemo(() => {
    return train?.seatPrices?.map((seatPrice, index) => ({
      index: index + 1,
      name: seatPrice?.seatType?.name,
      code: seatPrice?.seatType?.code,
      price: seatPrice?.original_price_per_km,
    }));
  }, [train]);
  return (
    <Flex vertical align="center" gap={16}>
      <h1 className="text-base font-semibold">Bảng giá vé tàu {train?.name}</h1>
      <div className="w-full">
        <SeatPricesTable data={seatPricesData} />
      </div>
    </Flex>
  );
};

export default DetailsTab;
