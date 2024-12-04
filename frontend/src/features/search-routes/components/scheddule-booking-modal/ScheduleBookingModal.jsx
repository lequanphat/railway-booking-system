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
import { TripType } from '~/enums/trip-type';
import { useSubscription } from 'react-stomp-hooks';
import { useGetReservationsBySchedule } from '../../api/get-reservations-by-schedule';
import { useQueryClient } from '@tanstack/react-query';

const ScheduleBookingModal = ({ open, onCancel }) => {
  const queryClient = useQueryClient();

  const [selectedCarriage, setSelectedCarriage] = useState(null);
  const {
    oneWay,
    roundTrip,
    type,
    seatSelectionStep,
    getTrain,
    getTotalDistance,
    getArrivalRouteIndex,
    getDepartureRouteIndex,
    getDepartureDate,
    getRouteSegments,
    initBookingStore,
    nextSeatSelectionStep,
    resetSelectedSeats,
    getSelectedSeats,
    setTrain,
  } = useBookingStore();

  const { scheduleId, departureStation, arrivalStation } = seatSelectionStep === 1 ? oneWay : roundTrip;

  const { data: scheduleDetails, isLoading } = useGetScheduleDetails({
    id: scheduleId,
    queryConfig: { enabled: !!scheduleId && open },
  });

  const { data: reservations } = useGetReservationsBySchedule({
    scheduleId: scheduleId,
    queryConfig: { enabled: !!scheduleId && open },
  });

  const routeSegments = getRouteSegments();
  const train = getTrain();
  const totalDistance = getTotalDistance();
  const arrivalRouteIndex = getArrivalRouteIndex();
  const departureRouteIndex = getDepartureRouteIndex();
  const departureDate = getDepartureDate();
  const selectedSeats = getSelectedSeats();

  useEffect(() => {
    const departureRouteIndex = scheduleDetails?.train?.routeSegments?.findIndex(
      (route) => route.station.id === parseInt(departureStation),
    );

    const arrivalRouteIndex = scheduleDetails?.train?.routeSegments?.findIndex(
      (route) => route.station.id === parseInt(arrivalStation),
    );

    const totalDistance =
      scheduleDetails?.train?.routeSegments?.[arrivalRouteIndex]?.distance -
      scheduleDetails?.train?.routeSegments?.[departureRouteIndex]?.distance;
    initBookingStore({
      totalDistance,
      arrivalRouteIndex,
      departureRouteIndex,
      routeSegments: scheduleDetails?.train?.routeSegments,
      departureDate: scheduleDetails?.departureDate,
    });

    //
    setSelectedCarriage(scheduleDetails?.train?.carriages?.[0]?.id);
  }, [scheduleDetails, initBookingStore, departureStation, arrivalStation, setSelectedCarriage]);

  useEffect(() => {
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
            is_occupied:
              scheduleDetails?.tickets.some(
                (ticket) => ticket.seat.id === seat.id && ticket.carriage.id === carriage.id,
              ) ||
              (reservations?.some(
                (reservation) =>
                  scheduleDetails?.id == reservation?.scheduleId &&
                  reservation.seatId === seat.id &&
                  reservation.carriageId === carriage.id,
              ) &&
                !selectedSeats?.some(
                  (selectedSeat) => selectedSeat.id === seat.id && selectedSeat.carriageId === carriage.id,
                )),
            seatType:
              scheduleDetails?.train?.seatPrices.find((seatPrice) => seatPrice?.seatType?.id === seat?.seatType?.id)
                ?.seatType || seat.seatType,
          })),
        },
      })),
    };
    setTrain(formatTrainData);
  }, [setTrain, scheduleDetails, reservations, selectedSeats]);

  // handle socket
  useSubscription('/topic/seats', (originalMessage) => {
    const message = JSON.parse(originalMessage.body);
    // check if the message is for the current schedule
    if (message?.scheduleId !== scheduleId) return;
    queryClient.invalidateQueries({ queryKey: ['reservations'], exact: false });
  });
  // end handle socket

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

  // handle next

  const handleFinishSession = () => {
    console.log('__on_finish_session');
    nextSeatSelectionStep();
    onCancel();
  };

  const handleCloseModal = () => {
    console.log('__on_close_modal');
    resetSelectedSeats();
    onCancel();
  };

  if (isLoading) return null;

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
      onCancel={handleCloseModal}
      width={1200}
      styles={{
        body: {
          minHeight: '75vh',
        },
      }}
      loading={isLoading}
      footer={
        <>
          {type === TripType.OneWay || seatSelectionStep === 2 ? (
            <Link to={'/booking'}>
              <Button type="primary">Tiến đến thanh toán</Button>
            </Link>
          ) : (
            <Button type="primary" onClick={handleFinishSession}>
              Tiếp tục chọn chiều về
            </Button>
          )}
        </>
      }
    >
      <Row gutter={[16, 16]} className="py-4">
        <Col xs={24} sm={24} md={16}>
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
        <Col xs={24} sm={24} md={8}>
          <TicketInformation />
        </Col>
      </Row>
    </Modal>
  );
};

export default ScheduleBookingModal;
