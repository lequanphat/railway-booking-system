import { Button, Flex, Result, Steps } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';
import { useGetScheduleDetails } from '~/features/schedules/api/get-schedule-details';
import Completion from '~/features/schedules/components/completion/Completion';
import General from '~/features/schedules/components/general/General';
import InfoConfirmation from '~/features/schedules/components/info-confirmation/InfoConfirmation';
import PaymentConfirmation from '~/features/schedules/components/payment/PaymentConfirmation';

const ScheduleDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const departureStation = parseInt(searchParams.get('departure_station'));
  const arrivalStation = parseInt(searchParams.get('arrival_station'));

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerInformation, setPassengerInformation] = useState([]);

  const { data: scheduleDetails } = useGetScheduleDetails({ id, queryConfig: { enabled: !!id } });

  const { departureRouteIndex, arrivalRouteIndex, formatTrainData, totalDistance } = useMemo(() => {
    if (!scheduleDetails) return {};
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

    return { departureRouteIndex, arrivalRouteIndex, formatTrainData, totalDistance };
  }, [scheduleDetails, departureStation, arrivalStation]);

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = useCallback(() => {
    setCurrentStep((pre) => pre + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const prevStep = useCallback(() => {
    setCurrentStep((pre) => pre - 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const steps = useMemo(
    () => [
      {
        title: 'Chọn ghế',
        content: <General />,
      },
      {
        title: 'Xác nhận thông tin',
        content: <InfoConfirmation />,
      },
      {
        title: 'Thanh toán',
        content: <PaymentConfirmation />,
      },
      {
        title: 'Hoàn tất',
        content: <Completion />,
      },
    ],
    [],
  );

  const items = useMemo(
    () =>
      steps.map((item) => ({
        key: item.title,
        title: item.title,
      })),
    [steps],
  );

  // initial context value
  const scheduleDetailContextValue = useMemo(
    () => ({
      departureDate: scheduleDetails?.departureDate,
      departureStation,
      arrivalStation,
      departureRouteIndex,
      arrivalRouteIndex,
      train: formatTrainData,
      routeSegments: scheduleDetails?.train?.routeSegments,
      totalDistance,
      selectedSeats,
      tickets: scheduleDetails?.tickets || [],
      setSelectedSeats,
      passengerInformation,
      setPassengerInformation,
      nextStep,
      prevStep,
    }),
    [
      departureRouteIndex,
      arrivalRouteIndex,
      departureStation,
      arrivalStation,
      formatTrainData,
      scheduleDetails,
      totalDistance,
      selectedSeats,
      passengerInformation,
      nextStep,
      prevStep,
    ],
  );

  if (departureRouteIndex === -1 || arrivalRouteIndex === -1 || departureRouteIndex >= arrivalRouteIndex) {
    return (
      <Flex align="center" justify="center">
        <Result
          status="warning"
          title="Không tìm thấy chuyến tàu phù hợp!"
          subTitle="Vui lòng kiểm tra lại thông tin chuyến tàu và lịch trình di chuyển của tàu để tìm chuyến tàu phù hợp với hành trình của bạn."
          extra={[
            <Link to="/" key={1}>
              <Button type="primary" key="console">
                Trang chủ
              </Button>
            </Link>,
            <Link to="/contacts" key={2}>
              <Button key="buy">Liên hệ hỗ trợ</Button>
            </Link>,
          ]}
        />
      </Flex>
    );
  }

  return (
    <ScheduleDetailContext.Provider value={scheduleDetailContextValue}>
      <h1 className="text-lg text-center font-semibold mt-6 text-primary">
        {scheduleDetails?.train?.routeSegments?.[departureRouteIndex]?.station?.name} -{' '}
        {scheduleDetails?.train?.routeSegments?.[arrivalRouteIndex]?.station?.name}
      </h1>
      <Steps current={currentStep} items={items} className="pt-6" />
      <div className="py-6">{steps[currentStep].content}</div>
    </ScheduleDetailContext.Provider>
  );
};

export default ScheduleDetailsPage;
