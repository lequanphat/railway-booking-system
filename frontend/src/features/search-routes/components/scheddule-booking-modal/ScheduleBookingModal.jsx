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

const ScheduleBookingModal = ({ open, onCancel }) => {
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
  } = useBookingStore();

  const { scheduleId, departureStation, arrivalStation } = seatSelectionStep === 1 ? oneWay : roundTrip;

  const { data: scheduleDetails, isLoading } = useGetScheduleDetails({
    id: scheduleId,
    queryConfig: { enabled: !!scheduleId && open },
  });

  const [selectedCarriage, setSelectedCarriage] = useState(null);

  useEffect(() => {
    const departureRouteIndex = scheduleDetails?.train?.routeSegments?.findIndex(
      (route) => route.station.id === parseInt(departureStation),
    );

    const arrivalRouteIndex = scheduleDetails?.train?.routeSegments?.findIndex(
      (route) => route.station.id === parseInt(arrivalStation),
    );

    // format train data
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
      train: formatTrainData,
      totalDistance,
      arrivalRouteIndex,
      departureRouteIndex,
      routeSegments: scheduleDetails?.train?.routeSegments,
      departureDate: scheduleDetails?.departureDate,
    });
  }, [scheduleDetails, initBookingStore, departureStation, arrivalStation]);

  const routeSegments = getRouteSegments();
  const train = getTrain();
  const totalDistance = getTotalDistance();
  const arrivalRouteIndex = getArrivalRouteIndex();
  const departureRouteIndex = getDepartureRouteIndex();
  const departureDate = getDepartureDate();

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
