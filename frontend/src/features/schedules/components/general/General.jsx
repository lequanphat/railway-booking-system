import { Button, Card, Col, Flex, Row, Tabs } from 'antd';
import { useContext, useMemo } from 'react';
import RouteTab from './RouteTab';
import DetailsTab from './DetailsTab';
import TicketInformation from './TicketInformation';
import PropTypes from 'prop-types';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';
import SeatsTab from './SeatsTab';

const General = () => {
  const { departureDate, departureRouteIndex, arrivalRouteIndex, routeSegments, selectedSeats, nextStep, train } =
    useContext(ScheduleDetailContext);

  const items = useMemo(
    () => [
      {
        key: '1',
        label: <p className="text-[16px]">Chọn ghế</p>,
        children: <SeatsTab />,
      },
      {
        key: '2',
        label: <p className="text-[16px]">Lộ trình di chuyển</p>,
        children: <RouteTab />,
      },

      {
        key: '3',
        label: <p className="text-[16px]">Bảng giá vé</p>,
        children: <DetailsTab />,
      },
      {
        key: '4',
        label: <p className="text-[16px]">Giảm giá</p>,
        children: 'Discount tab',
        disabled: true,
      },
    ],
    [],
  );

  return (
    <div>
      <Row gutter={24}>
        <Col span={24} md={12} xl={16} className="mb-6">
          <Card title="Thông tin chuyến tàu">
            <Row gutter={20}>
              <Col span={8} className="mt-2">
                <p className="text-base">Số hiệu tàu:</p>
              </Col>
              <Col span={16} className="mt-2">
                <p className="text-base">{train?.name}</p>
              </Col>
              <Col span={8} className="mt-2">
                <p className="text-base">Tuyến đường:</p>
              </Col>
              <Col span={16} className="mt-2">
                <p className="text-base">
                  {`${routeSegments?.[arrivalRouteIndex]?.station?.name} - ${routeSegments?.[departureRouteIndex]?.station?.name}`}
                </p>
              </Col>
              <Col span={8} className="mt-2">
                <p className="text-base">Khoảng cách:</p>
              </Col>
              <Col span={16} className="mt-2">
                <p className="text-base">
                  {routeSegments?.[arrivalRouteIndex]?.distance - routeSegments?.[departureRouteIndex]?.distance}
                  km
                </p>
              </Col>
              <Col span={8} className="mt-2">
                <p className="text-base">Thời gian đi:</p>
              </Col>
              <Col span={16} className="mt-2">
                <p className="text-base">
                  {routeSegments?.[departureRouteIndex]?.departure_time} {departureDate}
                </p>
              </Col>
              <Col span={8} className="mt-2">
                <p className="text-base">Thời gian đến:</p>
              </Col>
              <Col span={16} className="mt-2">
                <p className="text-base">
                  {routeSegments?.[arrivalRouteIndex]?.arrival_time} {departureDate}
                </p>
              </Col>
            </Row>
            <Tabs defaultActiveKey="1" items={items} onChange={null} className="pt-4 text-base" />
          </Card>
        </Col>
        <Col span={24} md={12} xl={8}>
          <Flex vertical gap={20}>
            <TicketInformation />
            <Button type="primary" disabled={!selectedSeats.length} onClick={nextStep}>
              TIẾP TỤC
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

General.propTypes = {
  departureDate: PropTypes.string,
  selectedDeparture: PropTypes.number,
  selectedArrival: PropTypes.number,
};

export default General;
