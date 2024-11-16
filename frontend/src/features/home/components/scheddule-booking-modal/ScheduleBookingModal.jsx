import { Button, Card, Col, Flex, Modal, Row } from 'antd';
import { useGetScheduleDetails } from '~/features/booking/api/get-schedule-details';
import CarriageLayoutSection from './CarriageLayoutSection';
import useBookingStore from '~/stores/booking-store';
import { useEffect, useMemo, useState } from 'react';
import {
  CarriageAbstractPattern,
  TrainHeadAbstractPattern,
} from '~/features/booking/components/general/CarriageAbstractFrame';
import TicketInformation from './TicketInformation';
import { Link } from 'react-router-dom';

const ScheduleBookingModal = ({ open, onCancel, scheduleId = 1, departureStation = 6, arrivalStation = 1 }) => {
  const {
    departureDate,
    train,
    totalDistance,
    arrivalRouteIndex,
    departureRouteIndex,
    routeSegments,
    initBookingStore,
  } = useBookingStore();
  const { data: scheduleDetails } = useGetScheduleDetails({ id: scheduleId, queryConfig: { enabled: !!scheduleId } });

  const [selectedCarriage, setSelectedCarriage] = useState(null);

  useEffect(() => {
    const departureRouteIndex = scheduleDetails?.train?.routeSegments?.findIndex(
      (route) => route.station.id === parseInt(departureStation),
    );

    const arrivalRouteIndex = scheduleDetails?.train?.routeSegments?.findIndex(
      (route) => route.station.id === parseInt(arrivalStation),
    );

    const formatTrainData = {
      ...scheduleDetails?.train,
      carriages: scheduleDetails?.train?.carriages?.map((carriage) => ({
        ...carriage,
        carriageLayout: {
          ...carriage.carriageLayout,
          seats: carriage.carriageLayout.seats.map((seat) => ({
            ...seat,
            carriageId: carriage.id,
            carriagePosition: carriage.position,
            carriageName: carriage.carriageLayout.name,
            is_occupied: scheduleDetails?.tickets.some(
              (ticket) => ticket.seat.id === seat.id && ticket.carriage.id === carriage.id,
            ),
            seatType:
              scheduleDetails?.train?.seatPrices.find((seatPrice) => seatPrice?.seatType?.id === seat?.seatType?.id)
                ?.seatType || seat.seatType,
          })),
        },
      })),
    };

    const totalDistance =
      scheduleDetails?.train?.routeSegments?.[arrivalRouteIndex]?.distance -
      scheduleDetails?.train?.routeSegments?.[departureRouteIndex]?.distance;
    initBookingStore({
      scheduleId,
      train: formatTrainData,
      totalDistance,
      departureStation,
      arrivalStation,
      arrivalRouteIndex,
      departureRouteIndex,
      routeSegments: scheduleDetails?.train?.routeSegments,
      departureDate: scheduleDetails?.departureDate,
    });
  }, [scheduleId, scheduleDetails, initBookingStore, departureStation, arrivalStation]);

  useEffect(() => {
    setSelectedCarriage(train?.carriages?.[0]?.id);
  }, [train]);

  const options = useMemo(
    () =>
      train?.carriages
        ?.map((carriage) => ({
          label: `Toa ${carriage?.position}: ${carriage?.carriageLayout?.name}`,
          value: carriage?.id,
          position: carriage?.position,
        }))
        ?.reverse(),
    [train],
  );

  const currentCarriage = useMemo(
    () => train?.carriages?.find((carriage) => carriage?.id === selectedCarriage),
    [selectedCarriage, train],
  );

  return (
    <Modal
      title={
        <p className="text-base">
          {train?.name} |{' '}
          {`${routeSegments?.[arrivalRouteIndex]?.station?.name} - ${routeSegments?.[departureRouteIndex]?.station?.name}`}{' '}
          |{departureDate} | {totalDistance} km
        </p>
      }
      centered
      open={open}
      onOk={null}
      onCancel={onCancel}
      width={1200}
      footer={
        <>
          <Link to={'/booking'}>
            <Button type="primary">Tiến đến thanh toán</Button>
          </Link>
        </>
      }
    >
      <Row gutter={[16, 16]} className="py-4">
        <Col span={16}>
          <Flex vertical gap={16}>
            <Card vertical>
              <Flex gap={4} justify="center">
                {options?.map((option) => (
                  <CarriageAbstractPattern
                    key={option.value}
                    name={option.label}
                    isSelected={selectedCarriage === option.value}
                    {...option}
                    onClick={() => {
                      setSelectedCarriage(option.value);
                    }}
                  />
                ))}
                <TrainHeadAbstractPattern name={train?.name} />
              </Flex>
            </Card>
            <CarriageLayoutSection
              {...currentCarriage?.carriageLayout}
              name={`Toa ${currentCarriage?.position}: ${currentCarriage?.carriageLayout?.name}`}
            />
          </Flex>
        </Col>
        <Col span={8}>
          <TicketInformation />
        </Col>
      </Row>
    </Modal>
  );
};

export default ScheduleBookingModal;
