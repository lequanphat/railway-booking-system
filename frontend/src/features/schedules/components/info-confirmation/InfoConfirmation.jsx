import { Alert, Button, Card, Col, Divider, Flex, Form, Input, Row, Table } from 'antd';
import { useContext, useMemo } from 'react';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';
import { convertToVnCurrency } from '~/utils/convert';

const InfoConfirmation = () => {
  const { selectedSeats, totalDistance, prevStep, nextStep } = useContext(ScheduleDetailContext);
  console.log(selectedSeats);

  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'Thông tin khách hàng',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Thông tin chỗ',
        key: 'seat',
        render: (record) => {
          return (
            <div>
              <p>Ghế: {`[${record?.code}] - ${record?.seatType?.name}`}</p>
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
    [],
  );
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
          <Form form={null} name="advanced_search" onFinish={null} className="pt-6">
            <Row gutter={[48, 12]}>
              <Col span={12}>
                <Form.Item
                  name={'name'}
                  label={`Họ tên`}
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
                  name={'citizen_id'}
                  label={'Số CMND/Hộ chiếu'}
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
                  name={'email'}
                  label={'Email'}
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
                  name={'phone_number'}
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
        <Button type="primary" onClick={nextStep}>
          Tiếp tục
        </Button>
      </Flex>
    </div>
  );
};

export default InfoConfirmation;
