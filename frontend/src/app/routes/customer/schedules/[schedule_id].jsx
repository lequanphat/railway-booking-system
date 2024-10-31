import { Steps } from 'antd';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';
import { useGetScheduleDetails } from '~/features/schedules/api/get-schedule-details';
import Completion from '~/features/schedules/components/completion/Completion';
import General from '~/features/schedules/components/general/General';
import InfoConfirmation from '~/features/schedules/components/info-confirmation/InfoConfirmation';
import PaymentConfirmation from '~/features/schedules/components/payment/PaymentConfirmation';

const ScheduleDetailsPage = () => {
  const { id } = useParams();
  const [fakeDeparture, fakeArrival] = [1, 12];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((pre) => pre + 1);
  };
  const prevStep = () => {
    setCurrentStep((pre) => pre - 1);
  };

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
            carriagePosition: carriage.position,
            carriageName: carriage.carriageLayout.name,
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

  const steps = useMemo(
    () => [
      {
        title: 'Chọn ghế',
        content: (
          <General
            departureDate={scheduleDetails?.departureDate}
            selectedDeparture={fakeDeparture}
            selectedArrival={fakeArrival}
          />
        ),
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
    [scheduleDetails, fakeDeparture, fakeArrival],
  );

  const items = useMemo(
    () =>
      steps.map((item) => ({
        key: item.title,
        title: item.title,
      })),
    [steps],
  );

  console.log('scheduleDetails', scheduleDetails);
  return (
    <ScheduleDetailContext.Provider
      value={{
        train: formatTrainData,
        routeSegments: scheduleDetails?.train?.routeSegments,
        totalDistance,
        selectedSeats,
        setSelectedSeats,
        nextStep,
        prevStep,
      }}
    >
      <h1 className="text-lg text-center font-semibold mt-6 text-primary">
        {scheduleDetails?.train?.routeSegments?.[fakeDeparture]?.station?.name} -{' '}
        {scheduleDetails?.train?.routeSegments?.[fakeArrival]?.station?.name}
      </h1>
      <Steps current={currentStep} items={items} className="pt-6" />
      <div className="py-6">{steps[currentStep].content}</div>
    </ScheduleDetailContext.Provider>
  );
};

export default ScheduleDetailsPage;
