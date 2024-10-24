import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Form, Input, message, Row, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAsyncSelect from '~/components/ui/CustomAsyncSelect';
import PageHeader from '~/components/ui/page-header';
import { useCreateCarriageLayout } from '~/features/carriages/api/create-layout';
import CarriagesContainer from '~/features/carriages/components/CarriagesContainer';
import SeatItem from '~/features/carriages/components/SeatItem';
import CARRIAGE_RULES from '~/features/carriages/schemas';
import { CARRIAGE_FLOORS_OPTIONS, CARRIAGE_ROWS_OPTIONS } from '~/features/carriages/utils/constants';
import { moveArrayItem } from '~/features/carriages/utils/helpers';
import { useSeatTypes } from '~/features/seat-types/api/get-seat-types';

const CreateCarriage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [layout, setLayout] = useState([]);

  const numberOfFloors = Form.useWatch('floors', form);
  const numberOfRows = Form.useWatch('row_count', form);

  const [selectedSeatType, setSelectedSeatType] = useState(null);

  const [selectedSeatTypes, setSelectedSeatTypes] = useState([]);

  const mutation = useCreateCarriageLayout({
    mutationConfig: {
      onSuccess: ({ id }) => {
        navigate(`/admin/carriage-layouts/${id}`);
        message.success('Tạo toa tàu thành công');
      },
      onError: () => {
        message.error('Something went wrong!');
      },
    },
  });

  useEffect(() => {
    const newSeats = selectedSeatTypes.reduce((acc, item) => {
      const newSeatsLine = Array.from({ length: item.quantity }, () => ({
        value: item.value,
        name: item.code,
      }));
      return [...acc, ...newSeatsLine];
    }, []);

    setLayout(newSeats);
  }, [selectedSeatTypes]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setLayout(moveArrayItem(layout, oldIndex, newIndex));
  };

  const handleSave = () => {
    form.validateFields().then(() => {
      if (layout.length === 0) {
        message.error('Vui lòng chọn ghế cho toa tàu');
      } else {
        const data = {
          ...form.getFieldsValue(),
          row_count: form.getFieldValue('floors') === 1 ? form.getFieldValue('row_count') : 1,
          layout: layout.map((item) => item.value),
        };
        mutation.mutate({ data });
      }
    });
  };

  const handleSelectSeatType = () => {
    if (selectedSeatType) {
      const isExist = selectedSeatTypes.find((item) => item.value === selectedSeatType.value);
      if (isExist) {
        setSelectedSeatTypes((prev) =>
          prev.map((item) =>
            item.value === selectedSeatType.value
              ? { ...item, quantity: item.quantity + parseInt(form.getFieldValue('number_of_seats')) }
              : item,
          ),
        );
      } else {
        setSelectedSeatTypes((prev) => [
          ...prev,
          { ...selectedSeatType, quantity: parseInt(form.getFieldValue('number_of_seats')) },
        ]);
      }
    }
  };

  const handleRemoveSeat = (value) => {
    const temp = selectedSeatTypes.filter((item) => item.value !== value);
    setSelectedSeatTypes(temp);
  };

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading="Quản lý toa tàu"
          links={[
            { title: 'Trang chủ', href: '/admin' },
            { title: 'Toa tàu', href: '/admin/carriage-layouts' },
            { title: 'Tạo toa tàu' },
          ]}
        />
        <Space>
          <Button onClick={handleSave} type="primary" icon={<PlusOutlined />}>
            Tạo ngay
          </Button>
        </Space>
      </Flex>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Card>
            <Flex vertical align="center">
              <div className="py-4">
                <CarriagesContainer axis={'xy'} onSortEnd={onSortEnd}>
                  {layout.map((item, index) => (
                    <SeatItem
                      key={index}
                      index={index}
                      position={index + 1}
                      title={item.name}
                      cols={numberOfFloors}
                      rows={numberOfRows}
                    />
                  ))}
                </CarriagesContainer>
              </div>
            </Flex>
          </Card>
        </Col>
        <Col span={10}>
          <Card>
            <Form
              form={form}
              initialValues={{
                name: '',
                type: 'seat',
                number_of_seats: 1,
                floors: 1,
                row_count: 1,
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
              <Form.Item label="Chọn loại ghế" name="number_of_seats">
                <Flex gap={8}>
                  <CustomAsyncSelect
                    loadQuery={useSeatTypes}
                    setValue={setSelectedSeatType}
                    config={{ value: 'id', label: 'name', code: 'code' }}
                  />
                  <Input className="w-[80px]" type="number" />
                  <Button onClick={handleSelectSeatType} type="primary" icon={<PlusOutlined />} />
                </Flex>
              </Form.Item>
              <Flex vertical gap={12}>
                <h1>Các ghế đã chọn</h1>
                {selectedSeatTypes.map((item) => (
                  <Flex
                    key={item.value}
                    align="center"
                    justify="space-between"
                    className="border border-[#ccc] w-full py-2 px-3 rounded-lg"
                  >
                    <p>
                      {item.quantity}x {item.label}
                    </p>
                    <Button
                      onClick={() => {
                        handleRemoveSeat(item.value);
                      }}
                      type="text"
                      icon={<CloseOutlined />}
                      size="small"
                    />
                  </Flex>
                ))}
              </Flex>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateCarriage;
