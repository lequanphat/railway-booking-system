import { Button, Card, Checkbox, Col, Divider, Flex, Form, Input, List, message, Radio, Row } from 'antd';
import { useMemo, useState } from 'react';
import { PAYMENT_METHOD_OPTIONS } from '~/config';
import { convertToVnCurrency } from '~/utils/convert';
import { usePlaceOrder } from '../../api/place-order';
import useBookingStore from '~/stores/booking-store';

const PaymentConfirmation = () => {
  const { type, billerInformation, oneWay, roundTrip, prevPaymentStep } = useBookingStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1);
  const [isAcceptTerm, setIsAcceptTerm] = useState(false);

  const placeOrderMutation = usePlaceOrder({
    mutationConfig: {
      onSuccess: (data) => {
        window.location.href = data?.paymentUrl;
      },
      onError: () => {
        message.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại thông tin vé đã chọn!');
      },
    },
  });

  const totalPrice = useMemo(() => {
    return (
      oneWay?.selectedSeats.reduce((acc, seat) => {
        return acc + seat.seatType.original_price_per_km * oneWay?.totalDistance;
      }, 0) +
      roundTrip?.selectedSeats.reduce(
        (acc, seat) => acc + seat.seatType.original_price_per_km * roundTrip?.totalDistance,
        0,
      )
    );
  }, [oneWay, roundTrip]);

  const handlePlaceOrder = () => {
    if (!isAcceptTerm) {
      message.warning('Vui lòng đồng ý với các điều khoản mua vé trước khi xác nhận đặt vé!');
      return;
    }
    const formatOnewayTickets = oneWay?.tickets?.map((ticket) => {
      const seat = oneWay?.selectedSeats.find((item) => item.id === ticket.seat.id);
      return {
        ...ticket,
        seatType: `${seat?.seatType?.name} [${seat?.position}]`,
        carriageType: `${seat?.carriagePosition}: ${seat?.carriageName}`,
        scheduleId: oneWay?.scheduleId,
      };
    });

    const formatRoundTripTickets = roundTrip?.tickets?.map((ticket) => {
      const seat = roundTrip?.selectedSeats.find((item) => item.id === ticket.seat.id);
      return {
        ...ticket,
        seatType: `${seat?.seatType?.name} [${seat?.position}]`,
        carriageType: `${seat?.carriagePosition}: ${seat?.carriageName}`,
        scheduleId: roundTrip?.scheduleId,
      };
    });

    const data = {
      ...billerInformation,
      type,
      tickets: [...formatOnewayTickets, ...formatRoundTripTickets],
      paymentMethod: selectedPaymentMethod,
      oneWayScheduleId: oneWay?.scheduleId,
      roundTripScheduleId: roundTrip?.scheduleId,
      oneWayDepartureStation: oneWay?.departureStation,
      oneWayArrivalStation: oneWay?.arrivalStation,
      roundTripDepartureStation: roundTrip?.departureStation,
      roundTripArrivalStation: roundTrip?.arrivalStation,
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
              ...billerInformation,
            }}
            name="advanced_search"
            className="pt-6"
          >
            <Row gutter={[48, 12]}>
              <Col span={12}>
                <Form.Item name="fullName" label="Họ tên">
                  <Input placeholder="Nhập họ và tên..." value={billerInformation.fullName} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="identity" label="Số CMND/Hộ chiếu">
                  <Input placeholder="Nhập số CMND/ Hộ chiếu..." value={billerInformation.identity} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="email" label="Email">
                  <Input placeholder="Nhập địa chỉ email..." value={billerInformation.email} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={'phoneNumber'} label={'Số điện thoại'}>
                  <Input placeholder="Nhập số điện thoại..." value={billerInformation.phoneNumber} readOnly />
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
        <Button onClick={prevPaymentStep}>Quay lại</Button>
        <Button type="primary" onClick={handlePlaceOrder} loading={placeOrderMutation.isPending}>
          Xác nhận đặt vé
        </Button>
      </Flex>
    </div>
  );
};

export default PaymentConfirmation;
