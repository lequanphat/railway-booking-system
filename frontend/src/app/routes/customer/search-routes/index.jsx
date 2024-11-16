import { Breadcrumb, Card, Col, Flex, Row, Space, Spin, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom';
import DateSelection from '~/features/home/components/DateSelection';
import { ScheduleItem } from '~/features/home/components/ScheduleItem';
import SearchForm from '~/features/search-routes/SearchForm';
import soldOutImage from '~/assets/images/sold-out-train.webp';
import dayjs from 'dayjs';
import { useSearchSchedules } from '~/features/home/api/search-schedules';
import { TripType } from '~/enums/trip-type';
const { Text, Title } = Typography;

const SearchPage = () => {
  const [params, setParams] = useSearchParams();

  const {
    data: schedules,
    refetch: refetchSchedules,
    isRefetching,
  } = useSearchSchedules({
    queryConfig: {
      enabled: params.has('departure_id'),
    },
    departureDate: dayjs(params.get('departure_date')).format('YYYY-MM-DD'),
    returnDate: dayjs(params.get('return_date')).format('YYYY-MM-DD'),
    departureStation: params.get('departure_id'),
    arrivalStation: params.get('destination_id'),
    tripType: params.get('trip_type'),
  });

  return (
    <Space className="py-4 w-full" direction="vertical" size="middle">
      <Breadcrumb
        items={[
          {
            title: 'Trang chủ',
            href: '/',
          },
          {
            title: 'Vé tàu hoả :departure_station đi :arrival_station',
          },
        ]}
        params={{
          departure_station: 'Hà Nội',
          arrival_station: 'Sài Gòn',
        }}
      />
      <SearchForm params={params} setParams={setParams} refetchSchedules={refetchSchedules} />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={params.get('trip_type') === TripType.RoundTrip ? 18 : 24}>
          <DateSelection params={params} setParams={setParams} />
          <Space direction="vertical" className="w-full mt-4" size="middle">
            {!isRefetching ? (
              schedules.length > 0 ? (
                schedules.map((schedule) => <ScheduleItem key={schedule.id} {...schedule} />)
              ) : (
                <EmptyRoutes />
              )
            ) : (
              <div className="text-center py-10">
                <Spin tip="Loading" />
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
            <Card
              title="Chọn chiều về"
              bordered={false}
              styles={{
                body: {
                  paddingBottom: 12,
                  paddingTop: 12,
                },
              }}
              className="shadow-sm"
            >
              <Title level={5}>Nha trang → Sài Gòn</Title>
              <Text>Thứ 7, 20/11/2024</Text>
            </Card>
          </Col>
        )}
      </Row>
    </Space>
  );
};

const EmptyRoutes = () => {
  return (
    <Flex justify="center" align="center" gap={20} vertical>
      <img src={soldOutImage} width={200} alt="empty" />
      <div className="text-center text-base">
        <p>Không có vé cho ngày bạn đã chọn.</p>
        <p>Vui lòng chọn một ngày khác hoặc kiểm tra lịch trình.</p>
      </div>
    </Flex>
  );
};

export default SearchPage;
