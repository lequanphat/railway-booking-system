import { Card, Flex, Space, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import EmptyRoutes from '~/features/search-routes/components/EmptyRoutes';
import { calculateTravelTime } from '~/utils/calculateTravelTime';
const { Text, Title } = Typography;

const ReturnCard = ({ params, returnSchedules, isRefetching }) => {
  console.log('returnSchedules', returnSchedules);
  return (
    <Space className="w-full" direction="vertical">
      <Card
        title="Chọn chiều về"
        bordered={false}
        styles={{
          body: {
            paddingBottom: 12,
            paddingTop: 12,
          },
        }}
        className="shadow-sm"
      >
        <Title level={5}>
          {params.get('arrival_name')} → {params.get('departure_name')}
        </Title>
        <Text className="capitalize">{dayjs(params.get('return_date')).format('dddd, DD/MM/YYYY')}</Text>
      </Card>
      {!isRefetching ? (
        returnSchedules && returnSchedules.length > 0 ? (
          returnSchedules.map((schedule) => <ReturnCardItem key={schedule.id} schedule={schedule} />)
        ) : (
          <EmptyRoutes size="small" />
        )
      ) : (
        <div className="text-center py-4">
          <Spin />  
        </div>
      )}
    </Space>
  );
};

const ReturnCardItem = ({ schedule }) => {
  const { arrival_segment, departure_segment } = schedule;
  return (
    <Flex align="center" justify="space-between" gap={10} className="shadow-sm p-4 rounded-xl bg-white">
      <Flex align="flex-end" vertical>
        <Text className="text-xs text-end text-gray-500">Ga {departure_segment.station_name}</Text>
        <Text className="text-base font-medium">
          {dayjs(departure_segment.departure_time, 'HH:mm:ss').format('HH:mm')}
        </Text>
      </Flex>

      <Flex align="center" justify="center" className="w-[110px]" vertical>
        <Text className="text-xs px-4 text-center">{calculateTravelTime(departure_segment, arrival_segment)}</Text>
      </Flex>

      <Flex vertical>
        <Text className="text-xs text-start text-gray-500">Ga {arrival_segment.station_name}</Text>
        <Text className="text-base font-medium">{dayjs(arrival_segment.arrival_time, 'HH:mm:ss').format('HH:mm')}</Text>
      </Flex>
    </Flex>
  );
};

export default ReturnCard;
