import { App, Button, Card, Col, DatePicker, Form, Radio, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useStations } from '~/features/home/api/get-stations';
import { ScheduleItem } from '~/features/home/components/ScheduleItem';
import { searchWithoutDiacritics } from '~/utils/searchWithoutDiacritics';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchSchedules } from '~/features/home/api/search-schedules';

const HomeRoute = () => {
  const [schedules, setSchedules] = useState([]);

  console.log(schedules);

  return (
    <div className="py-6">
      <Card className="border border-primary rounded-2xl shadow-primary shadow-sm">
        <SearchTrainForm onSearchComplete={setSchedules} />
      </Card>
      <Space direction="vertical" className="pt-12 w-full" size="middle">
        {schedules.map((schedule) => (
          <ScheduleItem key={schedule.id} {...schedule} />
        ))}
      </Space>
    </div>
  );
};

const SearchTrainForm = ({ onSearchComplete }) => {
  const { message } = App.useApp();
  const { data: stationsData, isLoading: isStationsLoading } = useStations();
  const [form] = Form.useForm();
  const tripType = Form.useWatch('trip_type', form);
  const { refetch: refetchSchedules } = useSearchSchedules({
    queryConfig: {
      enabled: false,
    },
    departureDate: dayjs(Form.useWatch('departure_date', form)).format('YYYY-MM-DD'),
    departureStation: Form.useWatch('departure_id', form),
    arrivalStation: Form.useWatch('destination_id', form),
  });

  const onFinish = async () => {
    const result = await refetchSchedules();
    if (result.data) {
      if (result.data.length === 0) {
        message.error('Không tìm thấy chuyến tàu phù hợp');
      }
      onSearchComplete(result.data);
    }
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
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="trip_type" initialValue={'one-way'}>
        <Radio.Group>
          <Radio value={'one-way'}>Một chiều</Radio>
          <Radio value={'round-trip'}>Khứ hồi</Radio>
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
              disabled={tripType == 'one-way'}
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

export default HomeRoute;
