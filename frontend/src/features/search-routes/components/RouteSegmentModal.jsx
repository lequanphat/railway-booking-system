import { Flex, Modal, Space, Timeline } from 'antd';
import { useGetRouteSegments } from '~/features/search-routes/api/get-route-segments';
import { EnvironmentOutlined } from '@ant-design/icons';

const RouteSegmentModal = ({ id, arrivalId, departureId, trainName, open, onCancel }) => {
  const { data = [] } = useGetRouteSegments({
    params: {
      id,
      arrival_id: arrivalId,
      departure_id: departureId,
    },
    queryConfig: {
      enabled: open,
    },
  });

  const items = data?.map((item) => ({
    label: item.station_name,
    children: item.arrival_time,
  }));

  // get item first and last

  return (
    <Modal
      title="Chi tiết hành trình"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={350}
      centered
      destroyOnClose
    >
      <Flex justify="center" align="center" className="py-4 font-semibold" vertical>
        <Space align="center">
          <EnvironmentOutlined className="text-lg" />
          <p className="text-lg mb-1">Tàu {trainName}</p>
        </Space>
        <p className="text-base">
          {data[0]?.station_name} → {data[data.length - 1]?.station_name}
        </p>
      </Flex>

      <div className="max-h-[400px] overflow-auto">
        <Timeline mode="right" items={items} className="pt-6" />
      </div>
    </Modal>
  );
};

export default RouteSegmentModal;
