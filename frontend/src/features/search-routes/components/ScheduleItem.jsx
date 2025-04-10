import { Button, Flex, Typography } from 'antd';
import PickupIcon from '~/assets/svg/pickup.svg';
import StationIcon from '~/assets/svg/station.svg';
import dayjs from 'dayjs';
import { calculateTravelTime } from '~/utils/calculateTravelTime';
import { FieldTimeOutlined } from '@ant-design/icons';
const { Text } = Typography;

export const ScheduleItem = ({
  id,
  train_name,
  arrival_segment,
  departure_segment,
  onChoose,
  handleOpenRouteSegmentModal,
}) => {
  return (
    <Flex align="center" justify="space-between" gap={10} className="shadow-sm p-4 rounded-xl bg-white" wrap={true}>
      <Flex gap={10} vertical>
        <span className="text-xs text-gray-500">Số hiệu</span>
        <Typography level={3} className="text-xl font-bold text-primary">
          {train_name}
        </Typography>
        <Button
          size="small"
          shape="round"
          icon={<FieldTimeOutlined />}
          iconPosition="end"
          onClick={() =>
            handleOpenRouteSegmentModal(id, arrival_segment.station_id, departure_segment.station_id, train_name)
          }
        >
          Hành trình
        </Button>
      </Flex>
      <Flex vertical>
        <Flex align="center">
          <Flex align="flex-end" vertical>
            <Text className="text-sm text-end text-gray-500">Ga {departure_segment.station_name}</Text>
            <Text className="text-[22px] font-medium">
              {dayjs(departure_segment.departure_time, 'HH:mm:ss').format('HH:mm')}
            </Text>
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
            <Text className="text-sm text-start text-gray-500">Ga {arrival_segment.station_name}</Text>
            <Text className="text-[22px] font-medium">
              {dayjs(arrival_segment.arrival_time, 'HH:mm:ss').format('HH:mm')}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <div>
        <Button variant="solid" color="primary" size="large" onClick={onChoose}>
          Chọn chỗ
        </Button>
      </div>
    </Flex>
  );
};
