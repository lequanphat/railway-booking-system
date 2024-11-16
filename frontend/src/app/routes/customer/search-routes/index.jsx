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

const SearchPage = () => {
  const [params, setParams] = useSearchParams();

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
        <Col xs={24} md={params.get('trip_type') === TripType.RoundTrip ? 18 : 24}>
          <DateSelection params={params} setParams={setParams} />
          <Space direction="vertical" className="w-full mt-4" size="middle">
            {!isRefetching ? (
              departure_schedules && departure_schedules.length > 0 ? (
                departure_schedules.map((schedule) => <ScheduleItem key={schedule.id} {...schedule} />)
              ) : (
                <EmptyRoutes />
              )
            ) : (
              <div className="text-center py-10">
                <Spin />
              </div>
            )}
          </Space>
        </Col>
        {params.get('trip_type') === TripType.RoundTrip && (
          <Col
            xs={24}
            md={6}
            style={{
              opacity: 0.5,
            }}
          >
            <ReturnCard params={params} returnSchedules={return_schedules} />
          </Col>
        )}
      </Row>
    </Space>
  );
};

export default SearchPage;
