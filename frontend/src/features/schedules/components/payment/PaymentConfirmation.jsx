import { Button, Card, Checkbox, Col, Divider, Flex, Form, Input, List, message, Radio, Row } from 'antd';
import { useContext, useMemo, useState } from 'react';
import { PAYMENT_METHOD_OPTIONS } from '~/config';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';
import { convertToVnCurrency } from '~/utils/convert';
import { usePlaceOrder } from '../../api/place-order';
import { useParams } from 'react-router-dom';
import lodash from 'lodash';

const PaymentConfirmation = () => {
  const { id } = useParams();
  const { departureStation, arrivalStation, selectedSeats, totalDistance, passengerInformation, prevStep, nextStep } =
    useContext(ScheduleDetailContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1);
  const [isAcceptTerm, setIsAcceptTerm] = useState(false);

  const placeOrderMutation = usePlaceOrder({
    mutationConfig: {
      onSuccess: () => {
        nextStep();
      },
      onError: () => {
        message.error('Đã có lỗi xảy ra, vui lòng thử lại sau!');
      },
    },
  });

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((acc, seat) => {
      return acc + seat.seatType.original_price_per_km * totalDistance;
    }, 0);
  }, [selectedSeats, totalDistance]);

  const handlePlaceOrder = () => {
    if (!isAcceptTerm) {
      message.warning('Vui lòng đồng ý với các điều khoản mua vé trước khi xác nhận đặt vé!');
      return;
    }
    const formatTickets = passengerInformation?.tickets?.map((ticket) => {
      const seat = selectedSeats.find((item) => item.id === ticket.seat.id);
      return {
        ...ticket,
        seatType: `[${seat?.code}] - ${seat?.seatType?.name} [${seat?.position}]`,
        carriageType: `${seat?.carriagePosition}: ${seat?.carriageName}`,
      };
    });

    const data = {
      ...lodash.omit(passengerInformation, 'tickets'),
      tickets: formatTickets,
      paymentMethod: selectedPaymentMethod,
      departureStation,
      arrivalStation,
      scheduleId: parseInt(id),
    };
    placeOrderMutation.mutate({ data });
  };

  return (
    <div>
      <Card>
        <h1 className="text-base font-medium mb-2 text-primary">Thông tin người đặt vé</h1>
        <div>
          <Form
            form={null}
            initialValues={{
              ...passengerInformation,
            }}
            name="advanced_search"
            className="pt-6"
          >
            <Row gutter={[48, 12]}>
              <Col span={12}>
                <Form.Item name="fullName" label="Họ tên">
                  <Input placeholder="Nhập họ và tên..." value={passengerInformation.fullName} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="identity" label="Số CMND/Hộ chiếu">
                  <Input placeholder="Nhập số CMND/ Hộ chiếu..." value={passengerInformation.identity} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="email" label="Email">
                  <Input placeholder="Nhập địa chỉ email..." value={passengerInformation.email} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={'phoneNumber'} label={'Số điện thoại'}>
                  <Input placeholder="Nhập số điện thoại..." value={passengerInformation.phoneNumber} readOnly />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Flex justify="space-between">
            <h1 className="text-base font-medium mb-2 text-primary">Tổng tiền thanh toán:</h1>
            <h1 className="text-base font-semibold mb-2 text-red-500">{convertToVnCurrency(totalPrice)}</h1>
          </Flex>
        </div>
        <div className="py-4">
          <h1 className="text-base font-medium mb-2 text-primary">Phương thức thanh toán</h1>
          <Radio.Group
            onChange={(e) => {
              setSelectedPaymentMethod(e.target.value);
            }}
            value={selectedPaymentMethod}
          >
            <List
              className="w-full"
              bordered
              dataSource={PAYMENT_METHOD_OPTIONS}
              renderItem={(item) => (
                <List.Item>
                  <Radio value={item.value} disabled={!item?.enabled}>
                    <Flex align="center" gap={20}>
                      <img src={item.logo} alt="" className="ml-4" />
                      <Flex vertical>
                        <h1 className="text-base text-primary font-medium">{item.title}</h1>
                        {item.descriptions.map((description, index) => (
                          <p key={index}>- {description}</p>
                        ))}
                      </Flex>
                    </Flex>
                  </Radio>
                </List.Item>
              )}
            />
          </Radio.Group>
          <Checkbox
            onChange={() => {
              setIsAcceptTerm(!isAcceptTerm);
            }}
            className="pt-4"
            value={isAcceptTerm}
          >
            Tôi đã đọc kỹ và đồng ý tuân thủ tất cả các quy định mua vé trực tuyến, các chương trình khuyến mại của Tổng
            công ty đường sắt Việt Nam và chịu trách nhiệm về tính xác thực của các thông tin trên.
          </Checkbox>
        </div>
        <Divider />
      </Card>

      <Flex align="center" justify="space-between" className="py-4">
        <Button onClick={prevStep}>Quay lại</Button>
        <Button type="primary" onClick={handlePlaceOrder} loading={placeOrderMutation.isPending}>
          Xác nhận đặt vé
        </Button>
      </Flex>
    </div>
  );
};

export default PaymentConfirmation;
