import { Button, Card, Col, Flex, Row, Space } from 'antd';
import { useParams } from 'react-router-dom';
import PageHeader from '~/components/ui/page-header';
import { useCarriageLayout } from '~/features/carriages/api/get-layout';
import { PlusSquareOutlined } from '@ant-design/icons';

const CarriageDetails = () => {
  const { id } = useParams();
  const { data } = useCarriageLayout({ id });
  return (
    <div>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Quản lý toa tàu"
          links={[
            { title: 'Trang chủ', href: '/admin' },
            { title: 'Toa tàu', href: '/admin/carriage-layouts' },
            { title: data?.name || 'Chi tiết' },
          ]}
        />
        <Space>
          <Button href="create" type="primary" icon={<PlusSquareOutlined />}>
            Thêm mới
          </Button>
        </Space>
      </Flex>
      <Card className="w-[460px] mx-auto p-4 rounded-md">
        <Flex vertical align="center">
          <h1 className="font-semibold text-base text-center">{data?.name}</h1>
          <Row gutter={20}>
            {data?.seats?.map((seat) => (
              <Col key={seat.id} span={24 / (data?.floors * data?.row_count)} className="mt-4">
                <Flex vertical align="center" className="border border-[#ccc] p-2 rounded-md">
                  <h1 className="font-semibold text-lg">{seat?.position}</h1>
                  <p className="text-xs">{seat?.seatType?.code}</p>
                </Flex>
              </Col>
            ))}
          </Row>
        </Flex>
      </Card>
    </div>
  );
};

export default CarriageDetails;
