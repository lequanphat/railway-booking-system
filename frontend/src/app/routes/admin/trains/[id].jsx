import { Button, Col, Flex, Row, Space } from 'antd';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/ui/page-header';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useTrain } from '~/features/trains/api/get-train';
import SeatPricesTable from '~/features/trains/components/SeatPricesTable';
import { useMemo } from 'react';

const TrainDetails = () => {
  const { id } = useParams();
  const { data: trainData } = useTrain({ id });

  const seatPricesData = useMemo(() => {
    return trainData?.seatPrices?.map((seatPrice, index) => ({
      index: index + 1,
      name: seatPrice?.seatType?.name,
      price: seatPrice?.original_price_per_km,
    }));
  }, [trainData]);
  return (
    <div>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Quản lý tàu hỏa"
          links={[
            { title: 'Trang chủ', href: '/admin' },
            { title: 'Toa hỏa', href: '/admin/trains' },
            { title: trainData?.name || 'Chi tiết' },
          ]}
        />
        <Space>
          <Button href="create" type="primary" icon={<PlusSquareOutlined />}>
            Thêm mới
          </Button>
        </Space>
      </Flex>
      <Flex className="w-full" gap={20}>
        <Flex
          vertical
          align="center"
          className="flex-1 border-[1px] bg-white border-[#ccc] w-[460px] mx-auto p-4 rounded-md"
          gap={16}
        >
          <h1 className="font-semibold text-[16px] text-center">{trainData?.name}</h1>
          <Flex vertical gap={16} className="w-full">
            {trainData?.carriages?.map((carriage) => (
              <Flex
                key={carriage.id}
                vertical
                align="center"
                className="w-full border-[1px] border-[#ccc] mx-auto p-4 rounded-md"
              >
                <h1 className="font-semibold text-[16px] text-center">{carriage?.carriageLayout?.name}</h1>
                <Row gutter={20}>
                  {carriage?.carriageLayout?.seats?.map((seat) => (
                    <Col
                      key={seat.id}
                      span={24 / (carriage?.carriageLayout?.floors * carriage?.carriageLayout?.row_count)}
                      className="mt-4"
                    >
                      <Flex vertical align="center" className="border-[1px] border-[#ccc] p-2 rounded-md">
                        <h1 className="font-semibold text-[18px]">{seat?.position}</h1>
                        <p className="text-[12px]">{seat?.seatType?.code}</p>
                      </Flex>
                    </Col>
                  ))}
                </Row>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex vertical className="flex-1 border-[1px] bg-white border-[#ccc] mx-auto p-4 rounded-md" gap={12}>
          <h1 className="font-semibold text-[16px] text-center">Bảng giá vé</h1>
          <div className="w-full">
            <SeatPricesTable data={seatPricesData} />
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default TrainDetails;
