import { App, Button, Col, DatePicker, Form, Radio, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripType } from '~/enums/trip-type';
import { useStations } from '~/features/home/api/get-stations';
import { findStationById } from '~/utils/findStationById';
import { searchWithoutDiacritics } from '~/utils/searchWithoutDiacritics';
import { SearchOutlined } from '@ant-design/icons';

const SearchRoutesFormHomepage = () => {
  const { message } = App.useApp();
  const { data: stationsData, isLoading: isStationsLoading } = useStations();
  const [form] = Form.useForm();
  const tripType = Form.useWatch('trip_type', form);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (
      !values.departure_id ||
      !values.arrival_id ||
      !values.departure_date ||
      (values.trip_type === 'round-trip' && !values.return_date)
    ) {
      message.warning('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (values.departure_id === values.arrival_id) {
      message.warning('Ga đi và ga đến không được trùng nhau');
      return;
    }

    const searchParams = new URLSearchParams({
      departure_id: values.departure_id,
      departure_name: findStationById(stationsData, values.departure_id).name || '',
      arrival_name: findStationById(stationsData, values.arrival_id).name || '',
      arrival_id: values.arrival_id,
      departure_date: dayjs(values.departure_date).format('YYYY-MM-DD'),
      return_date:
        values.trip_type === TripType.RoundTrip
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
          <Form.Item label="Ga đến" name="arrival_id">
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
    </Form>
  );
};

export default SearchRoutesFormHomepage;
