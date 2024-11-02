import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Row, Space, Tag } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '~/components/ui/page-header';
import { useTrain } from '~/features/trains/api/get-train';
import SeatPricesTable from '~/features/trains/components/SeatPricesTable';
import SelectedCarriagesTable from '~/features/trains/components/SelectedCarriagesTable';

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

  const formattedCarriages = useMemo(() => {
    return trainData?.carriages?.map((carriage, index) => ({
      index,
      key: index,
      name: carriage?.carriageLayout?.name,
      structure: `${carriage?.carriageLayout?.floors} tầng, ${carriage?.carriageLayout?.row_count} hàng`,
      seats: carriage?.carriageLayout?.seats?.length,
    }));
  }, [trainData?.carriages]);

  return (
    <div>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Thông tin tàu hoả"
          links={[
            { title: 'Trang chủ', href: '/admin' },
            { title: 'Toa hỏa', href: '/admin/trains' },
            {
              title: (
                <Flex gap={8} align="center">
                  {formatTrainData?.name}
                  {trainData?.is_active ? <Tag color="success">Hoạt động</Tag> : <Tag color="red">Vô hiệu</Tag>}
                </Flex>
              ),
            },
          ]}
        />
        <Space>
          <Link to="edit">
            <Button type="primary" icon={<EditOutlined />}>
              Chỉnh sửa
            </Button>
          </Link>
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
                  <h1 className="font-semibold text-base text-center">Kết cấu toa tàu</h1>
                  <SelectedCarriagesTable data={formattedCarriages} handleRemoveItem={null} />
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
