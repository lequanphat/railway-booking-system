import { Breadcrumb, Col, Row, Space, Spin } from 'antd';
import { useSearchParams } from 'react-router-dom';
import DateSelection from '~/features/search-routes/components/DateSelection';
import { ScheduleItem } from '~/features/search-routes/components/ScheduleItem';
import SearchForm from '~/features/search-routes/components/SearchForm';
import dayjs from 'dayjs';
import { useSearchSchedules } from '~/features/search-routes/api/search-schedules';
import { TripType } from '~/enums/trip-type';
import EmptyRoutes from '~/features/search-routes/components/EmptyRoutes';
import ReturnCard from '~/features/search-routes/components/ReturnCard';
import { useEffect, useState } from 'react';
import useBookingStore from '~/stores/booking-store';
import ScheduleBookingModal from '~/features/search-routes/components/scheddule-booking-modal/ScheduleBookingModal';
import TicketCard from '~/features/search-routes/components/TicketCard';
import { useBoolean } from '~/hooks/useBoolean';
import RouteSegmentModal from '~/features/search-routes/components/RouteSegmentModal';

const SearchPage = () => {
  const { isOpenBookingModal, closeBookingModal, openBookingModal, seatSelectionStep } = useBookingStore();
  const [params, setParams] = useSearchParams();

  const { setBookingType } = useBookingStore();

  const {
    data,
    refetch: refetchSchedules,
    isRefetching,
  } = useSearchSchedules({
    queryConfig: {
      enabled: params.has('departure_id'),
    },
    departureDate: dayjs(params.get('departure_date')).format('YYYY-MM-DD'),
    returnDate: dayjs(params.get('return_date')).format('YYYY-MM-DD'),
    departureStation: params.get('departure_id'),
    arrivalStation: params.get('arrival_id'),
    tripType: params.get('trip_type'),
  });

  const { departure_schedules, return_schedules } = data;

  useEffect(() => {
    setBookingType(params.get('trip_type'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get('trip_type'), setBookingType]);

  const handleOpenBookingModal = (scheduleId, departureStation, arrivalStation) => {
    openBookingModal({ scheduleId, departureStation, arrivalStation });
  };

  return (
    <Space className="py-4 w-full" direction="vertical" size="middle">
      <Breadcrumb
        items={[
          {
            title: 'Trang chủ',
            href: '/',
          },
          {
            title: 'Vé tàu hoả :departure_name đi :arrival_name',
          },
        ]}
        params={{
          departure_name: params.get('departure_name'),
          arrival_name: params.get('arrival_name'),
        }}
      />
      <SearchForm params={params} setParams={setParams} refetchSchedules={refetchSchedules} />
      <Row gutter={[16, 16]}>
        {params.get('trip_type') === TripType.RoundTrip && seatSelectionStep === 2 && (
          <Col xs={24} md={6}>
            <TicketCard params={params} />
          </Col>
        )}
        <Col xs={24} md={params.get('trip_type') === TripType.RoundTrip ? 18 : 24}>
          <DateSelection params={params} setParams={setParams} isReturn={seatSelectionStep === 2} />
          <ListSchedule
            schedules={seatSelectionStep === 2 ? return_schedules : departure_schedules}
            isRefetching={isRefetching}
            handleOpenBookingModal={handleOpenBookingModal}
          />
        </Col>
        {params.get('trip_type') === TripType.RoundTrip && seatSelectionStep === 1 && (
          <Col
            xs={24}
            md={6}
            style={{
              opacity: 0.5,
            }}
          >
            <ReturnCard params={params} returnSchedules={return_schedules} isRefetching={isRefetching} />
          </Col>
        )}
      </Row>
      <ScheduleBookingModal open={!!isOpenBookingModal} onCancel={closeBookingModal} />
    </Space>
  );
};

const ListSchedule = ({ schedules, isRefetching, handleOpenBookingModal }) => {
  const [params, setParams] = useState({
    id: null,
    arrivalId: null,
    departureId: null,
    trainName: null,
  });

  const {
    value: routeSegmentModalVisible,
    setTrue: showRouteSegmentModal,
    setFalse: hideRouteSegmentModal,
  } = useBoolean();

  const handleOpenRouteSegmentModal = (id, arrivalId, departureId, trainName) => {
    setParams({ id, arrivalId, departureId, trainName });
    showRouteSegmentModal();
  };

  return (
    <Space direction="vertical" className="w-full mt-4" size="middle">
      {!isRefetching ? (
        schedules && schedules.length > 0 ? (
          schedules.map((schedule) => (
            <ScheduleItem
              key={schedule.id}
              {...schedule}
              onChoose={() => {
                handleOpenBookingModal(
                  schedule.id,
                  schedule.departure_segment.station_id,
                  schedule.arrival_segment.station_id,
                );
              }}
              handleOpenRouteSegmentModal={handleOpenRouteSegmentModal}
            />
          ))
        ) : (
          <EmptyRoutes />
        )
      ) : (
        <div className="text-center py-10">
          <Spin />
        </div>
      )}
      <RouteSegmentModal
        id={params.id}
        arrivalId={params.arrivalId}
        departureId={params.departureId}
        trainName={params.trainName}
        open={routeSegmentModalVisible}
        onCancel={hideRouteSegmentModal}
      />
    </Space>
  );
};

export default SearchPage;
