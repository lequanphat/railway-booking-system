import { Card, Flex, Space } from 'antd';
import PersonOnSeatIcon from '~/components/icons/PersonOnSeatIcon';
import useBookingStore from '~/stores/booking-store';
import { convertToVnCurrency } from '~/utils/convert';

const TicketCard = () => {
  const { oneWay } = useBookingStore();

  return (
    <Space className="w-full" direction="vertical">
      <Card
        title="Vé chiều đi"
        bordered={false}
        styles={{
          body: {
            paddingBottom: 12,
            paddingTop: 12,
          },
        }}
        className="shadow-sm"
      >
        <h1 className="text-base font-semibold">Sài Gòn → Hà Nội</h1>
      </Card>
      {oneWay?.selectedSeats.map((seat) => (
        <TicketItem
          key={seat.id}
          position={seat?.position}
          price={seat?.seatType?.original_price_per_km * oneWay.totalDistance}
          seatName={seat?.seatType?.name}
          carriageName={`${seat?.carriagePosition}: ${seat?.carriageName}`}
        />
      ))}
    </Space>
  );
};

const TicketItem = ({ position, price, carriageName, seatName }) => {
  return (
    <Card>
      <div>
        <Space align="center">
          <PersonOnSeatIcon />
          <p className="text-base">{seatName}</p>
        </Space>
        <Flex align="center" justify="space-between">
          <h1 className="text-base font-semibold">
            Ghế {position} - Toa {carriageName.split(':')[0]}
          </h1>
          <strong className="text-end float-end text-red-500">{convertToVnCurrency(price)}</strong>
        </Flex>
      </div>
    </Card>
  );
};
export default TicketCard;
