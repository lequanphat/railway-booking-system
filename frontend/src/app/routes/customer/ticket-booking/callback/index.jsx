import { Alert, Button, Card, Flex, Result } from 'antd';
import { useSearchParams } from 'react-router-dom';

const TicketBookingCallback = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  return (
    <div>
      {status === 'success' ? (
        <Card>
          <Result
            status="success"
            title="Chức mừng quý khách đã đặt vé thành công!"
            subTitle="Kính gửi quý Khách hàng, Xin trân trọng cảm ơn quý khách đã lựa chọn sử dụng dịch vụ vận tải hành khách của Tổng công ty Đường sắt Việt Nam. Quý khách đã thực hiện mua vé thành công với thông tin như sau:"
          />
          <h1 className="text-red-500 text-center">Hiển thị thông tin đơn hàng đã đặt ở đây</h1>
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
