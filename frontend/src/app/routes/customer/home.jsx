import { Button, Card, Col, DatePicker, Flex, Form, Pagination, Radio, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useStations } from '~/features/home/api/get-stations';
import { ScheduleItem } from '~/features/home/components/ScheduleItem';

const removeVietnameseTones = (str) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const HomeRoute = () => {
  const { data, isLoading } = useStations({});
  const [form] = Form.useForm();

  const handleChange = (value) => {
    console.log(value);
  };

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  const stationsSelectOptions = useMemo(() => {
    return !isLoading
      ? data?.map((province) => ({
          label: province.name,
          options: province.stations.map((station) => ({
            label: `Ga ${station.name}`,
            value: station.id,
          })),
        }))
      : [];
  }, [data, isLoading]);

  return (
    <div className="py-6">
      <Card
        className="border-[1px] border-primary rounded-2xl 
      shadow-primary shadow-sm"
      >
        <Form form={form} onFinish={onFinish} onChange={handleChange} variant="filled" layout="vertical">
          <Form.Item name="trip_type">
            <Radio.Group valuePropName="checked">
              <Radio value="one-way" defaultChecked>
                One way
              </Radio>
              <Radio value="round-trip">Round trip</Radio>
            </Radio.Group>
          </Form.Item>
          <Row gutter={24}>
            <Col span={24} md={12} xl={6}>
              <Form.Item label="Departure" name="departure_id">
                <Select
                  placeholder="Select departure"
                  onChange={handleChange}
                  options={stationsSelectOptions}
                  filterOption={(input, option) =>
                    removeVietnameseTones(option.label).includes(removeVietnameseTones(input))
                  }
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12} xl={6}>
              <Form.Item label="Destination" name="destination_id">
                <Select
                  placeholder="Select destionation"
                  onChange={handleChange}
                  options={stationsSelectOptions}
                  filterOption={(input, option) =>
                    removeVietnameseTones(option.label).includes(removeVietnameseTones(input))
                  }
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12} xl={6}>
              <Form.Item label="Departure Date" name="departure_date">
                <DatePicker
                  format={{
                    format: 'DD/MM/YYYY',
                    type: 'mask',
                  }}
                  disabledDate={(current) => current && current.isBefore(dayjs().startOf('day'))}
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12} xl={6}>
              <Form.Item label="Return date" name="return_date">
                <DatePicker
                  format={{
                    format: 'DD/MM/YYYY',
                    type: 'mask',
                  }}
                  disabledDate={(current) => current && current.isBefore(dayjs().startOf('day'))}
                  className="w-full"
                  disabled={form.getFieldValue('trip_type') == 'one-way'}
                />
              </Form.Item>
            </Col>
          </Row>
          <Flex justify="center">
            <Button
              type="primary"
              htmlType="submit"
              className="py-6 px-8 min-w-[220px] rounded-full translate-y-[48px] text-[18px]"
            >
              Find a train
            </Button>
          </Flex>
        </Form>
      </Card>
      <Flex vertical className="py-12" gap={24}>
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
      </Flex>
      <Flex justify="end">
        <Pagination defaultCurrent={1} total={50} />
      </Flex>
    </div>
  );
};

export default HomeRoute;
