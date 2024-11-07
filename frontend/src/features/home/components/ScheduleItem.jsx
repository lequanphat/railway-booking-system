import { Button, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import PickupIcon from '~/assets/svg/pickup.svg';
import StationIcon from '~/assets/svg/station.svg';
import { EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { calculateTravelTime } from '~/utils/calculateTravelTime';
const { Text } = Typography;

export const ScheduleItem = ({ id, train_name, arrival_segment, departure_segment }) => {
  return (
    <Flex align="center" justify="space-between" gap={10} className="border p-4 rounded-xl bg-white">
      <Flex vertical>
        <span className="text-xs mb-1 text-gray-500">Số hiệu</span>
        <Typography level={3} className="text-xl font-bold text-primary">
          {train_name}
        </Typography>
      </Flex>
      <Flex vertical>
        <Flex align="center">
          <Flex align="flex-end" vertical>
            <Text className="text-[22px] font-medium">
              {dayjs(departure_segment.departure_time, 'HH:mm:ss').format('HH:mm')}
            </Text>
            <Text className="text-sm text-end">Ga {departure_segment.station_name}</Text>
          </Flex>
          <Flex align="center" className="mx-4">
            <img src={PickupIcon} alt="" />
            <div className="border-b-2 border-[#ccc] border-dotted w-[100px]"></div>
            <Flex vertical justify="center" align="center">
              <Text className="text-sm  px-4">{calculateTravelTime(departure_segment, arrival_segment)}</Text>
            </Flex>
            <div className="border-b-[2px] border-[#ccc] border-dotted w-[100px]"></div>
            <img src={StationIcon} alt="" />
          </Flex>
          <Flex vertical>
            <Text className="text-[22px] font-medium">
              {dayjs(arrival_segment.arrival_time, 'HH:mm:ss').format('HH:mm')}
            </Text>
            <Text className="text-sm text-start">Ga {arrival_segment.station_name}</Text>
          </Flex>
        </Flex>
      </Flex>
      <div>
        <Link
          to={`/schedules/${id}?departure_station=${departure_segment.station_id}&arrival_station=${arrival_segment.station_id}`}
        >
          <Button variant="filled" color="primary" shape="round" icon={<EyeOutlined />}>
            Chọn
          </Button>
        </Link>
      </div>
    </Flex>
  );
};
