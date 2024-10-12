import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, message, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAsyncSelect from '~/components/ui/CustomAsyncSelect';
import PageHeader from '~/components/ui/page-header';
import RULES from '~/config/rule';
import { useCreateCarriageLayout } from '~/features/carriages/api/create-layout';
import CarriagesContainer from '~/features/carriages/components/CarriagesContainer';
import SeatItem from '~/features/carriages/components/SeatItem';
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
        navigate(`/admin/carriages/${id}`);
        message.success('OK bro!');
      },
      onError: () => {
        message.error('Something went wrong!');
      },
    },
  });

  useEffect(() => {
    const newSeats = selectedSeatTypes.reduce((acc, item) => {
      const newSeats = Array.from({ length: item.quantity }, () => ({
        value: item.value,
        name: item.code,
      }));
      return [...acc, ...newSeats];
    }, []);

    setLayout(newSeats);
  }, [selectedSeatTypes]);

  function moveArrayItem(arr, fromIndex, toIndex) {
    const updatedArray = [...arr];

    if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) {
      return arr;
    }

    const [movedItem] = updatedArray.splice(fromIndex, 1);

    updatedArray.splice(toIndex, 0, movedItem);

    return updatedArray;
  }

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
        console.log(data);
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
            { title: 'Toa tàu', href: '/admin/carriages' },
            { title: 'Tạo toa tàu' },
          ]}
        />
        <Space>
          <Button onClick={handleSave} type="primary" icon={<PlusOutlined />}>
            Tạo ngay
          </Button>
        </Space>
      </Flex>
      <Flex className="" gap={20}>
        <Flex vertical align="center" className="w-[65%] bg-white border-[1px] border-[#ccc] rounded-lg p-4">
          <div className="py-4">
            <CarriagesContainer axis={'xy'} onSortEnd={onSortEnd}>
              {layout.map((item, index) => (
                <SeatItem key={index} index={index} title={item.name} cols={numberOfFloors} rows={numberOfRows} />
              ))}
            </CarriagesContainer>
          </div>
        </Flex>
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
          className="w-[35%] bg-white border-[1px] border-[#ccc] rounded-lg p-4"
        >
          <h1 className="text-[18px] font-semibold text-center">Thông tin toa tàu</h1>
          <Form.Item
            label="Tên toa tàu"
            name="name"
            rules={RULES.createCarriage.name}
            required={true}
            validateTrigger="onChange"
          >
            <Input placeholder="Nhập tên toa tàu..." />
          </Form.Item>
          <Form.Item
            label="Số tầng"
            name="floors"
            rules={RULES.createCarriage.floors}
            required={true}
            validateTrigger="onChange"
          >
            <Select
              options={[
                {
                  label: '1 Tầng',
                  value: 1,
                },
                {
                  label: '2 Tầng',
                  value: 2,
                },
                {
                  label: '3 Tầng',
                  value: 3,
                },
                {
                  label: '4 Tầng',
                  value: 4,
                },
              ]}
            ></Select>
          </Form.Item>

          {numberOfFloors === 1 && (
            <Form.Item
              label="Số hàng ghế"
              name="row_count"
              rules={RULES.createCarriage.floors}
              required={true}
              validateTrigger="onChange"
            >
              <Select
                options={[
                  {
                    label: '1 Hàng',
                    value: 1,
                  },
                  {
                    label: '2 Hàng',
                    value: 2,
                  },
                  {
                    label: '3 Hàng',
                    value: 3,
                  },
                  {
                    label: '4 Hàng',
                    value: 4,
                  },
                ]}
              ></Select>
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
                className="border-[1px] border-[#ccc] w-full py-2 px-3 rounded-lg"
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
      </Flex>
    </>
  );
};

export default CreateCarriage;
