import { Button, Card, Col, DatePicker, Flex, Form, Pagination, Radio, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useStations } from '~/features/home/api/get-stations';
import { ScheduleItem } from '~/features/home/components/ScheduleItem';
import { searchWithoutDiacritics } from '~/utils/searchWithoutDiacritics';
import { SearchOutlined } from '@ant-design/icons';

const HomeRoute = () => {
  return (
    <div className="py-6">
      <Card
        className="border border-primary rounded-2xl 
      shadow-primary shadow-sm"
      >
        <SearchTrainForm />
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

const SearchTrainForm = () => {
  const { data, isLoading } = useStations();
  const [form] = Form.useForm();
  Form.useWatch('trip_type', form);

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
    <Form form={form} onFinish={onFinish} variant="filled" layout="vertical">
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
              disabled={form.getFieldValue('trip_type') == 'one-way'}
            />
          </Form.Item>
        </Col>
      </Row>
      <Flex justify="center">
        <Button
          type="primary"
          htmlType="submit"
          className="py-6 px-8 min-w-[220px] rounded-full translate-y-[48px] text-base"
          icon={<SearchOutlined />}
        >
          Tìm chuyến tàu
        </Button>
      </Flex>
    </Form>
  );
};

export default HomeRoute;
