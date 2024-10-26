import { CloseOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Form, Input, message, Row, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomAsyncSelect from '~/components/ui/CustomAsyncSelect';
import PageHeader from '~/components/ui/page-header';
import { useCarriageLayout } from '~/features/carriages/api/get-layout';
import { useUpdateCarriageLayout } from '~/features/carriages/api/update-layout';
import CarriagesContainer from '~/features/carriages/components/CarriagesContainer';
import SeatItem from '~/features/carriages/components/SeatItem';
import CARRIAGE_RULES from '~/features/carriages/schemas';
import { CARRIAGE_FLOORS_OPTIONS, CARRIAGE_ROWS_OPTIONS } from '~/features/carriages/utils/constants';
import { moveArrayItem } from '~/features/carriages/utils/helpers';
import { useSeatTypes } from '~/features/seat-types/api/get-seat-types';

const CarriageDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [layout, setLayout] = useState([]);

  const [editedLayout, setEditedLayout] = useState(false);

  const [selectedSeatType, setSelectedSeatType] = useState(null);

  const [selectedSeatTypes, setSelectedSeatTypes] = useState([]);

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

  // effect
  useEffect(() => {
    if (carriageLayout) {
      // set form value
      form.setFieldsValue({
        name: carriageLayout.name,
        number_of_seats: 1,
        floors: carriageLayout.floors || 1,
        row_count: carriageLayout.row_count || 1,
      });

      // init state
      const initSelectedSeatTypes = carriageLayout?.seats?.reduce((acc, item) => {
        if (acc.find((i) => i.value === item.seatType.id)) {
          return acc.map((i) => (i.value === item.seatType.id ? { ...i, quantity: i.quantity + 1 } : i));
        }
        return [...acc, { value: item.seatType.id, label: item.seatType.name, code: item.seatType.code, quantity: 1 }];
      }, []);

      setSelectedSeatTypes(initSelectedSeatTypes);

      const initLayout = carriageLayout?.seats?.map((item) => ({
        value: item.seatType.id,
        name: item.seatType.code,
      }));
      setLayout(initLayout);
    }
  }, [carriageLayout, form]);

  useEffect(() => {
    if (editedLayout) {
      const newSeats = selectedSeatTypes.reduce((acc, item) => {
        const newSeatsLine = Array.from({ length: item.quantity }, () => ({
          value: item.value,
          name: item.code,
        }));
        return [...acc, ...newSeatsLine];
      }, []);

      setLayout(newSeats);
    }
  }, [selectedSeatTypes, editedLayout]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setLayout(moveArrayItem(layout, oldIndex, newIndex));
  };

  // handle save event
  const handleSave = () => {
    form.validateFields().then(() => {
      const data = {
        ...form.getFieldsValue(),
        id,
        row_count: form.getFieldValue('floors') === 1 ? form.getFieldValue('row_count') : 1,
        layout: layout.map((item) => item.value),
      };
      mutation.mutate({ data });
    });
  };

  // handle seat type event
  const handleSelectSeatType = () => {
    if (selectedSeatType) {
      setEditedLayout(true);
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
    setEditedLayout(true);
    setSelectedSeatTypes((pre) => pre.filter((item) => item.value !== value));
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
          <Button onClick={handleSave} type="primary" icon={<SaveOutlined />}>
            Lưu thay đổi
          </Button>
        </Space>
      </Flex>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Card>
            <Flex vertical align="center">
              <Row gutter={[20, 20]}>
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
    </div>
  );
};

export default CarriageDetails;
