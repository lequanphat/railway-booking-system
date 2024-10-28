import { useMemo } from 'react';
import SeatPricesTable from './SeatPriceTable';
import { Flex } from 'antd';
import PropTypes from 'prop-types';

const DetailsTab = ({ train }) => {
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
DetailsTab.propTypes = {
  train: PropTypes.object,
};

export default DetailsTab;
