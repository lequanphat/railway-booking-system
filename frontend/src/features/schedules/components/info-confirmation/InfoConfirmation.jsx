import { Alert, Button, Card, Col, Divider, Flex, Form, Input, Row, Select, Table } from 'antd';
import { useContext, useMemo } from 'react';
import { OBJECT_TYPE_OPTIONS } from '~/config';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';
import { convertToVnCurrency } from '~/utils/convert';
import { formatTicketsInformationData } from '../../utils/helpers';

const InfoConfirmation = () => {
  const [form] = Form.useForm();
  const { selectedSeats, totalDistance, prevStep, nextStep, setPassengerInformation } =
    useContext(ScheduleDetailContext);

  const columns = useMemo(
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
          <Form form={form} name="advanced_search" onFinish={null}>
            <Form.Item
              name={`fullName_${record?.id}-${record?.carriageId}`}
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
              name={`object_${record?.id}-${record?.carriageId}`}
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
              name={`identity_${record?.id}-${record?.carriageId}`}
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
              <p>Ghế: {`[${record?.code}] - ${record?.seatType?.name} [${record?.position}]`}</p>
              <p>Toa {`${record?.carriagePosition}: ${record?.carriageName}`}</p>
              <p>
                Giá:{' '}
                <span className="text-red-500">
                  {convertToVnCurrency(record?.seatType?.original_price_per_km * totalDistance)}
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
              {convertToVnCurrency(record?.seatType?.original_price_per_km * totalDistance)}
            </span>
          );
        },
      },
    ],
    [form, totalDistance],
  );

  const handleNextStep = async () => {
    try {
      await form.validateFields().then((values) => {
        const data = {
          fullName: values.fullName,
          identity: values.identity,
          email: values.email,
          phoneNumber: values.phoneNumber,
          tickets: formatTicketsInformationData(values),
        };
        setPassengerInformation(data);
        nextStep();
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
          <h1 className="text-base font-medium mb-2 text-primary">Thông tin hành khách</h1>
          <Table columns={columns} dataSource={selectedSeats} size="middle" pagination={false} />
        </div>
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

      <Flex align="center" justify="space-between" className="py-4">
        <Button onClick={prevStep}>Quay lại</Button>
        <Button type="primary" onClick={handleNextStep}>
          Tiếp tục
        </Button>
      </Flex>
    </div>
  );
};

export default InfoConfirmation;
