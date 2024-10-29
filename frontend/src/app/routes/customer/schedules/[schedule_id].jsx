import { Button, Card, Col, Flex, Row, Tabs } from 'antd';
import Title from 'antd/es/typography/Title';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';
import { useGetScheduleDetails } from '~/features/schedules/api/get-schedule-details';
import DetailsTab from '~/features/schedules/components/details-tab/DetailsTab';
import RouteTab from '~/features/schedules/components/routes-tab/RouteTab';
import SeatsTab from '~/features/schedules/components/seats-tab/SeatsTab';
import PersonalInformation from '~/features/schedules/components/tickets-information/PersonalInformation';
import TicketInformation from '~/features/schedules/components/tickets-information/TicketInformation';

const ScheduleDetailsPage = () => {
  const { id } = useParams();
  const [fakeDeparture, fakeArrival] = [1, 12];

  const [selectedSeats, setSelectedSeats] = useState([]);
  const { data: scheduleDetails } = useGetScheduleDetails({ id, queryConfig: { enabled: !!id } });

  const { formatTrainData, totalDistance } = useMemo(() => {
    if (!scheduleDetails) return {};
    const formatTrainData = {
      ...scheduleDetails?.train,
      carriages: scheduleDetails?.train?.carriages?.map((carriage) => ({
        ...carriage,
        carriageLayout: {
          ...carriage.carriageLayout,
          seats: carriage.carriageLayout.seats.map((seat) => ({
            ...seat,
            seatType:
              scheduleDetails?.train?.seatPrices.find((seatPrice) => seatPrice?.seatType?.id === seat?.seatType?.id)
                ?.seatType || seat.seatType,
          })),
        },
      })),
    };
    const totalDistance =
      scheduleDetails?.train?.routeSegments?.[fakeArrival]?.distance -
      scheduleDetails?.train?.routeSegments?.[fakeDeparture]?.distance;
    return { formatTrainData, totalDistance };
  }, [scheduleDetails, fakeArrival, fakeDeparture]);

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
    <ScheduleDetailContext.Provider
      value={{
        train: formatTrainData,
        routeSegments: scheduleDetails?.train?.routeSegments,
        totalDistance,
        selectedSeats,
        setSelectedSeats,
      }}
    >
      <div className="py-8 bg-[#f3f3f5]">
        <Title level={4} className="text-center">
          {scheduleDetails?.train?.routeSegments?.[fakeDeparture]?.station?.name} -{' '}
          {scheduleDetails?.train?.routeSegments?.[fakeArrival]?.station?.name}
        </Title>
        <Row gutter={24} className="mt-8 ">
          <Col span={24} md={12} xl={16} className="mb-6">
            <Card className="rounded-xl border-[1px] border-[#ddd]">
              <Title level={5}>THÔNG TIN CHUYẾN TÀU</Title>
              <Row gutter={20}>
                <Col span={8} className="mt-2">
                  <p className="text-[16px]">Tuyến đường:</p>
                </Col>
                <Col span={16} className="mt-2">
                  <p className="text-[16px]">
                    {`${scheduleDetails?.train?.routeSegments?.[fakeArrival]?.station?.name} - ${scheduleDetails?.train?.routeSegments?.[fakeDeparture]?.station?.name}`}
                  </p>
                </Col>
                <Col span={8} className="mt-2">
                  <p className="text-[16px]">Khoảng cách:</p>
                </Col>
                <Col span={16} className="mt-2">
                  <p className="text-[16px]">
                    {scheduleDetails?.train?.routeSegments?.[fakeArrival]?.distance -
                      scheduleDetails?.train?.routeSegments?.[fakeDeparture]?.distance}
                    km
                  </p>
                </Col>
                <Col span={8} className="mt-2">
                  <p className="text-[16px]">Thời gian đi:</p>
                </Col>
                <Col span={16} className="mt-2">
                  <p className="text-[16px]">
                    {scheduleDetails?.train?.routeSegments?.[fakeDeparture]?.departure_time}{' '}
                    {scheduleDetails?.departureDate}
                  </p>
                </Col>
                <Col span={8} className="mt-2">
                  <p className="text-[16px]">Thời gian đến:</p>
                </Col>
                <Col span={16} className="mt-2">
                  <p className="text-[16px]">
                    {scheduleDetails?.train?.routeSegments?.[fakeArrival]?.arrival_time}{' '}
                    {scheduleDetails?.departureDate}
                  </p>
                </Col>
              </Row>
              <Tabs defaultActiveKey="1" items={items} onChange={null} className="pt-4 text-[16px]" />
            </Card>
          </Col>
          <Col span={24} md={12} xl={8}>
            <Flex vertical gap={20}>
              <PersonalInformation />
              <TicketInformation />
              <Button type="primary">ĐẶT NGAY</Button>
            </Flex>
          </Col>
        </Row>
      </div>
    </ScheduleDetailContext.Provider>
  );
};

export default ScheduleDetailsPage;
