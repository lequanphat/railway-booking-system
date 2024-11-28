import { Alert, Button, Card, Descriptions, Divider, Flex, QRCode, Result, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetOrderDetails } from '~/features/booking/api/get-order-details';
import { convertToVnCurrency } from '~/utils/convert';

const TicketBookingCallback = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const orderId = searchParams.get('order');

  const { data: orderData } = useGetOrderDetails({ id: orderId, queryConfig: { enabled: !!orderId } });

  const items = useMemo(
    () => [
      {
        key: '1',
        label: 'Đơn hàng',
        children: <p>{orderData?.id}</p>,
        span: 1,
      },
      {
        key: '2',
        label: 'Trạng thái',
        children: <p>{orderData?.status}</p>,
        span: 1,
      },
      {
        key: '3',
        label: 'Phương thức thanh toán',
        children: <p>{orderData?.paymentMethod}</p>,
      },
      {
        key: '4',
        label: 'Thời gian',
        children: <p>{dayjs(orderData?.createdAt).format('HH:mm:ss DD/MM/YYYY')}</p>,
        span: 2,
      },
      {
        key: '5',
        label: 'Tổng giá',
        children: <p className="font-semibold text-primary">{convertToVnCurrency(orderData?.totalPrice || 0)}</p>,
        span: 1,
      },
      {
        key: '6',
        label: 'Khách hàng',
        children: <p>{orderData?.fullName}</p>,
        span: 1,
      },
      {
        key: '7',
        label: 'Email',
        children: <p>{orderData?.email}</p>,
        span: 1,
      },
      {
        key: '8',
        label: 'Số điện thoại',
        children: <p>{orderData?.phoneNumber}</p>,
      },
      {
        key: '9',
        label: 'Thông tin vé',
        children: (
          <Space className="w-full" direction="vertical">
            {(orderData?.tickets || []).map((ticket) => (
              <>
                <Flex key={ticket.id} className="w-full" justify="space-between" align="center">
                  <div>
                    <div>
                      <p>
                        Tuyến:{' '}
                        <strong>
                          {ticket?.departureStation} - {ticket?.arrivalStation}
                        </strong>
                      </p>
                      <p>
                        Thời gian: {ticket?.departureTime} - {ticket?.arrivalTime}
                      </p>
                      <p>Loại ghế: {ticket?.seatType}</p>
                      <p>
                        Hành khách: {ticket?.fullName} - {ticket?.identity}
                      </p>
                      <p>Đối tượng: {ticket?.object?.name}</p>
                      <p>
                        Giá vé: <strong className=" text-primary">{convertToVnCurrency(ticket?.price)}</strong>
                      </p>
                    </div>
                  </div>
                  <Flex vertical align="center" gap={2}>
                    <Tooltip title={ticket?.code}>
                      <QRCode value={ticket?.code} size={100} className="p-1" />
                    </Tooltip>
                    <p className="font-medium">{ticket?.code}</p>
                  </Flex>
                </Flex>
                <Divider />
              </>
            ))}
          </Space>
        ),
        span: 4,
      },
    ],
    [orderData],
  );
  return (
    <div>
      {status === 'success' ? (
        <Card>
          <Result
            status="success"
            title="Chức mừng quý khách đã đặt vé thành công!"
            subTitle="Kính gửi quý Khách hàng, Xin trân trọng cảm ơn quý khách đã lựa chọn sử dụng dịch vụ vận tải hành khách của Tổng công ty Đường sắt Việt Nam. Quý khách đã thực hiện mua vé thành công với thông tin như sau:"
          />
          <h1 className="text-lg font-semibold text-center mb-4">Thông tin đơn hàng</h1>
          <Descriptions title="" bordered items={items || []} />
          <Alert
            message="Lưu ý"
            description="Để đảm bảo quyền lợi của mình, quý khách vui lòng mang theo vé điện tử cùng với giấy tờ tùy thân ghi trong vé điện tử trong suốt hành trình và xuất trình cho nhân viên soát vé khi có yêu cầu"
            type="info"
            showIcon
            className="mt-4"
          />
          <Flex justify="end" className="mt-6">
            <Button type="primary"> Quay trang đặt vé</Button>
          </Flex>
        </Card>
      ) : (
        <Card>
          <Result
            status="error"
            title="Đặt vé không thành công!"
            subTitle="Kính gửi quý Khách hàng, Xin lỗi vì sự bất tiện này. Quý khách vui lòng thử lại sau hoặc liên hệ với chúng tôi để được hỗ trợ."
          />
          <Alert
            message="Lưu ý"
            description="Để đảm bảo quyền lợi của mình, quý khách vui lòng mang theo vé điện tử cùng với giấy tờ tùy thân ghi trong vé điện tử trong suốt hành trình và xuất trình cho nhân viên soát vé khi có yêu cầu"
            type="error"
            showIcon
            className="mt-4"
          />
          <Flex justify="end" className="mt-6">
            <Button type="primary"> Quay trang đặt vé</Button>
          </Flex>
        </Card>
      )}
    </div>
  );
};

export default TicketBookingCallback;
