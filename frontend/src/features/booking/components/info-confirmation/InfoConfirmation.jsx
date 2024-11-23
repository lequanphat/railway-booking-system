import { Alert, Button, Card, Col, Divider, Flex, Form, Input, Row, Select, Table } from 'antd';
import { useMemo } from 'react';
import useBookingStore from '~/stores/booking-store';
import { convertToVnCurrency } from '~/utils/convert';
import { useGetAllPersonTypes } from '../../api/get-all-person-types';
import { formatTicketsInformationData } from '../../utils/helpers';
import { TripType } from '~/enums/trip-type';

const InfoConfirmation = () => {
  const [form] = Form.useForm();
  const { type, oneWay, roundTrip, nextPaymentStep, setTickets, setBillerInformation } = useBookingStore();
  const { data: personTypes } = useGetAllPersonTypes({});

  const OBJECT_TYPE_OPTIONS = personTypes?.map((item) => ({
    label: <span>{item.name}</span>,
    title: item.name,
    options: item?.children?.map((type) => ({
      label: <span>{type.name}</span>,
      value: type.id,
    })),
  }));

  const oneWayColumns = useMemo(
    () => [
      {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Thông tin khách hàng',
        key: 'passenger',
        render: (record) => (
          <Form
            form={form}
            initialValues={{
              [`oneWay_object_${record?.id}-${record?.carriageId}`]: OBJECT_TYPE_OPTIONS?.[0]?.options[0]?.value,
              [`roundTrip_object_${record?.id}-${record?.carriageId}`]: OBJECT_TYPE_OPTIONS?.[0]?.options[0]?.value,
            }}
            name="advanced_search"
            onFinish={null}
          >
            <Form.Item
              name={`oneWay__fullName_${record?.id}-${record?.carriageId}`}
              label="Họ tên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ tên!',
                },
              ]}
            >
              <Input placeholder="Nhập họ và tên..." />
            </Form.Item>
            <Form.Item
              name={`oneWay_object_${record?.id}-${record?.carriageId}`}
              label="Đối tượng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn đối tượng!',
                },
              ]}
            >
              <Select onChange={null} options={OBJECT_TYPE_OPTIONS} />
            </Form.Item>
            <Form.Item
              name={`oneWay_identity_${record?.id}-${record?.carriageId}`}
              label="Số CMND"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số CMND hoặc ngày sinh trẻ em!',
                },
              ]}
            >
              <Input placeholder="Nhập số CMND hoặc ngày sinh trẻ em..." />
            </Form.Item>
          </Form>
        ),
      },
      {
        title: 'Thông tin chỗ',
        key: 'seat',
        render: (record) => {
          return (
            <div>
              <p>Ghế: {`${record?.seatType?.name} [${record?.position}]`}</p>
              <p>Toa {`${record?.carriagePosition}: ${record?.carriageName}`}</p>
              <p>
                Giá:{' '}
                <span className="text-red-500">
                  {convertToVnCurrency(record?.seatType?.original_price_per_km * oneWay.totalDistance)}
                </span>
              </p>
            </div>
          );
        },
      },
      {
        title: 'Khuyến mãi',
        dataIndex: 'price',
        key: 'price',
        render: () => {
          return <span>0%</span>;
        },
      },
      {
        title: 'Thành tiền',
        key: 'seat',
        render: (record) => {
          return (
            <span className="text-red-500 font-medium">
              {convertToVnCurrency(record?.seatType?.original_price_per_km * oneWay.totalDistance)}
            </span>
          );
        },
      },
    ],
    [form, oneWay, OBJECT_TYPE_OPTIONS],
  );

  const roundTripColumns = useMemo(
    () => [
      {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Thông tin khách hàng',
        key: 'passenger',
        render: (record) => (
          <Form
            form={form}
            initialValues={{
              [`oneWay_object_${record?.id}-${record?.carriageId}`]: OBJECT_TYPE_OPTIONS?.[0]?.options[0]?.value,
              [`roundTrip_object_${record?.id}-${record?.carriageId}`]: OBJECT_TYPE_OPTIONS?.[0]?.options[0]?.value,
            }}
            name="advanced_search"
            onFinish={null}
          >
            <Form.Item
              name={`roundTrip_fullName_${record?.id}-${record?.carriageId}`}
              label="Họ tên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ tên!',
                },
              ]}
            >
              <Input placeholder="Nhập họ và tên..." />
            </Form.Item>
            <Form.Item
              name={`roundTrip_object_${record?.id}-${record?.carriageId}`}
              label="Đối tượng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn đối tượng!',
                },
              ]}
            >
              <Select onChange={null} options={OBJECT_TYPE_OPTIONS} />
            </Form.Item>
            <Form.Item
              name={`roundTrip_identity_${record?.id}-${record?.carriageId}`}
              label="Số CMND"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số CMND hoặc ngày sinh trẻ em!',
                },
              ]}
            >
              <Input placeholder="Nhập số CMND hoặc ngày sinh trẻ em..." />
            </Form.Item>
          </Form>
        ),
      },
      {
        title: 'Thông tin chỗ',
        key: 'seat',
        render: (record) => {
          return (
            <div>
              <p>Ghế: {`${record?.seatType?.name} [${record?.position}]`}</p>
              <p>Toa {`${record?.carriagePosition}: ${record?.carriageName}`}</p>
              <p>
                Giá:{' '}
                <span className="text-red-500">
                  {convertToVnCurrency(record?.seatType?.original_price_per_km * roundTrip.totalDistance)}
                </span>
              </p>
            </div>
          );
        },
      },
      {
        title: 'Khuyến mãi',
        dataIndex: 'price',
        key: 'price',
        render: () => {
          return <span>0%</span>;
        },
      },
      {
        title: 'Thành tiền',
        key: 'seat',
        render: (record) => {
          return (
            <span className="text-red-500 font-medium">
              {convertToVnCurrency(record?.seatType?.original_price_per_km * roundTrip.totalDistance)}
            </span>
          );
        },
      },
    ],
    [form, roundTrip, OBJECT_TYPE_OPTIONS],
  );

  const handleNextStep = async () => {
    try {
      await form.validateFields().then((values) => {
        const billerInformation = {
          fullName: values.fullName,
          identity: values.identity,
          email: values.email,
          phoneNumber: values.phoneNumber,
        };

        setBillerInformation(billerInformation);

        setTickets({
          oneWayTickets: formatTicketsInformationData(values, TripType.OneWay),
          roundTripTickets: formatTicketsInformationData(values, TripType.RoundTrip),
        });

        nextPaymentStep();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  return (
    <div>
      <Card>
        <Alert
          message="Lưu ý"
          description="Các vé có biểu tượng [!] là các vé bị hết thời gian tạm giữ. Xin vui lòng loại bỏ các vé này khỏi danh sách vé đặt mua trước khi thực hiện giao dịch thanh toán tiền. Quý khách vui lòng điền đầy đủ, chính xác tất cả các thông tin về hành khách đi tàu. Xin chân thành cảm ơn!"
          type="info"
          showIcon
        />
        <div className="py-4">
          <h1 className="text-base font-medium mb-2 text-primary">
            {type === TripType.RoundTrip ? 'Thông tin chiều đi' : 'Thông tin khách  hàng'}
          </h1>
          <Table columns={oneWayColumns} dataSource={oneWay.selectedSeats} size="middle" pagination={false} />
        </div>
        {type === TripType.RoundTrip && (
          <div className="py-4">
            <h1 className="text-base font-medium mb-2 text-primary">Thông tin chiều về</h1>
            <Table columns={roundTripColumns} dataSource={roundTrip.selectedSeats} size="middle" pagination={false} />
          </div>
        )}
        <Divider />
        <div className="py-4">
          <h1 className="text-base font-medium mb-2 text-primary">Thông tin người đặt vé</h1>
          <Alert
            message="Lưu ý"
            description="Quý khách vui lòng điền đẩy đủ và chính xác các thông tin về người mua vé bên trên. Các thông tin này sẽ được sử dụng để xác minh người mua vé và lấy vé tại ga trước khi lên tàu theo đúng các quy định của Tổng công ty Đường sắt Việt Nam."
            type="info"
            showIcon
          />
          <Form form={form} name="advanced_search" className="pt-6">
            <Row gutter={[48, 12]}>
              <Col span={12}>
                <Form.Item
                  name="fullName"
                  label="Họ tên"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập họ tên!',
                    },
                  ]}
                >
                  <Input placeholder="Nhập họ và tên..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="identity"
                  label="Số CMND/Hộ chiếu"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số CMND/Hộ chiếu!',
                    },
                  ]}
                >
                  <Input placeholder="Nhập số CMND/ Hộ chiếu..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số CMND/Hộ chiếu!',
                    },
                  ]}
                >
                  <Input placeholder="Nhập địa chỉ email..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={'phoneNumber'}
                  label={'Số điện thoại'}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số điện thoại!',
                    },
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại..." />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>

      <Flex align="center" justify="end" className="py-4">
        <Button type="primary" onClick={handleNextStep}>
          Tiếp tục
        </Button>
      </Flex>
    </div>
  );
};

export default InfoConfirmation;
