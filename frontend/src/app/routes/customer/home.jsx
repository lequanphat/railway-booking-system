import { App, Button, Card, Col, DatePicker, Form, Radio, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useStations } from '~/features/home/api/get-stations';
import { ScheduleItem } from '~/features/home/components/ScheduleItem';
import { searchWithoutDiacritics } from '~/utils/searchWithoutDiacritics';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ScheduleBookingModal from '~/features/home/components/scheddule-booking-modal/ScheduleBookingModal';
import { TripType } from '~/enums/trip-type';

const HomeRoute = () => {
  const [schedules, setSchedules] = useState([]);

  console.log(schedules);

  return (
    <>
      <div className="py-6">
        <Card className="rounded-2xl shadow-sm mt-[-200px]">
          <SearchTrainForm onSearchComplete={setSchedules} />
        </Card>
        <Space direction="vertical" className="pt-12 w-full" size="middle">
          {schedules.map((schedule) => (
            <ScheduleItem key={schedule.id} {...schedule} />
          ))}
        </Space>
        <PopularJouneys />
      </div>
    </>
  );
};

const SearchTrainForm = () => {
  const { message } = App.useApp();
  const { data: stationsData, isLoading: isStationsLoading } = useStations();
  const [form] = Form.useForm();
  const tripType = Form.useWatch('trip_type', form);

  const onFinish = async (values) => {
    if (
      !values.departure_id ||
      !values.destination_id ||
      !values.departure_date ||
      (values.trip_type === 'round-trip' && !values.return_date)
    ) {
      message.warning('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (values.departure_id === values.destination_id) {
      message.warning('Ga đi và ga đến không được trùng nhau');
      return;
    }

    const searchParams = new URLSearchParams({
      departure_id: values.departure_id,
      destination_id: values.destination_id,
      departure_date: values.departure_date
        ? dayjs(values.departure_date).format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD'),
      return_date: values.return_date
        ? dayjs(values.return_date).format('YYYY-MM-DD')
        : dayjs(values.departure_date).format('YYYY-MM-DD'),
      trip_type: values.trip_type,
    }).toString();

    navigate(`/search?${searchParams}`);
  };

  const stationsSelectOptions = useMemo(() => {
    return !isStationsLoading
      ? stationsData?.map((province) => ({
          label: province.name,
          options: province.stations.map((station) => ({
            label: `Ga ${station.name}`,
            value: station.id,
          })),
        }))
      : [];
  }, [stationsData, isStationsLoading]);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" size="large" variant="filled">
      <Form.Item name="trip_type" initialValue={TripType.OneWay} className="mb-2">
        <Radio.Group>
          <Radio value={TripType.OneWay}>Một chiều</Radio>
          <Radio value={TripType.RoundTrip}>Khứ hồi</Radio>
        </Radio.Group>
      </Form.Item>
      <Row gutter={24}>
        <Col span={24} md={12} xl={6}>
          <Form.Item label="Ga đi" name="departure_id">
            <Select
              placeholder="Chọn ga đi"
              options={stationsSelectOptions}
              filterOption={(input, option) => searchWithoutDiacritics(option.label, input)}
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={24} md={12} xl={6}>
          <Form.Item label="Ga đến" name="destination_id">
            <Select
              placeholder="Chọn ga đến"
              options={stationsSelectOptions}
              filterOption={(input, option) => searchWithoutDiacritics(option.label, input)}
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={24} md={12} xl={6}>
          <Form.Item label="Ngày đi" name="departure_date">
            <DatePicker
              format={{
                format: 'DD/MM/YYYY',
                type: 'mask',
              }}
              placeholder="Chọn ngày đi"
              disabledDate={(current) => current && current.isBefore(dayjs().startOf('day'))}
              className="w-full"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={12} xl={6}>
          <Form.Item label="Ngày về" name="return_date">
            <DatePicker
              format={{
                format: 'DD/MM/YYYY',
                type: 'mask',
              }}
              placeholder="Chọn ngày về"
              disabledDate={(current) => current && current.isBefore(dayjs().startOf('day'))}
              className="w-full"
              disabled={tripType == TripType.OneWay}
            />
          </Form.Item>
        </Col>
      </Row>
      <Button
        type="primary"
        htmlType="submit"
        shape="round"
        className="py-6 px-8 min-w-[220px] translate-y-12 text-base left-1/2 -translate-x-1/2"
        icon={<SearchOutlined />}
      >
        Tìm chuyến tàu
      </Button>
      <ScheduleBookingModal />
    </Form>
  );
};

const PopularJouneys = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-8">Tuyến phố biến</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            from: 'Ho Chi Minh City',
            to: 'Hanoi',
            image: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg',
          },
          {
            from: 'Hanoi',
            to: 'Haiphong',
            image: 'https://tructhang.vn/wp-content/uploads/2022/08/Vinh-Ha-Long.jpg',
          },
          {
            from: 'Ho Chi Minh City',
            to: 'Da Nang',
            image:
              'https://vcdn1-dulich.vnecdn.net/2022/06/01/CauVangDaNang-1654082224-7229-1654082320.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=MeVMb72UZA27ivcyB3s7Kg',
          },
          {
            from: 'Ho Chi Minh City',
            to: 'Nha Trang',
            image:
              'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/01/26/anh-nha-trang-dep-moi-nhat-1-1544.jpeg',
          },
        ].map((journey, index) => (
          <div key={index} className="overflow-hidden group cursor-pointer rounded-md">
            <div className="relative h-48">
              <img
                src={journey.image}
                alt={`${journey.from} to ${journey.to}`}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center justify-between">
                  <span>{journey.from}</span>
                  <span className="mx-2">→</span>
                  <span>{journey.to}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeRoute;
