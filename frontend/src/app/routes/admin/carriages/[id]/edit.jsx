import { Button, Card, Col, Flex, Form, Input, message, Row, Select, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '~/components/ui/page-header';
import { useCarriageLayout } from '~/features/carriages/api/get-layout';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import CARRIAGE_RULES from '~/features/carriages/schemas';
import { CARRIAGE_FLOORS_OPTIONS, CARRIAGE_ROWS_OPTIONS } from '~/features/carriages/utils/constants';
import { useUpdateCarriageLayout } from '~/features/carriages/api/update-layout';

const CarriageDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const numberOfFloors = Form.useWatch('floors', form);
  const numberOfRows = Form.useWatch('row_count', form);

  const { data: carriageLayout } = useCarriageLayout({ id });

  const mutation = useUpdateCarriageLayout({
    mutationConfig: {
      onSuccess: ({ id }) => {
        navigate(`/admin/carriage-layouts/${id}`);
        message.success('Cập nhật toa tàu thành công!');
      },
      onError: () => {
        message.error('Something went wrong!');
      },
    },
  });

  useEffect(() => {
    if (carriageLayout) {
      form.setFieldsValue({
        name: carriageLayout.name,
        number_of_seats: 1,
        floors: carriageLayout.floors || 1,
        row_count: carriageLayout.row_count || 1,
      });
    }
  }, [carriageLayout, form]);

  const handleSave = () => {
    form.validateFields().then(() => {
      const data = {
        ...form.getFieldsValue(),
        id,
        row_count: form.getFieldValue('floors') === 1 ? form.getFieldValue('row_count') : 1,
      };
      mutation.mutate({ data });
    });
  };

  return (
    <div>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Quản lý toa tàu"
          links={[
            { title: 'Trang chủ', href: '/admin' },
            { title: 'Toa tàu', href: '/admin/carriage-layouts' },
            { title: carriageLayout?.name, href: `/admin/carriage-layouts/${id}` },
            { title: 'Chỉnh sửa' },
          ]}
        />
        <Space>
          <Button href={`${id}/edit`} type="default">
            Hoàn tác
          </Button>
          <Button onClick={handleSave} type="primary" icon={<PlusSquareOutlined />}>
            Lưu thay đổi
          </Button>
        </Space>
      </Flex>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Card>
            <Flex vertical align="center">
              <Row gutter={[20, 20]}>
                {carriageLayout?.seats?.map((seat) => (
                  <Col key={seat.id} span={24 / (numberOfFloors > 1 ? numberOfFloors : numberOfFloors * numberOfRows)}>
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
        <Col span={10}>
          <Card>
            <Form
              form={form}
              initialValues={{
                name: carriageLayout?.name || '',
                number_of_seats: 1,
                floors: carriageLayout?.floors || 1,
                row_count: carriageLayout?.row_count || 1,
              }}
              layout="vertical"
            >
              <h1 className="text-lg font-semibold text-center">Thông tin toa tàu</h1>
              <Form.Item
                label="Tên toa tàu"
                name="name"
                rules={CARRIAGE_RULES.createCarriage.name}
                required={true}
                validateTrigger="onChange"
              >
                <Input placeholder="Nhập tên toa tàu..." />
              </Form.Item>
              <Form.Item
                label="Số tầng"
                name="floors"
                rules={CARRIAGE_RULES.createCarriage.floors}
                required={true}
                validateTrigger="onChange"
              >
                <Select options={CARRIAGE_FLOORS_OPTIONS}></Select>
              </Form.Item>

              {numberOfFloors === 1 && (
                <Form.Item
                  label="Số hàng ghế"
                  name="row_count"
                  rules={CARRIAGE_RULES.createCarriage.floors}
                  required={true}
                  validateTrigger="onChange"
                >
                  <Select options={CARRIAGE_ROWS_OPTIONS}></Select>
                </Form.Item>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CarriageDetails;
