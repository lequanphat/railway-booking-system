import { Card, Col, Divider, Flex, QRCode, Row, Space, Tooltip } from 'antd';
import { jsPDF } from 'jspdf';
import TrainIcon from '~/components/icons/TrainIcon';
import { convertToVnCurrency } from '~/utils/convert';

const Tickets = ({
  code,
  departureStation,
  arrivalStation,
  departureTime,
  arrivalTime,
  price,
  fullName,
  seatType,
  trainName,
}) => {
  const generatePdf = () => {
    const doc = new jsPDF({
      unit: 'pt',
      orientation: 'p',
      format: [300, 400],
      lineHeight: 2,
    });
    doc.setFontSize(12);
    doc.text(`Mã tàu: SE01`, 10, 10);
    doc.text(`Khởi hành: ${departureTime}`, 10, 20);
    doc.text(`Đến nơi: ${arrivalTime}`, 10, 30);
    doc.text(`Mã ghế: ${seatType}`, 10, 40);
    doc.text(`Điểm đi: ${departureStation}`, 10, 50);
    doc.text(`Điểm đến: ${arrivalStation}`, 10, 60);
    doc.text(`Hành khách: ${fullName}`, 10, 70);
    doc.text(`Giá vé: ${convertToVnCurrency(price)}`, 10, 80);
    doc.addImage(`https://api.qrserver.com/v1/create-qr-code/?data=${code}&size=100x100`, 'PNG', 10, 90, 40, 40);

    const pdfData = doc.output('blob');
    const url = URL.createObjectURL(pdfData);
    window.open(url, '_blank');
  };

  return (
    <Card
      styles={{
        body: {
          padding: 0,
        },
      }}
      className="rounded-md overflow-hidden"
    >
      <Flex className="bg-primary p-4 text-white" justify="space-between" align="center">
        <Flex vertical align="start">
          <h1 className="text-base">{departureStation}</h1>
          <h2 className="text-base">{departureTime.split(' ')?.[0]}</h2>
          <p>Ga {departureStation}</p>
        </Flex>
        <Flex align="center" gap={2}>
          <p>-----</p>
          <TrainIcon />
          <p>-----</p>
        </Flex>
        <Flex vertical align="end">
          <h1 className="text-base">{arrivalStation}</h1>
          <h2 className="text-base">{arrivalTime.split(' ')?.[0]}</h2>
          <p>Ga {arrivalStation}</p>
        </Flex>
      </Flex>
      <Row className="p-4" gutter={[12, 12]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <div>
              <p className="text-xs opacity-70">Mã vé</p>
              <h1 className="text-base">{code}</h1>
            </div>
            <div className="cursor-pointer" onClick={generatePdf}>
              <Tooltip title="Preview">
                <QRCode value={code} size={48} className="p-1" />
              </Tooltip>
            </div>
          </Flex>
          <Divider className="mb-2 mt-2" />
        </Col>

        <Col span={12}>
          <p className="text-xs opacity-70">Điểm đi</p>
          <h1 className="text-base">{departureStation}</h1>
        </Col>
        <Col span={12}>
          <p className="text-xs opacity-70">Điểm đến</p>
          <h1 className="text-base">{arrivalStation}</h1>
        </Col>
        <Col span={12}>
          <p className="text-xs opacity-70">Khởi hành</p>
          <h1 className="text-base">{departureTime.split(' ')?.[0]}</h1>
        </Col>
        <Col span={12}>
          <p className="text-xs opacity-70">Đến nơi</p>
          <h1 className="text-base">{arrivalTime.split(' ')?.[0]}</h1>
        </Col>
        <Col span={24}>
          <p className="text-xs opacity-70">Tàu</p>
          <h1 className="text-base">{trainName}</h1>
        </Col>
        <Col span={24}>
          <p className="text-xs opacity-70">Hành khách</p>
          <h1 className="text-base">{fullName}</h1>
        </Col>

        <Col span={24}>
          <p className="text-xs opacity-70">Ngày đi</p>
          <h1 className="text-base">{departureTime}</h1>
        </Col>

        <Col span={24}>
          <Divider className="mb-4 mt-1" />
          <Space>
            <p className="text-xs opacity-70">Giá vé</p>
            <strong className=" text-base text-red-600">{convertToVnCurrency(price)}</strong>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default Tickets;
