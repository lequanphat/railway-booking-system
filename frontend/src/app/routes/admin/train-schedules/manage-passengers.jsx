import { App, Button, Card, Col, DatePicker, Flex, Form, Input, Row, Select, Space, Table, Tag } from 'antd';
import PageHeader from '~/components/ui/page-header';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchPassengers } from '~/features/train-schedules/api/get-passengers';
import { convertToVnCurrency } from '~/utils/convert';
import { useGetAllPersonTypes } from '~/features/booking/api/get-all-person-types';
import { useGetAllTrain } from '~/features/trains/api/get-all-train';
import { useRouteSegments } from '~/features/trains/api/get-route-segments';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { searchWithoutDiacritics } from '~/utils/searchWithoutDiacritics';
import { useSearchParams } from 'react-router-dom';
import { useGetCarriagesByTrain } from '~/features/train-schedules/api/get-carriages-by-train';

const ManagePassengerPage = () => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [params, setParams] = useSearchParams();
  const trainIdForm = Form.useWatch('trainId', form);

  const { data: personTypes } = useGetAllPersonTypes({});
  const { data: trains } = useGetAllTrain();
  const {
    data: routeSegments = {
      route_segments: [],
    },
  } = useRouteSegments(trainIdForm);

  const { data: carriages } = useGetCarriagesByTrain({ id: trainIdForm });

  const OBJECT_TYPE_OPTIONS = personTypes?.map((item) => ({
    label: <span>{item.name}</span>,
    title: item.name,
    options: item?.children?.map((type) => ({
      label: <span>{type.name}</span>,
      value: type.id,
    })),
  }));

  const routeOptions = useMemo(() => {
    return routeSegments.route_segments.map((segment) => ({
      label: segment.station.name,
      value: segment.station.name,
      departure_time: segment.departure_time,
      arrival_time: segment.arrival_time,
    }));
  }, [routeSegments.route_segments]);

  const routeOptionRender = (option) => {
    const { departure_time, arrival_time } = option.data;
    return (
      <Flex justify="space-between">
        <span>{option.label}</span>
        <Tag color="cyan">
          {dayjs(departure_time, 'HH:mm:ss').format('HH:mm')} - {dayjs(arrival_time, 'HH:mm:ss').format('HH:mm')}
        </Tag>
      </Flex>
    );
  };

  const onFinish = (values) => {
    console.log(values);
    const { keyword, trainId, departureTime, departureStation, carriageId, arrivalStation, personTypeId } = values;

    if (departureStation && arrivalStation && departureStation === arrivalStation) {
      message.warning('Ga đi và ga đến không được trùng nhau');
      return;
    }

    const searchParams = {
      keyword: keyword,
      trainId,
      personTypeId,
      carriageId,
      departureTime: departureTime ? dayjs(departureTime).format('YYYY-MM-DD') : undefined,
      departureStation,
      arrivalStation,
    };

    Object.keys(searchParams).forEach((key) => {
      if (!searchParams[key]) {
        delete searchParams[key];
      }
    });

    setParams(searchParams);
  };

  useEffect(() => {
    form.setFieldsValue({
      keyword: params.get('keyword'),
      trainId: parseInt(params.get('trainId')) || undefined,
      departureTime: params.get('departureTime') ? dayjs(params.get('departureTime')) : undefined,
      personTypeId: parseInt(params.get('personTypeId')) || undefined,
      carriageId: parseInt(params.get('carriageId')) || undefined,
      departureStation: params.get('departureStation'),
      arrivalStation: params.get('arrivalStation'),
    });
  }, [form, params]);

  return (
    <Flex className="w-full" gap={14} vertical>
      <PageHeader
        heading="Quản lý hành khách"
        links={[{ title: 'Trang chủ', href: '/admin' }, { title: 'Quản lý hành khách' }]}
      />
      <Card size="small">
        <Form form={form} layout="vertical" variant="filled" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Tìm kiếm" name="keyword">
                <Input placeholder="Mã vé, tên hành khách, số định danh,..." suffix={<SearchOutlined />} allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Chuyến tàu" name="trainId">
                <Select
                  placeholder="Chọn chuyến tàu"
                  options={trains}
                  fieldNames={{
                    label: 'name',
                    value: 'id',
                  }}
                  filterOption={(input, option) => option.name.toLowerCase().includes(input.toLowerCase())}
                  optionRender={(option) => {
                    const { name = '', route = {} } = option.data;
                    return (
                      <Flex justify="space-between">
                        <span>{name}</span>
                        <Space>
                          <Tag color="cyan">{route.name}</Tag>
                        </Space>
                      </Flex>
                    );
                  }}
                  showSearch
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Ngày đi" name="departureTime">
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Đối tượng" name="personTypeId">
                <Select placeholder="Chọn đối tượng" options={OBJECT_TYPE_OPTIONS} allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Toa tàu" name="carriageId">
                <Select
                  placeholder="Chọn toa tàu"
                  options={carriages}
                  fieldNames={{
                    label: 'carriageLayoutName',
                    value: 'id',
                  }}
                  optionRender={(option) => {
                    const { carriageLayoutName = '', position } = option.data;
                    return (
                      <Flex justify="space-between">
                        <span>{carriageLayoutName}</span>
                        <Tag color="cyan">{position}</Tag>
                      </Flex>
                    );
                  }}
                  disabled={!trainIdForm}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Ga đi" name="departureStation">
                <Select
                  placeholder="Chọn ga đi"
                  options={routeOptions}
                  optionRender={routeOptionRender}
                  filterOption={(input, option) => searchWithoutDiacritics(option.label, input)}
                  allowClear
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Ga đến" name="arrivalStation">
                <Select
                  placeholder="Chọn ga đến"
                  options={routeOptions}
                  optionRender={routeOptionRender}
                  filterOption={(input, option) => searchWithoutDiacritics(option.label, input)}
                  allowClear
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label=" " colon={false}>
                <div className="flex h-full items-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                    iconPosition="end"
                    styles={{
                      icon: {
                        marginLeft: 10,
                      },
                    }}
                    block
                  >
                    Tìm kiếm
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <PassengerTable params={params} setParams={setParams} />
    </Flex>
  );
};

const PassengerTable = ({ params, setParams }) => {
  const { data, isLoading } = useSearchPassengers({
    keyword: params.get('keyword'),
    trainId: params.get('trainId'),
    departureTime: params.get('departureTime'),
    personTypeId: params.get('personTypeId'),
    carriageId: params.get('carriageId'),
    departureStation: params.get('departureStation'),
    arrivalStation: params.get('arrivalStation'),
    page: params.get('page') || 1,
    size: params.get('size') || 10,
  });

  const columns = [
    { title: 'Mã vé', dataIndex: 'code', key: 'code' },
    {
      title: 'Hành khách',
      key: 'info',
      render: ({ fullName, object, identity }) => (
        <div>
          <p>Họ tên: {fullName}</p>
          <p>
            {object?.parent?.name} - {object.name}
          </p>
          <p>Định danh: {identity}</p>
        </div>
      ),
    },
    {
      title: 'Tuyến đường',
      key: 'schedule',
      render: ({ arrivalStation, departureStation, departureTime, arrivalTime }) => (
        <div>
          <p>
            Tuyến: {departureStation} - {arrivalStation}
          </p>
          <p>
            {departureTime} - {arrivalTime}
          </p>
        </div>
      ),
    },
    {
      title: 'Chỗ ngồi',
      key: 'seat',
      render: ({ seatType, carriageType }) => (
        <div>
          <p>Ghế: {seatType}</p>
          <p>Toa {carriageType}</p>
        </div>
      ),
    },
    {
      title: 'Giá',
      key: 'arrivalStation',
      render: ({ originalPrice, price }) => (
        <div>
          <p>
            Giá gốc: <del>{convertToVnCurrency(originalPrice)}</del>
          </p>
          <p>
            Giá: <strong className="text-red-500">{convertToVnCurrency(price)}</strong>
          </p>
        </div>
      ),
    },
  ];
  return (
    <Table
      size="middle"
      rowKey={(record) => record.code}
      columns={columns}
      dataSource={data?.items}
      loading={isLoading}
      pagination={{
        current: data?.meta?.current_page,
        pageSize: data?.meta?.per_page,
        total: data?.meta?.total_elements,
        onChange: (page, pageSize) => {
          console.log(page, pageSize);
          params.set('page', page);
          params.set('size', pageSize);
          setParams(params);
        },
      }}
    />
  );
};

export default ManagePassengerPage;
