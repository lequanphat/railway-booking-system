import { Button, Card, Checkbox, Divider, Flex, List, Radio } from 'antd';
import { useContext, useState } from 'react';
import { PAYMENT_METHOD_OPTIONS } from '~/config';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';

const PaymentConfirmation = () => {
  const { prevStep, nextStep } = useContext(ScheduleDetailContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1);

  return (
    <div>
      <Card>
        <div className="py-4">
          <h1 className="text-base font-medium mb-2 text-primary">PHương thức thanh toán</h1>
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
          <Checkbox onChange={null} className="pt-4">
            Tôi đã đọc kỹ và đồng ý tuân thủ tất cả các quy định mua vé trực tuyến, các chương trình khuyến mại của Tổng
            công ty đường sắt Việt Nam và chịu trách nhiệm về tính xác thực của các thông tin trên.
          </Checkbox>
        </div>
        <Divider />
      </Card>

      <Flex align="center" justify="space-between" className="py-4">
        <Button onClick={prevStep}>Quay lại</Button>
        <Button type="primary" onClick={nextStep}>
          Xác nhận đặt vé
        </Button>
      </Flex>
    </div>
  );
};

export default PaymentConfirmation;
