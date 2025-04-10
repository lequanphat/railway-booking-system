import { Steps } from 'antd';
import { useMemo } from 'react';
import InfoConfirmation from '~/features/booking/components/info-confirmation/InfoConfirmation';
import PaymentConfirmation from '~/features/booking/components/payment/PaymentConfirmation';
import useBookingStore from '~/stores/booking-store';

const ScheduleDetailsPage = () => {
  const { paymentStep, getRouteSegments, getDepartureRouteIndex, getArrivalRouteIndex } = useBookingStore();

  const steps = useMemo(
    () => [
      {
        title: 'Chọn ghế',
        content: <></>,
      },
      {
        title: 'Xác nhận thông tin',
        content: <InfoConfirmation />,
      },
      {
        title: 'Thanh toán',
        content: <PaymentConfirmation />,
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

  const routeSegments = getRouteSegments();

  return (
    <div>
      <h1 className="text-lg text-center font-semibold mt-6 text-primary">
        {routeSegments?.[getDepartureRouteIndex()]?.station?.name} →{' '}
        {routeSegments?.[getArrivalRouteIndex()]?.station?.name}
      </h1>
      <Steps current={paymentStep} items={items} className="pt-6" />
      <div className="py-6">{steps[paymentStep].content}</div>
    </div>
  );
};

export default ScheduleDetailsPage;
