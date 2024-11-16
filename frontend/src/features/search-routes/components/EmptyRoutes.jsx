import { Flex } from 'antd';
import soldOutImage from '~/assets/images/sold-out-train.webp';

const EmptyRoutes = ({ size = 'normal' }) => {
  return (
    <Flex justify="center" align="center" gap={20} vertical>
      <img src={soldOutImage} width={size == 'small' ? 100 : 200} alt="empty" />
      <div className={`text-center ${size == 'small' ? 'text-xs' : 'text-base'}`}>
        <p>Không có vé cho ngày bạn đã chọn.</p>
        <p>Vui lòng chọn một ngày khác hoặc kiểm tra lịch trình.</p>
      </div>
    </Flex>
  );
};

export default EmptyRoutes;
