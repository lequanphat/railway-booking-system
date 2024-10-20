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
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card className="w-full mx-auto p-4 rounded-md">
            <Flex vertical align="center">
              <h1 className="font-semibold text-base text-center mb-6">{data?.name}</h1>
              <Row gutter={[20, 20]}>
                {data?.seats?.map((seat) => (
                  <Col key={seat.id} span={24 / (data?.floors * data?.row_count)}>
                    <Flex vertical align="center" className="border border-[#ccc] p-2 rounded-md">
                      <h1 className="font-semibold text-lg">{seat?.position}</h1>
                      <p className="text-xs">{seat?.seatType?.code}</p>
                    </Flex>
                  </Col>
                ))}
              </Row>
            </Flex>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="w-full mx-auto p-4 rounded-md">
            <Flex vertical align="center">
              <h1 className="font-semibold text-base text-center mb-4">Thông tin toa tàu</h1>
            </Flex>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CarriageDetails;
