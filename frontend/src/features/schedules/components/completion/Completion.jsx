import { Alert, Button, Card, Flex, Result, Table } from 'antd';
import { useContext, useMemo } from 'react';
import ScheduleDetailContext from '~/contexts/ScheduleDetailContext';
import { convertToVnCurrency } from '~/utils/convert';

const Completion = () => {
  const { selectedSeats, totalDistance, passengerInformation } = useContext(ScheduleDetailContext);

  const placeTickets = useMemo(() => {
    return selectedSeats.map((seat, index) => {
      const ticket = passengerInformation?.tickets.find((item) => item.seat.id === seat?.id);
      return {
        ...seat,
        index: index + 1,
        fullName: ticket?.fullName,
        identity: ticket?.identity,
        object: ticket?.object,
      };
    });
  }, [selectedSeats, passengerInformation]);

  const columns = useMemo(
    () => [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'Thông tin khách hàng',
        key: 'name',
        render: (record) => {
          return (
            <div>
              <p>
                Họ và tên: <strong>{record?.fullName}</strong>
              </p>
              <p>
                CMND: <strong>{record?.identity}</strong>
              </p>
              <p>
                Đối tượng: <strong>{record?.object}</strong>
              </p>
            </div>
          );
        },
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
    [totalDistance],
  );
  return (
    <div>
      <Card>
        <Result
          status="success"
          title="Chức mừng quý khách đã đặt vé thành công!"
          subTitle="Kính gửi quý Khách hàng, Xin trân trọng cảm ơn quý khách đã lựa chọn sử dụng dịch vụ vận tải hành khách của Tổng công ty Đường sắt Việt Nam. Quý khách đã thực hiện mua vé thành công với thông tin như sau:"
        />

        <Table columns={columns} dataSource={placeTickets} size="middle" pagination={false} />
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
    </div>
  );
};

export default Completion;
