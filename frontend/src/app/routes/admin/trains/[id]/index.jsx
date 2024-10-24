import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Row, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/ui/page-header';
import { useTrain } from '~/features/trains/api/get-train';
import SeatPricesTable from '~/features/trains/components/SeatPricesTable';

const TrainDetails = () => {
  const { id } = useParams();
  const [formatTrainData, setFormatTrainData] = useState(null);
  const { data: trainData } = useTrain({ id });

  const seatPricesData = useMemo(() => {
    return trainData?.seatPrices?.map((seatPrice, index) => ({
      index: index + 1,
      name: seatPrice?.seatType?.name,
      code: seatPrice?.seatType?.code,
      price: seatPrice?.original_price_per_km,
    }));
  }, [trainData]);

  useEffect(() => {
    if (!trainData) return;
    const updatedTrainData = {
      ...trainData,
      carriages: trainData.carriages.map((carriage) => ({
        ...carriage,
        carriageLayout: {
          ...carriage.carriageLayout,
          seats: carriage.carriageLayout.seats.map((seat) => ({
            ...seat,
            seatType:
              trainData.seatPrices.find((seatPrice) => seatPrice?.seatType?.id === seat?.seatType?.id)?.seatType ||
              seat.seatType,
          })),
        },
      })),
    };

    setFormatTrainData(updatedTrainData);
  }, [trainData]);

  return (
    <div>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Thông tin tàu hoả"
          links={[
            { title: 'Trang chủ', href: '/admin' },
            { title: 'Toa hỏa', href: '/admin/trains' },
            { title: formatTrainData?.name || 'Chi tiết' },
          ]}
        />
        <Space>
          <Button href={`${id}/edit`} type="primary" icon={<EditOutlined />}>
            Chỉnh sửa
          </Button>
        </Space>
      </Flex>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Flex vertical align="center" className="bg-white w-full mx-auto" gap={16}>
              <h1 className="font-semibold text-base text-center">{formatTrainData?.name}</h1>
              <Flex vertical gap={16} className="w-full">
                {formatTrainData?.carriages?.map((carriage) => (
                  <Flex
                    key={carriage.id}
                    vertical
                    align="center"
                    className="w-full border border-gray-200 mx-auto p-6 rounded-md"
                  >
                    <h1 className="font-semibold text-base text-center mb-6">{carriage?.carriageLayout?.name}</h1>
                    <Row gutter={[20, 20]}>
                      {carriage?.carriageLayout?.seats?.map((seat) => (
                        <Col
                          key={seat.id}
                          span={24 / (carriage?.carriageLayout?.floors * carriage?.carriageLayout?.row_count)}
                        >
                          <Flex vertical align="center" className="border border-gray-200 p-2 rounded-md">
                            <h1 className="font-semibold text-lg">{seat?.position}</h1>
                            <p className="text-xs">{seat?.seatType?.code}</p>
                          </Flex>
                        </Col>
                      ))}
                    </Row>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Flex vertical className="bg-white mx-auto" gap={12}>
                  <h1 className="font-semibold text-base text-center">Lộ trình di chuyển</h1>
                  <div className="w-full">Content here</div>
                </Flex>
              </Card>
            </Col>
            <Col span={24}>
              <Card>
                <Flex vertical className="bg-white mx-auto" gap={12}>
                  <h1 className="font-semibold text-base text-center">Bảng giá vé</h1>
                  <div className="w-full">
                    <SeatPricesTable data={seatPricesData} />
                  </div>
                </Flex>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TrainDetails;
