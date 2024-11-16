import { App, Button, Card, Col, DatePicker, Form, Radio, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useStations } from '~/features/home/api/get-stations';
import { searchWithoutDiacritics } from '~/utils/searchWithoutDiacritics';
import { SearchOutlined } from '@ant-design/icons';
import { TripType } from '~/enums/trip-type';
import { findStationById } from '~/utils/findStationById';

const SearchForm = ({ params, setParams }) => {
  const { message } = App.useApp();
  const { data: stationsData, isLoading: isStationsLoading } = useStations();
  const [form] = Form.useForm();
  const tripType = Form.useWatch('trip_type', form);

  const onFinish = async (values) => {
    if (
      !values.departure_id ||
      !values.arrival_id ||
      !values.departure_date ||
      (values.trip_type === TripType.RoundTrip && !values.return_date)
    ) {
      message.warning('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (values.departure_id === values.arrival_id) {
      message.warning('Ga đi và ga đến không được trùng nhau');
      return;
    }

    setParams({
      trip_type: values.trip_type,
      departure_id: values.departure_id,
      departure_name: findStationById(stationsData, values.departure_id).name || '',
      arrival_name: findStationById(stationsData, values.arrival_id).name || '',
      arrival_id: values.arrival_id,
      departure_date: values.departure_date.format('YYYY-MM-DD'),
      return_date:
        tripType === TripType.RoundTrip
          ? values.return_date.format('YYYY-MM-DD')
          : values.departure_date.format('YYYY-MM-DD'),
    });
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

  useEffect(() => {
    form.setFieldsValue({
      trip_type: params.get('trip_type') || 'one-way',
      departure_id: parseInt(params.get('departure_id')),
      arrival_id: parseInt(params.get('arrival_id')),
      departure_date: params.get('departure_date') ? dayjs(params.get('departure_date')) : dayjs(),
      return_date: params.get('trip_type') == TripType.RoundTrip ? dayjs(params.get('return_date')) : null,
    });
  }, [form, params]);

  useEffect(() => {
    form.setFieldsValue({
      return_date: tripType === TripType.OneWay ? null : form.getFieldValue('departure_date'),
    });
  }, [form, params, tripType]);

  return (
    <Card
      className="shadow-sm"
      bordered={false}
      styles={{
        body: {
          paddingTop: '8px',
          paddingBottom: '4px',
        },
      }}
    >
      <Form form={form} initialValues={params} onFinish={onFinish} layout="vertical" size="large" variant="filled">
        <Form.Item
          name="trip_type"
          style={{
            marginBottom: 6,
          }}
        >
          <Radio.Group>
            <Radio value={TripType.OneWay}>Một chiều</Radio>
            <Radio value={TripType.RoundTrip}>Khứ hồi</Radio>
          </Radio.Group>
        </Form.Item>
        <Row gutter={24}>
          <Col span={24} md={12} xl={5}>
            <Form.Item label="Ga đi" name="departure_id">
              <Select
                placeholder="Chọn ga đi"
                options={stationsSelectOptions}
                filterOption={(input, option) => searchWithoutDiacritics(option.label, input)}
                showSearch
              />
            </Form.Item>
          </Col>
          <Col span={24} md={12} xl={5}>
            <Form.Item label="Ga đến" name="arrival_id">
              <Select
                placeholder="Chọn ga đến"
                options={stationsSelectOptions}
                filterOption={(input, option) => searchWithoutDiacritics(option.label, input)}
                showSearch
              />
            </Form.Item>
          </Col>
          <Col span={24} md={12} xl={5}>
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
          <Col span={24} md={12} xl={5}>
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
          <Col span={24} md={24} xl={4}>
            <Form.Item label=" " colon={false}>
              <div className="flex h-full items-end">
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />} block>
                  Tìm kiếm
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchForm;
