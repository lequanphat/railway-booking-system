import { Flex } from 'antd';
import { Footer as FooterAnt } from 'antd/es/layout/layout';
import bgFooter from '~/assets/images/bg-footer.png';
import bgFooter2 from '~/assets/images/bg-footer-2.svg';
import trainImage from '~/assets/images/train.png';
import whiteLogoImage from '~/assets/images/white-logo.png';

const Footer = () => {
  return (
    <FooterAnt className="text-center  w-full m-0 p-0 overflow-hidden">
      <div className="relative w-full h-[300px] bg-background">
        <img src={bgFooter2} alt="" className="absolute bottom-0 left-0 w-full h-auto" />
        <img
          src={trainImage}
          className="absolute bottom-0 left-0 w-[540px] h-auto"
          style={{
            animation: 'trainRunning linear 16s infinite',
          }}
        />
        <img src={bgFooter} alt="" className="absolute bottom-[-6px] left-0 w-[90%] h-auto" />
      </div>
      <Flex className="bg-[#004f8c] w-full h-[60px] ">-</Flex>
      <Flex vertical align="center" justify="center" className="bg-primary w-full py-8 text-white" gap={4}>
        <img src={whiteLogoImage} alt="" className="w-[200px] h-auto mb-2" />
        <h1 className="text-[20px] font-semibold">TỔNG CÔNG TY ĐƯỜNG SẮT VIỆT NAM</h1>
        <p>
          <strong>Địa chỉ: </strong>157/89 Dương Bá Trạc, phường 01, quận 08, TP.HCM
        </p>
        <p>
          <strong>SĐT: </strong> 0123123123 - <strong>Fax: </strong> 0123123123
        </p>
        <p>
          <strong>Email: </strong> lequanphat3579@gmail.com - <strong>Website: </strong>lequanphat.id.vn
        </p>
        <p>Giấy phép 204/BQP - Ngày 10/10/2024 của Bộ Thông tin và Truyền thông</p>
      </Flex>
    </FooterAnt>
  );
};

export default Footer;
