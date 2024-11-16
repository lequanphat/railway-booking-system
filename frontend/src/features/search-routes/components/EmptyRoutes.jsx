import { Flex } from 'antd';
import soldOutImage from '~/assets/images/sold-out-train.webp';

const EmptyRoutes = () => {
    return (
      <Flex justify="center" align="center" gap={20} vertical>
        <img src={soldOutImage} width={200} alt="empty" />
        <div className="text-center text-base">
          <p>Không có vé cho ngày bạn đã chọn.</p>
          <p>Vui lòng chọn một ngày khác hoặc kiểm tra lịch trình.</p>
        </div>
      </Flex>
    );
  };

export default EmptyRoutes;